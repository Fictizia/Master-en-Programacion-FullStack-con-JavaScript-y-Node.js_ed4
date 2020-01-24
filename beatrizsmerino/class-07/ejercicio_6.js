// 6 - Diseña un algoritmo que imprima la suma de los 50 primeros numeros pares
// y el total de números impares partiendo de un número dado por el usuario

// - Usando for:
// - Usando while y break:
// - Usando Do...While:




// - Resuelto con for:
/*
function getOdd50(num) {
  console.group("Numeros del " + num + "-" + (num + 50) + " con for: ");

  var sumOdd = 0;
  var sumOddOperation = "";

  for (let index = num; index <= (num + 50); index++) {
    // console.log("Numero " + index);

    // Numeros pares
    if (index % 2 === 0) {
      console.log("%cNumero " + index, "padding: 0.1rem 0.5rem; background-color: #454545; color: #f3f3f3;");
    }

    // Numeros impares
    if (index % 2 !== 0) {
      sumOdd += index;
      sumOddOperation += index + " + ";
    }
  }

  sumOddOperation = sumOddOperation.slice(0, -2) + " = ";
  console.log("Suma total de numeros impares: \n" + sumOddOperation + sumOdd);
  console.groupEnd("Numeros del " + num + "-" + (num + 50) + " con for: ");
}

getOdd50(10);
*/


// - Resuelto con while:
/*
function getOdd50(num) {
  console.group("Numeros del " + num + "-" + (num + 50) + " con while: ");

  var sumOdd = 0;
  var sumOddOperation = "";
  let index = num;

  while (index <= (num + 50)) {
    // Numeros pares
    if (index % 2 === 0) {
      console.log("%cNumero " + index, "padding: 0.1rem 0.5rem; background-color: #454545; color: #f3f3f3;");
    }

    // Numeros impares
    if (index % 2 !== 0) {
      sumOdd += index;
      sumOddOperation += index + " + ";
    }

    index++;
  }

  sumOddOperation = sumOddOperation.slice(0, -2) + " = ";
  console.log("Suma total de numeros impares: \n" + sumOddOperation + sumOdd);
  console.groupEnd("Numeros del " + num + "-" + (num + 50) + " con while: ");
}

getOdd50(30);
*/



// - Resuelto con Do...While:
function getOdd50(num) {
  console.group("Numeros del " + num + "-" + (num + 50) + " con do...while: ");

  var sumOdd = 0;
  var sumOddOperation = "";
  let index = num;

  do {
    // Numeros pares
    if (index % 2 === 0) {
      console.log("%cNumero " + index, "padding: 0.1rem 0.5rem; background-color: #454545; color: #f3f3f3;");
    }

    // Numeros impares
    if (index % 2 !== 0) {
      sumOdd += index;
      sumOddOperation += index + " + ";
    }

    index++;
  } while (index <= (num + 50));

  sumOddOperation = sumOddOperation.slice(0, -2) + " = ";
  console.log("Suma total de numeros impares: \n" + sumOddOperation + sumOdd);
  console.groupEnd("Numeros del " + num + "-" + (num + 50) + " con do...while: ");
}

getOdd50(0);