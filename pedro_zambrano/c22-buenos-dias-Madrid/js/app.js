function plzaEspaña_pollution() {
    const pollution = "http://airemad.com/api/v1/pollution/S004";

    fetch(pollution)
    .then(res => res.json())
    .then( data => {
        // console.log(data);
        document.getElementById("site").innerText = data.name;
        document.getElementById("pollution").innerHTML = '<h3 class="pollution">Poluciones</h3>';
        for( var pollution in data) {
            // console.log(data[pollution]);
            if (data[pollution].parameter != undefined) {
                document.getElementById("pollution").innerHTML +=  `<p><b>${data[pollution].parameter} (${data[pollution].abrebiation}):</b> ${data[pollution].values[0].valor} medido por ${data[pollution].technique} </p>`;
            }   
            
           
        }
    
    })
}

function plzaEspaña_weather() {
    const weather = "http://airemad.com/api/v1/weather/S004";

    fetch(weather)
    .then(res => res.json())
    .then( data => {
        // console.log(data);
        document.getElementById("weather").innerHTML +=    `<h3 class="weatherDescription"> ${data.list[0].weather[0].description} </h3>
                                                            <p> ${data.list[0].main.temp}ºC </p>
                                                            <p> Min ${data.list[0].main.temp_min}ºC | Max ${data.list[0].main.temp_max}ºC </p>
                                                            <p> Hum ${data.list[0].main.humidity}% | Pres ${data.list[0].main.pressure} psi </p>
                                                            <p> Viento ${data.list[0].wind.deg}º | ${data.list[0].wind.speed} km/h </p>
                                                            `;
    })
}

//CAMERAS PLAZA ESPAÑA

function cameras() {
    var cameras_image = ["http://informo.munimadrid.es/cameras/Camara01313.jpg?v=96700","http://informo.munimadrid.es/cameras/Camara09301.jpg?v=96700"];

    document.getElementById("cameras").src = cameras_image[0];
    setTimeout(() => {
        document.getElementById("cameras").src = cameras_image[1];
    }, 3000);

}
function cameras_delay() {
    cameras();
    setInterval(cameras, 6000);
}

plzaEspaña_pollution();
plzaEspaña_weather();
cameras_delay();

    




