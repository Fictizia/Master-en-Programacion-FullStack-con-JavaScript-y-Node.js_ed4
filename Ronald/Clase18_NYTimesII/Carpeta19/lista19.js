function bestSeller(url){
    fetch(url)
     .then(function(response){
         
        return response.json();

     })
     .then(function(data){
         
         var lista = data.results.books;
         for (var i=0; i<lista.length; i++){
            

            //creo las cajas que van almacenar la informacion
            var cajadiv = document.createElement("div"); 
            var titulo = document.createElement("h3");
            var imagen = document.createElement("img");
            var cantidad = document.createElement("p");
            var amazon = document.createElement("a");
            

            //las anclo todas a la caja div
            cajadiv.appendChild(titulo);
            cajadiv.appendChild(imagen);
            cajadiv.appendChild(cantidad);
            cajadiv.appendChild(amazon);
            
            document.getElementById("libros").appendChild(cajadiv); //anclo la cajadiv al html que tiene un div
            document.getElementsByTagName("H3")[i].innerHTML += "<br>"+lista[i].rank+". "+lista[i].title+" ( "+lista[i].author+" )";
            var direccion = lista[i].book_image;
            document.getElementsByTagName("IMG")[i].setAttribute("src",direccion);
            document.getElementsByTagName("P")[i].innerHTML += "Semanas en la lista de los best seller: " +lista[i].weeks_on_list + "<br>Descripción: "+lista[i].description;
            document.getElementsByTagName("A")[i].setAttribute("href", lista[i].amazon_product_url);
            document.getElementsByTagName("A")[i].innerHTML += "Comprarlo en Amazon";


         }

     })
     .catch(function(error){
         console.log(error)
     })
};

bestSeller("https://api.nytimes.com/svc/books/v3/lists/current/childrens-middle-grade-e-book.json?api-key=BnMyyojAwmVyu3GpsmnWVpuNVBcl7sjt")