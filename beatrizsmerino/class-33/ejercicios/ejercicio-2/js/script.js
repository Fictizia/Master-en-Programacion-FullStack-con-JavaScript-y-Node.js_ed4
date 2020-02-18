/**
 * @file Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
* @requires geolocation
*/
import * as geolocation from './geolocation.js';





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside:
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 */
(function () {
	/**
	 * @event click
	 */
	document.getElementById("geolocationButton").addEventListener("click", geolocation.set);
})();