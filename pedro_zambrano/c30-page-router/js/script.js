page.base('/AireMAD');
page('/', index);
page('/estaciones', stations);
page('/estaciones/:id', stationID);
page('*', index);
page();

const urlStations = "http://airemad.com/api/v1/station";

function index(){
    document.querySelector('section').textContent = 'Bienvenidos al visor de estaciones de AireMAD';
}

function stations(){
    document.querySelector('section').textContent = 'Estaciones';
    airemad(urlStations)
        .get()
        .then(data => {
            console.log(data);
            data.forEach(element => {
                document.querySelector('section').innerHTML += `<p><a href="./estaciones/${element.id}">${element.nombre_estacion}</a></p>`;
            }); 
        })
}

function stationID(id) {
    var template = document.getElementById('template').innerHTML;
    document.querySelector('section').innerHTML = '';
    
    airemad(urlStations+"/"+id.params.id)
    .get()
    .then(data => {
        let rendered = Mustache.render(template,{data, name: data.nombre_estacion, adress: data.direccion, latitud: data.latitud, longitud: data.longitud});
        document.querySelector('section').innerHTML = rendered;
    })

   

}

/* AIREMAD */

function airemad(url){
    var stations = new Promise ((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
    })
    
    return {
        get: () => stations
    }
}



