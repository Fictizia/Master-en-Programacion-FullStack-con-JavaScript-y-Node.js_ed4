/**
 * @file Funciones para fetch de los datos, render de las gráficas y tablas y listeners para los eventos en estas.
 * @author Miguel Martin-Maestro Lopez
 * @version 1.0.0
 */

 /**
  * @const {string} apiKey API KEY NASA para las llamadas.
  * @see https://api.nasa.gov/
  */
const apiKey = '';// <= API KEY



/**
 * Primer fetch de la imagen del día. 
 * @param {string} url url para fetch a la API APOD de la NASA.
 */
function getImage(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    let template = templates[3].template;
    document.querySelector('.content').innerHTML = template;
    if(data.media_type == "image"){
      let autor = data.copyright ? data.copyright : "";
      document.querySelector('#picture').innerHTML = `<img class="nasaImage" id="nasaImage" src="${data.url}" data-title="${data.title}"><figcaption>${autor} - ${data.title}</figcaption>`;
    } else {
      document.querySelector('#picture').innerHTML = `<p>Image not available or wrong date, try another date.</p>`;
    }
    addImageListeners();
  })
  .catch(err => console.error('Error in fetch getImage', err));
}

/**
 *Listeners para el botón 'search' para buscar imágenes de dias concretos y para el botón de 'save' para guardar la imagen en Firebase.
 */
function addImageListeners() {
  document.getElementById('btnSearch').addEventListener('click', function(){
    let date = document.getElementById('dateSelect').value;
    getImage(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
  });
  document.getElementById('saveImg').addEventListener('click', saveImg);
}

/**
 * Fetch para obtener los datos de objetos cercanos a la tierra, guardarlos en un objeto y renderizar los datos
 * @type {object}
 * @param {string} url url del fetch a la API Asteroids - NeoWs 
 */
var nearObjectsArr = [];

function getNearObjects(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    nearObjectsArr = data.near_earth_objects;
    for(let i in nearObjectsArr) {
      let option = `<option value="${i}">${i}</option>`;
      document.querySelector('#nearObjectSelect').innerHTML += option;
    }
    renderChartAndTable();
    listenersToSelect();
  })
  .catch(err => console.error('Error in fetch getNearObjects', err));
} 

/**
 *Listener para el 'input type=select' de la vista de objetos cercanos a la tierra
 * permite seleccionar uno de los proximos 7 dias, por defecto enseña el dia actual
 * Renderiza la tabla y la gráfica con los datos tras elegir una nueva fecha
 */
function listenersToSelect() {
  document.getElementById('nearObjectSelect').addEventListener('change', () => {
    document.getElementById("nearObjectChart").innerHTML = `<canvas id="myChart"></canvas>`;
    document.getElementById("nearObjectTable").innerHTML = `
      <tr>
        <th>ID</th><th>Distance</th><th>Speed (KM/s)</th><th>Diameter(KM)</th><th>Potentially hazardous</th><th>Link</th><th>Firebase</th>
      </tr>
    `;
    renderChartAndTable();
  });
}

/**
 *Fetch para datos del programa de tranferencia tecnológica de la NASA y pintar la tabla con los datos.
 * @param {string} url url del fetch a la API de Technology Transfer 
 */
function getTechTransfer(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    data.results.forEach(element => {
      document.getElementById('techTransferTable').innerHTML += `
        <tr>
          <td>${element[4]}</td><td>${element[3]}</td><td>${element[5]}</td><td><a href="${element[10]}" target="_blank">IMG</a></td><td><a href="https://technology.nasa.gov/patent/${element[4]}" target="_blank">Read more...</a></td><td><button class="btnStandar" data-title="${element[4]}" data-link="https://technology.nasa.gov/patent/${element[4]}">Save</button></td>
        </tr>
      `;
    });
  })
  .then(() => listenerTechTransferTable())
  .catch(err => {
    console.error('Error in fetch getTechTransfer', err);
    document.getElementById('techTransferTable').innerHTML = `CORS ERROR`;
  });
} 

/**
 *Función para renderizar gráfica y tablas de datos de la funcion getNearObjects()
 *@see https://www.chartjs.org/
 */
function renderChartAndTable() {
  //CHART
  let ctx = document.getElementById('myChart').getContext('2d');
  let dataChart = {
    type: 'bar',
    data: {
      labels: [], 
      datasets: [{
        hoverBackgroundColor: "white",
        margin: "0 auto",
        barPercentage: 0.3,
        borderWidth: 4,
        label: 'Distance to earth (km): ',
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 132, 1)','rgba(255, 99, 64, 1)','rgba(54, 162, 86, 1)','rgba(255, 206, 235, 1)','rgba(75, 192, 255, 1)','rgba(153, 102, 192, 1)','rgba(255, 99, 64, 1)','rgba(255, 159, 132, 1)','rgba(54, 206, 235, 1)','rgba(255, 162, 86, 1)','rgba(75, 102, 192, 1)','rgba(255, 192, 255, 1)','rgba(153, 159, 64, 1)','rgba(54, 99, 132, 1)','rgba(255, 162, 235, 1)','rgba(75, 206, 86, 1)','rgba(255, 192, 192, 1)','rgba(255, 102, 255, 1)','rgba(153, 159, 64, 1)'
        ],
      }]
    },
    options: {legend: {
      labels: {
          fontColor: "white",
          fontSize: 18
      }
      },scales: { yAxes: [ {ticks: {beginAtZero: true}}]}}
  };
  var myChart = new Chart(ctx, dataChart);
  //TABLE
  let currentValues = nearObjectsArr[`${document.getElementById("nearObjectSelect").value}`];
  currentValues.forEach(element => {
    document.getElementById("nearObjectTable").innerHTML += `
      <tr>
        <td>${element.name}</td><td>${element.close_approach_data[0].miss_distance.kilometers}</td><td>${element.close_approach_data[0].relative_velocity.kilometers_per_second}</td><td>${element.estimated_diameter.kilometers.estimated_diameter_max}</td><td>${element.is_potentially_hazardous_asteroid}</td><td><a href="${element.nasa_jpl_url}" target="_blank">Read more...</a></td><td><button class="btnStandar" data-title="${element.name}" data-link="${element.nasa_jpl_url}">Save</button></td>
      </tr>
    `;
    dataChart.data.labels.push(element.name);
    dataChart.data.datasets[0].data.push(element.close_approach_data[0].miss_distance.kilometers);
  });  
  listenerNearObjectsTable();
  myChart.update(); 
}

/**
 *Función para guardar la imagen del fetch getImage() en firebase.
 */
function saveImg() {
  if(firebase.auth().currentUser) {
    let imgSrc = document.getElementById('nasaImage').src;
    let imgTitle = document.getElementById('nasaImage').dataset.title;
    let user = firebase.auth().currentUser.providerData[0].email.split(/@/);
    let userFirebaseRef = firebase.database().ref(`Users/${user[0]}/Images/${imgTitle}`);
    userFirebaseRef.set({ title: imgTitle, url: imgSrc});
  } else {
    throw new Error('user not connected');
  }
}
/**
 *Función para añadir listener a los botones de guardar en Firebase de la tabla de datos de objetos cercanos.
 */
function listenerNearObjectsTable() {
  document.getElementById('nearObjectTable').addEventListener('click', function(e) {
    if(firebase.auth().currentUser){
      let nearObjectTitle =  e.target.dataset.title;
      let nearObjectLink = e.target.dataset.link;
      let user = firebase.auth().currentUser.providerData[0].email.split(/@/);
      let userFirebaseRef = firebase.database().ref(`Users/${user[0]}/Near_Objects/${nearObjectTitle}`);
      userFirebaseRef.set({title: nearObjectTitle, url: nearObjectLink});
    } else {
      throw new Error('user not connected');
    }
  });
}
/**
 *Función para añadir listeners a los botones de guardar en Firebase de la tabla de transferencia tecnólogica.
 */
function listenerTechTransferTable() {
  document.getElementById('techTransferTable').addEventListener('click', function(e) {
    if(firebase.auth().currentUser){
      let techTitle =  e.target.dataset.title;
      let techLink = e.target.dataset.link;
      let user = firebase.auth().currentUser.providerData[0].email.split(/@/);
      let userFirebaseRef = firebase.database().ref(`Users/${user[0]}/Tech_Transfer/${techTitle}`);
      userFirebaseRef.set({title: techTitle, url: techLink});
    } else {
      throw new Error('user not connected');
    }
  });
}