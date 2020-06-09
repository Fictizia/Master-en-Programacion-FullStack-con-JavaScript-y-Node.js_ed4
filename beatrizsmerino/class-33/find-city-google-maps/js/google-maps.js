/**
 * @file Map with the 'Google Maps API'
 * @module googleMaps
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires snazzymaps
 */
import * as snazzymaps from './snazzymaps.js';





/**
 * @const module:googleMaps~API
 * @description API root of 'Google Maps'
 * @type {String}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript}
 */
const API = "https://maps.googleapis.com/maps/api/";





/**
 * @const module:googleMaps~API_KEY_MAP
 * @description API key of 'Google Maps'
 * Instrucctions of use:
 * 1. Go to https://console.cloud.google.com/apis/credentials/ and generate api key
 * 2. Change the string "XXXXXXXXXXX" for your API KEY
 * @type {String}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript}
 */
const API_KEY_MAP = "XXXXXXXXXXX";





/**
 * @function module:googleMaps.insertTagScript
 * @description Insert the tag html 'script' with the root of the 'API Google Maps'.
 * @see Used inside:
 * @see - 'google-maps-config.js' -> {@link module:googleMaps~API}, {@link module:googleMaps~API_KEY_MAP}
 * @see Used in:
 * @see - 'srcript.js' -> {@link functionAnonimAutoExecuted}
 */
export function insertTagScript() {
	const scriptElem = document.createElement("script");
	scriptElem.setAttribute("src", `${API}js?key=${API_KEY_MAP}`);
	scriptElem.setAttribute("async", "");
	scriptElem.setAttribute("defer", "");

	const tag = document.getElementsByTagName("body")[0].appendChild(scriptElem);
	if (tag) {
		return true;
	} else {
		return false;
	}
}





/**
 * @function module:googleMaps.createMap
 * @description Create a map with the 'API Google Maps'.
 * This map is customized with styles of 'snazzymaps.com'.
 * It has a unique animated marker with an information window that appears when you click on it.
 * @param {Object} coords - Coordinates
 * @param {Object} coords.latitude - Coordinates: latitude
 * @param {Object} coords.longitude - Coordinates: longitude
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps~initMap}
 * @see - 'snazzymaps.js' -> {@link module:snazzymaps.mapStyles}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 */
export function createMap(coords) {
	const mapDom = document.getElementById("googleMapsMap");
	mapDom.innerHTML = "";

	initMap(coords, mapDom, snazzymaps.mapStyles);
}





/**
 * @function module:googleMaps~initMap
 * @description Init map with coordinates and a marker
 * @param {Object} coords - Coordinates
 * @param {Object} coords.latitude - Coordinates: latitude
 * @param {Object} coords.longitude - Coordinates: longitude
 * @param {Object} mapDom - DOM Element where draw the map
 * @param {Object} jsonStyles - Styles for the map
 * @see - 'google-maps.js' -> {@link module:googleMaps~addMarker}
 */
function initMap(coords, mapDom, jsonStyles) {
	const location = {
		lat: coords.latitude,
		lng: coords.longitude
	};

	const map = new google.maps.Map(mapDom, {
		center: location,
		zoom: 11,
		styles: jsonStyles
	});

	const infoMarker = `
			<div class="marker">
				<h3 class="marker__title">
					Currrent location:
				</h3>
				<p class="marker__text">
					<strong class="marker__strong">Latitude:</strong> ${location.lat}
					<br>
					<strong class="marker__strong">Longitude:</strong> ${location.lng}
				</p>
			</div>
		`;
	addMarker(infoMarker, location, map);
}





/**
* @function module:googleMaps~addMarker
* @description Create a marker
* @param {String} contentMarker - Text of the marker
* @param {Object} coords - Coordinates
* @param {Object} coords.latitude - Coordinates: latitude
* @param {Object} coords.longitude - Coordinates: longitude
* @param {Object} map - Map
* @see Used inside:
* @see - 'google-maps.js' -> {@link module:googleMaps~addPopUpMarker}, {@link module:googleMaps~toggleBounceMarker}
* @see Used in:
* @see - 'google-maps.js' -> {@link module:googleMaps~initMap}
*/
function addMarker(contentMarker = null, coords, map) {
	const iconMarker = {
		url: './img/icon-location.svg', // url
		scaledSize: new google.maps.Size(50, 60), // scaled size
		// origin: new google.maps.Point(0, 0), // origin
		// anchor: new google.maps.Point(0, 0) // anchor
	};

	const marker = new google.maps.Marker({
		map,
		position: coords,
		icon: iconMarker,
		title: "My Geolocation",
		animation: google.maps.Animation.DROP
	});

	if (contentMarker !== null) {
		addPopUpMarker(marker, contentMarker, map);
		setTimeout(function () {
			toggleBounceMarker(marker);
		}, 3000);
	}
}





/**
* @function module:googleMaps~addPopUpMarker
* @description Add content to the maker
* @param {Object} marker - Marker of the map
* @param {String} contentMarker - Text of the marker
* @param {Object} map - Map
* @see Used in:
* @see - 'google-maps.js' -> {@link module:googleMaps~addMarker}
*/
function addPopUpMarker(marker, contentMarker, map) {
	const infowindow = new google.maps.InfoWindow({
		content: contentMarker
	});

	/**
	 * @event click
	 */
	marker.addListener('click', () => {
		infowindow.open(map, marker);
	});
}





/**
* @function module:googleMaps~toggleBounceMarker
* @description Add animation 'bounce' to the marker
* @param {Object} marker - Marker of the map
* @see Used in:
* @see - 'google-maps.js' -> {@link module:googleMaps~addMarker}
*/
function toggleBounceMarker(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}