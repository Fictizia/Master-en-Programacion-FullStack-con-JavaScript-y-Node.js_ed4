/**
 * Método para devolver datos de suma
 * @param {string} n1 Primer dato
 * @param {string} n2 Segundo dato
 * @returns {string} Devuelve la unión de las dos cadenas
*/
function suma(n1, n2){
   return n1+" "+n2;

}



/**
 * Método para devolver datos de los libros
 * @param {string} url Url para hacer petición AJAX
*/
function peticionAjax(url) {

    fetch(url)
    .then(res => res.json())
    .then(info => {

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "titulo");
        titulo.innerHTML= info.results.list_name;
        document.body.appendChild(titulo); 
        
        var cajas = document.createElement("div");
            cajas.setAttribute("id", "bigcontent");
            document.body.appendChild(cajas);

        var libros = info.results.books;

        for ( var x = 0; x < libros.length; x++){
             
            var bookContent = document.createElement("div");
            bookContent.setAttribute("class", "books");
            cajas.appendChild(bookContent);

            var title = document.createElement("h2");
            title.innerHTML ="#"+ libros[x].rank +" "+ libros[x].title;
            bookContent.appendChild(title);
            
            var portada = document.createElement("img");
            portada.setAttribute("src", libros[x].book_image);
            bookContent.appendChild(portada);

            var semanas = document.createElement("h4");
            semanas.innerHTML="Weeks on list: "+ libros[x].weeks_on_list ;
            bookContent.appendChild(semanas);

            var descripcion = document.createElement("p");
            descripcion.innerHTML=libros[x].description ;
            bookContent.appendChild(descripcion);

        console.log(libros[x].title);

        }

    })


   .catch(error => console.log("error"))


}


peticionAjax("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Y0evpbdIHtoIIMY2kHt2hKVJQUiirzy6")






