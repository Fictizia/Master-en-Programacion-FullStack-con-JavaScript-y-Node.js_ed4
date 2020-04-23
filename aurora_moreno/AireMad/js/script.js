/**

 * @fileoverview Información climática y de contaminación de diferentes lugares de Madrid capital.


 * @version                               1.0.0


 * @author                 Aurora Moreno 


 *

        */





var ids = [];

const pollUrl = 'http://airemad.com/api/v1/pollution';

const weathUrl = 'http://airemad.com/api/v1/weather';

var selectecId = "";

var principalBox = document.createElement('div');
principalBox.setAttribute('id', 'firstBox');

  var main = document.getElementById('mainContent');

pollData(pollUrl);



/**
 * getHandler() Clousure function, usada para ejecutar la lectura de datos independientemente de cada dirección.
 * @param  {number} i "Variable que itera sobre las diferentes direcciones"
 * @param  {Array} pollInfo "Datos de los diferentes lugares a traves de la api de airemad.com..."
 * @yields {function} Retorna una función anónima para permitir la individualidad de cada dirección al ser pulsadas
 */

function getHandler(i, pollInfo) {

    return function handler() {

        document.getElementById('menu').style.display = 'none';
      

        var pollutionInfo = document.createElement('div');
        pollutionInfo.setAttribute("id", "pollutionBox")

        var name = document.createElement("h2");
        name.innerText = pollInfo[i].name ;

        var line = document.createElement('hr');


        main.appendChild(name);
        main.appendChild(line);
        main.appendChild(principalBox);

        var state = pollInfo[i];
        selectecId = pollInfo[i].id;


        for (var dates in state) {
            if (dates !== "id" && dates !== "name") {
                var description = document.createElement("h3");
                description.innerText = state[dates].parameter + "(" + state[dates].abrebiation + ")";
                pollutionInfo.appendChild(description);

                var technique = document.createElement("p");
                technique.innerText = +state[dates].values[0].valor + "µg/m3 " + state[dates].technique;
                pollutionInfo.appendChild(technique);

            }

        }


        main.removeChild(main.childNodes[1]);

        principalBox.appendChild(pollutionInfo);

        weathData(weathUrl)


    };



}


/**
 * Usada para sacar los datos principales y los datos de contaminación 
 * @param  {string} pollUrl "Url utilizada para sacar los datos de las direcciones y los datos de polución"
 */

function pollData(pollUrl) {

    fetch(pollUrl)
        .then(res => res.json())
        .then(pollInfo => {

            for (let i in pollInfo) {
                ids.push(pollInfo[i].id);
                var spaceContent = document.createElement('div');
                spaceContent.setAttribute('class', 'indvContent');
                spaceContent.setAttribute('id', pollInfo[i].id);

                var namePlace = document.createElement('a');

                namePlace.innerText = pollInfo[i].name;

                document.getElementById('content').appendChild(spaceContent);

                spaceContent.appendChild(namePlace);

                spaceContent.addEventListener("click", getHandler(i, pollInfo));

            }

        })

        .catch(error => console.error('error:', error));
}



/**
 * Función utilizada para sacar los datos relacionados con el clima
 * @param  {string} weathUrl "Url utilizada para sacar la información del clima"
 */


function weathData(weathUrl) {

    fetch(weathUrl)
        .then(res => res.json())

        .then(weathInfo => {
            for (let i = 0; i < weathInfo.length; i++) {
                if (selectecId === weathInfo[i].id) {
                    var weatherContent = document.createElement("div");
                    weatherContent.setAttribute("id", "weatherBox");
                    var weatherDescription = document.createElement("h3");

                    weatherDescription.innerText = weathInfo[i].list[0].weather[0].description;

                    weatherContent.appendChild(weatherDescription);
                    principalBox.appendChild(weatherContent);

                    var dates = weathInfo[i].list[0].main;

                    var iconPrin = document.createElement("i");
                    iconPrin.className = "owf owf-" + weathInfo[i].list[0].weather[0].id + " owf-5x owf-pull-left owf-border";

                    weatherContent.appendChild(iconPrin);

                    for (let i in dates) {
                        if (i !== "temp_kf" && i !== "sea_level" && i !== "grnd_level") {
                            if (i === "temp" || i === "feels_like" || i === "temp_min" || i === "temp_max") {
                                var temp = document.createElement("p");
                                temp.innerText = i + " " + dates[i] + "°C";
                                weatherContent.appendChild(temp);

                            } else if (i === "humidity") {
                                var humidity = document.createElement("p");
                                humidity.innerText = "Humedad:" + " " + dates[i] + "%";
                                weatherContent.appendChild(humidity);

                            } else if (i === "pressure") {
                                var pressure = document.createElement("p");
                                pressure.innerText = "Presión:" + " " + dates[i] + "psi";
                                weatherContent.appendChild(pressure);
                            }
                        }

                    };


                    var wind = document.createElement("p");
                    wind.innerText = "Viento " + weathInfo[i].list[0].wind.speed + "km/h " + weathInfo[i].list[0].wind.deg + "°";
                    weatherContent.appendChild(wind);


                    var futureWeather = weathInfo[i].list;




                }


            }


            var futureBox = document.createElement("div");
            futureBox.setAttribute("id", "futureWeatherBox");

            document.getElementById('mainContent').appendChild(futureBox);
            var dias = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
            var fecha = new Date;

            var day = fecha.getUTCDay();



            for (let i = 0; i < futureWeather.length; i++) {
                var time = futureWeather[i].dt_txt.slice(11, 19);

                if (time === "00:00:00") {
                    var indvFutureWeather = document.createElement('div');
                    indvFutureWeather.setAttribute("class", 'indvFutWeather');


                    var indvDate = futureWeather[i].dt_txt.slice(0, 10);
                    var indvDateBox = document.createElement("h4");
                    day++

                    indvDateBox.innerText = dias[day] + " " + indvDate;

                    var icon = document.createElement("i");
                    icon.className = "owf owf-" + futureWeather[i].weather[0].id + " owf-5x owf-pull-left owf-border";
                 

                    var indTemp = document.createElement("h5");
                    indTemp.innerText = "Temperatura:" + futureWeather[i].main.temp+'° '+ "Temperatura máxima:" + futureWeather[i].main.temp_max +'°';
                    
                    futureBox.appendChild(indvFutureWeather);
                    indvFutureWeather.appendChild(icon);
                    indvFutureWeather.appendChild(indvDateBox);
                    indvFutureWeather.appendChild(indTemp);
                }
            }
        })
        .catch(error => console.error('error:', error));
};



/**
 * Función anonima utilizada para el buscador por nombre de la página.
 */
function buscador() {
    let input = document.getElementById('searchBox');
    let filter = input.value.toUpperCase();
    let cont = document.querySelectorAll('.indvContent');
    let name = document.querySelectorAll('.indvContent > h3');

    for (let i = 0; i < name.length; i++) {

        let txt = name[i].innerText.toUpperCase();

        if (txt.indexOf(filter) <= -1) {
            document.getElementById('content').removeChild(cont[i]);
        }

    }
    if (filter === '') {
        document.getElementById('content').innerText = '';
        pollData(pollUrl);
    }
}

document.getElementById('searchBox').addEventListener('keyup', buscador);

