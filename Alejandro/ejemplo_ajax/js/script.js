// Crear la imagen sin SRC
var foto = document.createElement("img");
foto.setAttribute("width",200);
foto.setAttribute("height",200);
foto.style.display = "none";
document.getElementById("resultado").appendChild(foto);


/**
 *  Metodo para devolver datos del polen a raíz de una URL
 *  @param {string} url La url para hacer la peticion AJAX 2
 */
function peticionAjax(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var url = JSON.parse(xmlHttp.responseText)[0].url;
            console.info(url);
            //Mostrar la imagen en el DOM
            // Codigo aqui....
            var imagen = document.querySelector("img");
            imagen.setAttribute("src",url);
            imagen.style.display = "block";


        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
            console.error("ERROR! 404");
            console.info(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

document.getElementById("boton1").addEventListener("click",function(){
    peticionAjax("https://api.thecatapi.com/v1/images/search")
});
