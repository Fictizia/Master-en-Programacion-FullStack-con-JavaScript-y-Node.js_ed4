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
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript}, {@link module:googleMaps.setImage}
 */
export const API = "https://maps.googleapis.com/maps/api/";



/**
 * @const module:googleMaps~API_KEY_MAP
 * @description API key of 'Google Maps'
 * Instrucctions of use:
 * 1. Go to https://console.cloud.google.com/apis/credentials/ and generate api key
 * 2. Change the string "XXXXXXXXXXX" for your API KEY
 * @type {String}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript}, {@link module:googleMaps.setImage}
 */
export const API_KEY_MAP = "XXXXXXXXXXX";



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
 * @function module:googleMaps.setMap
 * @description Create a map with the 'API Google Maps'.
 * This map is customized with styles of 'snazzymaps.com'.
 * It has a unique animated marker with an information window that appears when you click on it.
 * @param {Object} coords - Coordinates
 * @param {Object} coords.latitude - Coordinates: latitude
 * @param {Object} coords.longitude - Coordinates: longitude
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:initMap.initMap}, {@link module:setMap~addMarker}, {@link module:setMap~addInfoMarker}, {@link module:setMap~toggleBounceMarker}
 * @see - 'google-maps-config.js' -> {@link module:googleMaps~API}, {@link module:googleMaps~API_KEY_MAP}
 * @see - 'snazzymaps.js' -> {@link module:snazzymaps.mapStyles}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 */
export function setMap(coords) {
	const mapDom = document.getElementById("googleMapsMap");
	mapDom.innerHTML = "";

	/**
	 * @function setMap.initMap
	 * @description Init map with coordinates and a marker
	 * @param {Object} jsonStyles - Styles for the map
	 */
	function initMap(jsonStyles) {
		const location = {
			lat: coords.latitude,
			lng: coords.longitude
		};

		const map = new google.maps.Map(mapDom, {
			center: location,
			zoom: 16,
			styles: jsonStyles
		});

		const infoMarker = `
			<div class="marker">
				<h3 class="marker__title">
					Currrent location:
				</h3>
				<p class="marker__text">
					<strong class="marker__strong">Latitude:</strong> ${location.lat.toFixed(4)}
					<br>
					<strong class="marker__strong">Longitude:</strong> ${location.lng.toFixed(4)}
				</p>
			</div>
		`;
		addMarker(infoMarker, location, map);
	}

	/**
	* @function setMap.addMarker
	* @description Create a marker
	* @param {String} contentMarker - Text of the marker
	* @param {Object} coords - Coordinates
	* @param {Object} coords.latitude - Coordinates: latitude
 	* @param {Object} coords.longitude - Coordinates: longitude
	* @param {Object} map - Map
	*/
	function addMarker(contentMarker = null, coords, map) {
		const iconMarker = {
			url: './img/icon-location.svg', // url
			scaledSize: new google.maps.Size(50, 50), // scaled size
			// origin: new google.maps.Point(0, 0), // origin
			// anchor: new google.maps.Point(0, 0) // anchor
		};

		const marker = new google.maps.Marker({
			map,
			position: coords,
			icon: iconMarker,
			title: "My Geolocation",
			animation: google.maps.Animation.DROP,
		});

		if (contentMarker !== null) {
			addInfoMarker(marker, contentMarker, map);
			setTimeout(function () {
				toggleBounceMarker(marker);
			}, 3000);
		}
	}

	/**
	* @function setMap.addInfoMarker
	* @description Add content to the maker
	* @param {Object} marker - Marker of the map
	* @param {String} contentMarker - Text of the marker
	* @param {Object} map - Map
	*/
	function addInfoMarker(marker, contentMarker, map) {
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
	* @function setMap.toggleBounceMarker
	* @description Add animation 'bounce' to the marker
	* @param {Object} marker - Marker of the map
	* @see Used in:
	* @see - {@link module:toggleBounceMarker}
	*/
	function toggleBounceMarker(marker) {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

	initMap(snazzymaps.mapStyles);
}



/**
 * @function module:googleMaps.setImage
 * @description Get a image of the street view with the 'API Google Maps'.
 * @param {Object} coords - Coordinates
 * @param {Object} coords.latitude - Coordinates: latitude
 * @param {Object} coords.longitude - Coordinates: longitude
 * @param {String} imageSize - Size of the Image
 * @param {Number} imageHeading - Orientation of the camera
 * @param {Number} imageFov - Orientation horizontal of the camera
 * @param {Number} imagePitch - Orientation vertical of the camera
 * @param {Number} imageRadius - Image search radius
 * @param {String} imageSource - Image indoord or outdoor
 * @see Used inside:
 * @see - 'google-maps-config.js' -> {@link module:googleMaps~API}, {@link module:googleMaps~API_KEY_MAP}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 */
export function setImage(coords, imageSize, imageHeading, imageFov, imagePitch, imageRadius, imageSource) {
	const imageDom = document.getElementById("googleMapsImage");
	const image = new Image;

	// Settings values: https://developers.google.com/maps/documentation/streetview/intro
	const settings = {
		key: API_KEY_MAP, // (required) you need an API key
		location: `${coords.latitude},${coords.longitude}`, // (required) coords of latitude and longitude
		size: imageSize || "400x400", // (required) size image, specified in pixels, of the width and height
		heading: imageHeading || null, // (optional) compass heading, specified in degrees, of the camera | (by default: location) | (values acepted: 0-360) (North: 0 and 360, East: 90, West: 270, South: 180)
		fov: imageFov || 90, // (optional) horizontal field, specified in degrees, of view of the image | (by default: 90) | (max value acepted: 120)
		pitch: imagePitch || 0, // (optional) vertical field, specified in degrees, of the camera relative to the Street View vehicle. | (by default: 0) | (Up: 90, Down: -90)
		radius: imageRadius || 50, // (optional) radius, specified in meters, in which to search for a panorama, centered on the given location | (by default: 50) | (values acepted: non-negative integers)
		source: imageSource || "default" // (optional) Limits Street View searches to selected sources | (by default: default) | (values acepted: default or outdoor)
	};

	const imageRoot = `${API}streetview?key=${settings.key}&location=${settings.location}&size=${settings.size}&heading=${settings.heading}&fov=${settings.fov}&pitch=${settings.pitch}&radius=${settings.radius}&source=${settings.source}`;
	// console.log(imageRoot);
	image.src = imageRoot;

	imageDom.innerHTML = "";
	imageDom.appendChild(image);
}