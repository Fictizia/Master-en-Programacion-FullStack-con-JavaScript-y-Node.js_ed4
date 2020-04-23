/**
 * @file Get data API metro of 'Los Angeles'
 * @module apiMetro
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */




/**
 * @const module:apiMetro.urlAPI
 */
export const urlAPI = "http://api.metro.net/agencies/lametro/vehicles/";





/**
 * @function module:apiMetro.getData
 * @description Get data api
 * @param {String} url - Root of the API
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export const getData = async (url) => {
	const response = await fetch(url);
	// console.log(`Status: ${response.status === 200 ? "OK" : "NOT OK"}`);
	return response.json();
}