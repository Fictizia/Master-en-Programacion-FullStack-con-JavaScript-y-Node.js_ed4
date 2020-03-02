/**
 * @file Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires geolocation
 * @requires googleMaps
 */
import * as geolocation from './geolocation.js';
import * as googleMaps from './google-maps.js';





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript},
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 */
(function () {
	if (googleMaps.insertTagScript()) {
		/**
		 * @event click
		 */
		document.getElementById("geolocationButton").addEventListener("click", geolocation.set);
	}
})();