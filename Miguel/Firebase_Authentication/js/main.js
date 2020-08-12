// Ejercicio autenticacion con Firebase.
import {borrarUser, pintarUsers} from './bbdd.js'
import {app, firebaseConfig} from './appConfig.js'

//Autenticacion.
//Registrar un usuario.
function registrar(email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    let num = email.indexOf("@")
    let id = email.slice(0,num)
    let userRef = firebase.database().ref(`Usuarios/${id}`)
    userRef.set({User:`${email}`})
    console.log(`Agregado usuario ${email} a Realtime Database`)
  })
  .catch(function(error) {
    var errorCode = error.code
    var errorMessage = error.message
    console.log(errorCode)
    console.log(errorMessage)
  })
}

//Logear user.
function logIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {       
    firebase.auth().currentUser.providerData.forEach(function(profile){
      console.log("Sign-in provider: " + profile.providerId)
      console.log("Provider-specific UID: " + profile.uid)
      console.log("Email: " + profile.email)
    })  
  })
  .catch(function(error) {
    var errorCode = error.code
    var errorMessage = error.message
    console.log(errorCode)
    console.log(errorMessage)
  })
}

//Deslogeo de user.
function logOut(){
  console.log("Saliendo del sistema",firebase.auth().currentUser.email)
  firebase.auth().signOut().then(function(res){
    document.getElementById("currentUser").innerText = `** No hay nadie conectado **`
  }).catch(err => console.log(err))
}

//Listener para boton de "ACCEDER".
document.getElementById("btnLogIn").addEventListener("click",function(){
  let name = document.getElementById("textBox").value
  let pass = document.getElementById("passBox").value
  logIn(name,pass)
})

//Listener para el boton de "REGISTRARSE".
document.getElementById("btnSignUp").addEventListener("click",function(){
  let name = document.getElementById("textBox").value
  let pass = document.getElementById("passBox").value

  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(name)) {
    if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(pass)){
      registrar(name,pass)
    } else {
    console.warn('La contraseña introducida no es valida --> debe contener etre 8 y 16 caracteres y al menos 1 minúscula, una mayúscula y 1 dígito')
    }
  } else {
    console.warn('El correo introducido no es valido --> ej: nombre@demo.com')
  }
})

//Listener para boton de "SALIR".
document.getElementById("btnLogOut").addEventListener("click", logOut)

//Listener para boton de "BORRAR".
document.getElementById("btnRemove").addEventListener("click", borrarUser)

//Listener de conexiones y desconexiones de usuarios.
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Bienvenido! " + user.email)
    document.getElementById("currentUser").innerText = `${user.email}`
  } else {
    console.log("No hay nadie en el sistema")
    document.getElementById("currentUser").innerText = `** No hay nadie conectado **`
  }
})

//Registro via GitHub.
function logInWithGithub(){
  var provider = new firebase.auth.GithubAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken
    let email = result.user.providerData[0].email
    let id = email.slice(0,email.indexOf("@"))
    let userRef = firebase.database().ref(`Usuarios/${id}`)
    userRef.set({User:`${email}`, Img:`${result.user.providerData[0].photoURL}`})
  }).catch(function(error) {
    var errorCode = error.code
    console.log(errorCode)
    var errorMessage = error.message
    console.log(errorMessage)
    var email = error.email
    var credential = error.credential
  })
}

//Listener para boton "ENTRAR CON GITHUB".
document.getElementById("btnGitHub").addEventListener("click",logInWithGithub)
