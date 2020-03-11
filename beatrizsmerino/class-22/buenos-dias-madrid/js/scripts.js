/**
 * @file Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





// API airemad
const aireMadAPI = "http://airemad.com/api/v1/";





const getData = async (url) => {
	try {
		const data = await fetch(url);
		const json = await data.json();
		return json;
	} catch (e) {
		console.warn(`Error: ${e}`);
	}
};





function randomData(array) {
	let total = array.length;
	let rand = Math.random();
	let randIndex = Math.floor(rand * total);

	return array[randIndex];
}




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




function createSection(idSection) {
	const section = document.createElement("section");
	section.setAttribute("id", idSection);
	section.setAttribute("class", "page__section");

	return section;
}





function createSectionTitle(textTitle) {
	const titleDOM = document.createElement("h2");
	titleDOM.setAttribute("class", "section__title");
	const titleDOMText = document.createTextNode(textTitle);
	titleDOM.appendChild(titleDOMText);

	return titleDOM;
}





function createSectionSubtitle(textSubtitle) {
	const subtitleDOM = document.createElement("h3");
	subtitleDOM.setAttribute("class", "section__subtitle");
	const subtitleDOMText = document.createTextNode(textSubtitle);
	subtitleDOM.appendChild(subtitleDOMText);

	return subtitleDOM;
}





function setStations() {
	const url = `${aireMadAPI}station/`;
	// console.log(url);

	const dataStations = getData(url)
		.then(data => {
			// console.info("Stations: ", data);

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
		});
}





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

		return measurements[nowHour].valor;
	}
}





function setPollution(idStation) {
	const url = `${aireMadAPI}pollution/${idStation}`;
	// console.log(url);

	const dataPollution = getData(url)
		.then(data => {
			console.info("Pollution: ", data);

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
		});
}





function setNowWeather(idStation) {
	const url = `${aireMadAPI}weather/${idStation}`;
	// console.log(url);

	const dataWeather = getData(url)
		.then(data => {
			// console.info("Weather: ", data);

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
				let text = `<div class="weather">
								<p class="weather__item"><time class="weather__time" datetime="${dataWeather.date}">${dataWeather.date}</time><br> (datos cada 3horas)</p>
								<p class="weather__item"><span class="weather__description">${dataWeather.description}</span> <span class="weather__temperature">${dataWeather.temperature}°C</span></p>
								<p class="weather__item"><strong>Min:</strong> ${dataWeather.temperatureMin}°C | <strong>Max:</strong> ${dataWeather.temperatureMax}°C</p>
								<p class="weather__item"><strong>Humedad:</strong> ${dataWeather.humidity} + % | <strong>Presión:</strong> ${dataWeather.pressure} psi</p>
								<p class="weather__item"><strong>Viento:</strong> ${dataWeather.windDeg}º | ${dataWeather.windSpeed} km/h</p>
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
		});
}





function setForecastWeather(idStation) {
	const url = `${aireMadAPI}weather/${idStation}`;
	// console.log(url);

	const dataWeather = getData(url)
		.then(data => {
			// console.info("Forecast weather: ", data);

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

				let text = `<div class="weather">
								<p class="weather__item"><time class="weather__time" datetime="">${dataWeather.date}</time><br> (datos cada 3horas)</p>
								<p class="weather__item"><span class="weather__description">${dataWeather.description}</span> <span class="weather__temperature">${dataWeather.temperature}°C</span></p>
								<p class="weather__item"><strong>Min:</strong> ${dataWeather.temperatureMin}°C | <strong>Max:</strong> ${dataWeather.temperatureMax}°C</p>
								<p class="weather__item"><strong>Humedad:</strong> ${dataWeather.humidity} + % | <strong>Presión:</strong> ${dataWeather.pressure} psi</p>
								<p class="weather__item"><strong>Viento:</strong> ${dataWeather.windDeg}º | ${dataWeather.windSpeed} km/h</p>
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
		});
}





function getCameraDGT(data) {
	const cameras = data;
	const camera = randomData(cameras);
	return "http://informo.munimadrid.es/cameras/Camara" + camera + ".jpg"
}





function setCameraDGT() {
	const url = './js/camaras-madrid.json';
	// console.log(url);

	const dataCameraDGT = getData(url)
		.then(data => {
			// console.info("Cameras: ", data);

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
		});
}





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