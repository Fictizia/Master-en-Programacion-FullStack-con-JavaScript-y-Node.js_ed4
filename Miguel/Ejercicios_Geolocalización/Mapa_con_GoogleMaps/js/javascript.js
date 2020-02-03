//Ejercicio geolocalización con Google-Maps.
//Hay que introducir la API KEY obtenida de "https://developers.google.com/maps/documentation/javascript/get-api-key?hl=ES" en el script del HTML.
//Variables para guardar latitud y longitud del ordenador y los datos del mapa creado con Google Maps.
var map;
var lat;
var lon;

//Promesa para obtener disponibilidad de la geolocalización del ordenador y devolver los datos de latitud y longitud.
function miPromesa(){
  return new Promise(function(resolve,reject){
    if("geolocation" in navigator){
      console.log("Geolocalización disponible.");  
      navigator.geolocation.getCurrentPosition(function(position){        
        resolve(
          lat = position.coords.latitude,
          lon = position.coords.longitude  
        )
      })
    }else{
      reject(console.warn("ERROR, geolocalizacion no disponible."))
    }
  })
}

//Función para crear el mapa de Google Maps centrado en la ubicación del ordenador y añadir un marker.
//La función es llamada en el script del HTML.
function initMap(){
  miPromesa()
  .then(function(){
    console.log(`Te encuentras en 
    latitud: ${lat} 
    longitud: ${lon}`)
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lon},
      zoom: 15
    });
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lon},
      map: map,
      title: "!Aquí estas¡"
    });   
  })  
}
