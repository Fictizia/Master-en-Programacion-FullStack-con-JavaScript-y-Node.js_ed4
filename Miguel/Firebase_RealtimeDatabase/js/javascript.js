//Se necesita añadir la api key de OMDB en la url de mas abajo.
//Ejercicio peliculas,series y juegos con Firebase Realtime Database.
//Configuracion e inicializacion de Firebase Realtime Database.
var firebaseConfig = {
  apiKey: "",
  authDomain: "mispeliculas-138a5.firebaseapp.com",
  databaseURL: "https://mispeliculas-138a5.firebaseio.com",
  projectId: "mispeliculas-138a5",
  storageBucket: "mispeliculas-138a5.appspot.com",
  messagingSenderId: "824715534421",
  appId: "1:824715534421:web:7fb875ef895d523330f4dc"
};
firebase.initializeApp(firebaseConfig);

//Referencia a la coleccion de la base de datos.
var ref = firebase.database().ref("/Peliculas");

//Fetch de la pelicula introducida en el input, añadido a evento del boton.
var lista =[];
function search(){
  let title = document.getElementById("textBox").value;
  let url = `http://www.omdbapi.com/?s=${title}&apikey=`;//**AÑADIR API KEY AQUI**
  fetch(url)
  .then(data=>data.json())
  .then(res=>{
    lista = res.Search;
    let resultado = document.getElementById("resultado");
    resultado.style.visibility = "visible";
    resultado.innerHTML="";
    lista.forEach((element,index)=>{
      resultado.innerHTML += `<div><img src="${element.Poster}"><p>Titulo: ${element.Title} </br> Año: ${element.Year} </br> Tipo: ${element.Type}<button id="${index}">Agregar a lista</button></p></div>`;
    });
    addListeners();
  })
  .catch(err=>console.log(`Error: ${err}`))
};
var btn = document.getElementById("btn");
btn.addEventListener("click",search);

//Funcion para añadir los eventos a los botones de las peliculas buscadas.
function addListeners(){
  let botones = document.getElementById("resultado").querySelectorAll("button");
  let arrBotones = Array.from(botones);
  for(let i in arrBotones){
    arrBotones[i].addEventListener("click",function(){
      let refPeli = firebase.database().ref(`Peliculas/${lista[i].Title}`);
      console.log(`"${lista[i].Title}" ha sido añadida a tu lista.`)
      refPeli.set({
        Titulo: lista[i].Title,
        Año: lista[i].Year,
        Tipo: lista[i].Type,
        Imagen: lista[i].Poster,
        Info: `"No has agregado información."`
      })
    })
  }
}

//Lectura de datos de la base y pintarlos en el HTML.
ref.on('value', (snapshot) => {
  document.getElementById("listaPelis").innerHTML = "";
  snapshot.forEach((childSnapshot) => {
      const element = childSnapshot.val();
      pintarPeli(element.Titulo);
  });
  addDeleteListeners();
  addUpdateListeners();
  addGetListeners();
});

//Funcion para pintar en el HTML.
function pintarPeli(titulo){
  let div = document.createElement("div");
  div.innerHTML = `<p>${titulo}</p><button class="get">Ver</button><button class="update">Editar</button><button class="delete">Borrar</button>`;
  document.getElementById("listaPelis").append(div);
}

//Funcion de borrar para los botones "BORRAR".
function deleteFilm(){
  let id = event.target.parentElement.firstChild.textContent;
  let elemento = firebase.database().ref(`Peliculas/${id}`);
  console.log(`Borrada "${id}" de la base de datos.`);
  elemento.remove();
};

//Agregar listeners a los botones "BORRAR".
function addDeleteListeners(){
  let botones = document.querySelectorAll(".delete");
  let arrBotones = Array.from(botones);
  arrBotones.forEach((element)=>element.addEventListener("click",deleteFilm));
};

//Actualizar información sobre la película/serie.
function updateFilmName(){
  let id = event.target.parentElement.firstChild.textContent;
  let elemento = firebase.database().ref(`Peliculas/${id}`);
  let update = prompt(`¿Quieres añadir informacion a ${id}?`);
  elemento.update({Info:update});
  console.log(`Añadida información a la pelicula/serie ${id} => ${update}`);
};

//Agregar listeners para los botones "EDITAR".
function addUpdateListeners(){
  let botones = document.querySelectorAll(".update");
  let arrBotones = Array.from(botones);
  arrBotones.forEach((element)=>element.addEventListener("click",updateFilmName));
};

//Leer los datos y mostrarlo por el HTML.
function getFilmData(){
  let id = event.target.parentElement.firstChild.textContent;
  let elemento = firebase.database().ref(`Peliculas/${id}`); 
  let fixed = document.getElementById("datosPeli");
  elemento.once('value', (snapshot) => {
    let datos = snapshot.val();
    fixed.innerHTML ="";
    fixed.style.visibility = "visible";
    document.getElementById("borroso").style.visibility = "visible";
    fixed.innerHTML += `<img src="${datos.Imagen}"><p>Titulo: ${datos.Titulo} </br> Año: ${datos.Año} </br> Tipo: ${datos.Tipo} </br>Info: ${datos.Info}</p><button id="closeFixed"><img src="img/close24.png" alt="x" /></button>`;
  });
  document.getElementById("closeFixed").addEventListener("click",function(){
    fixed.style.visibility = "hidden";
    document.getElementById("borroso").style.visibility = "hidden";
  });
};

//Agregar eventos para los botones "ver".
function addGetListeners(){
  let botones = document.querySelectorAll(".get");
  let arrBotones = Array.from(botones);
  arrBotones.forEach((element)=>element.addEventListener("click",getFilmData));
};