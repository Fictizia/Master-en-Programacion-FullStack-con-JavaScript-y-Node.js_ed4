// 4 - Nivel Medio ♠️ Diseña un algoritmo que aplique al precio de un producto un descuento cuando se den las siguientes caracteristicas.

// Se aplica un 25% cuando:

// Estamos en los meses de invierno
// Y no es viernes o fin de semana.







// - Resuelto con if/else and while
function getNameMonth(month) {
  var nameMonth;

  if (month === 1) {
    nameMonth = "Enero";
  } else if (month === 2) {
    nameMonth = "Febrero";
  } else if (month === 3) {
    nameMonth = "Marzo";
  } else if (month === 4) {
    nameMonth = "Abril";
  } else if (month === 5) {
    nameMonth = "Mayo";
  } else if (month === 6) {
    nameMonth = "Junio";
  } else if (month === 7) {
    nameMonth = "Julio";
  } else if (month === 8) {
    nameMonth = "Agosto";
  } else if (month === 9) {
    nameMonth = "Septiembre";
  } else if (month === 10) {
    nameMonth = "Octubre";
  } else if (month === 11) {
    nameMonth = "Noviembre";
  } else if (month === 12) {
    nameMonth = "Diciembre";
  } else {
    nameMonth = "";
  }
  return nameMonth;
}

function getNameDay(day) {
  var nameDay;

  if (day === 1) {
    nameDay = "Lunes";
  } else if (day === 2) {
    nameDay = "Martes";
  } else if (day === 3) {
    nameDay = "Miércoles";
  } else if (day === 4) {
    nameDay = "Jueves";
  } else if (day === 5) {
    nameDay = "Viernes";
  } else if (day === 6) {
    nameDay = "Sábado";
  } else if (day === 7) {
    nameDay = "Domingo";
  } else {
    nameDay = "";
  }
  return nameDay;
}

function getVerifyNum(num) {
  if (num == "undefined" || num == null || num == "") {
    console.log("Inserta un número.");
    return 0;
  } else {
    if (isNaN(num) && num !== "") {
      console.log("Ups... " + "'" + + num + "'" + " no es un número.");
      return 1;
    } else {
      //if (num - Math.floor(num) == 0) {
      if (num % 1 == 0) {
        console.log("'" + num + "'" + " es un numero entero.");
        return 2;
      } else {
        console.log("'" + num + "'" + " es un numero decimal.");
        return 3;
      }
    }
  }
}

function getVerifyMonth(month) {
  if (getVerifyNum(month) === 2) {
    if (month >= 1 && month <= 12) {
      console.log(month + " es un numero de mes valido.");
      return true;
    } else {
      console.log(month + " no es un numero de mes valido.");
      return false;
    }
  } else {
    console.log(month + " no es un numero entero o es decimal o no es numero.");
    return false;
  }
}

function getVerifyWinter(month) {
  if (month <= 2 || month >= 11) {
    console.log("Estamos en el mes " + month + " " + "(" + getNameMonth(month) + ")" + ". " + "Es invierno.");
    return true;
  } else {
    console.log("Estamos en el mes " + month + " " + "(" + getNameMonth(month) + ")" + ". " + "No es invierno.");
    return false;
  }
}

function getVerifyDay(day) {
  if (getVerifyNum(day) === 2) {
    if (day >= 1 && day <= 7) {
      console.log(day + " es un numero de dia valido.");
      return true;
    } else {
      console.log(day + " es un numero de dia valido.");
      return false;
    }
  }
}

function getVerifyWeekend(day) {
  if (day === 6 || day === 7) {
    console.log("Estamos en el dia " + day + " " + "(" + getNameDay(day) + ")" + ". " + "Es finde semana.");
    return true;
  } else {
    console.log("Estamos en el dia " + day + " " + "(" + getNameDay(day) + ")" + ". " + "No es invierno.");
    return false;
  }
}

function getCalcPriceWithDiscount(discount, price) {
  if (getVerifyNum(price) === 2 || getVerifyNum(price) === 3) {
    var operation = (price - (price * discount) / 100).toFixed(2);
    return operation;
  } else {
    return false;
  }
}




function discount() {

  var initProcess = confirm("Descubre si tienes descuento!!");
  if (initProcess) {
    // Pedir el mes
    // Un prompt siempre devuelve un dato en string
    // var month = prompt("Introduce el mes (numeros del 1 al 12): ");
    // console.log(month);          // sxksjxnsjkxhsk   // 21
    // console.log(typeof month);   // string           // string

    // var month = parseFloat(prompt("Introduce el mes (numeros del 1 al 12): "));
    // console.log(month);             // sxksjxnsjkxhsk   // 21
    // console.log(typeof month);      // NaN  1           // number



    // Verificar si es un numero entero y Verificar si es un numero de mes valido (1-12)
    // (Si es resultado es 2 significa que es un numero y entero)
    var month = parseFloat(prompt("Introduce el mes (numeros del 1 al 12): "));
    var resultVerifyMonth = getVerifyMonth(month);
    console.log(resultVerifyMonth);

    while (!resultVerifyMonth) {
      alert("Debes introducir un numero entero entre 1 y 12");
      var month = parseFloat(prompt("Introduce el mes (numeros del 1 al 12): "));

      var resultVerifyMonth = getVerifyMonth(month);
      console.log(resultVerifyMonth);
    }

    // Nombre del mes
    var resultNameMonth = getNameMonth(month);
    console.log(resultNameMonth);
    alert("Es " + resultNameMonth);

    // Verificar si es invierno (1, 2, 11 o 12)
    var resultVerifyWinter = getVerifyWinter(month);

    if (resultVerifyWinter) {
      alert("Estamos en invierno y tienes un descuento.");

      // Pedir el dia de la semana
      var day = parseFloat(prompt("Introduce el dia (numeros del 1 al 7): "));

      // Verificar si es un numero entero y Verificar si es un numero de dia valido (1-7)
      var resultVerifyDay = getVerifyDay(day);

      while (!resultVerifyDay) {
        alert("Debes introducir un numero entero entre 1 y 7: ");
        var day = parseFloat(prompt("Introduce el dia (numeros del 1 al 7): "));

        var resultVerifyDay = getVerifyDay(day);
        console.log(resultVerifyDay);
      }

      // Nombre del dia
      var resultNameDay = getNameDay(day);
      console.log(resultNameDay);
      alert("Es " + resultNameDay);

      // Verificar si es finde semana
      var resultVerifyWeekend = getVerifyWeekend(day);
      if (resultVerifyWeekend) {
        alert("Es temporada de invierno y finde semana. Consigue tu descuento del 25% ya!");

        // Introduce el precio y Calcular descuento
        var price = parseFloat(prompt("Introduce el precio de tu producto: "));
        var discount = 25;
        var resultCalcPriceWithDiscount = getCalcPriceWithDiscount(discount, price);
        console.log(resultCalcPriceWithDiscount);

        while (!resultCalcPriceWithDiscount) {
          alert("Debes introducir un numero");
          var price = parseFloat(prompt("Introduce el precio de tu producto: "));

          var resultCalcPriceWithDiscount = getCalcPriceWithDiscount(discount, price);
          console.log(resultCalcPriceWithDiscount);
        }
        alert("Precio final con el descuento del " + discount + "%" + " es de " + resultCalcPriceWithDiscount + "€");
      } else {
        alert("Solo los fines de semana hay descuentos.");
      }

    } else {
      alert("No es temporada de invierno. No hay descuentos.");
    }
  }

}

discount();