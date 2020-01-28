// 5 - Diseña un algoritmo que al introducir un numero nos diga si es positivo o negativo.

// Usando if...else
// 	// Solución con if...else
// Usando Operador Ternario (?:)
// 	// Solución con operador ternario
// Usando Switch
// 	// Solución con switch



function numberPositiveNegative(num1) {
    if (isNaN(num1) || num1 === "undefined" || num1 === null || num1 === "") {
        alert("Inserta un numero");
    } else {

        // - Resuelto con if/else if
        /*
        if (num1 < 0) {
            alert("Tu numero es negativo: " + num1);
        } else {
            alert("Tu numero es positivo " + num1);
        }
        */

        // - Resuelto con Switch
        /*
        switch (true) {
            case (num1 < 0):
                alert("Tu numero es negativo: " + num1);
                break;
            default:
                alert("Tu numero es positivo " + num1);
                break;
        }
        */

        // - Resuelto con Ternario
        (num1 < 0) ? alert("Tu numero es negativo: " + num1) : alert("Tu numero es positivo " + num1);
    }
}

alert("Inserta un numero para saber si es positivo o negativo: ");
var num1 = prompt("Numero: ");

numberPositiveNegative(num1);