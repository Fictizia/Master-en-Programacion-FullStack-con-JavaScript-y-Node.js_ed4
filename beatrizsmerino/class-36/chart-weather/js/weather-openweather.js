/**
 * @file Weather with the 'Open Weather API'
 * @module weatherOpenweather
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





// Need API key 'Open Weather'
/**
 * @const module:weatherOpenweather~API
 * @description API root of 'Airemad'
 * @type {String}
 */
const API = "http://api.openweathermap.org/data/2.5/";





/**
 * @const module:weatherOpenweather~API_KEY
 * @description API key of 'Open Weather API'.
 *  * Instrucctions of use:
 * 1. Go to https://home.openweathermap.org/api_keys and generate api key
 * 2. Change the string "XXXXXXXXXXX" for your API KEY
 * @type {String}
 */
const API_KEY = "XXXXXXXXXXX";





/**
 * @function module:weatherOpenweather.getDataByCoords
 * @description Get data weather of the coords with 'Open Weather API'.
 * @param {Object} coords - Coordinates
 * @param {Object} coords.latitude - Coordinates: Latitude
 * @param {Object} coords.longitude - Coordinates: Longitude
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export async function getDataByCoords(coords) {
	const url = `${API}weather?units=metric&lang=es&APPID=${API_KEY}&lat=${coords.latitude}&lon=${coords.longitude}`;
	// console.log(url);

	try {
		const response = await fetch(url);

		switch (response.status) {
			case 200:
				let getData = response.json();
				return getData;
				break;
			default:
				console.warn(`Error: ${response.status}`);
				break;
		}
		// console.info(`Estado del servidor: ${response.status === 200 ? "OK" : "NOT OK"}`);

	} catch (e) {
		throw `Error: ${e}`;
	}
}





/**
 * @function module:weatherOpenweather.getDataByCityName
 * @description Get data of the city with 'Open Weather API'.
 * @param {String} cityName - Name of the city
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export const getDataByCityName = async (cityName) => {
	const url = `${API}weather?units=metric&lang=es&APPID=${API_KEY}&q=${cityName}`;
	const getData = await fetch(url);
	let response = getData.json();

	return response;
};





/**
 * @function module:weatherOpenweather.setWidget
 * @description Set widget of the city with 'Open Weather API'.
 * @param {Object} widgetOptions - Customized widget
 * @param {Object|String} location - Value to search (city name | coords)
 * @see Used inside:
 * - 'weather-openweather.js' -> {@link module:weatherOpenweather~getDataByCityName}, {@link module:weatherOpenweather~getDataByCoords}, {@link module:weatherOpenweather~createWidget}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function setWidget(widgetOptions, location, elementDom) {
	let content = document.querySelector(elementDom);
	let idContentWidgets = "openWeatherWidgets";
	let classContentWidgets = "open-weather-widgets";

	if (!document.querySelector(`#${idContentWidgets}`)) {
		let contentWidgets = document.createElement("div");
		contentWidgets.setAttribute("id", idContentWidgets);
		contentWidgets.setAttribute("class", classContentWidgets);
		document.querySelector(elementDom).prepend(contentWidgets);
	}

	let contentWidgets = document.getElementById(idContentWidgets);
	switch (typeof location) {
		case "string":
			getDataByCityName(location)
				.then(data => {
					let widget = createWidget(widgetOptions, data.id);
					contentWidgets.append(widget);
				});
			break;
		case "object":
			getDataByCoords(location)
				.then(data => {
					let widget = createWidget(widgetOptions, data.id);
					contentWidgets.append(widget);
				});
		default:
			break;
	}
}





/**
 * @function module:weatherOpenweather~createWidget
 * @description Create and insert widget with 'Open Weather API'.
 * @param {Number} cityId - City id
 * @param {Object} options - Customized widget
 * @param {Number} options.widgetType - Type widget style: 
 * (Gold: 1 - 9 | Green: 11 - 19 | Black: 21 -24).
 * The options 1 and 11:
 * Please note that the widget with chart and 8-days forecast available for paid subscriptions.
 * This widget will provide only current weather data for the Free account.
 * @return {Object}
 * @see Used in:
 * @see - 'weather-openweather.js' -> {@link module:weatherOpenweather.setWidget}
 */
function createWidget(options, cityId) {
	window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
	window.myWidgetParam.push({
		id: options.widgetType,
		cityid: cityId,
		appid: API_KEY,
		units: 'metric',
		containerid: `openweathermap-widget-${options.widgetType}`,
	});

	const scriptsUrl = [
		"//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js",
		"//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"
	];

	scriptsUrl.map(scriptUrl => {
		var script = document.createElement('script');
		script.async = true;
		script.charset = "utf-8";
		script.src = scriptUrl;
		document.querySelector("head").appendChild(script);
	});

	return document.createRange().createContextualFragment(`<div id="openweathermap-widget-${options.widgetType}"></div>`);
}