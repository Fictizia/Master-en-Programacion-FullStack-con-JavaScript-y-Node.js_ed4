document.getElementById("boton").addEventListener("click", function () {
    peticionAjax("http://hp-api.herokuapp.com/api/characters");
});

function peticionAjax(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {

        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
    
            var respuesta = JSON.parse(xmlHttp.responseText);
            createGallery(respuesta);
            
    
        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
            console.error("ERROR! 404");
            console.info(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function createGallery(respuesta) {
    for (var i = 0; i < respuesta.length; i++) {
        console.log("esto es ", respuesta);
        var imageObj = respuesta[i];

        createDatos(imageObj.image, imageObj.name, imageObj.actor);
        
        
    }
}

function createDatos(url, name, actor) {
    var article = document.createElement("article");
    var img = document.createElement("img");
    var h1 = document.createElement("h1");
    var h2 = document.createElement("h2");

    // atributos img
    img.setAttribute("src", url);
    img.setAttribute("width", 350);
    img.setAttribute("height", 350);

    article.appendChild(img);
    article.appendChild(h1);
    article.appendChild(h2);

    document.getElementById("galeria").appendChild(article);
    h1.innerText = name;
    h2.innerText = actor;
}










///////////////////////// pruebas
// function createImage(url) {
//     var card = '';
//     card += '<div class="card">';
//     card += '<img src="' + url + '" width="300" height="300"></img> ';
//     card += '</div> ';
//     document.getElementById("galeria").innerHTML += card;
// }

// function createParrafo(name, gender) {
//     var article = document.createElement("article");
//     var h1 = document.createElement("h1");
//     var h2 = document.createElement("h2");
//     article.appendChild(h1);
//     article.appendChild(h2);
//     h1.innerHTML = "Nombre: " + name;
//     h2.innerHTML = "Genero: " + gender;
// }