document.getElementById("cargarlibros").addEventListener("click",function(){
    librosNYT("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=BnMyyojAwmVyu3GpsmnWVpuNVBcl7sjt")
});

function librosNYT(url){
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        var objeto = JSON.parse(xmlHttp.responseText).results.books;
       
        for (var i=0; i<objeto.length; i++){
            console.info(objeto);
            //creo las cajas que van almacenar la info
            var cajadiv = document.createElement("div"); 
            var titulo = document.createElement("h3");
            var imagen = document.createElement("img");
            var cantidad = document.createElement("p");
            var amazon = document.createElement("a");
            
            //las aclo total a la cajadiv 
            cajadiv.appendChild(titulo);
            cajadiv.appendChild(imagen);
            cajadiv.appendChild(cantidad);
            cajadiv.appendChild(amazon);
            document.getElementById("caja"+i).appendChild(cajadiv); //anclo la cajadiv al html que tiene un div
            document.getElementsByTagName("H3")[i].innerHTML += "<br>"+objeto[i].rank+". "+objeto[i].title+" ( "+objeto[i].author+" )";
            var direccion = objeto[i].book_image;
            document.getElementsByTagName("IMG")[i].setAttribute("src",direccion);
            document.getElementsByTagName("P")[i].innerHTML += "<b>Weeks on the best seller list:</b> " +objeto[i].weeks_on_list + "<br><b>Description:</b> "+objeto[i].description; 
            document.getElementsByTagName("A")[i].setAttribute("href",objeto[i].amazon_product_url);
            document.getElementsByTagName("A")[i].innerHTML = "Comprarlo en Amazon";

        }

        

    } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
        console.error("Error! 404");
        console.info(JSON.parse(xmlHttp.responseText));

        
    }
};
xmlHttp.open("GET", url, true);
xmlHttp.send();

}