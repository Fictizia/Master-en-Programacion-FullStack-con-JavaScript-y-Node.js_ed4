/**
 * @file Geolocation with the 'HTML5 API'
 * @module geolocation
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires clipboard
 * @requires loader
 * @requires leaflet
 */
import * as clipboard from './clipboard.js';
import * as loader from './loader.js';
import * as leaflet from './leaflet.js';





/**
 * @function module:geolocation~printCoords
 * @description Insert the coordinates in a 'clipboard' component and this in the html.
 * @param {Object} coords - Coordinates
 * @param {Object} coords.latitude - Coordinates: latitude
 * @param {Object} coords.longitude - Coordinates: longitude
 * @param {Function} callback - Function for after print the coordinates
 * @see Used inside:
 * @see - 'clipboard.js' -> {@link module:clipboard.create}
 * @see Used in:
 * @see - 'clipboard.js' -> {@link module:clipboard.set}
 */
function printCoords(coords, callback) {
	const coordsDom = document.getElementById("coords");
	const position = `${coords.latitude}, ${coords.longitude}`;
	const element = clipboard.create(position);
	coordsDom.innerHTML = element;
	callback();
}



/**
 * @function module:geolocation~get
 * @description Get your geolocation in this moment with the 'API HTML5'.
 * @return {Promise}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 */
function get() {
	if ("geolocation" in navigator) {
		// console.log("You can use Geolocation! :-) ");
		return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
	} else {
		alert("Geolocation is not supported by this browser. :-( ");

		// return false; // Console Error: La propiedad 'then' no existe en el tipo 'false | Promise<any>'.
		return new Promise(
			resolve => resolve({})
		)
	}
}



/**
 * @function module:geolocation.set
 * @description If find your geolocation, print this coordinates and show a map with the 'API Leaflet'.
 * @see Used inside:
 * @see - 'geolocation.js' -> {@link module:geolocation~get}, {@link module:geolocation~printCoords}
 * @see - 'loader.js' -> {@link module:loader.add}, {@link module:loader.remove}
 * @see - 'leaflet.js' -> {@link module:leaflet.initMap}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function set() {
	loader.add();

	get()
		.then(position => {
			// console.log(position);

			let coords = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};

			loader.remove();
			printCoords(coords, clipboard.afterCreate);
			leaflet.setMap(coords);
		})
		.catch(
			error => {
				// console.warn(`Code of error: ${error}`);

				loader.remove();

				var msg = null;
				switch (error.code) {
					case error.PERMISSION_DENIED:
						msg = "User denied the request for Geolocation.";
						break;
					case error.POSITION_UNAVAILABLE:
						msg = "Location information is unavailable.";
						break;
					case error.TIMEOUT:
						msg = "The request to get user location timed out.";
						break;
					case error.UNKNOWN_ERROR:
						msg = "An unknown error occurred.";
						break;
				}
				alert(msg);
			}
		);
}