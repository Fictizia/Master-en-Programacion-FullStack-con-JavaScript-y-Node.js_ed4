// 3 - Nivel Medio ♠️ Diseña un script que confirme si una fecha es valida
// y además devuelva la fecha en dos formatos diferentes.

//   Características:
// El usuario introduce tres números(día, mes, año) usando una función.
// Validar la fecha.En caso de error incluir un mensaje informativo.
// Después de validar, devolvemos la fecha en formato DD / MM / AAAA
// Convertimos el número del mes, en el nombre del mes real y devolvemos la fecha en el siguiente formato(DD de MES de AAAA)




function getDate(day, month, year) {
    var day;
    var month;
    var year;

    function validateNum(num) {
        if (isNaN(num) || num === "undefined" || num === null || num === "") {
            console.log(num + " no es un numero");
            return false;
        } else {
            console.log(num + " es un numero");
            return true;
        }
    }

    function validateDay(day) {
        if (validateNum(day)) {
            if (day >= 1 && day <= 31) {
                console.log("Dia " + day + ". " + "Numero de dia valido.");
                return true;
            } else {
                console.log("Dia " + day + ". " + "Numero de dia invalido. El numero del dia debe ser entre 1-31");
                return false;
            }
        }
    }

    function validateDayAndMonth(day, month) {
        var validMaxDay;

        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                validMaxDay = 31;
                break;
            case 2:
                validMaxDay = 29;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                validMaxDay = 30;
                break;
            default:
                break;
        }

        if (day > validMaxDay) {
            console.log("Dia " + day + ". " + "Numero de dia invalido. El mes de " + month + "no tiene dia " + day + ".");
            return false;
        } else {
            console.log("Dia " + day + ". " + "Numero de dia valido segun el mes " + month + ".");
            return true;
        }
    }

    function validateMonth(month) {
        if (validateNum(month)) {
            if (month >= 1 && month <= 12) {
                console.log("Mes " + day + ". " + "Numero de mes valido.");
                return true;
            } else {
                console.log("Mes " + day + ". " + "El numero del mes debe ser entre 1-12.");
                return false;
            }
        }
    }

    function validateYear(year) {
        if (validateNum(year)) {
            var yearToString = year.toString();
            var yearNumCharacters = yearToString.length;
            console.log("Numero de caracteres del año: " + yearNumCharacters);
            if (yearNumCharacters === 4) {
                console.log("Numero de año valido");
                return true;
            } else {
                console.log("El año debe estar compuesto por 4 cifras");
                return false;
            }
        }
    }

    function getNameMonth(month) {
        var nameMonth;
        switch (month) {
            case 1:
                nameMonth = "Enero";
                break;
            case 2:
                nameMonth = "Febrero";
                break;
            case 3:
                nameMonth = "Marzo";
                break;
            case 4:
                nameMonth = "Abril";
                break;
            case 5:
                nameMonth = "Mayo";
                break;
            case 6:
                nameMonth = "Junio";
                break;
            case 7:
                nameMonth = "Julio";
                break;
            case 8:
                nameMonth = "Agosto";
                break;
            case 9:
                nameMonth = "Septiembre";
                break;
            case 10:
                nameMonth = "Octubre";
                break;
            case 11:
                nameMonth = "Noviembre";
                break;
            case 12:
                nameMonth = "Diciembre";
                break;
            default:
                return false;
                break;
        }
        console.log("Es " + nameMonth);
        return nameMonth;
    }


    function formattingDate(day, month, year) {
        var formatedDate = "DD/MM/YYYY";

        var dayToString = day.toString();
        var dayNumCharacters = dayToString.length;
        var dayFormatted = "0" + day;

        var monthToString = month.toString();
        var monthNumCharacters = monthToString.length;
        var monthFormatted = "0" + month;

        if (dayNumCharacters == 1 && monthNumCharacters == 1) {
            formatedDate = dayFormatted + "/" + monthFormatted + "/" + year;
        } else if (dayNumCharacters == 1 || monthNumCharacters == 1) {
            if (dayNumCharacters == 1) {
                formatedDate = dayFormatted + "/" + month + "/" + year;
            } else if (monthNumCharacters == 1) {
                formatedDate = day + "/" + monthFormatted + "/" + year;
            }
        } else {
            formatedDate = day + "/" + month + "/" + year;
        }

        return formatedDate;
    }


    if (!validateDay(day) || !validateMonth(month) || !validateDayAndMonth(day, month) || !validateYear(year)) {
        alert("Error! los datos no son correctos!");
    } else {
        alert(formattingDate(day, month, year));
        alert(day + " de " + getNameMonth(month) + " " + year);
    }
}


var day = parseInt(prompt("Introduce el dia: "));
var month = parseInt(prompt("Introduce el mes: "));
var year = parseInt(prompt("Introduce el año: "));

getDate(day, month, year);