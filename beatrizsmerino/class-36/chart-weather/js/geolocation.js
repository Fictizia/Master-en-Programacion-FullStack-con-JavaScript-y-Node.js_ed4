/**
 * @file Geolocation with the 'HTML5 API'
 * @module geolocation
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:geolocation~get
 * @description Get your geolocation with the 'API HTML5'.
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function get() {
	if ("geolocation" in navigator) {
		return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
	} else {
		alert("Geolocation is not supported by this browser. :-( ");

		return new Promise(
			resolve => resolve({})
		)
	}
}





/**
 * @function module:geolocation.showPosition
 * @description Draw the geolocation coordinates.
 * @param {Object} position - Coordinates
 * @param {Object} position.latitude - Coordinates: Latitude
 * @param {Object} position.longitude - Coordinates: Longitude
 * @see Used in:
 * - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function showPosition(position) {
	console.log(`
	Latitude: ${position.coords.latitude}
	Longitude: ${position.coords.longitude}
	`);
}





/**
 * @function module:geolocation.showError
 * @description Error alert when get geolocation.
 * @param {Object} error - Object error with the code...
 * @see Used in:
 * - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function showError(error) {
	// console.log(error);

	let mng = null;
	switch (error.code) {
		case error.PERMISSION_DENIED:
			mng = "User denied the request for Geolocation."
			break;
		case error.POSITION_UNAVAILABLE:
			mng = "Location information is unavailable."
			break;
		case error.TIMEOUT:
			mng = "The request to get user location timed out."
			break;
		case error.UNKNOWN_ERROR:
			mng = "An unknown error occurred."
			break;
	}

	alert(mng);
}