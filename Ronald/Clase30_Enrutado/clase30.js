var direccion = "http://airemad.com/api/v1/pollution/"  //la direccion a la que se hará la peticion fetch

//las rutas con la librería de page.js
page.base('/');  //al cargar el html me lanzará a la pagina inicial directamente, no a una ruta concreta
page('/', index); //llevaría al index, pagina principal
page('estaciones', estaciones ); //ruta a todas las estaciones
page('estaciones/:id', generaEstacion ); //ruta a una estacion concreta que se encontraría dentro de la ruta general de estaciones
page('efectos', efectos); //ruta a una imagen de los efectos de la contaminacion
page('*', notfound); //en caso de no dirigirse a una ninguna ruta especificada
page(); //para que se ejecute las rutas, ya que es una funcion
page("/");

function index() {
  document.querySelector('p')
    .textContent = 'Bienvenido!!'; //al cargar la página nos mostraría un saludo.
}

function estaciones() {
  document.getElementById("datosContaminacion").innerHTML = "";  //limpio el html de cualquier dato previo
  fetch("http://airemad.com/api/v1/pollution")  //fetch a una json con todos los nombres de las estaciones de Madrid
         .then(function(response){
            return response.json();
         })
         .then(function(data){
           for( var i=0; i<data.length; i++){
            console.log(data[i].name)
            var caja = document.createElement("a");
            document.getElementById("datosContaminacion").appendChild(caja);
            document.getElementsByTagName("a")[i].innerHTML = data[i].name;
            document.getElementsByTagName("a")[i].setAttribute("href","estaciones/"+data[i].id);
            document.getElementById("datosContaminacion").innerHTML += "<br>";
           }
         })
         .catch(function(error){
             console.log(error)
         })
}

function generaEstacion(ctx){ //ctx es un parametro que me llegaría cuando el usuario se posiciona encima de cada estacion.
  console.log(ctx.params.id);  //paramst.id lo añado para llegar exclusivamente al id de cada estacion y asi añadirlo a la url del fetch y poder traer los datos de una estacion concreta con su id.

  fetch(direccion+ctx.params.id)
        .then(function(response){
           return response.json();
        })
        .then(function(data){
          console.log(data)
          
          document.getElementById("datosContaminacion").innerHTML = " ";
          document.getElementById("datosContaminacion").innerHTML = "Estacion: <b>"+data.name+"</b><br>";
           for (x in data){
              if (data[x].parameter != undefined){
                document.getElementById("datosContaminacion").innerHTML += data[x].parameter+" ("+data[x].abrebiation+"):</b> "+data[x].values[12].valor+" &microg "+ "| Medido por "+data[x].technique+"<br><br>"
              }
             }
        })
        .catch(function(error){
            console.log(error)
        })      
}

function efectos () {   //Esta función me daría mostraría en el dom una foto de los efectos de la contaminacion, retirando previamente el contenido de las otras rutas.
  document.getElementById("datosContaminacion").innerHTML = "";
  let foto = document.createElement("img");
  foto.classList.add("efectos");
  document.getElementById("datosContaminacion").appendChild(foto);
  document.getElementsByClassName("efectos")[0].setAttribute("src", "/clase30_Enrutado/efectos.jpg");
}

function notfound() {
  document.querySelector('p')
    .textContent = 'not found';
}
