// 3 - Diseña un script que siga el siguiente proceso:

// Si el primero es negativo, debe sumar los otros dos

// Sino multiplicará los tres numeros

// Mostrar el resultado final incluyendo una referencia a la operación realizada.

// Usando if...else

// 	// Solución con if...else
// Usando Operador Ternario (?:)
// 	// Solución con operador ternario
// Usando Switch
// 	// Solución con switch


function operation(num1, num2, num3) {
    if ((isNaN(num1) || num1 === "undefined" || num1 === null || num1 === "") ||
        (isNaN(num2) || num2 === "undefined" || num2 === null || num2 === "") ||
        (isNaN(num3) || num3 === "undefined" || num3 === null || num3 === "")) {

        alert("Inserta un numero");

        console.log(typeof num1);
        console.log(typeof num2);
        console.log(typeof num3);
    } else {
        console.log(typeof num1);
        console.log(typeof num2);
        console.log(typeof num3);

        num1 = Number(num1);
        num2 = Number(num2);
        num3 = Number(num3);

        console.log(typeof num1);
        console.log(typeof num2);
        console.log(typeof num3);

        // - Resuelto con if/else if
        /*
        if (num1 < 0) {
            var sumNumbersOperation = num2 + "+" + num3 + "=",
                sumNumbersResult = (num2 + num3);
            alert("El primer numero es negativo: " + num1);
            alert("La suma del numero 2 y 3 es: " + sumNumbersOperation + sumNumbersResult);
        } else {
            var productNumbersOperation = num1 + "*" + num2 + "*" + num3 + "=",
                productsNumberResult = (num1 * num2 * num3);
            alert("El primer numero no es negativo: " + num1);
            alert("El producto de los numeros 2 y 3 es: " + productNumbersOperation + productsNumberResult);
        }
        */

        // - Resuelto con Switch
        /*
        switch (true) {
            case num1 < 0:
                var sumNumbersOperation = num2 + "+" + num3 + "=",
                    sumNumbersResult = (num2 + num3);
                alert("El primer numero es negativo: " + num1);
                alert("La suma del numero 2 y 3 es: " + sumNumbersOperation + sumNumbersResult);
                break;
            default:
                var productNumbersOperation = num1 + "*" + num2 + "*" + num3 + "=",
                    productsNumberResult = (num1 * num2 * num3);
                alert("El primer numero no es negativo: " + num1);
                alert("El producto de los numeros 2 y 3 es: " + productNumbersOperation + productsNumberResult);
                break;
        }
        */

        // - Resulto con el operador ternario
        var sumNumbersOperation = num2 + "+" + num3 + "=",
            sumNumbersResult = (num2 + num3);
        var productNumbersOperation = num1 + "*" + num2 + "*" + num3 + "=",
            productsNumberResult = (num1 * num2 * num3);

        (num1 < 0) ? alert("El primer numero es negativo: " + num1 + ". " + "La suma de los numeros 2 y 3 es: " + sumNumbersOperation + sumNumbersResult)
            : alert("El primer numero no es negativo: " + num1 + ". " + "El producto de los numeros 2 y 3 es: " + productNumbersOperation + productsNumberResult);
    }
}


alert("Inserta 3 numeros:");
var num1 = prompt("Numero 1:");
var num2 = prompt("Numero 2:");
var num3 = prompt("Numero 3:");

operation(num1, num2, num3);