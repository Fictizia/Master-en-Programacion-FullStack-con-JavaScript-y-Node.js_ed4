function bestSeller(url){
    fetch(url)
     .then(function(response){
         
        return response.json();

     })
     .then(function(data){
         //console.log(data.results);
         var lista = data.results;
         for (var i=0; i<lista.length; i++){
            //console.log(lista[i]);

            //creo las cajas que van almacenar la informacion
            var cajadiv = document.createElement("div"); 
            var titulo = document.createElement("h3");
            //var imagen = document.createElement("img");
            var fecha = document.createElement("p");
            var enlace = document.createElement("a");

            //las anclo todas a la caja div
            cajadiv.appendChild(titulo);
            //cajadiv.appendChild(imagen);
            cajadiv.appendChild(fecha);
            cajadiv.appendChild(enlace);
            document.getElementById("libros").appendChild(cajadiv); //anclo la cajadiv al html que tiene un div
            document.getElementsByTagName("H3")[i].innerHTML += "<br>"+[i+1]+". "+lista[i].list_name //+". "+objeto[i].title+" ( "+objeto[i].author+" )";
            //var direccion = objeto[i].book_image;
            //document.getElementsByTagName("IMG")[i].setAttribute("src",direccion);
            document.getElementsByTagName("P")[i].innerHTML += "Fecha de la publicación más antigua: " +lista[i].oldest_published_date + "<br>Fecha de la publicación más reciente: "+lista[i].newest_published_date +"<br>Frecuencia de actualización: "+lista[i].updated.toLowerCase();
            document.getElementsByTagName("A")[i].setAttribute("href","carpeta"+[i]+"/lista"+[i]+".html");
            document.getElementsByTagName("A")[i].innerHTML += "Ver lista completa";


         }

     })
     .catch(function(error){
         console.log(error)
     })
};

bestSeller("https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=BnMyyojAwmVyu3GpsmnWVpuNVBcl7sjt")