// species = Array con las especies seleccionadas.
var species = [1, 2, 3, 6, 8, 10, 34, 20];
var i = 0;

// bucle para la selección de toda la información 
for (i = 0; i < species.length; i++) {

    var imagesRute = "https://starwars-visualguide.com/assets/img/species/" + species[i] + ".jpg";
    peticionAjax("https://swapi.co/api/species/" + species[i] + "/?format=json", imagesRute);
}

// bigBox-> contenedor con todo el contenido
var bigBox = document.createElement("div");
bigBox.setAttribute("id", "bigSpecies");

// main#contenedor->bigBox  
//| body | -> | main#contenedor | -> | bigBox#bigSpecies |
document.getElementById("contenedor").appendChild(bigBox);


// asignedIds-> control de los ids que se le asignarán a cajasInd ln. 33
var asignedIds = [];

var errorControl = 0;

// Función para hacer la llamada Ajax de los datos de las especies y asignación de la ruta de las imagenes de cada especie.
function peticionAjax(url, imagesRute) {

    fetch(url)
         //Animacion previa a la carga de contenido
        .then(
            document.getElementById("img-intro").style.height = "800px",
            document.querySelector(".twinkling").style.height = "657px",
            document.getElementById("procesLoad").innerHTML = '<div class="laser"><img src="img/laser-red.png"><div id="carga"></div>',
            document.getElementById("carga").style.animation = "loadanimation 1s 1")

        .then(res => res.json())

        .then(info => {
            document.getElementById("procesLoad").style.display = "none";
            document.getElementById("img-intro").style.height = "384px",
                document.querySelector(".twinkling").style.height = "230px",

                console.log(info.name);
            //document.getElementById("carga").style.display="none";

            //cajasInd-> contenedor especies, asignamos la clase speciesBox
            var cajasInd = document.createElement("div");
            cajasInd.setAttribute("class", "speciesBox");

            // cajasInd->bigBox  
            //| body | -> | main#contenedor | -> | bigBox#bigSpecies | -> | x8 cajasInd.speciesBox |
            bigBox.appendChild(cajasInd);

            // Extracción de ids cajasInd a través de url
            var ids = info.url;

            // Asignación de los ids.
            cajasInd.setAttribute("id", "spe" + ids.slice(29, -1));

            // Agregamos cajasInd.id en asignedIds ln.21
            asignedIds.push(cajasInd.id);

            //Creamos el contenedor principal que contendrá las imagenes y el nombre            
            var principalBox = document.createElement("div");
            principalBox.setAttribute("class", "principal");

            // principalBox->cajasInd
            //| x8 cajasInd.speciesBox | -> | principalBox.principal |
            cajasInd.appendChild(principalBox);

            // Creamos las imagenes y le asignamos la ruta.
            var imagenes = document.createElement("img");
            imagenes.setAttribute("src", imagesRute);
            principalBox.appendChild(imagenes);

            // Creamos los encabezados con los nombres de las especies
            var nombres = document.createElement("h1");
            nombres.setAttribute("class", "nombrestitle");
            nombres.innerHTML = info.name;
            principalBox.appendChild(nombres);


            //Asignamos dos eventos para efecto botones
            principalBox.addEventListener("mouseover", function () {

                nombres.style.backgroundColor = "#ffc500";
                nombres.style.color = "white";
                nombres.style.transform = "translate(0px, -5px)";
            });

            principalBox.addEventListener("mouseout", function () {

                nombres.style.backgroundColor = "#080808b3";
                nombres.style.color = "white";
                nombres.style.transform = "translate(25px, -59px)";
            });


            // Creamos el evento click al pulsar en las diferentes especies
            principalBox.addEventListener("click", function () {

                document.querySelector(".return").style.display = "none";

                nombres.classList.replace('nombrestitle', 'secondstyle')

                //Añadimos una clase a cajasInd que nos ayudará con su selección
                cajasInd.classList.add("activa");


                verificar();

                //Identificamos que contenedor hemos pulsado y lo sacamos de asignedIds[]
                var position = asignedIds.indexOf(cajasInd.id)
                asignedIds.splice(position, 1)

                //Al resto de elementos de asignedIds[] los desvisualizamos
                for (var x = 0; x < asignedIds.length; x++) {
                    document.getElementById(asignedIds[x]).style.display = "none";
                }

                //Se ejecuta la selección
                //Creamos otro contenedor secundario para sustituir al principal 
                var principal2 = document.createElement("div");
                principal2.setAttribute("id", "principal2");
                cajasInd.appendChild(principal2);
                nombres.style.animation = "move-hover 0.8s ease-in-out 1";

                //imagenes + nombres ->principal2 
                principal2.appendChild(imagenes);
                principal2.appendChild(nombres);

                //Desvisualizamos  el contenedor principalBox.principal
                principalBox.style.display = "none";

                // speInfo-> contenedor de información individual. 
                var speInfo = document.createElement("div");
                speInfo.setAttribute("id", "speContent");

                // speInfo->cajasInd
                //| cajasInd.speciesBox | -> | speInfo#speContent|
                cajasInd.appendChild(speInfo);

                //Modificación estructura cajasInd y bigBox
                cajasInd.style.display = "flex";
                cajasInd.style.width = "100%";
                cajasInd.style.flexWrap = "wrap";


                // Creamos las información que queremos introducir sobre la especie.
                var datesList = document.createElement("ul");
                datesList.setAttribute("id", "listado");
                speInfo.appendChild(datesList);

                //Color de ojos
                var datosSpecies = document.createElement("li");
                datosSpecies.innerHTML = "Color de ojos: " + info.eye_colors;
                datesList.appendChild(datosSpecies);

                //Color de pelo
                var datosSpecies1 = document.createElement("li");
                datosSpecies1.innerHTML = "Color de pelo: " + info.hair_colors;
                datesList.appendChild(datosSpecies1);

                //Color de piel
                var datosSpecies2 = document.createElement("li");
                datosSpecies2.innerHTML = "Color de piel: " + info.skin_colors;
                datesList.appendChild(datosSpecies2);

                //Lengua
                var datosSpecies3 = document.createElement("li");
                datosSpecies3.innerHTML = "Lenguaje: " + info.language;
                datesList.appendChild(datosSpecies3);

                //Personajes                
                var personajes = document.createElement("div");
                personajes.setAttribute("class", "content");
                speInfo.appendChild(personajes);

                var personaje = document.createElement("p");
                personaje.innerHTML = "Conoce los personajes de su especie";
                personajes.appendChild(personaje);

                //Creación contenedor para insertar los personajes indiv.
                var nameBox = document.createElement("div");
                nameBox.setAttribute("class", "secondContent");
                personajes.appendChild(nameBox);


                //cnt-> variable de control para mostrar personajes
                var cnt = 0;

                personaje.addEventListener("click", function () {
                    if (cnt === 0) {

                        //asignamos el url del nuevo fetch
                        var personas = info.people;

                        //efecto opacidad y display aparición de personajes
                        nameBox.style.animation = "opacidad 2s linear 1";
                        nameBox.style.display = "flex";

                        //Cambio de texto personaje
                        personaje.innerText = "Cerrar personajes";

                        for (var y = 0; y < personas.length; y++) {
                            fetch(personas[y])
                                .then(res => res.json())
                                .then(personData => {

                                    console.log(personData);

                                    //personContent-> contenedor de los personajes
                                    var personContent = document.createElement("div");
                                    nameBox.appendChild(personContent);

                                    //characterNumber-> sacar datos para las imagenes
                                    var characterNumber = personData.url;
                                    var personimagesRute = "https://starwars-visualguide.com/assets/img/characters/" + characterNumber.slice(28, -1) + ".jpg"

                                    //personImages-> imagen donde introducimos la ruta de la img
                                    var personImages = document.createElement("img");
                                    personImages.setAttribute("src", personimagesRute);
                                    personContent.appendChild(personImages);

                                    //nombres-> nombre de los personajes
                                    var nombres = document.createElement("h4");
                                    nombres.innerHTML = personData.name;
                                    personContent.appendChild(nombres);

                                })
                        }

                        cnt = 1;

                    } else {
                        //Si el contenedor ya ha sido pulsado una vez se elimina el contenido
                        nameBox.innerHTML = '    ';
                        nameBox.style.display = "none";
                        personaje.innerHTML = "Conoce los personajes de su especie";

                        cnt = 0;


                    }
                })
            })
        })
        //Carga en caso de error
        .catch(str => {
            document.getElementById("procesLoad").style.display = "none";
            document.getElementById("img-intro").style.height = "384px";
            document.querySelector(".twinkling").style.height = "230px";
            document.getElementById("contenedor").innerHTML = '<div class="errorBox"><img src="img/yoda-error.png"><div id="speak"><h3 id="errorText"></h3><a href="index.html">Volver</a></div></div>';
 
            if(errorControl===0){
                str = 'El contenido disponible no estar. Intentarlo más tarde debes.';
            write(str);
            
        }}
        )

}
 //Función para escritura de texto paulatino
function write(str) {
    var text = str.split('');
    var d = 0;
    var print = setInterval(function () {
        document.getElementById("errorText").innerHTML += text[d];
        d++;
        if (d === text.length ) {
            clearInterval(print);
        }
       
    }, 70);
    errorControl=1;
};


 //Función para verificar que se ha pulsado aluna especie que aparezca la pestaña de cerrar
function verificar() {
    for (var x = 0; x < asignedIds.length; x++) {
        var verify = document.getElementById(asignedIds[x]).classList.contains("activa");
        console.log(verify);
        if (verify === true) {
            var cerrar = document.createElement("nav");
            cerrar.setAttribute("id", "close");
            cerrar.innerHTML = "X";
            document.body.appendChild(cerrar);

        }
    }

    //Evento que sucede al pulsar el botón cerrar
    cerrar.addEventListener("click", function () {

        var selectec = document.querySelector(".activa");
        asignedIds.push(selectec.id);
        console.log(asignedIds);
        document.body.removeChild(cerrar);

        selectec.removeAttribute("style");
        var content2 = document.querySelector(".activa div#principal2 h1");
        var secondimage = document.querySelector(".activa div#principal2 img");

        var prin = document.querySelector(".activa div.principal");
        prin.style.display = "inline";

        content2.classList.replace('secondstyle', 'nombrestitle');

        selectec.appendChild(prin);
        prin.appendChild(secondimage);
        prin.appendChild(content2);


        selectec.removeChild(principal2);

        var contenido = document.querySelector("#speContent");

        selectec.classList.remove("activa");
        selectec.removeChild(contenido);

        document.querySelector(".return").style.display = "inherit";

        for (var x = 0; x < asignedIds.length; x++) {
            document.getElementById(asignedIds[x]).style.display = "initial";
            document.querySelectorAll(".speciesBox div.principal h1")[x].style.animation = "none";
        }

    })
}


