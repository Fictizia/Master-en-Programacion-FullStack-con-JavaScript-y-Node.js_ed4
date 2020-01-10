cargaDatos();


function cargaDatos() {
    camarasDGT(camaras);
    ajaxMadridContaminacion("http://airemad.com/api/v1/pollution");
    ajaxMadridTiempo("http://airemad.com/api/v1/weather");

}

/// CÓDIGO CONTAMINACIÓN ///

function ajaxMadridContaminacion(url) {
    fetch(url)
        .then(response => response.json())
        .then(function (data) {

            console.log("fecth", data);
            createList(data);
        })
        .catch(function (error) {
            console.log(error)
        });
}


// Creamos la lista de datos
function createList(data) {
    const normalizedData = normalizeData(data);
    paintData(normalizedData);

}

//sacamos los datos de la peticion de la api
function normalizeData(data) {
    const arrayDistrict = [];

    for (var elemento in data) {
        let district = getDistrict(data[elemento]);
        arrayDistrict.push(district);
        console.log("esto es mi json", district);
    }
    console.log("esto es mi json en normalizeData", arrayDistrict);
    return arrayDistrict;
}

// creamos nuestro array de json y introducimos los datos
function getDistrict(dataDistrict) {

    // este es mi nuevo json para pintar
    const newDistrict = {
        nombre: dataDistrict.name,
        url: "",
        pollutionArray: []
    };

    console.log("json de la api: ", dataDistrict); //json de la api

    for (let element in dataDistrict) {
        if (typeof dataDistrict[element] === "object") {
            newDistrict.pollutionArray.push({
                name: dataDistrict[element].parameter,
                abrv: dataDistrict[element].abrebiation,
                lastValue: getLastValue(dataDistrict[element].values),
                tecnica: dataDistrict[element].technique
            })
        }
    }
    console.log("Nuevo objeto en getDistrict: ", newDistrict);
    return newDistrict; // me faltaba este return para que me me saliera ese nuevo json

}

// guardamos el ultimo dato en estado pendiente
function getLastValue(valorArray) {

    var valoR;

    for (let i = 0; i < valorArray.length; i++) {
        let valueEstado = valorArray[i]
        if (valueEstado.estado === "Pasado") {
            // console.log("ultimo ", valueEstado.valor);
            valoR = valueEstado.valor;
        }
    }
    console.log("ultimo valor", valoR);
    return valoR;
}

// ahora pintamos los datos
function paintData(normalizeData) {
    console.log("estoy en paintdata", normalizeData);

    document.getElementById("datos").innerHTML = ""; //Asi no me lo pinta otra vez

    for (var i = 0; normalizeData.length; i++) {
        console.log("estoy en el bucle paintdata", normalizeData[i]);

        var polucion = normalizeData[i];
        console.log("datos que quiero para pintar polucion", polucion.pollutionArray[0]);
        var datos = polucion.pollutionArray[0];

        crearDatos(polucion.nombre, datos.name, datos.abrv, datos.lastValue, datos.tecnica);

    }
}

function crearDatos(nombre, name, abrv, lastValue, tecnica) {
    var article = document.createElement("article");
    var h2 = document.createElement("h2");
    article.appendChild(h2);
    document.getElementById("datos").appendChild(article);
    h2.innerText = "- " + nombre + ":  " + name + ": " + "(" + abrv + "): " + lastValue + " ug/m3 " + " medido por " + tecnica;


}

///// CÁMARAS DE LA DGT /////

var camaras = ["06303", "06304", "06305", "06306", "06308", "09303", "07306", "09307", "01313", "09301", "01314", "06301", "07302", "05308", "05304", "05306", "04312", "01320", "01301", "04305", "04307", "04306", "03303", "02304", "01306", "01305", "01304", "01302", "01317", "01318", "07308", "01321", "04310", "07301", "07305", "07307", "04308", "01303", "10302", "11307", "04302", "04303", "11304", "03306", "03307", "20308", "01308", "01309", "01310", "01311", "08317", "02308", "09309", "09310", "10309", "15302", "15301", "08309", "17301", "08313", "16308", "10307", "13305", "14303", "18303", "08316", "08315", "15305", "01307", "03301", "11302", "13301", "09302", "13304", "18301", "04304", "02310", "11310", "01312", "04309", "15304", "04311", "07303", "02305", "09304", "09305", "10305", "11309", "05303", "13302", "08310", "08311", "08303", "06309", "06310", "08312", "15303", "05307", "09306", "03302", "12302", "08318", "16306", "08308", "16301", "20306", "20307", "16305", "16304", "16303", "08307", "08306", "08305", "06302", "04313", "06307", "02303", "02306", "14302", "14301", "16302", "13303", "10306", "03304", "05305", "08301", "09311", "08314", "20302", "07304", "04314", "04315", "15307", "06311", "20303", "20304", "20305", "20301", "02301", "02302", "12301", "11303", "12309", "12304", "12307", "12306", "12305", "12303", "12308", "01316", "01315", "21301", "05309", "10308", "05301", "05302", "03305", "04301", "15306", "08302", "08304", "11301", "18304", "16307", "01323", "01322", "04316", "20309", "01331", "01332", "01319", "01330", "14304", "07309", "10304", "09312", "13306", "01324", "11305", "02307", "18305", "20311", "20310", "05311", "05312", "18306", "05310", "21302", "17302", "20313", "11306", "15308", "08319", "13307", "02311", "16309", "14305", "18302", "04317", "08320", "09313", "08321", "15310", "16310", "15309", "01333", "15311", "09314", "11311", "04318", "19301", "03308", "10310", "11312", "19302", "11313", "17303", "15312", "13308", "15313", "16311", "06312", "04319", "05314", "08322", "10311", "12310", "01334", "05315", "02309", "08323", "14306", "08324", "11314", "08325", "09315", "10312", "13310", "01335", "03309", "04320", "04321", "04322", "05316", "06313", "07310", "08326", "08327", "08328", "08329", "08330", "09316", "09317", "09318", "10313", "11315", "11316", "11317", "13311", "13312", "13313", "13314", "14307", "14308", "15314", "15315", "16312", "16313", "16314", "17304", "18307", "21303", "19303"];

function camarasDGT(camaras) {

    var camaras = ["06303", "06304", "06305", "06306", "06308", "09303", "07306", "09307", "01313", "09301", "01314", "06301", "07302", "05308", "05304", "05306", "04312", "01320", "01301", "04305", "04307", "04306", "03303", "02304", "01306", "01305", "01304", "01302", "01317", "01318", "07308", "01321", "04310", "07301", "07305", "07307", "04308", "01303", "10302", "11307", "04302", "04303", "11304", "03306", "03307", "20308", "01308", "01309", "01310", "01311", "08317", "02308", "09309", "09310", "10309", "15302", "15301", "08309", "17301", "08313", "16308", "10307", "13305", "14303", "18303", "08316", "08315", "15305", "01307", "03301", "11302", "13301", "09302", "13304", "18301", "04304", "02310", "11310", "01312", "04309", "15304", "04311", "07303", "02305", "09304", "09305", "10305", "11309", "05303", "13302", "08310", "08311", "08303", "06309", "06310", "08312", "15303", "05307", "09306", "03302", "12302", "08318", "16306", "08308", "16301", "20306", "20307", "16305", "16304", "16303", "08307", "08306", "08305", "06302", "04313", "06307", "02303", "02306", "14302", "14301", "16302", "13303", "10306", "03304", "05305", "08301", "09311", "08314", "20302", "07304", "04314", "04315", "15307", "06311", "20303", "20304", "20305", "20301", "02301", "02302", "12301", "11303", "12309", "12304", "12307", "12306", "12305", "12303", "12308", "01316", "01315", "21301", "05309", "10308", "05301", "05302", "03305", "04301", "15306", "08302", "08304", "11301", "18304", "16307", "01323", "01322", "04316", "20309", "01331", "01332", "01319", "01330", "14304", "07309", "10304", "09312", "13306", "01324", "11305", "02307", "18305", "20311", "20310", "05311", "05312", "18306", "05310", "21302", "17302", "20313", "11306", "15308", "08319", "13307", "02311", "16309", "14305", "18302", "04317", "08320", "09313", "08321", "15310", "16310", "15309", "01333", "15311", "09314", "11311", "04318", "19301", "03308", "10310", "11312", "19302", "11313", "17303", "15312", "13308", "15313", "16311", "06312", "04319", "05314", "08322", "10311", "12310", "01334", "05315", "02309", "08323", "14306", "08324", "11314", "08325", "09315", "10312", "13310", "01335", "03309", "04320", "04321", "04322", "05316", "06313", "07310", "08326", "08327", "08328", "08329", "08330", "09316", "09317", "09318", "10313", "11315", "11316", "11317", "13311", "13312", "13313", "13314", "14307", "14308", "15314", "15315", "16312", "16313", "16314", "17304", "18307", "21303", "19303"];

    // web donde vemos las img: https://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=8803c23866b93410VgnVCM1000000b205a0aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default
    var camara = camaras[Math.floor(Math.random() * camaras.length)];
    console.log("camaras", camara);
    var url = "http://informo.munimadrid.es/cameras/Camara" + camara + ".jpg";
    var img = document.createElement("img");
    img.setAttribute("src", url);
    img.setAttribute("width", 600);
    img.setAttribute("height", 400);
    document.getElementById("camara").appendChild(img);
}


//// CÓDIGO PARA EL TIEMPO /////

function ajaxMadridTiempo(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (date) {

            console.log("fecth", date);
            TiempoDeHoy(date);
            tiempoFuturo(date);

        })
        .catch(function (error) {
            console.log(error)
        });
}

function TiempoDeHoy(date) {

    console.log("datetiempodehoy", date);

    for (var i = 0; i < date.length; i += 36) {
        console.log("bucle tiempo", date[i]);
        const tiempo = date[i];


        const tiempoFinal = tiempo.list[0].main;
        const vientoFinal = tiempo.list[0].wind;
        const descripcion = tiempo.list[0].weather[0];
        const img = tiempo.list[0].weather[0].id;

        console.log("imagen", img);
        console.log("bucle tiempo2", tiempoFinal);
        console.log("mi viento", vientoFinal);

        crearDatosTiempo(tiempoFinal.temp, tiempoFinal.temp_min, tiempoFinal.temp_max, tiempoFinal.humidity, tiempoFinal.pressure, vientoFinal.speed, descripcion.description);

    }

}

function crearDatosTiempo(temp, temp_min, temp_max, humidity, pressure, speed, description) {
    var article = document.createElement("article");
    var h2 = document.createElement("h2");
    article.appendChild(h2);
    document.getElementById("tiempo").appendChild(article);
    h2.innerText = "TIEMPO ACTUAL: " + description + ", " + " Temperatura actual: " + temp + " t min: " + temp_min + " t max: " + temp_max + " " + " Humedad: " + humidity + "% " + " presion: " + pressure + " psi " + "Viento: " + speed + "km/h ";


}


function tiempoFuturo(date) {
    console.log("hola hola ", date);
    for (var i = 8; i < date.length; i += 4) {

        const nextTiempo = date[i];
        const tiempoFinal = nextTiempo.list[i].main;
        const vientoFinal = nextTiempo.list[i].wind;
        const descripcion = nextTiempo.list[i].weather[0];
        const dia = nextTiempo.list[i];

        crearDatosTiempo2(tiempoFinal.temp, tiempoFinal.temp_min, tiempoFinal.temp_max, tiempoFinal.humidity, tiempoFinal.pressure, vientoFinal.speed, descripcion.description, dia.dt_txt);


    }
}

function crearDatosTiempo2(temp, temp_min, temp_max, humidity, pressure, speed, description, dt_txt) {

    var article = document.createElement("article");
    var h2 = document.createElement("h2");
    article.appendChild(h2);
    document.getElementById("tiempo2").appendChild(article);
    h2.innerText = "PROXIMOS DIAS: " + dt_txt + " Descripcion: " + description + " temperatura actual: " + temp + " t min: " + temp_min + " t max: " + temp_max + " " + " Humedad: " + humidity + "% " + " presion: " + pressure + " psi " + "Viento: " + speed + "km/h ";

}