//- Ejercicios Eventos 3
//Partiendo del ejemplo de geometría, crear un programa que nos permita borrar/añadir figuras a nuestro HTML por medio de JS
//- Si la figura ya se encuentra pintada en nuestro HTML, no se puede volver a añadir
//- Si la figura a añadir no está en nuestro CSS, no podemos añadirla al HTML
//- Si la figura no está, no se puede borrar

// Añadir links CSS
var linkStyle= document.createElement("link")
linkStyle.setAttribute("rel","stylesheet")
linkStyle.setAttribute("href", "style.css")
linkStyle.setAttribute("TYPE","text/css")

document.head.appendChild(linkStyle);

// Añadir circulo por JS



function insertar(figura){
    //var figuras = ["circulo","cuadrado","rectangulo","rombo","hexagono","ovalo","paralelogramo","pentagono","trapezoide","triangulo"];
    var figuras = Array.from(document.styleSheets[0].rules).map(rule=> rule.selectorText.slice(1));

    var elemento = document.getElementById(figura);
    if(figuras.indexOf(figura) == -1) {
        alert("El elemento NO está en lla lista de figuras posibles");
    }
    else if(elemento == null) {
        var div = document.createElement("div")
        div.setAttribute("id",figura)
        div.setAttribute("class","forma")
        document.body.appendChild(div)
    } 
    else{
        alert("El elemento ya existe en el DOM");
    }
}
function borrar(figura){
    var elemento = document.getElementById(figura);
    if(elemento != null) {
        document.body.removeChild(elemento);
    }    else{
        alert("El elemento NO existe en el DOM para borrarse");
    }
}
/*----------------------------------------------*/
// Como leer el input de insertar
// Solución JS aquí

document.getElementById("boton1").addEventListener("click",function(){
    var figura = document.getElementById("insertar").value;
    insertar(figura);

})

document.getElementById("boton2").addEventListener("click",function(){
    var figura = document.getElementById("borrar").value;
    borrar(figura);

})
