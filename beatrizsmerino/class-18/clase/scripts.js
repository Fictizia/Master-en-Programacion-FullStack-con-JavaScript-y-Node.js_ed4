
// POSTMAN -> https://www.getpostman.com/downloads/
// JSON -> https://jsonplaceholder.typicode.com/guide.html

/*
function sendForm() {
    // alert("Se ha enviado");
    var user = document.getElementById("user");
    var pass = document.getElementById("pass");

    console.info("Bienvenido " + user);


    // POST
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://jsonplaceholder.typicode.com/posts');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status === 201) {
            let request = JSON.parse(xhr.responseText);
            console.log("respuesta:", request);

            let requestDom = document.getElementById("request");
            requestDom.innerHTML = "Titulo: " + request.title + ", password: " + request.body + ", id:" + request.userId + ", id remoto: " + request.id;
        }
    };


    // Datos que enviamos por post
    xhr.send(JSON.stringify({
        usuario: user,
        password: pass,
        userId: 1,
    }));

}

let button = document.querySelector("#button");
button.addEventListener("click", sendForm());



/////////////



var formData = new FormData();

formData.append("usuario", "Bea");
formData.append("id", 123456); // todo se convierte a String

// Contenido desde un <input type="file"> desde el HTML
formData.append("fichero1", fileInputElement.files[0]);

// Fichero creado al vuelo con JavaScript
var content = '<a id="a"><b id="b">hey!</b></a>'; // El contenido del nuevo fichero
var blob = new Blob([content], { type: "text/xml" });

formData.append("otro_fichero", blob);

var request = new XMLHttpRequest();
request.open("POST", "http://jsonplaceholder.typicode.com/post");
request.send(formData);

document.getElementById("request");
*/

///////////////


function loadXML(url) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var data = request.reponseXML;
			var discos = data.getElementsByTagName("CD");

			console.log(discos[0].getElementsByTagName("TITLE")[0].innerHTML);

			for (var i = 0; i < discos.length; i++) {
				var disco = discos[i];
				console.log("---------------------")
				console.log("Título:", directParser(disco, "TITLE"))
				console.log("Artista:", directParser(disco, "ARTIST"))
				console.log("Año:", directParser(disco, "YEAR"))
			}
		}
	};
	request.open("GET", url, true);
	request.send();
}

function directParser(item, property) {
	return item.getElementsByTagName(property)[0].childNodes[0].nodeValue;
}

loadXML("https://www.w3schools.com/xml/cd_catalog.xml");
