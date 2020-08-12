import {app, firebaseConfig} from './appConfig.js'

//Referencia a Realtime Database.
const ref = firebase.database().ref(`Usuarios/`)

//Listener de cambios en la base de datos.
ref.on('value', (snapshot) => {
  document.getElementById("resultado").innerHTML = ""
  snapshot.forEach((childSnapshot) => {
      let element = childSnapshot.val()
      pintarUsers(element)
  })
})

//Borrar usuario.
export function borrarUser(){
  let control = confirm("¿Seguro que quieres borrar tu usuario?")
  console.log(control)
  if(control){
    let ref = firebase.auth().currentUser
    let user = firebase.auth().currentUser.email
    let id = user.slice(0,user.indexOf("@"))
    let element = firebase.database().ref(`Usuarios/${id}`)
    element.remove()  
    ref.delete().then(function() {
      console.log("Usuario borrado")
    })
    .catch(function(error) {
      console.log(error)
    })
  }
}

//Funcion para pintar los usuarios registrados en el HTML.
export function pintarUsers(element){
  let p = document.createElement("p")
  p.innerText = `${element.User}`
  document.getElementById("resultado").append(p)
  if(element.Img){
    p.classList.add("userGithub")
    p.innerHTML += `<img src="${element.Img}">`
  }
}
