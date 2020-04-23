


function init(position) {
    var mymap = L.map('mapid');

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,

    }).addTo(mymap);

    var browserLat = position.coords.latitude;
    var browserLong = position.coords.longitude;



    marker_actual = L.marker([browserLat, browserLong]).addTo(mymap);
    marker_actual.bindPopup('<b>Hola </b><br>Tu estas aqui').openPopup();
    mymap.setView([browserLat, browserLong], 18);

    console.log(browserLat);
    console.log(browserLong);



};

function error(err) {
    console.error(err);
};

navigator.geolocation.getCurrentPosition(init, error)