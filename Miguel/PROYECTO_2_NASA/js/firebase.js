/**
 * @file Archivo con los scripts de Firebase Authentication y Realtime Database
 */

/**
 * Configuracion del proyecto de Firebase
 */
var firebaseConfig = {
  apiKey: "AIzaSyAocTj9tvWhjdUy6EPCjAcWdLeHxCG8T2Q",
  authDomain: "proyecto-nasa-93d77.firebaseapp.com",
  databaseURL: "https://proyecto-nasa-93d77.firebaseio.com",
  projectId: "proyecto-nasa-93d77",
  storageBucket: "proyecto-nasa-93d77.appspot.com",
  messagingSenderId: "255032929039",
  appId: "1:255032929039:web:58da180b05f91282972c7a"
};
/**
 * Inicializacion de Firebase
 */
firebase.initializeApp(firebaseConfig);
/**
 * @const {object} ref referencia a la base de datos de Firebase
 */
const ref = firebase.database().ref(`Users/`);
/**
 *Función para registrar un nuevo usuario en la aplicación
 * @param {string} email email introducido por el usuario, sera su id en la base de datos
 * @param {*} password constraseña elegida por el usuario
 */
function signUp(email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    let id = email.split(/@/);
    let userRef = firebase.database().ref(`Users/${id[0]}`);
    userRef.set({email:`${email}`});
    document.getElementById('actionInfo').innerHTML = `User ${email} sign up successfully`;
  })
  .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

/**
 *Funcción para iniciar sesión de usuario ya registrado para guardar los datos de la aplicacion en la base de datos y poder acceder a ellos
 * @param {string} email email con el que se registro el usuario
 * @param {string} password contraseña elegida por el usuario
 */
function logIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {       
    firebase.auth().currentUser.providerData.forEach(function(profile){
      document.getElementById('actionInfo').innerHTML = `User conected successfully: ${profile.uid}`;
    });  
  })
  .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

/**
 *Función para cerrar sesion del usuario conectado
 */
function logOut(){
  if(firebase.auth().currentUser) {
    let user = firebase.auth().currentUser.email;
    firebase.auth().signOut()
    .then(function(){
      document.getElementById('actionInfo').innerHTML = `User ${user}, disconnected`;
      document.getElementById('myData').innerHTML = "";
    })
    .catch(function(error) {
      document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
    });
  }else {
    document.getElementById('actionInfo').innerHTML = `user not connected`;
  }
}

/**
 * Función para borrar el usuario conectado
 */
function deleteUser(){
  if(firebase.auth().currentUser){
    confirm("Are you sure to delete your user?");
    if(confirm){
      firebase.auth().currentUser.delete();
      let id = firebase.auth().currentUser.email.split(/@/);
      let element = firebase.database().ref(`Users/${id[0]}`);
      element.remove();  
      document.getElementById('actionInfo').innerHTML = `User ${id[0]} was deleted.`;
    }
  } else {
    document.getElementById('actionInfo').innerHTML = `user not connected`;
  }
}

/**
 *Función para registrarse/iniciar sesión mediante una cuenta de Github
 */
function logInWithGithub(){
  let provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    let token = result.credential.accessToken;
    let emailUser = result.user.email;
    let user = emailUser.split(/@/);
    let userRef = firebase.database().ref(`Users/${user[0]}`);
    userRef.set({email:`${emailUser}`});
    document.getElementById('actionInfo').innerHTML = `User ${emailUser} sign up successfully`;
  }).catch((error) => {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

//Listener para los botones de la seccion account
/**
 *Función para agregar listeners a los botones de la sección de 'account' y validar con expresiones regulares el email y la contraseña introducidos
 */
function accountListeners(){
  document.getElementById("btnSignUp").addEventListener("click", function(){
    let name = document.getElementById("textBox").value;
    let pass = document.getElementById("passBox").value;
    if(/^[A-Za-z]+[A-Za-z0-9-_]*@\w+\.[A-Za-z]+\.*[A-Za-z]*\.*[A-Za-z]*/.test(name)){
     if(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(pass)){
        signUp(name,pass);
     } else {
      document.getElementById('actionInfo').innerHTML = `Invalid pass, the password must contain: <br>- a capital letter <br>- a small letter<br>- a number<br>- 8-16 characters<br>- NO other symbols<br>`;
     }
    } else {
      document.getElementById('actionInfo').innerHTML = `Invalid user name, use an e-mail account => example: name@foo.com`;
    }
  });
  document.getElementById("btnLogIn").addEventListener("click",function(){
    let name = document.getElementById("textBox").value;
    let pass = document.getElementById("passBox").value;
    logIn(name,pass);
    });
  document.getElementById("btnLogOut").addEventListener("click", logOut);
  document.getElementById("btnRemove").addEventListener("click", deleteUser);
  document.getElementById("btnGitHub").addEventListener("click", logInWithGithub);
  document.getElementById("btnMyData").addEventListener('click', renderUserData);
}

/**
 * Listener de conexiones/desconexiones de usuarios de Firebase
 */
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    let userName = user.email.split(/@/);
    document.getElementById("titulo").innerText = `${userName[0]}`;
    document.styleSheets[0].addRule(".title__wrapper::after","background-color: rgb(145, 255, 0);box-shadow: 0 0 20px white");
  } else {
    document.getElementById("titulo").innerText = `disconnected`;
    document.styleSheets[0].addRule(".title__wrapper::after","background-color: crimson; box-shadow: none");
  }
});

/**
 *Función para mostrar los datos guardados en Firebase del usuario conectado
 */
function renderUserData() {
  if(firebase.auth().currentUser) {
    let user = firebase.auth().currentUser.providerData[0].email.split(/@/);
    let userFirebaseRef = firebase.database().ref(`Users/${user[0]}`);
    var content = document.getElementById('myData');

    userFirebaseRef.on("value", snapshot => {
      if(snapshot.val().Images) {
        content.innerHTML = `<h3>-Images-</h3>`;
        for(let i in snapshot.val().Images){
          content.innerHTML += `<li><a href="${snapshot.val().Images[i].url}" target="_blank">${snapshot.val().Images[i].title}</a><button class="btnDelete" data-section="Images" data-title="${snapshot.val().Images[i].title}">✖</button></li>`;
        }
      }
      if(snapshot.val().Near_Objects) {
        content.innerHTML += `<h3>-Near Objects-</h3>`;
        for(let i in snapshot.val().Near_Objects){
          content.innerHTML += `<li><a href="${snapshot.val().Near_Objects[i].url}" target="_blank">${snapshot.val().Near_Objects[i].title}</a><button class="btnDelete" data-section="Near_Objects" data-title="${snapshot.val().Near_Objects[i].title}">✖</button></li>`;
        }
      }
      if(snapshot.val().Tech_Transfer) {
        content.innerHTML += `<h3>-Tech Transfer-</h3>`;
        for(let i in snapshot.val().Tech_Transfer){
          content.innerHTML += `<li><a href="${snapshot.val().Tech_Transfer[i].url}" target="_blank">${snapshot.val().Tech_Transfer[i].title}</a><button class="btnDelete" data-section="Tech_Transfer" data-title="${snapshot.val().Tech_Transfer[i].title}">✖</button></li>`;
        }
      }
    });
    listenerUserDataButtons();
  } else {
    throw new Error('user not connected');
  } 
}

/**
 *Función para agregar listeners a los botones para eliminar dato de la sección 'My DATA' del usuario conectado
 */
function listenerUserDataButtons() {
  document.getElementById('myData').addEventListener('click', function(e) {
    if(firebase.auth().currentUser){
      let title =  e.target.dataset.title;
      let section = e.target.dataset.section;
      let user = firebase.auth().currentUser.providerData[0].email.split(/@/);
      let element = firebase.database().ref(`Users/${user[0]}/${section}/${title}`);
      element.remove();
    } else {
      throw new Error('user not connected');
    }
  });
}
/**
 *Función para pintar los usuarios registrados en Firebase en la seccion 'account'
 *Es llamada en router.js
 */
function firebaseUserList() {
  ref.on('value', (snapshot) => {
    if(window.location.pathname == "/account"){
      document.getElementById("userList").innerHTML = "";
      snapshot.forEach((childSnapshot) => {
          let element = childSnapshot.val();
          document.getElementById("userList").innerHTML += `<p>${element.email}<p>`;
      });
    }
  });
}