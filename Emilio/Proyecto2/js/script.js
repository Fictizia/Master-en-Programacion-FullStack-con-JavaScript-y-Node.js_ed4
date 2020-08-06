// Your web app's Firebase configuration
export var firebaseConfig = {
    apiKey: "APIKEY",
    authDomain: "find-place-369b7.firebaseapp.com",
    databaseURL: "https://find-place-369b7.firebaseio.com",
    projectId: "find-place-369b7",
    storageBucket: "find-place-369b7.appspot.com",
    messagingSenderId: "561570713110",
    appId: "1:561570713110:web:a24cd18b10efd1aec02f37"
};

/// Registro con tu cuenta de github
export function registrar() {
    const provider = new firebase.auth.GithubAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider).then(result => {
        console.log("resultado", result);
        var authData = result.user.providerData[0];
        console.log("authdata", authData);
        var ruta = result.user.uid;
        var usuario = authData.uid;
        const formulario = firebase.database().ref(ruta).child("datos");
        formulario.orderByChild('uid')
            .equalTo(usuario)
            .once('value', snap => {
                const usuarioYaRegistrado = snap.val();
                if (usuarioYaRegistrado !== null) {
                    const alerta = `<div class="alerta" role="alert">
                <strong>Bienvenido!! </strong>${authData.email}!! Espero que encuentres lo que buscas</div>`
                    document.getElementById('alerta').innerHTML = alerta;
                } else {
                    console.log("authData:", authData)
                    formulario.push(authData);
                }
            });
    }).catch(error => {
        console.warn("error de login", error);
    });
}

//// desloguearse de tu sesion 
export function salir() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Se ha deslogueado correctamente");
        alert("se ha deslogueado correctamente");
    }).catch(function (error) {
        console.log("Errores ")
        // An error happened.
    });
};

//// darme lista de favoritos de la base de datos firebase

export function recogerDatos() {
    console.log("pulsado recoger datos");
    const userId = firebase.auth().currentUser.uid;
    let elemento = firebase.database().ref(userId).child('/favoritos/');
    console.log("elemento en recogerdatos", elemento);
    let fixed = document.getElementById("datosGuardados");

    elemento.on('value', (snapshot) => {
        console.log("antes del foreach", snapshot.val());
  
        if (snapshot.val() === null && !fixed.innerHTML) {
            alert("no tienes nada guardado en tu lista de favoritos")
        } else {
            fixed.innerHTML = '';
            snapshot.forEach((childSnapshot) => {
                var datos = childSnapshot.val();
                console.log("datos", datos);
                var id = datos.id;
                const card = document.createElement('div');
                card.classList.add('basefire');
                card.innerHTML = `
                                
                                <h2>${datos.nombre}</h2>
                                <h3>${datos.direccion}</h3>
                                <p>Número de opiniones: ${datos.n_rating}</p>
                                <p>Reputación sobre cinco: ${datos.rating}</p>
                                <button id="borrar" class="delete-button" type="button" >Borrar de la lista</button>`;
                      
             ///// al pulsar boton borrar de la lista, borra de la base de datos esa localizacion.                   
                card.addEventListener('click', () => {
                  const userId = firebase.auth().currentUser.uid;
                  var borrar = firebase.database().ref(userId).child('/favoritos/' + datos.id);
                  borrar.remove();
                });
               
                fixed.appendChild(card);
            })
        }

    });
};
