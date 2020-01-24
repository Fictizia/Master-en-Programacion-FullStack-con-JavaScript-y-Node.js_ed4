// 2 - Diseña un algoritmo para calcular el porcentaje de hombres y mujeres en nuestro curso.
// Trucos:
// Calcular porcentajes (segmento*100)/total


// https://programandoointentandolo.com/2013/04/como-saber-si-un-numero-es-decimal-o-entero-en-javascript.html
// https://www.ecma-international.org/ecma-262/5.1/#sec-9.2

// NaN -> no es un numero
// undefined -> valor indefinido
// "" -> valor vacio
// false -> valor falso
// 0 -> valor falso



function styles() {
	var body = document.getElementsByTagName("body")[0];
	body.style.margin = "2rem";
	body.style.fontFamily = "sans-serif";
	body.style.fontSize = "16px";

	var button = document.getElementById("btn");
	button.style.padding = "1rem 2rem";
	button.style.display = "inline-block";
	button.style.color = "#2c3e50";
	button.style.fontSize = "1.2rem";
	button.style.border = "3px solid #2c3e50";
	button.style.backgroundColor = "#ecf0f1";
	button.style.outline = "none";
	button.style.cursor = "pointer";

	var css = "#btn:hover{ color: #ecf0f1 !important; border: 3px solid #2c3e50 !important; background-color: #2c3e50 !important; }";
	var style = document.createElement('style');
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	document.getElementsByTagName('head')[0].appendChild(style);

	var result = document.getElementById("result");
	result.style.maxWidth = "300px";
	result.style.margin = "1rem 0";
	result.style.padding = "1rem 2rem";
	result.style.color = "#ecf0f1";
	result.style.fontSize = "1rem";
	result.style.display = "none";
	result.style.backgroundColor = "#16a085";
}


function validation(num) {

	/*
	  !isNaN(num) = si es diferente de un string osea true
	  hasta que sea insertado un numero terminará el ciclo o hasta que se escriba fin
	*/

	if (num == "undefined" || num == null || num == "") {
		console.log("Inserta un número.");
		return 0;
	} else {
		if (isNaN(num) && num !== "") {
			console.log("Ups... " + "'" + + num + "'" + " no es un número.");
			return 1;
		} else {
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




function ejercicio2() {
	while (true) {
		alert("Hola! Escribe el numero de mujeres y hombres que hay en el curso");
		var num1 = prompt("Numero de mujeres:");
		var num2 = prompt("Numero de hombres:");


		function result(num1, num2) {
			var result = document.getElementById("result");

			// Si pasa la validacion pinta el resultado
			var total = num1 + num2;
			var percentageOfWomen = (num1 * 100) / total;
			var percentageOfMen = (num2 * 100) / total;

			result.innerHTML += "<p><strong>Mujeres: </strong> " + num1 + "</p>";
			result.innerHTML += "<p><strong>Hombres: </strong> " + num2 + "</p>";

			result.innerHTML += "<p><strong>Porcentaje de  Mujeres: </strong> " + (percentageOfWomen.toFixed(2) * 1) + "% " + "<br>" + "(" + percentageOfWomen + ")" + "</p>";
			result.innerHTML += "<p><strong>Porcentaje de  Hombres: </strong> " + (percentageOfMen.toFixed(2) * 1) + "% " + "<br>" + "(" + percentageOfMen + ")" + "</p>";

			result.style.display = "block";

			// Si multiplicas por 1 se convierte el dato de tipo string en numero
			// console.log(typeof (percentageOfWomen.toFixed(2) * 1));
		}

		if (validation(num1) === 0 && validation(num2) === 0) {
			alert("Inserta 2 numeros");
			break;
		} else if (validation(num1) === 2 && validation(num2) === 2) {
			result(num1, num2);
			break;
		} else if (validation(num1) === 3 && validation(num2) === 3) {
			alert("¡Inserta un numero entero!");
			break;
		} else if (num1 == 'exit' || num2 == 'exit') {
			confirm("¿Quieres salir de la aplicacion?");
			break;
		} else if (validation(num1) === 1 && validation(num2) === 1) {
			alert("No es un numero!!");
			continue;
		}
	}
}


(function () {
	styles();

	document.getElementById('btn').addEventListener('click', function () {
		result.innerHTML = '';
		result.style.display = "none";

		ejercicio2();
	});
})();