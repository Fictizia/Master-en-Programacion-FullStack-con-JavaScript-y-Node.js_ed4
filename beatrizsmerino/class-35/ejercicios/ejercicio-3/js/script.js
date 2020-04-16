// Ejercicio 3
// Comprobar la seguridad de una contraseña

// De esta forma comprobaremos:
// - Contraseñas que contengan al menos una letra mayúscula.
// - Contraseñas que contengan al menos una letra minúscula.
// - Contraseñas que contengan al menos un número
// - Contraseñas que contengan al menos un caracter especial @#$%.
// - Contraseñas cuya longitud sea como mínimo 6 caracteres.
// - Contraseñas cuya longitud máxima sea 20 caracteres.


const regexPassword = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=[0-9])(?=.*[@#$%]).{6,20}/g;

const passwords = [
	"Z%C2Uacgw_4weL@Q",
	"QZ6UttU-&r4t%R+J",
	"KK8a%K^9seQ$Qc8X",
	"*Q#*9-CP%?JkXQSs",
	"#1234abCD@", ,
	"=G4T!v-J2_6aS^EW",
	"perrito",
	"perrito123",
	"Perrito1234"
];

const validPassword = passwords.filter(password => password.match(regexPassword));
console.log(validPassword);
