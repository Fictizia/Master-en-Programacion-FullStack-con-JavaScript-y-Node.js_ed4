/**
 * @file Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires geolocation
 * @requires searchCity
 * @requires googleMaps
 */
import * as geolocation from './geolocation.js';
import * as searchCity from './search-city.js';
import * as googleMaps from './google-maps.js';





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript},
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 * @see - 'search-city.js' -> {@link module:searchCity.set}
 */
(function () {
	const buttonGeolocation = document.getElementById("geolocationButton");
	const buttonSearch = document.getElementById("searchCityButton");

	if (googleMaps.insertTagScript()) {
		/**
		 * @event click
		 */
		buttonGeolocation.addEventListener("click", function (e) {
			e.preventDefault();
			geolocation.set();
		});

		/**
		 * @event click
		 */
		buttonSearch.addEventListener("click", function (e) {
			e.preventDefault();
			searchCity.set();
		});
	}
})();