// 2. - Sacar en el html el tiempo meteorológico de Madrid, Barcelona y Valencia.
// Nota: http://openweathermap.org te será de gran ayuda, busca la solución al error 401

// Hace falta generarse una API key
// APIKey = '', // Puedes usar una cuenta gratuita -> http://openweathermap.org/price
// cURL = 'http://api.openweathermap.org/data/2.5/weather?q='+ciudad+'&APPID='+APIKey;

let keyAPI = "05f3456b1919e72ca3e9522bc35bcee3";
let urlAPI =
	"http://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&APPID=" +
	keyAPI;

let locations = [
	{
		name: "Madrid",
		url: urlAPI + "&q=madrid"
	},
	{
		name: "Valencia",
		url: urlAPI + "&q=valencia"
	},
	{
		name: "Barcelona",
		url: urlAPI + "&q=barcelona"
	}
];

let ejercicio2Content = document.getElementById("ejercicio2Content");
let ejercicio2Button = document.getElementById("ejercicio2Button");

function cToF(celsius) {
	var cTemp = celsius;
	var cToFahr = (cTemp * 9) / 5 + 32;
	var message = cTemp + "\xB0C is " + cToFahr + " \xB0F.";
	console.log(message);
}

function fToC(fahrenheit) {
	var fTemp = fahrenheit;
	var fToCel = ((fTemp - 32) * 5) / 9;
	var message = fTemp + "\xB0F is " + fToCel + "\xB0C.";
	console.log(message);
}

function peticionAjax(url) {
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 1) {
			let loadingElem = document.createElement("div");
			loadingElem.setAttribute("id", "loading");
			let loadingText = document.createTextNode("...");

			loadingElem.appendChild(loadingText);
			document.body.appendChild(loadingElem);
		} else if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			let url = JSON.parse(xmlHttp.responseText);
			setData(url);
			// remove element loading
			let loading = document.getElementById("loading");
			document.body.removeChild(loading);
		} else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
			console.error("ERROR! 404");
			console.info(JSON.parse(xmlHttp.responseText));
		}
	};
	xmlHttp.open("GET", url, true);
	xmlHttp.send();
}

function locationsButtons() {
	let navElem = document.createElement("ul");
	navElem.setAttribute("class", "navigation-weather");

	for (let index = 0; index < locations.length; index++) {
		const element = locations[index];
		// const name = element["name"];
		// const url = element["url"];
		const name = element.name;
		const url = element.url;
		console.log(name, url);

		let itemElem = document.createElement("li");
		itemElem.setAttribute("data-index", index + 1);

		let buttonElem = document.createElement("button");
		let buttonText = document.createTextNode(name);
		buttonElem.setAttribute("class", "navigation-weather__button");
		buttonElem.setAttribute("data-url", url);
		buttonElem.appendChild(buttonText);

		itemElem.appendChild(buttonElem);
		navElem.appendChild(itemElem);

		ejercicio2Content.appendChild(navElem);

		buttonElem.addEventListener("click", function () {
			this.classList.add("is-disabled");
			peticionAjax(url);
		});
	}

	let contentElem = document.createElement("div");
	contentElem.setAttribute("class", "location-weather");
	contentElem.setAttribute("id", "locationWeather");
	ejercicio2Content.appendChild(contentElem);
}

function setData(object) {
	// console.info(object);
	let location = document.createElement("div");

	for (const key in object) {
		const id = object.id;
		const name = object.name;
		const country = object.sys.country;
		const latitude = object.coord.lat;
		const longitude = object.coord.lon;
		const timezone = object.timezone;
		const sunrise = object.sys.sunrise;
		const sunset = object.sys.sunset;
		const windSpeed = object.wind.speed;
		const windDeg = object.wind.deg;
		const visibility = object.visibility;
		const iconImage = object.weather[0].icon;
		const iconDescription = object.weather[0].description;
		const temp = object.main.temp;
		const pressure = object.main.pressure;
		const humidity = object.main.humidity;
		const tempMin = object.main.temp_min;
		const tempMax = object.main.temp_max;

		location.setAttribute("data-id", id);
		location.setAttribute("class", "location-weather__item");
		let stylesNameDescription = `
			font-size: 1rem;
			display: inline-block;
			color: #454545;
		`;

		let template = `
				<hr>
				<h2 class="location-weather__name">
					${name}, ${country}
					<span class="location-weather__name--description" style="${stylesNameDescription}">
						(ciudad, pais)
					</span>
				</h2>
				<div class="location-weather__coords location-weather__group ">
					<h3 class="location-weather__data-title">
						Geolocalizacion de la ciudad:
					</h3>
					<ul class="location-weather__data-list">
						<li class="location-weather__latitude">
							<strong>
								Latitud: 
							</strong>
							${latitude}
						</li>
						<li class="location-weather__longitude">
							<strong>
								Longitud: 
							</strong>
							${longitude}
						</li>
					</ul>
					<p>
						<strong>
							Zona horaria:
						</strong>
						${timezone}
					</p>
					<p>
						<strong>
							Hora del Amanecer:
						</strong>
						${sunrise}
					</p>
					<p>
						<strong>
							Hora de la puesta de sol:
						</strong>
						${sunset}
					</p>
				</div>
				<div class="location-weather__description location-weather__group">
					<i class="location-weather__icon" title="${iconDescription}" style="background-image: url('http://openweathermap.org/img/wn/${iconImage}.png')"></i>
					<h3 class="location-weather__data-title">
						Tiempo: ${iconDescription}
					</h3>
					<ul class="location-weather__data-list">
						<li>
							<strong>
								Visibilidad:
							</strong>
							${visibility}
						</li>
					</ul>
				</div>
				<div class="location-weather__wind location-weather__group">
					<h3 class="location-weather__data-title">
						Viento:
					</h3>
					<ul class="location-weather__data-list">
						<li>
							<strong>
								Velocidad del viento:
							</strong>
							${windSpeed}m/s
						</li>
						<li>
							<strong>
								Direccion del viento:
							</strong>
							${windDeg}°
						</li>
					</ul>
				</div>
				<div class="location-weather__group">
					<div class="location-weather__wind">
						<h3 class="location-weather__data-title">
							Temperatura: ${temp}°C
						</h3>
						<ul class="location-weather__data-list">
							<li>
								<strong>
									Presion:
								</strong>
								${pressure}hPa
							</li>
							<li>
								<strong>
									Humedad:
								</strong>
								${humidity}%
							</li>
							<li>
								<strong>
									Temperatura mínima:
								</strong>
								${tempMin}°C
							</li>
							<li>
								<strong>
									Temperatura máxima:
								</strong>
								${tempMax}°C			
							</li>
						</ul>
					</div>
				</div>
				<hr>
		`;

		if (!document.querySelector(".location-weather__item[data-id='"+ id +"']")) {
			location.innerHTML = template;
			document.querySelector("#locationWeather").appendChild(location);
		}
	}
}

ejercicio2Button.addEventListener("click", function () {
	if (ejercicio2Content.innerHTML == "") {
		locationsButtons();
	}
});
