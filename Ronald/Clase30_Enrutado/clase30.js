var direccion = "http://airemad.com/api/v1/pollution/" 

//las rutas con la librería de page.js
page.base('/');  
page('/', index); 
page('estaciones', estaciones ); 
page('estaciones/:id', generaEstacion ); 
page('efectos', efectos); 
page('*', notfound); 
page(); 
page("/");

function index() {
  document.querySelector('p')
    .textContent = 'Bienvenido!!'; 
}

function estaciones() {
  document.getElementById("datosContaminacion").innerHTML = "";  
  fetch("http://airemad.com/api/v1/pollution")  
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

function generaEstacion(ctx){ 
  console.log(ctx.params.id);  

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

function efectos () {   //foto de los efectos de la contaminacion
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
