
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "peliculas-f276d.firebaseapp.com",
    databaseURL: "https://peliculas-f276d.firebaseio.com",
    projectId: "peliculas-f276d",
    storageBucket: "peliculas-f276d.appspot.com",
    messagingSenderId: "744634020542",
    appId: "1:744634020542:web:cbbe4c188415cf5cb864ef"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
let ref = firebase.database().ref();
ref.on("value", function(snapshot){   //Imprimo en el DOM la peliculas que están ya en la base de datos
    snapshot.forEach(function(childsnapshot){ //el forEach es necesario para que recorra cada objeto y poder meterme en un valor de cada objeto
        console.log(childsnapshot.val().Title);
        document.getElementById("busquedas").innerHTML += " ";
        document.getElementById("busquedas").innerHTML += childsnapshot.val().Title+"<br>";
    })   
});

document.getElementById("enviar").addEventListener("click",function(){
    let peticion = document.getElementById("pelicula").value.toLowerCase(); //Cojo el input y lo paso a minusculas para que coincida con la base de datos que lo tendré todo en minusculas
    let ref = firebase.database().ref(peticion);
    let previas = document.getElementById("busquedas").innerText;

    let expresionRegular = new RegExp(peticion, "gi"); //creo una regexp que incluya el input y detecte si coincide con las peliculas que están ya almacenadas en la base de datos
    if(expresionRegular.test(previas)){
        console.log("pelicula repetida");

        ref.on("value",function(snapshot){
            console.log(snapshot.val());
            document.getElementById("contenido").innerText= " "; //Para que me limpie el DOM de alguna busqueda previa
                    //document.getElementById("busquedas").innerText= " "; //Para que me limpie el DOM de las anteriores values sino se me añade los nuevos values con los anteriores que ya estaban en el DOM
                    let data = snapshot.val();
                    for (let clave in data){ //recorro el json 
                        //console.log(typeof(data[clave]));
                        if (typeof(data[clave]) === `string` ){ //Para eliminar la escritura de objetos en el dom, y que solo me escriba cadenas string. 
                            document.getElementById("contenido").innerHTML += `${clave}:${data[clave]}<br>`;            
                        }   
                    }; 
                    document.getElementById("poster").setAttribute("src",data.Poster); //saco el poster de la película
        });

    }else{
        
        let url = `http://www.omdbapi.com/?t=${peticion}&apikey=21351868`;
        fetch(url)
                .then(function(response){
                   return response.json();
                }) 
                .then(function(data){
                    //console.log(data)
                    document.getElementById("contenido").innerText= " "; //Para que me limpie el DOM de alguna busqueda previa
                    document.getElementById("busquedas").innerText= " "; //Para que me limpie el DOM de las anteriores values sino se me añade los nuevos values con los anteriores que ya estaban en el DOM
                    for (let clave in data){ //recorro el json 
                        if (typeof(data[clave]) === `string` ){ //Para eliminar la escritura de objetos en el dom, y que solo me escriba cadenas string. 
                            document.getElementById("contenido").innerHTML += `${clave}:${data[clave]}<br>`;            
                        }   
                    }; 
                    document.getElementById("poster").setAttribute("src",data.Poster); //saco el poster de la película  
                    //Para prevenir que no se suban a la base de datos, las peliculas que no se encuentran  pero que dan igualmente un json de respuesta.
                    if(data.Response == "False"){
                        console.log("no se sube esta pelicula");
                        document.getElementById("busquedas").innerHTML = "Vuelve a probar con otro nombre!!";                      
                    }else{
                        ref.set(data); //aqui sí se sube la pelicula
                    }  
                    
                })
                .catch(function(error){
                    console.log(error)
                })
    }
    
});


//Para borrar una pelicula de la base de datos.
document.getElementById("enviarBorrar").addEventListener("click",function(){
     let pelicula = document.getElementById("peliculaBorrar").value.toLowerCase();
     let previas = document.getElementById("busquedas").innerText; 
     let expresionRegular = new RegExp(pelicula, "gi"); //le paso una expresion regular para que solo pueda leer una pelicula que esté en la base de datos y no cualquier input.
     if(expresionRegular.test(previas)){
     document.getElementById("busquedas").innerText= " "; //limpia previamente el dom para que no se sobreescriba al generarse el nuevo evento.
     firebase.database().ref(pelicula).remove(); //elimina la pelicula
     };
    
});