function ajaxHarry(url, cb) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var respuesta = data;
            createGallery(respuesta);
        })
        .catch(function (error) {
            console.log(error)
        });
}

document.getElementById("boton").addEventListener("click", function () {
    ajaxHarry("http://hp-api.herokuapp.com/api/characters");
});


///Creando galeria
function createGallery(respuesta) {
    document.getElementById("galeria").innerHTML = "";
    for (var i = 0; i < respuesta.length; i++) {
        var imageObj = respuesta[i];
        crearDatos(imageObj.image, imageObj.name, imageObj.actor);
    }    
}
/// Datos para manipular y crear galeria con etiquetas html
function crearDatos(url, name, actor) {
    var article = document.createElement("article");
    var img = document.createElement("img");
    var h1 = document.createElement("h1");
    var h2 = document.createElement("h2");

    // atributos img
    img.setAttribute("src", url);
    img.setAttribute("width", 350);
    img.setAttribute("height", 350);

    // article.setAttribute("class", "animacion");

    article.appendChild(img);
    article.appendChild(h1);
    article.appendChild(h2);

    document.getElementById("galeria").appendChild(article);
    h1.innerText = name;
    h2.innerText = actor;
    document.getElementById("boton").innerText = "Refrescame";
}