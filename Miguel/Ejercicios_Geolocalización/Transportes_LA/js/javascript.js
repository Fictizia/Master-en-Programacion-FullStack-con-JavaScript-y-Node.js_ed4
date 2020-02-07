//Ejercicio transportes Los Angeles.
//Hay que introducir la API KEY obtenida de "https://developers.google.com/maps/documentation/javascript/get-api-key?hl=ES" en el script del HTML.

//Variables para guardar el mapa, los marker y los cluster generados desde la API de Google Maps.
//URL del fetch de los datos de posición (latitud y longitud) de los vehículos e imagen para el marker de los vehículos.
var map;
var markersArr = [];
var markerCluster;
const url = "https://api.metro.net/agencies/lametro/vehicles/";
const image = 'images/bus2_24px.png';

//Función para generar el mapa de Google Maps situado en Los Angeles y un marker en el centro de la ciudad.
//Es llamada desde el script del HTML.
function initMap(){    
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.0459722, lng: -118.2454},
    zoom: 10,
    styles: [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}]
  });
  var marker = new google.maps.Marker({
    position: {lat: 	34.0459722, lng: -118.2454},
    map: map,
    title: "!Los Angeles, California."
  });
}

//Función para hacer fetch de los datos de ubicación de los vehículos y llamar a la funcion markers().
function llamada(url){
  fetch(url)
  .then(res => res.json())
  .then(data => {
    var arr = data.items;
    markers(arr);
  })
  .catch(err => console.warn("Error" + err))
}

//Función para iterar sobre cada vehiculo, obtener su latitud y longitud y generar un marker por cada uno en esa posición.
//También genera los clusters que agruparan markers que estén muy juntos.
function markers(arr){
  for(i = 0; i < arr.length; i++){
    let lat = arr[i].latitude;
    let lng = arr[i].longitude;    
    let busMarker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map,
      icon: image
    });
  markersArr.push(busMarker);
  }
  markerCluster = new MarkerClusterer(map, markersArr,
    {maxZoom: 14,
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

//Llamada a la función del fetch.
llamada(url);  

//Función para actualizar las posiciones de los vehiculos cada 30 segundos y remover los markers y clusters antiguos.
setInterval(() => {
  var i = 0, l = markersArr.length;
  for (i; i<l; i++) {
      markersArr[i].setMap(null)
  }
  markersArr = [];
  markerCluster.clearMarkers();
  llamada(url); 
  console.log("Posición de los vehículos refrescada.");
  },30000
)






