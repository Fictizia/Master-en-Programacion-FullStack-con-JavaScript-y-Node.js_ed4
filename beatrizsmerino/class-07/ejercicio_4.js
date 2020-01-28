// 4 - Diseña un algoritmo que imprima los numeros pares entre 0 y 100.

// - Usando for:
// - Usando while y break:
// - Usando Do...While:



// - Resuelto con for:
/*
console.group("Numeros pares del 0-100 con for: ");
for (let index = 0; index <= 100; index += 2) {
  console.log("Numero " + index);
}
console.groupEnd("Numeros pares del 0-100 con for: ");
*/



// - Resuelto con while:
/*
console.group("Numeros del 0-100 con while: ");
let counter = 0;
while (counter <= 100) {
  console.log("Numero " + counter);
  counter += 2;
}
console.groupEnd("Numeros del 0-100 con while: ");
*/


// - Resuelto con Do...While:
console.group("Numeros del 0-100 con do...while: ");
let counter = 0;
do {
  console.log("Numero " + counter);
  counter += 2;
} while (counter <= 100);
console.groupEnd("Numeros del 0-100 con do...while: ");