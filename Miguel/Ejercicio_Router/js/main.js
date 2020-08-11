// Ejercicio Router en el Front con page.js y Airemad.
const vista = document.querySelector('#view');

const urlStations = 'http://airemad.com/api/v1/station';

page('/',index);
page('/stations',stations);
page('/stations/:stationId',stationsId);
page('*', notFound);
page();

//Funciones para los enlaces del menú.
function index(){
  vista.textContent = ">Home";
  vista.append(document.createElement("h2"));
  vista.lastChild.textContent = '¡Bienvenido!';
}

function stations(){
  vista.textContent = ">Estaciones";
  vista.append(document.createElement("ul"));
  fetchAireMad(urlStations);
}

function stationsId(ctx){
  vista.textContent = `>Estacion Id`;
  let stationId = ctx.params.stationId.slice(1);
  fetchAireMad(urlStations,stationId);
}

function notFound(){
  vista.textContent = "Página no encontrada. Volviendo a la Home...";
  setTimeout(index,2000);
}

//Fetch para estaciones
function fetchAireMad(url,id){
  if(id){
    url = url + `/${id}`;
    fetch(url)
    .then(data => data.json())
    .then(res =>{
      vista.innerHTML += Mustache.render(document.getElementById("template").innerHTML,res);
    })
    .catch(err => console.log(`Error ${err}`))
  }else{
    fetch(url)
    .then(data => data.json())
    .then(res =>{
    res.forEach(element => { 
      let nameAndId = `${element.nombre_estacion} <span style="font-weight:600">[${element.id}]</span>` ;
      vista.lastChild.innerHTML += `<li>${nameAndId}</li>`;
      });
    })
    .catch(err => console.log(`Error ${err}`))
  }
};

//Crear una sub-lista dentro del último campo del menú con los valores de 'idList'
function loadStations() {
  const stationsIdList = ["P001", "P002", "P003", "S001", "S002", "S004", "S006", "S008", "S011", "S012", "S016", "S017", "S018", "S019", "S024", "S025", "S027", "S028", "S030", "S035", "S036", "S038", "S039", "S040", "S047", "S048", "S049", "S050", "S054", "S055", "S056", "S057", "S058", "S059", "S060"];

  stationsIdList.forEach(function(element){
    let li = document.createElement("li")
    let a = document.createElement("a");
    a.href = '/stations/'+ element;
    a.textContent = element;
    li.append(a);
    document.querySelector(".desplegable ul").append(li);
  })
}

loadStations()
