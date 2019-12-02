//Proyecto: nº1.  API => Pokeapi//
//--Miguel Martín-Maestro López--//


//Delay de la pantalla de menú para no pisar la animación.
setTimeout(function(){document.getElementById("pantallaInicio").style.display = "none"},4200);


//LLAMADAS AJAX
//************ */
//Llamada para guardar los datos principales en una array.
    var lista;

    function firstFetch(url){
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log("Primer fetch/Lista de pokemons y sus url:")
            console.log(data.results);
            lista = data.results;
        })
        .catch(function(error){
            console.log("Error");
        })        
    };
    firstFetch("https://pokeapi.co/api/v2/pokemon/?limit=151");


//Llamada para obtener pokemon atleatorio de la primera generacion (del 1 al 151).
//Cambiar "num" y "?limit=151" para mas resultados.
    function pokeFetch(){

        var num = Math.floor(Math.random()*(151 - 0) + 0);
        console.log("Numero random:" + num + " ID: " + (num+1));
        var pokeUrl = lista[num].url
        
        fetch(pokeUrl)        
        .then(function(response){
            return response.json();        
        })
        .then(function(data){
            console.log(data);
            console.log("Nombre: " + data.name.toUpperCase());
            console.log("ID: Nº." + data.id);
            document.getElementById("nombre").innerText = "Name: " + "\n" + data.name.toUpperCase() + "\n" + "ID: Nº." + data.id;
            

            var img = document.getElementById("pokemonImg");
            var imgUrl = data.sprites.front_default;
            img.src = imgUrl;
        
            
            var hp = "Hp: " + data.stats[5].base_stat + "/" + data.stats[5].base_stat ;
            var attack = "Attack: " + data.stats[4].base_stat;
            var defense = "Defense: " + data.stats[3].base_stat;
            var sAttack = "Special-attack: " + data.stats[2].base_stat;
            var sDefense = "Special-defense: " + data.stats[1].base_stat;
            var speed = "Speed: " + data.stats[0].base_stat;
            console.log(hp + "\n" + attack + "\n" + defense + "\n" + sAttack + "\n" + sDefense + "\n" + speed);
            document.getElementById("stats").innerText = hp + "\n" + attack + "\n" + defense + "\n" + speed + "\n" + sAttack + "\n" + sDefense ;
            
            document.getElementById("type").innerText = ""; 
            var types = data.types;
            for(i = 0; i < types.length; i++){
                console.log("Tipo: " + types[i].type.name);
                document.getElementById("type").innerText += "Type: " + types[i].type.name.toUpperCase()  + "\n" ;
            }
        })
    };


//LLamada buscando pokemon por nombre o ID.
//El id siempre tiene que tener un "#" delante.
    function search(nombre){

        fetch(urlSearch)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log("Nombre: " + data.name.toUpperCase());
            console.log("ID: Nº." + data.id);
            document.getElementById("nombre").innerText = "Name: " + "\n" + data.name.toUpperCase() + "\n" + "ID: Nº." + data.id;

            var img = document.getElementById("pokemonImg");
            var imgUrl = data.sprites.front_default;
            img.src = imgUrl;            
            
            var hp = "Hp: " + data.stats[5].base_stat + "/" + data.stats[5].base_stat ;
            var attack = "Attack: " + data.stats[4].base_stat;
            var defense = "Defense: " + data.stats[3].base_stat;
            var sAttack = "Special-attack: " + data.stats[2].base_stat;
            var sDefense = "Special-defense: " + data.stats[1].base_stat;
            var speed = "Speed: " + data.stats[0].base_stat;
            document.getElementById("stats").innerText = hp + "\n" + attack + "\n" + defense + "\n" + sAttack + "\n" + sDefense + "\n" + speed;

            document.getElementById("type").innerText = ""; 
            var types = data.types;
            for(i = 0; i < types.length; i++){
                console.log("Tipo: " + types[i].type.name);
                document.getElementById("type").innerText += "Type: " + types[i].type.name.toUpperCase() + "\n" ;
            }
        })
    };


//Llamada para obtener los datos de las pokeballs.
//Varias llamadas metidas en una llamada, esta limitado a una lista de 4 pokeballs.
    function fetchPokeballs(url){

        console.log("Fetch a pokeballs");

        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){

            for(i = 0; i < 4; i++){

                var newUrl = data.results[i].url;

                fetch(newUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);

                    var div = document.createElement("div");
                    document.getElementById("pantallaPokeballs").append(div);

                    var p = document.createElement("p");
                    p.innerText = data.name.toUpperCase()+ "\n" + data.flavor_text_entries[4].text;
                    div.append(p);               

                    var img = document.createElement("img");
                    img.src = data.sprites.default;
                    div.append(img);
                })
            }       
        })
    };

//AÑADIR EVENTOS.
//Evento a el boton RANDOM.
    document.getElementById("btnRandom").addEventListener("click", function(){

        document.getElementById("pantallaDatos").style.display = "block";

        pokeFetch();
    });

//Evento para el boton SEARCH.
//Creo dos variables, "control" para validar los datos introducidos en el input del menú 
// y "urlSearch" que se usará en la llamada AJAX "search()"
    var control;
    var urlSearch;

    document.getElementById("btnSearch").addEventListener("click", function(){    

        var nombre = document.getElementById("textBox").value.toLowerCase();   

        if(nombre.charAt(0) === "#"){
            nombre = parseFloat(nombre.slice(1));
        };

        for(i = 0; i < lista.length; i++){
            if(typeof nombre === "string" && nombre == lista[i].name){
                control = true;
                urlSearch = lista[i].url
            }else if(typeof nombre === "number" && nombre <= 151 && nombre > 0){
                control = true;
                urlSearch = lista[nombre - 1].url;
            }
        };

        if(control == true){
            document.getElementById("pantallaDatos").style.display = "block";
            search(nombre);
        }else{
            document.getElementById("error").style.visibility = "visible";
        };
    });

//Evento para la llamada de lista de pokeballs.
//Condicional para no crear mas de una lista al darle repetidas veces al botón A.
    document.getElementById("btnPokeballs").addEventListener("click", function(){

        if(document.getElementById("pantallaPokeballs").style.display === "none"){

            document.getElementById("pantallaPokeballs").style.display = "block";

            fetchPokeballs("https://pokeapi.co/api/v2/item/");
        }
    });

//Evento para eliminar el mensaje de error de escritura en el input del menu, al hacer focus sobre el input.
    document.getElementById("textBox").addEventListener("focus", function(){

        document.getElementById("error").style.visibility = "hidden";

    });

//Evento para el botón B.
//Borra los datos de "pantallaDatos", de "pantallaPokeballs" y del "textBox" del menú. 
//Esconde la "pantallaDatos" y la "pantallaPokeballs" para volver a "pantallaPrincipal".
//Cambia "control" a "false" para resetear la validación del botón SEARCH.
    document.getElementById("btnBack").addEventListener("click",function(){

        if(focus == 1){
            document.getElementById("textBox").value = "";
            currentFocus.focus();
        }        
        document.getElementById("pokemonImg").src = "";
        document.getElementById("pantallaDatos").style.display = "none";
        document.getElementById("pantallaPokeballs").style.display = "none";
        document.getElementById("pantallaPokeballs").innerHTML = "";
        control= false;
    });

//Evento para el botón A.
//Hace "click" o "focus" en los distintos elementos del menú, segun si son "inputs" o "buttons".
    document.getElementById("btnOk").addEventListener("click",function(){
        
        if(currentFocus.tagName === "BUTTON"){
            currentFocus.click();
        }else{
            currentFocus.focus();
        }   
    });


//Funciones para cambiar el focus en los elementos del menú.
//Empieza en "focus=0" para seleccionar el primer elemento del menú.
    var focus = 0;

    var currentFocus = document.querySelectorAll(".menu")[0];
    currentFocus.style.outline = "3px solid lime";

    function focusDown(){

        if(focus < 3){
            focus++;
        }
        currentFocus.style.outline = "none";
        changeFocus();
    };

    function focusUp(){

        if(focus >= 1){
            focus--;
        }
        currentFocus.style.outline = "none";
        changeFocus();
    };

    function changeFocus(){

        var listaMenu = document.querySelectorAll(".menu");

        for(i = 0; i < listaMenu.length; i++){
            if(focus == i){
                currentFocus = listaMenu[i];
                currentFocus.style.outline = "3px solid lime";                    
            }
        }
        if(focus == 1){
            currentFocus.focus();
        }    
    }
//Eventos para enlazar funciones de focus con los botones de Flecha Arriba y Flacha Abajo.
    document.getElementById("focusUp").addEventListener("click",function(){

        focusUp();
        console.log("Focus: " + focus);

    });

    document.getElementById("focusDown").addEventListener("click",function(){

        focusDown();
        console.log("Focus: " + focus);

    });
//**************************** */











