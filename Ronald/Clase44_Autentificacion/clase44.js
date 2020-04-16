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

//Para mostrar en el DOM los usuarios ya registrados previamente y almacenados en la base de datos
let ref = firebase.database().ref("usuariosRegistrados"); 
ref.on("value",function(snapshot){
  document.getElementById("usuariosRegistrados").innerHTML = ""; //Me limpia el DOM de los anteriores datos para que no se escriban dos veces los usurios
  snapshot.forEach(function(childSnapshot){ //recorro los usuarios(los hijos de usuariosRegistrados)
    document.getElementById("usuariosRegistrados").innerHTML += `${childSnapshot.val().name} ${childSnapshot.val().surname}<br>`
    console.log("usuarios registrados en el sistema:",childSnapshot.val());
  })
});

document.getElementById("acceso").style.display = "none"; //Permanece oculto para nuevos usuarios


//Acceso mediante github
document.getElementById("github").addEventListener("click",function(){
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;// This gives you a GitHub Access Token. You can use it to access the GitHub API
    var user = result.user;// The signed-in user info.
    console.log(user);
  }).catch(function(error) { // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;// The email of the user's account used.
    var credential = error.credential;// The firebase.auth.AuthCredential type that was used.
    console.log(errorMessage);
    document.getElementById("validacion").innerText = errorCode;
  }); 
});

//Para ver los usuarios conectados o registrados
firebase.auth().onAuthStateChanged(function(user) {  
  if (user) {
    // User is signed in.
    console.log(`el ususario ${user.email} está conectado`)
    document.getElementById("usuariosOnline").innerText = `${user.email} esta conectado`;
  } else {
    // No user is signed in.
    console.log(`Ningun usuario logueado`)
  }
});

//Para usuarios ya registrados, despliega el formulario de acceso
document.getElementById("boton").addEventListener("click", accesoRegistrado); 
function accesoRegistrado(){
  document.getElementById("registro").style.display = "none";
  document.getElementById("acceso").style.display = "block";
  document.getElementById("boton").style.display = "none";
}

//Registro de usuario:
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
  let ref = firebase.database().ref("usuariosRegistrados/"+nombre); //accedo a la base de datos para registrar el nuevo usuario.
  let datos = { //recopilo los datos del nuevo usuario en un objeto 
    name: nombre,
    surname: apellido,
    email: email
    }
  ref.set(datos); //registro el nuevo usuario en la base de datos.  
}

//Acceso, log in de usuarios ya registrados.
document.getElementById("enviar2").addEventListener("click", acceso);
function acceso(){
    let email2 = document.getElementById("correo2").value;
    let password2 = document.getElementById("contraseña2").value;
    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
      // Handle Errors here.
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

//Log out de usuarios que se acaban de registrar.
document.getElementById("salir").addEventListener("click", salir);
function salir(){
    firebase.auth().signOut().then(function() {
      console.log("Deslogado") // Sign-out successful.
      document.getElementById("usuariosOnline").innerHTML = `Desconectado`;
    }).catch(function(error) {
        console.log("Error en el signOut") // An error happened.
    });
};
//Log out de usuarios ya registrados (en la ventana exclusiva de usuarios ya registardos)  
document.getElementById("salir2").addEventListener("click", salir2);
function salir2(){
    firebase.auth().signOut().then(function() {
      console.log("Deslogado") // Sign-out successful.
      document.getElementById("usuariosOnline").innerHTML = `Desconectado`;
    }).catch(function(error) {
        console.log("Error en el SignOut") // An error happened.
    });
};