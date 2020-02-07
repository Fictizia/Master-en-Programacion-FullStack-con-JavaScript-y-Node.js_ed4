// Utiliza .assert para controlar cuando se muestra tu nombre por consola.

// Ejemplo 1
var showName = false;
console.assert(showName, "Bea");

showName = true;
console.assert(showName, "Bea");


// Ejemplo 2
var name = "Beatriz";
var validacion = name == "Beatriz"
console.assert(validacion, "El nombre es correcto");

var name = "Beatriz";
var validacion = name == "Bea"
console.assert(validacion, "El nombre no correcto");