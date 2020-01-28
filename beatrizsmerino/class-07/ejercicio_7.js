// 7 - Nivel Avanzado ♦️ 
// Diseña un algoritmo introducido un number y pasarlo a número romanos.
// Esperamos que el número sea menor de 50


// - Usando for:
// - Usando while y break:
// - Usando Do...While:




// - Resuelto con for:
/*
function conversionRomana(numero) {

  var numeroOriginal = numero;

  if (numero <= 50 && numero > 0) {

    var numeroRomano = "";

    for (; numero > 0;) {

      if (numero === 50) {
        numeroRomano = "L";
        numero = 0;
      } else if (numero >= 40 && numero < 50) {
        numeroRomano += "XL";
        numero -= 40;
      } else if (numero >= 10 && numero < 40) {
        numeroRomano += "X";
        numero -= 10;
      } else if (numero === 9) {
        numeroRomano += "IX";
        numero -= 9;
      } else if (numero === 8) {
        numeroRomano += "VIII";
        numero -= 8;
      } else if (numero === 7) {
        numeroRomano += "VII";
        numero -= 7;
      } else if (numero === 6) {
        numeroRomano += "VI";
        numero -= 6;
      } else if (numero === 5) {
        numeroRomano += "V";
        numero -= 5;
      } else if (numero === 4) {
        numeroRomano += "IV";
        numero -= 4;
      } else if (numero <= 3 && numero > 0) {
        numeroRomano += "I";
        numero -= 1;
      }
    }

    console.info(numeroOriginal + " en números romanos es " + numeroRomano);
  } else {
    console.warn(numeroOriginal + "NO es un número valido (0-50)");
  }
}

conversionRomana(33);
*/



// - Resuelto con while:
/*
function conversionRomana(numero) {

  var numeroOriginal = numero;

  if (numero <= 50 && numero > 0) {

    var numeroRomano = "";

    while (numero > 0) {
      if (numero === 50) {
        numeroRomano = "L";
        numero = 0;
      } else if (numero >= 40 && numero < 50) {
        numeroRomano += "XL";
        numero -= 40;
      } else if (numero >= 10 && numero < 40) {
        numeroRomano += "X";
        numero -= 10;
      } else if (numero === 9) {
        numeroRomano += "IX";
        numero -= 9;
      } else if (numero === 8) {
        numeroRomano += "VIII";
        numero -= 8;
      } else if (numero === 7) {
        numeroRomano += "VII";
        numero -= 7;
      } else if (numero === 6) {
        numeroRomano += "VI";
        numero -= 6;
      } else if (numero === 5) {
        numeroRomano += "V";
        numero -= 5;
      } else if (numero === 4) {
        numeroRomano += "IV";
        numero -= 4;
      } else if (numero <= 3 && numero > 0) {
        numeroRomano += "I";
        numero -= 1;
      }
    }

    console.info(numeroOriginal + " en números romanos es " + numeroRomano);
  } else {
    console.warn(numeroOriginal + "NO es un número valido (0-50)");
  }
}

conversionRomana(23);
*/


// - Resuelto con Do...While:
function conversionRomana(numero) {

  var numeroOriginal = numero;

  if (numero <= 50 && numero > 0) {

    var numeroRomano = "";

    do {
      if (numero === 50) {
        numeroRomano = "L";
        numero = 0;
      } else if (numero >= 40 && numero < 50) {
        numeroRomano += "XL";
        numero -= 40;
      } else if (numero >= 10 && numero < 40) {
        numeroRomano += "X";
        numero -= 10;
      } else if (numero === 9) {
        numeroRomano += "IX";
        numero -= 9;
      } else if (numero === 8) {
        numeroRomano += "VIII";
        numero -= 8;
      } else if (numero === 7) {
        numeroRomano += "VII";
        numero -= 7;
      } else if (numero === 6) {
        numeroRomano += "VI";
        numero -= 6;
      } else if (numero === 5) {
        numeroRomano += "V";
        numero -= 5;
      } else if (numero === 4) {
        numeroRomano += "IV";
        numero -= 4;
      } else if (numero <= 3 && numero > 0) {
        numeroRomano += "I";
        numero -= 1;
      }
    } while (numero > 0);

    console.info(numeroOriginal + " en números romanos es " + numeroRomano);
  } else {
    console.warn(numeroOriginal + "NO es un número valido (0-50)");
  }
}

conversionRomana(50);