page.base('/AireMAD');
page('/index', index);
page('/estaciones', stations);
page('/estaciones/:id', stationID);
page();

const urlStation = "http://airemad.com/api/v1/station";


function index(){
    document.querySelector('section').textContent = 'Bienvenidos al visor de estaciones de AireMAD';
}

function stations(){
    document.querySelector('section').textContent = 'Estaciones';
    airemad(urlStation)
        .get()
        .then(data => {
            console.log(data);
            data.forEach(element => {
                document.querySelector('section').innerHTML += `<p><a href="./estaciones/${element.id}">${element.nombre_estacion}</a></p>`;
            }); 
        })
}

function stationID() {
    document.querySelector('section').innerHTML = '';
    document.querySelector('section').innerHTML += `<p>DENTRO</p>`;
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



