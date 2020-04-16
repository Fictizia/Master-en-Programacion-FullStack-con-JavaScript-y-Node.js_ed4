/**
 * @file 
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright 2020
 * @see {@link https://github.com/beatrizsmerino/exercises-javascript-node}
 */





/**
 * @const rootFolder
 * @description The folder route to this exercise
 * @type {String}
 * @see Used in: {@link disableF5}
 */
const rootFolder = "/class-30/ejercicios/routing/";



/**
 * @const urlAPI
 * @description The API route 'airemad'
 * @type {String}
 * @see Used in: {@link setContentPageStations}, {@link setContentPageStation}
 */
const urlAPI = "http://airemad.com/api/v1/";





/**
 * @const optionsAPI
 * @description The allowed data parameters of API route 'airemad'
 * @type {Object}
 * @see Used in: {@link setContentPageStations}, {@link setContentPageStation}
 */
const optionsAPI = {
	"stations": "station/",
	"pollution": "pollution/",
	"weather": "weather/",
	"pollen": "pollen/",
	"acustic": "acustic/"
};
// console.log(optionsAPI.station);





/**
 * @function getData
 * @description Request with promise and fetch
 * @param {String} url
 * @see Used inside: {@link removeContent}, {@link addLoader}, {@link removeLoader}, {@link setContentPageError404}
 * @see Used in: {@link setContentPageStations}, {@link setContentPageStation}
 */
const getData = (url) => {
	return new Promise((resolve, reject) => {
		removeContent();
		addLoader();

		fetch(url)
			.then(response => {
				if (response.status === 200) {
					let timer = setInterval(function () {
						// console.log(`Estado del Servidor: ${response.status === 200 ? "OK" : "NOT OK"}`);
						removeLoader();
						resolve(response.json())
						clearInterval(timer);
					}, 1000);
				} else if (response.status === 404) {
					let timer = setInterval(function () {
						setContentPageError404();
						clearInterval(timer);
					}, 1000);
				}
			})
			.catch(() => {
				reject(`Error al localizar URL`);
			});
	});
};





/**
 * @function removeContent
 * @description Remove content of the app
 * @see Used in: {@link getData}
 */
function removeContent() {
	document.getElementById("app").innerHTML = "";
}





// LOADER
//////////////////////////////////

/**
 * @function addLoader
 * @description Add loading animation.
 * @see Used in: {@link getData}
 */
function addLoader() {
	let loader = document.getElementById("loader");
	if (!loader) {
		let loader = document.createElement("div");
		loader.setAttribute("id", "loader");
		loader.setAttribute("class", "loader");
		document.body.appendChild(loader);
	}
}


/**
 * @function removeLoader
 * @description Remove loading animation.
 * @see Used in: {@link getData}
 */
function removeLoader() {
	let loader = document.getElementById("loader");
	if (loader) {
		document.body.removeChild(loader);
	}
}





/**
 * @function disableF5
 * @param {Event} e - Event
 * @description Disable refresh page with javascript on press key F5
 * get keyCode -> https://keycode.info/
 * @see Use inside: {@link rootFolder}, {@link setRouter}
 * @see Use in: {@link functionAnonimAutoExecuted}
 **/

function disableF5(e) {
	if ((e.which || e.keyCode == 116)) {
		window.location.href = rootFolder + "index.html";
		setRouter();
		// e.preventDefault();
	}
};