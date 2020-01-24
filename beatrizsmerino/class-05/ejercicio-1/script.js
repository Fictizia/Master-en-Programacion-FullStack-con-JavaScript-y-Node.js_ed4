// 1 - Diseña un algoritmo que lea dos números y realice los siguientes cálculos:
// Valor de su suma
// Valor de su resta
// Valor de su division
// Valor de su producto





function ejercicio1(num1, num2){
    var suma = num1 + num2;
    var resta = num1 - num2;
    var division = num1 / num2;
    var producto =  num1 * num2;

    console.group("%cCalc:", "padding: 0.2rem 0.5rem; background-color: #2d4245; color: white;");
        console.log("Suma: " + num1 + "+" + num2 + "=",suma);
        console.log("Resta: " + num1 + "-" + num2 + "=",resta);
        console.log("Division: " + num1 + "/" + num2 + "=",division);
        console.log("Producto: " + num1 + "*" + num2 + "=", producto);
    console.groupEnd();
}

ejercicio1(20, 5);