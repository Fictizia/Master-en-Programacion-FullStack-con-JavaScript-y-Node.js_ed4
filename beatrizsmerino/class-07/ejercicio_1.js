// Realiza los siguientes ejercicios usando en cada uno los tres tipos de bucles (Do...While, For, While )

// 1 - Nivel Medio ♠️ Diseña un algoritmo para identificar a los clientes autorizados a entrar a nuestro sistema.

// Características:

// La palabra clave es "Fictizia mola mucho"
// Solo existen tres intentos
// Si se pasan los tres intentos. Se despliega un mensaje informativo.

// - Usando for:
// - Usando while y break:
// - Usando Do...While:



// - Resuelto con for:
/*
function access() {
  var key = "Fictizia mola mucho";
  var maxTries = 3;
  var counter = 0;

  for (var i = 0; i < maxTries; i++) {

    var getKey = prompt("Introduce la contraseña: ");

    if (getKey === key) {
      alert("Puedes entrar");
      break;
    } else {
      ++counter;

      if (maxTries === counter) {
        alert("Has superado el numero de intentos, vuelve mas tarde");
      } else {
        alert("Te quedan " + (maxTries - counter) + " intentos");
      }
    }

    console.group("Intento " + i);
    console.log(getKey);
    console.log(counter);
    console.groupEnd("Intento " + i);
  }
}
access();
*/



// - Usando while y break:
/*
function access() {
  var key = "Fictizia mola mucho";
  var maxTries = 3;
  var counter = maxTries;

  while (counter !== 0) {
    var getKey = prompt("Introduce la contraseña: ");
    --counter;

    if (getKey === key) {
      alert("Puedes entrar");
      break;
    } else {
      if (counter === 0) {
        alert("Has superado el numero de intentos, vuelve mas tarde");
        break;
      } else {
        alert("Contraseña incorrecta.");
        alert("Te quedan " + (counter) + " intentos");
      }
    }

    console.group("Intento " + counter);
    console.log(getKey);
    console.log(counter);
    console.groupEnd("Intento " + counter);
  }
}

access();
*/



// - Usando do...while :
function access() {
  var key = "Fictizia mola mucho";
  var maxTries = 3;
  var counter = maxTries;

  do {
    var getKey = prompt("Introduce la contraseña: ");

    --counter;

    if (getKey === key) {
      alert("Puedes entrar");
      break;
    } else {
      if (counter === 0) {
        alert("Has superado el numero de intentos, vuelve mas tarde");
        break;
      } else {
        alert("Contraseña incorrecta.");
        alert("Te quedan " + (counter) + " intentos");
      }
    }

  } while (counter !== 0);
}

access();