//Ejercicio autenticacion con Firebase.
//Configuracion e inicializacion.
var firebaseConfig = {
  apiKey: "",
  authDomain: "ejercicio-autenticacion.firebaseapp.com",
  databaseURL: "https://ejercicio-autenticacion.firebaseio.com",
  projectId: "ejercicio-autenticacion",
  storageBucket: "ejercicio-autenticacion.appspot.com",
  messagingSenderId: "430873907932",
  appId: "1:430873907932:web:219942797b074b5a54da19"
};
firebase.initializeApp(firebaseConfig);

//Referencia a Realtime Database.
const ref = firebase.database().ref(`Usuarios/`);


//Autenticacion.
//Registrar un usuario.
function registrar(email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    let num = email.indexOf("@");
    let id = email.slice(0,num);
    let userRef = firebase.database().ref(`Usuarios/${id}`);
    userRef.set({User:`${email}`});
    console.log(`Agregado usuario ${email} a Realtime Database`);
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
};
//Listener para el boton de "REGISTRARSE".
document.getElementById("btnSignUp").addEventListener("click",function(){
  let name = document.getElementById("textBox").value;
  let pass = document.getElementById("passBox").value;
  registrar(name,pass);
});

//Logear user.
function logIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {       
    firebase.auth().currentUser.providerData.forEach(function(profile){
      console.log("Sign-in provider: " + profile.providerId);
      console.log("Provider-specific UID: " + profile.uid);
      console.log("Email: " + profile.email);
    });  
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
};
//Listener para boton de "ACCEDER".
document.getElementById("btnLogIn").addEventListener("click",function(){
  let name = document.getElementById("textBox").value;
  let pass = document.getElementById("passBox").value;
  logIn(name,pass);
});

//Deslogeo de user.
function logOut(){
  console.log("Saliendo del sistema",firebase.auth().currentUser.email)
  firebase.auth().signOut().then(function(res){
    document.getElementById("currentUser").innerText = `** No hay nadie conectado **`;
  }).catch(err => console.log(err));
};
//Listener para boton de "SALIR".
document.getElementById("btnLogOut").addEventListener("click",logOut);

//Borrar usuario.
function borrarUser(){
  confirm("¿Seguro que quieres borrar tu usuario?");
  if(confirm){
    let ref = firebase.auth().currentUser;
    let user = firebase.auth().currentUser.email;
    let id = user.slice(0,user.indexOf("@"));
    let element = firebase.database().ref(`Usuarios/${id}`);
    element.remove();  
    ref.delete().then(function() {
    console.log("Usuario borrado");
    })
    .catch(function(error) {
      console.log(error);
    });
  };
};
//Listener para boton de "BORRAR".
document.getElementById("btnRemove").addEventListener("click",borrarUser);

//Listener de conexiones y desconexiones de usuarios.
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Bienvenido! " + user.email);
    document.getElementById("currentUser").innerText = `${user.email}`;
  } else {
    console.log("No hay nadie en el sistema");
    document.getElementById("currentUser").innerText = `** No hay nadie conectado **`;
  }
});

//Listener de cambios en la base de datos.
ref.on('value', (snapshot) => {
  document.getElementById("resultado").innerHTML = "";
  snapshot.forEach((childSnapshot) => {
      let element = childSnapshot.val();
      pintarUsers(element);
  })
});

//Funcion para pintar los usuarios registrados en el HTML.
function pintarUsers(element){
  let p = document.createElement("p");
  p.innerText = `${element.User}`;
  document.getElementById("resultado").append(p);
  if(element.Img){
    p.classList.add("userGithub")
    p.innerHTML += `<img src="${element.Img}">`;
  }
};

//Registro via GitHub.
function logInWithGithub(){
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    let email = result.user.providerData[0].email;
    let id = email.slice(0,email.indexOf("@"));
    let userRef = firebase.database().ref(`Usuarios/${id}`);
    userRef.set({User:`${email}`, Img:`${result.user.providerData[0].photoURL}`});
  }).catch(function(error) {
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
    var email = error.email;
    var credential = error.credential;
  });
};
//Listener para boton "ENTRAR CON GITHUB".
document.getElementById("btnGitHub").addEventListener("click",logInWithGithub);





