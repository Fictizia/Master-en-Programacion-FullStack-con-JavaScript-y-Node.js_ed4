// Ejercicios
// Realiza los siguientes ejercicios usando en cada uno los tres tipos de condicionales (If...else, Switch, operador ternario )

// 1 - Diseña un algoritmo que lea dos números y los compare. Como resultado esperamos que nos diga cual es mayor... o si son iguales.

// Usando if...else
// 	// Solución con if...else
// Usando Operador Ternario (?:)
// 	// Solución con operador ternario
// Usando Switch
// 	//Solución con switch


function compareNumbers(num1, num2){
    if((isNaN(num1) || num1 === "undefined" || num1 === null || num1 === "") ||
       (isNaN(num2) || num2 === "undefined" || num2 === null || num2 === "")){

        alert("Inserta un numero");
    }else{

        // - Resuelto con if/else if
        /*
        if(num1>num2){
            alert("El primer numero " + "(" + num1 + ")" + " es mayor que el segundo numero " + "(" + num2 + ")");
        }else if(num2>num1){
            alert("El primer numero " + "(" + num1 + ")" + " es menor que el segundo numero " + "(" + num2 + ")");
        }else if(num1===num1){
            alert(num2 + " y " + num1 + " son iguales");
        }
        */

        // - Resulto con switch
        /*
        switch (true) {
            case num1>num2:
                alert("El primer numero " + "(" + num1 + ")" + " es mayor que el segundo numero " + "(" + num2 + ")");
                break;
            case num2>num1:
                alert("El primer numero " + "(" + num1 + ")" + " es menor que el segundo numero " + "(" + num2 + ")");
                break;
            case num1===num1:
                alert(num2 + " y " + num1 + " son iguales");
                break;
            default:
                break;
        }*/

        // - Resuelto con ternario
        (num1>num2) ? alert("El primer numero " + "(" + num1 + ")" + " es mayor que el segundo numero " + "(" + num2 + ")")
            : (num2>num1) ? alert("El primer numero " + "(" + num1 + ")" + " es menor que el segundo numero " + "(" + num2 + ")")
            : alert(num2 + " y " + num1 + " son iguales")

    }
}

var num1 = prompt("Inserta un numero");
var num2 = prompt("Inserta otro numero");

compareNumbers(num1, num2);