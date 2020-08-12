//Ejercicio geolocalización con Google-Maps.
//Hay que introducir la API KEY obtenida de "https://developers.google.com/maps/documentation/javascript/get-api-key?hl=ES" en el script del HTML.
//Promesa para obtener disponibilidad de la geolocalización del ordenador y devolver los datos de latitud y longitud.
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
      reject(console.warn("ERROR, geolocalizacion no disponible."))
    }
  })
}

//Función para crear el mapa de Google Maps centrado en la ubicación del ordenador y añadir un marker.
//La función es llamada en el script del HTML.
function initMap(){
  var map
  getGeolocation()
  .then(function(obj){
    console.log(`Te encuentras en :
    latitud: ${obj.lat} 
    longitud: ${obj.lon}`)
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: obj.lat, lng: obj.lon},
      zoom: 15
    });
    var marker = new google.maps.Marker({
      position: {lat: obj.lat, lng: obj.lon},
      map: map,
      title: "!Aquí estas¡"
    });   
  })  
}
