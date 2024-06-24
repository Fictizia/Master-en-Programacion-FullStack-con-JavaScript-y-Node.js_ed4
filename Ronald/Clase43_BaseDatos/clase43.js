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
ref.on("value", function(snapshot){   //Imprimo en DOM
    snapshot.forEach(function(childsnapshot){ 
        console.log(childsnapshot.val().Title);
        document.getElementById("busquedas").innerHTML += " ";
        document.getElementById("busquedas").innerHTML += childsnapshot.val().Title+"<br>";
    })   
});

document.getElementById("enviar").addEventListener("click",function(){
    let peticion = document.getElementById("pelicula").value.toLowerCase(); 
    let ref = firebase.database().ref(peticion);
    let previas = document.getElementById("busquedas").innerText;

    let expresionRegular = new RegExp(peticion, "gi"); 
    if(expresionRegular.test(previas)){
        console.log("pelicula repetida");

        ref.on("value",function(snapshot){
            console.log(snapshot.val());
            document.getElementById("contenido").innerText= " "; 
                    let data = snapshot.val();
                    for (let clave in data){  
                        if (typeof(data[clave]) === `string` ){ 
                            document.getElementById("contenido").innerHTML += `${clave}:${data[clave]}<br>`;            
                        }   
                    }; 
                    document.getElementById("poster").setAttribute("src",data.Poster); 
        });

    }else{
        
        let url = `http://www.omdbapi.com/?t=${peticion}&apikey=21351868`;
        fetch(url)
                .then(function(response){
                   return response.json();
                }) 
                .then(function(data){
                    document.getElementById("contenido").innerText= " "; 
                    document.getElementById("busquedas").innerText= " "; 
                    for (let clave in data){ 
                        if (typeof(data[clave]) === `string` ){ 
                            document.getElementById("contenido").innerHTML += `${clave}:${data[clave]}<br>`;            
                        }   
                    }; 
                    document.getElementById("poster").setAttribute("src",data.Poster);   
                    if(data.Response == "False"){
                        console.log("no se sube esta pelicula");
                        document.getElementById("busquedas").innerHTML = "Vuelve a probar con otro nombre!!";                      
                    }else{
                        ref.set(data); 
                    }  
                    
                })
                .catch(function(error){
                    console.log(error)
                })
    }
    
});


// borrar pelicula
document.getElementById("enviarBorrar").addEventListener("click",function(){
     let pelicula = document.getElementById("peliculaBorrar").value.toLowerCase();
     let previas = document.getElementById("busquedas").innerText; 
     let expresionRegular = new RegExp(pelicula, "gi"); 
     if(expresionRegular.test(previas)){
     document.getElementById("busquedas").innerText= " "; 
     firebase.database().ref(pelicula).remove(); 
     };
    
});