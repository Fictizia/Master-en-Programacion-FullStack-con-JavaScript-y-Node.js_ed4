document.getElementById("where").addEventListener('click', mapLeaflet);

function mapLeaflet() {

    function position(pos) {
        var latitud = pos.coords.latitude;
        var longitud = pos.coords.longitude;

        var mymap = L.map('mapid').setView([latitud, longitud], 20);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(mymap);

    };

    navigator.geolocation.getCurrentPosition(position);
}



