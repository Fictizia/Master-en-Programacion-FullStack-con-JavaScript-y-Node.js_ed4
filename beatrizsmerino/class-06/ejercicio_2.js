// 2 - Diseña un script que lea tres números distintos y nos diga cual de ellos es el mayor.

// Usando if...else
// 	// Solución con if...else
// Usando Operador Ternario (?:)
// 	// Solución con operador ternario
// Usando Switch
// 	//Solución con switch


function compareNumbers(num1, num2, num3) {
    if ((isNaN(num1) || num1 === "undefined" || num1 === null || num1 === "") ||
        (isNaN(num2) || num2 === "undefined" || num2 === null || num2 === "") ||
        (isNaN(num3) || num3 === "undefined" || num3 === null || num3 === "")) {

        alert("Inserta un numero");
    } else {

        // - Resuelto con if/else if
        /*
        if(num1>num2){
            //console.log(num1 + " es el mayor");
            if(num1>num3){

            }else{
                alert(num3 + " es el mayor");
            }
        }else{
            alert(num2 + " es el mayor");
        }
        */

        // - Resuelto con Switch
        switch (true) {
            case num1 > num2 && num1 > num3:
                alert(num1 + " es el mayor");
                break;
            case num1 > num2 && num1 < num3:
                alert(num3 + " es el mayor");
                break;
            case num1 < num2:
                alert(num2 + " es el mayor");
                break;
            default:
                break;
        }

        // - Resulto con el operador ternario
        // num1>num2 ? num1>num3 ? alert(num1 + " es el mayor") : alert(num3 + " es el mayor") : alert(num2 + " es el mayor")
    }
}

alert("Inserta 3 numeros:");
var num1 = prompt("Numero 1:");
var num2 = prompt("Numero 2:");
var num3 = prompt("Numero 3:");

compareNumbers(num1, num2, num3);