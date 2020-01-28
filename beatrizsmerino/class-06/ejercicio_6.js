// 6 - Diseña un algoritmo que al introducir un número nos diga si es par o impar.

// Usando if...else
// 	// Solución con if...else 
// Usando Operador Ternario (?:)
// 	// Solución con operador ternario
// Usando Switch
// 	// Solución con switch



function numberEvenOdd(num1) {
    if (isNaN(num1) || num1 === "undefined" || num1 === null || num1 === "") {
        alert("Inserta un numero");
    } else {

        // - Resuelto con if/else if
        /*
        if (num1%2 === 0) {
            alert("Tu numero es par: " + num1);
        } else {
            alert("Tu numero es impar " + num1);
        }
        */


        // - Resuelto con Switch
        /*
        switch (true) {
            case (num1%2 === 0):
                alert("Tu numero es par: " + num1);
                break;
            default:
                alert("Tu numero es impar " + num1);
                break;
        }
        */


        // - Resuelto con Ternario
        (num1%2 === 0) ? alert("Tu numero es par: " + num1) : alert("Tu numero es impar " + num1);
    }
}

alert("Inserta un numero para saber si es par o impar: ");
var num1 = prompt("Numero: ");

numberEvenOdd(num1);