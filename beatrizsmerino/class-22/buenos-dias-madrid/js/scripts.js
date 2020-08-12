/**
 * @file Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @constant
 * @description Route of the API
 * @type {String}
 */
const aireMadAPI = "http://airemad.com/api/v1/";




/**
 * @constant
 * @description Get data of one API on format JSON
 * @type {Function}
 * @param {String} url - API route
 * @returns {Object} json
 */
const getData = async (url) => {
	try {
		const data = await fetch(url);
		const json = await data.json();
		return json;
	} catch (e) {
		console.warn(`Error: ${e}`);
	}
};




/**
 * @function randomData
 * @description Get a random value of one array
 * @param {Array} array - Data list on format Arra
 * @returns {Object[]} arrayItem
 */
function randomData(array) {
	let total = array.length;
	let rand = Math.random();
	let randIndex = Math.floor(rand * total);
	let arrayItem = array[randIndex];

	return arrayItem;
}



/**
 * @function clock
 * @description Create and insert a clock in realtime
 */
function clock() {
	const content = document.getElementById("pageHeader");
	const timeDOM = document.createElement("time");

	timeDOM.setAttribute("class", "clock");
	setInterval(() => {
		let nowDate = moment().format('MMMM Do YYYY, HH:mm:ss');
		let timeDOMText = document.createTextNode(nowDate);

		timeDOM.innerHTML = "";
		timeDOM.appendChild(timeDOMText);
		timeDOM.setAttribute("datetime", nowDate);
	}, 100);
	content.appendChild(timeDOM);
}



/**
 * @function createSection
 * @description Create a DOM element for the section with one id and class names
 * @param {string} nameSection - Name of the section for the id and class names
 * @returns {Element} sectionDOM
 */
function createSection(nameSection) {
	const sectionDOM = document.createElement("section");

	sectionDOM.setAttribute("id", nameSection);
	sectionDOM.setAttribute("class", `${nameSection} page__section`);

	return sectionDOM;
}




/**
 * @function createSectionTitle
 * @description Create a DOM element for the title with one class name
 * @param {String} title - Text of title
 * @returns {Element} titleDOM
*/
function createSectionTitle(title) {
	const titleDOM = document.createElement("h2");
	const titleDOMText = document.createTextNode(title);
	titleDOM.setAttribute("class", "section__title");
	titleDOM.appendChild(titleDOMText);

	return titleDOM;
}




/**
 * @function createSectionSubtitle
 * @description Create a DOM element for the subtitle with one class name
 * @param {String} subtitle - Text of subtitle
 * @returns {Element} subtitleDOM
 */
function createSectionSubtitle(subtitle) {
	const subtitleDOM = document.createElement("h3");
	const subtitleDOMText = document.createTextNode(subtitle);

	subtitleDOM.setAttribute("class", "section__subtitle");
	subtitleDOM.appendChild(subtitleDOMText);

	return subtitleDOM;
}




/**
 * @function setStations
 * @description Create and insert a DOM element with the list of data stations of Madrid
 */
function setStations() {
	const url = `${aireMadAPI}station/`;
	// console.log(url);

	const dataStations = getData(url)
		.then(data => {
			// console.info("Stations: ", data);

			if (data >= 400 && data < 600) {
				throw new Error("Bad response from server");
			} else {
				const section = createSection("stations");

				section.appendChild(createSectionTitle("Estaciones de Madrid"));

				const contentDOM = document.createElement("div");
				contentDOM.setAttribute("class", "section__content");

				const articleDOM = document.createElement("article");
				articleDOM.setAttribute("class", "page__article");

				const ulDOM = document.createElement("ul");
				ulDOM.setAttribute("class", "list");
				data.map(item => {
					const id = item.id;
					const name = item.nombre_estacion;
					const address = item.direccion;

					let liDOM = document.createElement("li");
					liDOM.setAttribute("id", id);
					liDOM.setAttribute("class", "list__item");

					let pDOM = document.createElement("p");

					let strongDOM = document.createElement("strong");
					let strongDOMText = document.createTextNode(name);
					strongDOM.appendChild(strongDOMText);

					let addressDOM = document.createElement("address");
					let addressDOMText = document.createTextNode(address);
					addressDOM.appendChild(addressDOMText);

					pDOM.appendChild(strongDOM);
					pDOM.appendChild(addressDOM);

					liDOM.appendChild(pDOM);
					ulDOM.appendChild(liDOM);
				});

				articleDOM.appendChild(ulDOM);
				contentDOM.appendChild(articleDOM);
				section.appendChild(contentDOM);

				document.getElementById("pageMain").appendChild(section);
			}
		});
}




/**
 * @function lastMeasurementPollution
 * @description Get the last measurement of pollution of Madrid
 * @param {Array} item - Station
 * @returns {number}
 */
function lastMeasurementPollution(item) {
	let nowHour = new Date().getHours();
	let measurements = item.values;

	if (
		typeof (measurements) === "object" &&
		Array.isArray(measurements)
	) {

		while (measurements[nowHour].estado !== "Pasado") {
			nowHour--;
			continue;
		}
		let lastValue = measurements[nowHour].valor;

		return lastValue;
	}
}




/**
 * @function setPollution
 * @description Create and insert a DOM element with the pollution data station of Madrid
 * @param {string} idStation - Id name of the station
 */
function setPollution(idStation) {
	const url = `${aireMadAPI}pollution/${idStation}`;
	// console.log(url);

	const dataPollution = getData(url)
		.then(data => {
			// console.info("Pollution: ", data);
			// console.log(data.status);

			if (data >= 400 && data < 600) {
				throw new Error("Bad response from server");
			} else {
				const section = createSection("pollution");
				section.appendChild(createSectionTitle("Estado de la contaminación en Madrid"));

				const contentDOM = document.createElement("div");
				contentDOM.setAttribute("class", "section__content");

				const articleDOM = document.createElement("article");
				articleDOM.setAttribute("class", "page__article");

				articleDOM.appendChild(createSectionSubtitle(`#${data.id}. Estacion de ${data.name}`));

				const ulDOM = document.createElement("ul");
				ulDOM.setAttribute("class", "list");
				for (let key in data) {
					const element = data[key];

					if (typeof (element) === "object" && Array.isArray(element.values)) {
						let lastMeasurement = lastMeasurementPollution(element);

						let dataText;
						if (!lastMeasurement) {
							dataText = "informacion no disponible";
						} else {
							dataText = `<span>${lastMeasurement} μg/m3</span> <span>medido por ${element.technique}</span><br> <em>(${element.period})</em>`;
						}

						let liDOM = document.createElement("li");
						liDOM.setAttribute("class", "list__item");
						let text = `<p><strong>${element.parameter} (${element.abrebiation}):</strong> ${dataText}</p>`;
						let textNode = document.createRange().createContextualFragment(text);
						liDOM.appendChild(textNode);
						ulDOM.appendChild(liDOM);

					} else {
						continue;
					}
				}

				articleDOM.appendChild(ulDOM);
				contentDOM.appendChild(articleDOM);
				section.appendChild(contentDOM);
				document.getElementById("pageMain").appendChild(section);
			}
		});
}




/**
 * @function setNowWeather
 * @description Create and insert a DOM element with the weather data station of Madrid
 * @param {string} idStation - Id name of the station
 */
function setNowWeather(idStation) {
	const url = `${aireMadAPI}weather/${idStation}`;
	// console.log(url);

	const dataWeather = getData(url)
		.then(data => {
			// console.info("Weather: ", data);

			if (data >= 400 && data < 600) {
				throw new Error("Bad response from server");
			} else {
				const section = createSection("weather");

				section.appendChild(createSectionTitle("Estado del tiempo ahora mismo en Madrid"));

				const contentDOM = document.createElement("div");
				contentDOM.setAttribute("class", "section__content");

				const articleDOM = document.createElement("article");
				articleDOM.setAttribute("class", "page__article");

				const dataList = data.list;
				for (let index = 0; index < dataList.length; index++) {
					const element = dataList[index];
					const dataWeather = {
						date: element.dt_txt,
						description: element.weather[0].description,
						humidity: element.main.humidity,
						pressure: element.main.pressure,
						temperature: element.main.temp,
						temperatureMax: element.main.temp_max,
						temperatureMin: element.main.temp_min,
						windDeg: element.wind.deg,
						windSpeed: element.wind.speed
					};
					let text = `<div class="weather-data">
								<p class="weather-data__item"><time class="weather__time" datetime="${dataWeather.date}">${dataWeather.date}</time><br> (datos cada 3horas)</p>
								<p class="weather-data__item"><span class="weather__description">${dataWeather.description}</span> <span class="weather__temperature">${dataWeather.temperature}°C</span></p>
								<p class="weather-data__item"><strong>Min:</strong> ${dataWeather.temperatureMin}°C | <strong>Max:</strong> ${dataWeather.temperatureMax}°C</p>
								<p class="weather-data__item"><strong>Humedad:</strong> ${dataWeather.humidity} + % | <strong>Presión:</strong> ${dataWeather.pressure} psi</p>
								<p class="weather-data__item"><strong>Viento:</strong> ${dataWeather.windDeg}º | ${dataWeather.windSpeed} km/h</p>
							</div>`;

					const nowDate = moment().format('YYYY-MM-DD HH:00:00');
					const nowDateArr = nowDate.split(" ");
					const dateArr = dataWeather.date.split(" ");

					if (nowDateArr[0] === dateArr[0] && nowDateArr[1] === dateArr[1]) {
						let textNode = document.createRange().createContextualFragment(text);
						articleDOM.appendChild(textNode);
						break;
					} else {
						--index;
						let textNode = document.createRange().createContextualFragment(text);
						articleDOM.appendChild(textNode);
						break;
					}
				};

				contentDOM.appendChild(articleDOM);
				section.appendChild(contentDOM);

				document.getElementById("pageMain").appendChild(section);
			}
		});
}




/**
 * @function setForecastWeather
 * @description Create and insert a DOM element with the data of a 4/5 day weather forecast of Madrid
 * @param {string} idStation - Id name of the station
 */
function setForecastWeather(idStation) {
	const url = `${aireMadAPI}weather/${idStation}`;
	// console.log(url);

	const dataWeather = getData(url)
		.then(data => {
			// console.info("Forecast weather: ", data);

			if (data >= 400 && data < 600) {
				throw new Error("Bad response from server");
			} else {
				const section = createSection("forecastWeather");

				section.appendChild(createSectionTitle("Previsión meteorológica de los próximos 4/5 días en Madrid"));

				const contentDOM = document.createElement("div");
				contentDOM.setAttribute("class", "section__content");

				const articleDOM = document.createElement("article");
				articleDOM.setAttribute("class", "page__article");

				const dataList = data.list;
				for (let index = 0, counter = 0; index < dataList.length; index++) {
					const element = dataList[index];
					const dataWeather = {
						date: element.dt_txt,
						description: element.weather[0].description,
						humidity: element.main.humidity,
						pressure: element.main.pressure,
						temperature: element.main.temp,
						temperatureMax: element.main.temp_max,
						temperatureMin: element.main.temp_min,
						windDeg: element.wind.deg,
						windSpeed: element.wind.speed
					};

					const nowDate = moment().format('YYYY-MM-DD HH:00:00');
					const nowDateArr = nowDate.split(" ");
					const dateArr = dataWeather.date.split(" ");

					let text = `<div class="weather-data">
								<p class="weather-data__item"><time class="weather__time" datetime="">${dataWeather.date}</time><br> (datos cada 3horas)</p>
								<p class="weather-data__item"><span class="weather__description">${dataWeather.description}</span> <span class="weather__temperature">${dataWeather.temperature}°C</span></p>
								<p class="weather-data__item"><strong>Min:</strong> ${dataWeather.temperatureMin}°C | <strong>Max:</strong> ${dataWeather.temperatureMax}°C</p>
								<p class="weather-data__item"><strong>Humedad:</strong> ${dataWeather.humidity} + % | <strong>Presión:</strong> ${dataWeather.pressure} psi</p>
								<p class="weather-data__item"><strong>Viento:</strong> ${dataWeather.windDeg}º | ${dataWeather.windSpeed} km/h</p>
							</div>`;


					while (counter < 5) {
						counter++;
						index = index + 7;
						let textNode = document.createRange().createContextualFragment(text);
						articleDOM.appendChild(textNode);
						break;
					}
				};

				contentDOM.appendChild(articleDOM);
				section.appendChild(contentDOM);

				document.getElementById("pageMain").appendChild(section);
			}
		});
}




/**
 * @function getCameraDGT
 * @description Get a image of the random image of the traffic cameras on Madrid
 * @param {Object} data - API data on format JSON
 * @return {string} image
 */
function getCameraDGT(data) {
	const cameras = data;
	const camera = randomData(cameras);
	const image = "http://informo.munimadrid.es/cameras/Camara" + camera + ".jpg";

	return image;
}




/**
 * @function setCameraDGT
 * @description Create and insert a DOM element with the random image of the traffic cameras on Madrid
 */
function setCameraDGT() {
	const url = './js/camaras-madrid.json';
	// console.log(url);

	const dataCameraDGT = getData(url)
		.then(data => {
			// console.info("Cameras: ", data);

			if (data >= 400 && data < 600) {
				throw new Error("Bad response from server");
			} else {
				const section = createSection("camera");

				section.appendChild(createSectionTitle("Una imagen aleatoria del trafico de la ciudad usando las cámaras abiertas de la ciudad."));

				const contentDOM = document.createElement("div");
				contentDOM.setAttribute("class", "section__content");

				const articleDOM = document.createElement("article");
				articleDOM.setAttribute("class", "page__article");

				const image = new Image;
				image.src = getCameraDGT(data);
				articleDOM.appendChild(image);

				contentDOM.appendChild(articleDOM);
				section.appendChild(contentDOM);

				document.getElementById("pageMain").appendChild(section);
			}
		});
}




/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function.
 * @see Use in: {@link clock}, {@link setStations}, {@link setCameraDGT}, {@link getData}, {@link setPollution}, {@link setNowWeather}, {@link setForecastWeather}
 */
(function () {
	clock();
	setStations();
	setCameraDGT();

	getData(aireMadAPI + "station").then(data => {
		const stations = data;
		const station = randomData(stations);

		setPollution(station.id);
		setNowWeather(station.id);
		setForecastWeather(station.id);
	});
})();