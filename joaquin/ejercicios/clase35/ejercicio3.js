// 3 - Comprobar la seguridad de una contraseña

// De esta forma comprobaremos:

// CondicionA: Contraseñas que contengan al menos una letra mayúscula.       --> [A-Z]+    --> NO CondicionA --> ^((?![A-Z]).)*$
// CondicionB: Contraseñas que contengan al menos una letra minúscula.       --> [a-z]+    --> NO CondicionB --> ^((?![a-z]).)*$
// CondicionC: Contraseñas que contengan al menos un número                  --> \d+       --> NO CondicionC --> ^((?!\d).)*$
// CondicionD: Contraseñas que contengan al menos un caracter especial @#$%. --> D [@#$%]+ --> NO CondicionD --> ^((?![@#$%]).)*$
// CondicionE: Contraseñas cuya longitud sea como mínimo 6 caracteres.       --> E .{6,}   --> NO CondicionE --> ^(.{1,5})$
// CondicionF: Contraseñas cuya longitud máxima sea 20 caracteres.           --> F .{1,20} --> NO CondicionF --> .{21,}

// Condicion A y B equivale a NO (NO CondicionA o NO Condicion B)
// A && B es lo mismo que !(!A||!B)

// No condicionA equivale a ^((?!CondicionA).)*$

// https://stackoverflow.com/questions/406230/regular-expression-to-match-a-line-that-doesnt-contain-a-word
// The notion that regex doesn't support inverse matching is not entirely true. You can mimic this behavior
// by using negative look-arounds:
// ^((?!hede).)*$

// Explanation
// A string is just a list of n characters. Before, and after each character, there's an empty string. So a 
// list of n characters will have n+1 empty strings. Consider the string "ABhedeCD":

//     ┌──┬───┬──┬───┬──┬───┬──┬───┬──┬───┬──┬───┬──┬───┬──┬───┬──┐
// S = │e1│ A │e2│ B │e3│ h │e4│ e │e5│ d │e6│ e │e7│ C │e8│ D │e9│
//     └──┴───┴──┴───┴──┴───┴──┴───┴──┴───┴──┴───┴──┴───┴──┴───┴──┘

// index    0      1      2      3      4      5      6      7
// where the e's are the empty strings. The regex (?!hede). looks ahead to see if there's no substring "hede" 
// to be seen, and if that is the case (so something else is seen), then the . (dot) will match any character 
// except a line break. Look-arounds are also called zero-width-assertions because they don't consume any 
// characters. They only assert/validate something.

// So, in my example, every empty string is first validated to see if there's no "hede" up ahead, before a 
// character is consumed by the . (dot). The regex (?!hede). will do that only once, so it is wrapped in a 
// group, and repeated zero or more times: ((?!hede).)*. Finally, the start- and end-of-input are anchored 
// to make sure the entire input is consumed: ^((?!hede).)*$

// As you can see, the input "ABhedeCD" will fail because on e3, the regex (?!hede) fails (there is "hede" 
// up ahead!).

// validas: 
//   Aa3@56
//   Cami@n22
//   UnaPassw@rdDe20Carac
//   S3cret#Profesional
//   $$%%##@@MuyEspecial2
//
// inválidas: 
//   aa3@56 --> no contiene letra mayúscula
//   AA3@56 --> no contiene letra minúscula
//   Password# --> no contiene números
//   Contraseña33 --> no contiene caracteres especiales @#$%
//   Aa3@ --> longitud 4 inferior al mínima de 6
//   UnaPassw@rdDe21Caract --> longitud 21 superior al máximo de 20 

// https://regex101.com/r/29njvB/4/tests
const pwds = [
  'Aa3@56', 'Cami@n22', 'UnaPassw@rdDe20Carac', 'S3cret#Profesional', '$$%%##@@MuyEspecial2',
  'aa3@56', 'AA3@56', 'Password#', 'Contraseña33', 'Aa3@', 'UnaPassw@rdDe21Caract'
];

const noMayusculas = '^((?![A-Z]).)*$';
const noMinusculas = '^((?![a-z]).)*$';
const noNumeros = '^((?!\\d).)*$'; // ponemos doble \\ dentro de las comillas '' para representar un \
const noCaracteresEspeciales = '^((?![@#$%]).)*$';
const menos6caracteres = '^(.{1,5})$';
const mas20caracteres = '.{21,}';
const noAoNoB = noMayusculas+'|'+noMinusculas+'|'+noNumeros+'|'+noCaracteresEspeciales+'|'+menos6caracteres+'|'+mas20caracteres;
const pwdPattern = new RegExp('^((?!('+noAoNoB+')).)*$');

pwds.filter(text=>pwdPattern.test(text));
