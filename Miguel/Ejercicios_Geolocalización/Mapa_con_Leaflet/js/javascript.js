//Ejercicio ubicación en el mapa con Leaflet.
//Crear icono de leaflet
var redIcon = L.icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize:     [38, 95], 
  shadowSize:   [50, 64], 
  iconAnchor:   [22, 94], 
  shadowAnchor: [4, 62],
  popupAnchor:  [-3, -76]
});

//Promesa para comprobar acceso a la geolocalización del ordenador y obtener su latitud y longitud.
function getGeolocation(){
  return new Promise(function(resolve,reject){
    if("geolocation" in navigator){
      console.log("Geolocalización disponible.");  
      navigator.geolocation.getCurrentPosition(function(position){        
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude  
        })
      })
    }else{
      reject(console.warn("Error, geolocalización no disponible."))
    }
  })
}

//Funcion que ejecuta la promesa, crea el mapa con la ubicación del ordenador y añade un marker.
(function(){
 getGeolocation()
  .then((obj) => {
    var map = L.map('map').
    setView([obj.lat,obj.lon],
    20);
    console.log(`Tus coordenadas geográficas son:
    Latitud: ${obj.lat}
    Longitud: ${obj.lon}`);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
    }).addTo(map);
    L.marker([obj.lat, obj.lon], {icon: redIcon}).addTo(map).bindPopup("Estas aquí!!");
  })
})();
