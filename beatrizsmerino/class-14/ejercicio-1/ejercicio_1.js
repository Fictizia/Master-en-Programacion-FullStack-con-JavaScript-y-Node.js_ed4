// Ejercicios
// 1 - Realiza una pagina web que muestre la cuenta atrás para terminar el master en días, horas, minutos y segundos.

// Objetivos Adicionales:
// Además debería de seguir actualizando la cuenta atrás de manera dinámica.
// Los datos horarios siempre deben mostrarse con dos dígitos, añadiendo un cero a la izquierda cuando sea necesario.

var counterTimer = document.getElementById("counterTime");

// Format: month/day/year hour:minutes 
var startMaster = new Date('09/02/2019 4:00 PM');
var finishMaster = new Date('05/29/2020 7:00 PM');

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining(box, end) {
	// Current date:
	var now = new Date();
	var distance = end - now;

	// If finish the counter:
	if (distance < 0) {
		clearInterval(timer);
		box.innerHTML = 'EXPIRED!';
		return;
	}

	// Insert the counter time:
	var days = Math.floor(distance / _day);
	var hours = Math.floor((distance % _day) / _hour);
	var minutes = Math.floor((distance % _hour) / _minute);
	var seconds = Math.floor((distance % _minute) / _second);

	box.innerHTML = days + ' dias, ';
	box.innerHTML += hours + ' horas, ';
	box.innerHTML += minutes + ' minutos y ';
	box.innerHTML += seconds + ' segundos';
}

timer = setInterval(function () {
	showRemaining(counterTimer, finishMaster);
}, 1000);
