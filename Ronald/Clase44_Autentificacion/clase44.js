var firebaseConfig = {
    apiKey: " ",
    authDomain: "appfirebase-2c186.firebaseapp.com",
    databaseURL: "https://appfirebase-2c186.firebaseio.com",
    projectId: "appfirebase-2c186",
    storageBucket: "appfirebase-2c186.appspot.com",
    messagingSenderId: "715185555678",
    appId: "1:715185555678:web:0e10b0e8e87b6572fd9a4f"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Mostrar en el DOM 
let ref = firebase.database().ref("usuariosRegistrados"); 
ref.on("value",function(snapshot){
  document.getElementById("usuariosRegistrados").innerHTML = ""; 
  snapshot.forEach(function(childSnapshot){ 
    document.getElementById("usuariosRegistrados").innerHTML += `${childSnapshot.val().name} ${childSnapshot.val().surname}<br>`
    console.log("usuarios registrados en el sistema:",childSnapshot.val());
  })
});

document.getElementById("acceso").style.display = "none"; 


//github
document.getElementById("github").addEventListener("click",function(){
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user);
  }).catch(function(error) { 
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorMessage);
    document.getElementById("validacion").innerText = errorCode;
  }); 
});

//Para usuarios conectados o registrados
firebase.auth().onAuthStateChanged(function(user) {  
  if (user) {
    console.log(`el ususario ${user.email} está conectado`)
    document.getElementById("usuariosOnline").innerText = `${user.email} esta conectado`;
  } else {
    console.log(`Ningun usuario logueado`)
  }
});

//Para usuarios ya registrados, 
document.getElementById("boton").addEventListener("click", accesoRegistrado); 
function accesoRegistrado(){
  document.getElementById("registro").style.display = "none";
  document.getElementById("acceso").style.display = "block";
  document.getElementById("boton").style.display = "none";
}

//Registro:
document.getElementById("enviar").addEventListener("click", registro);
function registro(){
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let email = document.getElementById("correo").value;
  let password = document.getElementById("contraseña").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode+"("+errorMessage+")");
    document.getElementById("validacion").innerText = errorCode;
  });
  let ref = firebase.database().ref("usuariosRegistrados/"+nombre); //registro el nuevo usuario.
  let datos = { 
    name: nombre,
    surname: apellido,
    email: email
    }
  ref.set(datos);  
}

// log in
document.getElementById("enviar2").addEventListener("click", acceso);
function acceso(){
    let email2 = document.getElementById("correo2").value;
    let password2 = document.getElementById("contraseña2").value;
    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code);
      if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      } else {
        alert(errorMessage);
      }
    });
};

//Log out 
document.getElementById("salir").addEventListener("click", salir);
function salir(){
    firebase.auth().signOut().then(function() {
      console.log("Deslogado") 
      document.getElementById("usuariosOnline").innerHTML = `Desconectado`;
    }).catch(function(error) {
        console.log("Error en el signOut") 
    });
};
//Log out ( ventana exclusiva de usuarios ya registardos)  
document.getElementById("salir2").addEventListener("click", salir2);
function salir2(){
    firebase.auth().signOut().then(function() {
      console.log("Deslogado") 
      document.getElementById("usuariosOnline").innerHTML = `Desconectado`;
    }).catch(function(error) {
        console.log("Error en el SignOut") 
    });
};