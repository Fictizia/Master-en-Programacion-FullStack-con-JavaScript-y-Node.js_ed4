/**
 * @file Search city and locate it
 * @module searchCity
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires loader
 * @requires googleMaps
 */
import * as loader from './loader.js';
import * as googleMaps from './google-maps.js';





/**
 * @function module:searchCity~get
 * @description Get the position of the city to look for
 * @param {String} nameCity - Name city
 * @return {Promise}
 * @see - 'search-city.js' -> {@link module:searchCity.set}
 */
function get(nameCity) {
	return new Promise((resolve, reject) => {
		const geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': nameCity }, function (results, status) {
			if (status === 'OK') {
				resolve(results);
			} else {
				reject(status);
			}
		});
	});
}





/**
 * @function module:searchCity.set
 * @description Set a map with the position of city searched
 * @see Used inside:
 * @see - 'loader.js' -> {@link module:loader.add}, {@link module:loader.remove}
 * @see - 'google-maps.js' -> {@link module:googleMaps.createMap}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function set() {
	loader.add();

	var nameCity = document.getElementById("searchCityField").value;
	if (nameCity !== "") {
		get(nameCity)
			.then(request => {
				let coords = {
					latitude: request[0].geometry.location.lat(),
					longitude: request[0].geometry.location.lng()
				};
				// console.log(coords);

				loader.remove();
				googleMaps.createMap(coords);
			})
			.catch(error => {
				loader.remove();

				let msg = null;

				switch (error.code) {
					case error.ZERO_RESULTS:
						msg = "Not found city";
						break;
					case error.OVER_QUERY_LIMIT:
						msg = "Any of the following errors have occurred:\n- The API key is missing or invalid or\n- The billing has not been enabled on your account or\n- A self-imposed usage cap has been exceeded or\n- The provided method of payment is no longer valid (for example, a credit card has expired)";
						break;
					case error.OVER_QUERY_LIMIT:
						msg = "You are over your quota.";
						break;
					case error.REQUEST_DENIED:
						msg = "Your request was denied";
						break;
					case error.INVALID_REQUEST:
						msg = "Location information is unavailable.";
						break;
					case error.UNKNOWN_ERROR:
						msg = "An unknown error occurred.";
						break;
				}
				alert(msg);
			});
	}
}