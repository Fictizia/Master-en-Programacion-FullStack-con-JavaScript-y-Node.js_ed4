/**
 * @file Map with the 'Google Maps API'
 * @module googleMaps
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires apiMetro
 * @requires snazzymaps
 */
import * as apiMetro from './data-api.js';
import * as snazzymaps from './snazzymaps.js';




/**
 * @const module:googleMaps.API
 * @description API root of 'Google Maps'
 * @type {String}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript}
 */
export const API = "https://maps.googleapis.com/maps/api/";





/**
 * @const module:googleMaps.API_KEY_MAP
 * @description API key of 'Google Maps'
 * Instrucctions of use:
 * 1. Go to https://console.cloud.google.com/apis/credentials/ and generate api key
 * 2. Change the string "XXXXXXXXXXX" for your API KEY
 * @type {String}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript}
 */
export const API_KEY_MAP = "XXXXXXXXXXX";





/**
 * @function module:googleMaps.insertTagScript
 * @description Insert the tag html 'script' with the root of the 'API Google Maps'.
 * @param {String} url - Root of the script tag
 * @returns {Boolean}
 * @see Used in:
 * @see - 'srcript.js' -> {@link functionAnonimAutoExecuted}
 */
export function insertTagScript(url) {
	const scriptElem = document.createElement("script");
	scriptElem.setAttribute("src", url);
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
 * @function module:googleMaps~addMarker
 * @description Create, add to the map and return marker
 * @param {Object} coords - Coordinates
 * @param {String} title - Title of the marker
 * @param {Object} map - Map
 * @return {Object}
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps~addPopUpMarker}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps~addMultipleMarkers}
 */
function addMarker(coords, title, map) {
	const marker = new google.maps.Marker({
		map,
		position: coords,
		icon: {
			url: './img/icon-location.svg',
			scaledSize: new google.maps.Size(30, 40),
		}
	});

	const contentMarker = `
		<div class="marker">
			<h3 class="marker__title">
				${title}
			</h3>
			<p class="marker__text">
				<strong class="marker__strong">Latitude:</strong> ${coords.lat}
				<br>
				<strong class="marker__strong">Longitude:</strong> ${coords.lng}
			</p>
		</div>
		`;

	addPopUpMarker(marker, contentMarker, map);
	return marker;
}





/**
 * @function module:googleMaps~addMultipleMarkers
 * @description Add and return multiple markers to the map
 * @param {Object} listCoords 
 * @param {Object} map 
 * @return {Object}
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps~addMarker}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps~refreshMarkers}, {@link module:googleMaps~createMap}
 */
function addMultipleMarkers(listCoords, map) {
	const markers = listCoords.map((coord, index) => {
		const locationMarker = {
			lat: coord.latitude,
			lng: coord.longitude
		};

		const titleMarker = `#${index + 1} - ${coord.id}`;

		return addMarker(locationMarker, titleMarker, map);
	});

	return markers;
}






/**
 * @function module:googleMaps~addCluster
 * @description Add and return a marker clusterer to manage the markers.
 * @param {Object} markers 
 * @param {Object} map - DOM Element where draw the map
 * @returns {Object}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps~initMap}, {@link module:googleMaps~refreshMarkers}
 */
function addCluster(markers, map) {
	const markerCluster = new MarkerClusterer(map, markers, {
		maxZoom: 14,
		imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
	});
	return markerCluster;
}





/**
 * @function module:googleMaps~removeMarkers
 * @description Remove markers and cluster
 * @param {Object} markerCluster 
 * @param {Object} markers
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps~refreshMarkers}
 */
function removeMarkers(markerCluster, markers) {
	markers.map(marker => marker.setMap(null));
	markers = [];
	markerCluster.clearMarkers();
}





/**
 * @function module:googleMaps~refreshMarkers 
 * @description Refresh the markers: Remove and add it again.
 * @param {Object} markerCluster 
 * @param {Object} markers
 * @param {Object} map
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps~removeMarkers}, {@link module:googleMaps~addMultipleMarkers}, {@link module:googleMaps~addCluster}
 * @see - 'data-api.js' -> {@link module:apiMetro~getData}
 * @see Used in:
 * @see - 'script.js' -> {@link module:googleMaps~createMap}
 */
function refreshMarkers(markerCluster, markers, map) {
	setInterval(() => {
		removeMarkers(markerCluster, markers);

		apiMetro.getData(apiMetro.urlAPI)
			.then(dataAPI => {
				const listCoords = dataAPI.items;
				markers = addMultipleMarkers(listCoords, map);
				markerCluster = addCluster(markers, map);
			});
	}, 30000);
}





/**
 * @function module:googleMaps~setGetMap
 * @description Init map with coordinates and a marker
 * @param {Object} dataAPI - Object with the coordinates API and more...
 * @param {Element} mapDom - DOM Element where draw the map
 * @param {Object} jsonStyles - Styles for the map
 * @returns {Object}
 * @see Used in:
 * @see - 'google-maps.js' ->{@link module:googleMaps.createMap}
 */
function setGetMap(dataAPI, mapDom, jsonStyles) {
	const listCoords = dataAPI.items;

	const location = {
		lat: listCoords[0].latitude,
		lng: listCoords[0].longitude
	};

	const map = new google.maps.Map(mapDom, {
		center: location,
		zoom: 10,
		minZoom: 5,
		styles: jsonStyles
	});

	return map;
}





/**
 * @function module:googleMaps~createMap
 * @description Create the map with markers and cluster; and refresh it. 
 * @param {Object} dataAPI 
 * @param {Element} mapDom
 * @param {Object} jsonStyles 
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps~setGetMap}, {@link module:googleMaps~addMultipleMarkers}, {@link module:googleMaps~addCluster}, {@link module:googleMaps~refreshMarkers}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps.initMap}
 */
function createMap(dataAPI, mapDom, jsonStyles) {
	const map = setGetMap(dataAPI, mapDom, jsonStyles);
	const listCoords = dataAPI.items;

	const markers = addMultipleMarkers(listCoords, map);
	const markerCluster = addCluster(markers, map);

	refreshMarkers(markerCluster, markers, map);
}





/**
 * @function module:googleMaps~initMap
 * @description Create a map with the 'API Google Maps'.
 * This map is customized with styles of 'snazzymaps.com'.
 * It has a unique animated marker with an information window that appears when you click on it.
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps~createMap}
 * @see - 'snazzymaps.js' -> {@link module:snazzymaps.mapStyles}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function initMap() {
	const mapDom = document.getElementById("googleMapsMap");
	mapDom.innerHTML = "";

	apiMetro.getData(apiMetro.urlAPI)
		.then(coords => createMap(coords, mapDom, snazzymaps.mapStyles));
}