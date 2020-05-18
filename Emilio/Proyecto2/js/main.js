
import { registrar, salir, firebaseConfig, recogerDatos } from './script.js';
import { initMap } from './api.js';

// Creamos Script, con sus datos correspondientes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=---APIKEY---&callback=initMap&libraries=places';
script.defer = true;
script.async = true;

// llamamos a la fucion initMap con el objeto windows
window.initMap = initMap;

// Append 'script' al elemento 'head'
document.head.appendChild(script);

// iniciamos firebase
firebase.initializeApp(firebaseConfig);

// Evento que al cliclar llamamos funcion registrar
document.getElementById("login").addEventListener("click", registrar);

// Estado de la sesion del usuario

firebase.auth().onAuthStateChanged(function (authData) {
  
  if (authData) {
      console.log("bienvenido " + authData.email)
  } else {
      console.log("no hay ninguna sesion abierta")
  }
});

// Evento para desloguear al hacer click, llamando a la funcion salir
document.getElementById("desloguear").addEventListener("click", salir);

//Evento para pintar los datos que tenemos en la base de datos
document.getElementById("recoger").addEventListener("click", recogerDatos);

