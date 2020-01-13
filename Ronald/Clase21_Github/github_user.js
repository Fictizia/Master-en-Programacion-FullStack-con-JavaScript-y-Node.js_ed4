/**
 * Usuario de Github
 * @type {Object} El nombre de ususrio de git hub del que queremos extraer información
 */
var user = document.getElementById("usuario");

/**
 * Direccion de Github
 * @type {string} El enlace para que al juntar con el usuario que se introduzca, permita completar a direccion.
 */
var direccion = "https://api.github.com/users/";
 
//Sacando por consola los datos del usuario

/**
 * Permite traer la informacion de un usuario de github
 */
 function usuario(){

    fetch(direccion+user.value)
     .then(function(response){
         return response.json();
         
     })
     .then(function(data){
         
         var cajadiv = document.createElement("div");
         var avatar = document.createElement("img");
         var datos = document.createElement("p");
        
         cajadiv.appendChild(avatar);
         cajadiv.appendChild(datos);
         document.getElementById("resultado").appendChild(cajadiv);
         document.getElementsByTagName("IMG")[0].setAttribute("src",data.avatar_url);
         var info = "Nombre y Apellido: "+data.name+"<br>Compañia: "+data.company+"<br>Repositorios públicos: "+data.public_repos+"<br>"
         +"<br>Blog: "+data.blog+"<br>Localización: "+data.location+"<br>Backgroung: "+data.bio+"<br>Cuenta creada el: "+data.created_at;
         document.getElementsByTagName("P")[0].innerHTML = info;
         
     })
     .catch(function(error){
         console.log(error)
     })
}

document.getElementById("enviar").addEventListener("click", function(){
    usuario()
}
);



// Sacando el email del usuario o los emails relacionados con el usuario:

/**
 * Enlace a correos
 * @type {string} Permite completar la dirección url y acceder a los eventos en los cuales se encuentran los email relacionados con el usuario
 */
var correo = "/events"

/**
 * Permite traer a consola todos los email relacionados con el usuario
 */
function email(){
    fetch(direccion+user.value+correo)
     .then(function(response){
         return response.json();
         
     })
     .then(function(data){
        for (var i=0; i<data.length; i++){
            var clase = data[i].payload.commits;
            for( var b=0; b<clase.length; b++){
                console.log(clase[b].author.email);
            }
        }
         
     })
     .catch(function(error){
         console.log(error)
     })
};
document.getElementById("enviar").addEventListener("click",function(){
    email()
});



