function bestSeller(url){
    fetch(url)
     .then(function(response){
         
        return response.json();

     })
     .then(function(data){
         var lista = data.results;
         for (var i=0; i<lista.length; i++){
            var cajadiv = document.createElement("div"); 
            var titulo = document.createElement("h3");
            var fecha = document.createElement("p");
            var enlace = document.createElement("a");
            cajadiv.appendChild(titulo);
            cajadiv.appendChild(fecha);
            cajadiv.appendChild(enlace);
            document.getElementById("libros").appendChild(cajadiv);
            document.getElementsByTagName("H3")[i].innerHTML += "<br>"+[i+1]+". "+lista[i].list_name 
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