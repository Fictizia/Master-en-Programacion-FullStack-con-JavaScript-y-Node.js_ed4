/**
 * @file Weather with the 'Open Weather API'
 * @module weatherAiremad
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





// Need API key 'Airemad'
/**
 * @const module:weatherAiremad~API
 * @description API root with 'Airemad API'.
 * @type {String}
 */
const API = "http://airemad.com/api/v1/";





/**
 * @function module:weatherAiremad.getStations
 * @description Get data of the list of stations with 'Airemad API'.
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export const getStations = async () => {
	const getData = await fetch(`${API}station`);
	const getDataResponse = getData.json();

	return getDataResponse;
}





/**
 * @function module:weatherAiremad.getWeatherById
 * @description Get data weather with 'Airemad API'.
 * @param {String} id - Station id
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export const getWeatherById = async (id) => {
	const getData = await fetch(`${API}weather/${id}`);
	const getDataResponse = getData.json();

	return getDataResponse;
}