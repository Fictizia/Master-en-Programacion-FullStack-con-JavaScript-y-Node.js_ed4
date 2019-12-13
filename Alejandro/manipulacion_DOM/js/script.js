var parrafos = document.getElementsByTagName("p");

for(var i=0;i<parrafos.length;i++){
    console.log(parrafos[i].innerHTML);
}

var parrafo = document.getElementById("p2").innerHTML;
console.log("Texto: "+parrafo);

// Algoritmo de ganar loteria
// ..
// ..
// Setter
document.getElementById("p2").innerHTML = " Has vuelto a perder!";

var parrafos2 = document.getElementsByName("tipo1");

for(var i=0;i<parrafos2.length;i++){
    console.log(parrafos2[i].innerHTML);
}
// Devuelve los links
console.log("MiURL: "+document.getElementsByTagName("a")[0].href);

// Acceder por clase

var parrafos3 = document.getElementsByClassName("clase1");

//console.log("Resultado: "+parrafos3[1].innerHTML);

//Query selector
console.log("******* Query Selector******");
var parrafos4 = document.querySelectorAll('p');

// Iteración
for (var i = 0; i < parrafos4.length; ++i) {
  var elemento = parrafos4[i];
  console.log("Elemento: ", elemento.innerHTML);
}

var parrafos4 = document.querySelectorAll('#miDiv #miId2.clase2 ');
console.log(parrafos4[0].innerHTML); // Contenido del HTML
console.log(parrafos4[0].title); // Titulo del elemento
// Lo mismo que antes
console.log(document.querySelectorAll('#miId2')[0].innerHTML)

// Lo mismo que antes. Solo busca 1 elemento
console.log(document.querySelector('#miId2').innerHTML)

// Modificar estilo
document.getElementById("p3").setAttribute("class","clase2");

// Ejercicio Cursos Fictizia con acceso a DOM con Query Selector
function buscaCursos(){
  var lista = document.querySelectorAll(".plan"); // devuelve los cursos
  var tiempos = document.querySelectorAll(".mainTag"); // mainTag Devuelve lista de horas
  for(var i=0;i<lista.length;i++){
    var tiempo = tiempos[i].innerText.toLowerCase();
    var curso = lista[i].querySelector("header > h1 > a").innerText;
    console.log("El curso es: "+curso+ ", y dura "+tiempo);
  }
}

// Ejercicio Cursos Fictizia acceso a DOM clasico
function buscaCursos2(){
  var lista = document.getElementsByClassName("plan"); 
  var tiempos = document.getElementsByClassName("mainTag"); // mainTag Devuelve lista de horas
  
  for(var i=0;i<lista.length;i++){
    var tiempo = tiempos[i].innerText.toLowerCase();
    var links = lista[i].getElementsByTagName("a"); // Links
    var curso = links[0].innerText;
    console.log("El curso es: "+curso+ ", y dura "+tiempo);
  }
}

// Modificando estilos del DOM
// ocultar parrafo
document.getElementById("p1").style.display = "none";
document.querySelector("#p4").classList.add("clase2"); // añade clase 
console.log("****");
var parrafo = document.getElementById("p2");
parrafo.classList.contains("clase1"); // el elemento contiene clase 2??

// añade/quita la clase 2
document.getElementById("boton").addEventListener("click",function(){
  parrafo.classList.toggle("clase2"); 
}); 

// Crear nuevo elemento en el DOM
var parrafo2 = document.createElement("p");
var contenido = document.createTextNode("Mi nuevo parrafo desde JS!!!");

// Enlazar nodo parrafo con con nodo texto
parrafo2.appendChild(contenido);
//Enlazar al articulo
articulo = document.querySelector("article");
articulo.appendChild(parrafo2);

// Crear una lista ul/li a través de JS
// Código aquí....

var productos = ["Pescado","Naranjas","Coca Cola","Pan"];

var lista = document.createElement("ul");
lista.setAttribute("id","lista1");
for (var i=0;i<productos.length;i++){

  var elem = document.createElement("li");
  var txt = document.createTextNode(productos[i]);
  elem.appendChild(txt);
  lista.appendChild(elem);
}
document.getElementById("listas").appendChild(lista);

var lista2 = document.createElement("ul");
lista2.setAttribute("id","lista2");
document.getElementById("listas").appendChild(lista2);
document.getElementById("lista2").innerHTML ="<li>Pescado</li><li>Naranjas</li><li>Coca Cola</li><li>Pan</li>";

// Eventos DOM
function cambiarFondo() {
  // color = 'rgb(0-255,0-255,0-255'
  var color = 'rgb(' + Math.floor((Math.random() * 255))+ ',';
  color += Math.floor((Math.random() * 255)) + ',';
  color += Math.floor((Math.random() * 255)) + ')';
  document.body.style.backgroundColor= color;
  console.info("Nuevo color:", color);
}

function cambiarEstilo(){
  document.getElementById("eventos").style.border = "4px dotted blue"
}

// Con funcion anonima y actuando sobre el elemento
document.getElementById("boton1").onclick = function()
{
  document.body.style.background = "lightblue";
  console.log("Haz algo");
}

// Con funcion creada en JS 
document.getElementById("boton2").onclick = cambiarFondo;

// Probando listeners
document.getElementById("boton3").addEventListener("click",cambiarEstilo);

document.getElementById("eventos").addEventListener("mouseover",function(){
  var eventos = document.getElementById("eventos");
  eventos.style.fontFamily = "Arial, Helvetica, sans-serif";
eventos.style.background = "yellow";

document.getElementById("myP").style.visibility = "visible";
});

// Hacer que con mouseover se muestre un parrafo escondido cuando pases el ratón sobre el div de eventos

document.getElementById("myP").style.visibility = "hidden";

// Hacer un botón que esconda/enseñe el texto de un parrafo cada vez que se pulsa el mismo boton. Por defecto, el párrafo debe estar visible
/*
document.getElementById("boton4").addEventListener("click",function(){
  var p = document.getElementById("myP2");

    p.classList.toggle("mystyle");
    //p.style.visibility = "hidden";

});

*/
document.getElementById("myP2").style.visibility ="hidden";

document.getElementById("boton4").addEventListener("click",function(){
  var p = document.getElementById("myP2");

  console.log(typeof(p));
    if (p.style.visibility == "hidden") {
      p.style.visibility = "visible";
    }else{
      p.style.visibility = "hidden";
    }

});


























