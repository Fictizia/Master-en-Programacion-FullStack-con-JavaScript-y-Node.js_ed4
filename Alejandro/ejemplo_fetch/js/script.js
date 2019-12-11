function ajaxHandler (url){
    // iniciar animacion
    fetch(url)
      .then(function(response) {
        console.log("--Promesa 1--");
        // Hacer la conversion a JSON
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        console.log(data);
  
        // Poner timeout bonito
        // Terminar animacion 
        document.getElementById("resultado").innerText = data.result;
        console.log("--Promesa 2--");
 
      })
      .catch(function(error) {
        console.log(error);
        // Poner timeout bonito
        // Terminar animacion 
      }); 

  }

document.getElementById("boton1").addEventListener("click",function(){
    //alert("Lanzando fetch!");
    ajaxHandler("https://api.rand.fun/games/rockpaperscissorslizardspock");
})


// generando fetch con request personalizada

function ajaxHandler2(){

    fetch('http://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            usuario: "Alejandro",
            password: 1234,
            userId: 123
        }),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    }).then(function(response) { 
        //Gestión de la respuesta 
        return response.json();
    }).then(function(datos){
        console.log(datos);
        alert("Se ha añadido a usuario "+datos.usuario);
    });
}

document.getElementById("boton2").addEventListener("click",ajaxHandler2);




