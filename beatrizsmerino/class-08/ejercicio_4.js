// 4 - ¿Que fecha será dentro de 30 días ?


var nowDate = new Date();
var days = 30;

function sumDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

alert("La fecha de hoy es: \n" + nowDate.toDateString() + "\n\n" + "La fecha dentro de " + days + " dias es de: \n" + sumDays(nowDate, days).toDateString());