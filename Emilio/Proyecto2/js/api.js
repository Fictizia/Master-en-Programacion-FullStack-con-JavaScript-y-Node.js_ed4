////Script dedicado para iniciar google maps y el buscador de establecimientos. Se utiliza tambien firebase para añadir los favoritos.

// Utilizaremos los datos que nos da la api de google place para que nos devuelva un json de los datos 
// de los establecimientos que busquemos. Podremos buscar por tipo establecimiento o nombre del mismo.
// Una vez buscados, hacemos click encima del elemento que hemos buscado y aparecerá una ventana con los
// datos del establecimiento y un boton para añadir. 

export function initMap() {

    let location = new Object();
    /// Capturamos la localización del navegador para situarnos en el mapa.

    navigator.geolocation.getCurrentPosition(position => {

        location.lat = position.coords.latitude;
        location.lng = position.coords.longitude;
        const localizacion = {
            lat: location.lat,
            lng: location.lng
        };
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: location.lat,
                lng: location.lng
            },
            zoom: 14
        });
        console.log(map, "mapa")
        console.log(localizacion)


        // Creando el search box 
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        console.log("lo que buscamos", searchBox);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Sesga los resultados de SearchBox hacia la vista del mapa actual.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        // Escucha el evento que se dispara cuando el usuario busca un establecimiento hace una llamada a la api place, y nos da un json con datos.

        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();
            console.log("places searchbox", places);
            if (places.length == 0) {
                console.warn("no hay datos disponibles");
                alert("no hay datos disponibles");
                return;
            }

            //// recogemos los datos para pintar la ventana info
            places.forEach(function (place) {
                console.log("lugares", places)
                console.log("resultados for", place);
                let content = `
                        <h2>${place.name}</h2>
                        <h3>${place.formatted_address}</h3>
                        <h4>Número de opiniones: ${place.user_ratings_total}</h4>
                        <h4>Reputación sobre cinco: ${place.rating}</h4>
                    `;

                // Creamos el contenedor y el boton añadir con su funcion añadir favoritos.   
                const container = document.createElement('div');
                const button = document.createElement('button');
                button.setAttribute("id", "añadir");
                container.innerHTML = content;
                button.innerHTML = 'SOY TU FAVORITO';

                // Evento que al pulsar el boton realizamos el añadido de base de datos firebase y lista favoritos

                button.addEventListener('click', (ev) => {
                    console.log("pulsado", ev, guardar);

                // añadimos los favoritos a firebase database en funcion del usuario que este logueado
                    const userId = firebase.auth().currentUser.uid;
                    var estId = place.place_id
                    console.log("userID", userId);
                    var favoritos = firebase.database().ref(userId).child('/favoritos/' + estId);
                    console.log(estId)
                    favoritos.set(guardar);
                    alert("tu favorito ha sido añadido satisfactoriamente");
                    
                });
                
                container.appendChild(button);

                // array de datos para la base de datos firebase
                var guardar = {
                    nombre: place.name,
                    direccion: place.formatted_address,
                    id: place.place_id,
                    rating: place.rating,
                    n_rating: place.user_ratings_total
                };


                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                ///icono del marker
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                //creando el objeto de la ventanainfo, y que recoja los datos del foreach
                var infoVentana = new google.maps.InfoWindow({
                    content: container
                });


                console.log('Content: ', infoVentana.content);

                // Creando el marker por cada uno de los establecimientos. He cambiado el tema del push para que me funcione

                var marker = new google.maps.Marker({
                    position: place.geometry.location,
                    icon: icon,
                    map: map,
                    title: place.name
                });
                console.log("marker", marker);
                console.log("ventana", infoVentana);

                creandoInfoVentana(marker, map, infoVentana);

            });

            // Creando la ventana de la info del establecimiento
            function creandoInfoVentana(marker, map, infoVentana) {
                marker.addListener('click', function () {
                    infoVentana.open(map, this);
                });
            }
        });
    });
   
}