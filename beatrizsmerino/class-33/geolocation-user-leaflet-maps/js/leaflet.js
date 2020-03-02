/**
 * @file Map with the 'Leaflet API'
 * @module leaflet
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:leaflet.setMap
 * @description Init a map with 'API Leaflet'
 * @param {Object} coords - Coordinates 
 * @param {Object} coords.latitude - Coordinates: latitude
 * @param {Object} coords.longitude - Coordinates: longitude
 * @see Used inside:
 * @see - 'leaflet.js' -> {@link module:leaflet~addMap}, {@link module:leaflet~addMarker}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link module:geolocation.setMap}
 */
export function setMap(coords) {
	const mapDom = document.getElementById("leafletMap");
	const location = [coords.latitude.toFixed(4), coords.longitude.toFixed(4)];
	const copyright = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	const map = L.map(mapDom, {
		center: location,
		zoom: 17
	});

	const infoMarker = `
			<div class="marker">
				<h3 class="marker__title">
					Currrent location:
				</h3>
				<p class="marker__text">
					<strong class="marker__strong">Latitude:</strong> ${coords.latitude.toFixed(4)}
					<br>
					<strong class="marker__strong">Longitude:</strong> ${coords.longitude.toFixed(4)}
				</p>
			</div>
        `;

	addMap(map, "voyager_nolabels", copyright);
	addMarker(map, location, infoMarker);
}




/**
 * @function module:leaflet~addMap
 * @description Create a map with the 'API Leaflet'
 * Default: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
 * Customize: https://wiki.openstreetmap.org/wiki/Tiles, https://carto.com/help/building-maps/basemap-list/
 * Styles carto:
 * https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}{scale}.png
 * {style}: ight_all | dark_all | light_nolabels | light_only_labels | dark_nolabels | dark_only_labels | rastertiles/voyager | rastertiles/voyager_nolabels | rastertiles/voyager_only_labels | rastertiles/voyager_labels_under
 * Examples
 * - https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png
 * - https://cartodb-basemaps-{s}.global.ssl.fastly.net/ight_only_labels/{z}/{x}/{y}.png
 * @param {Object} map - Map
 * @param {String} style - String with the name styles
 * @param {String} textAttribution - Text of copyright
 * @see Used in:
 * @see - 'leaflet.js' -> {@link module:leaflet.setMap}
 */
function addMap(map, style, textAttribution) {
	L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/${style}/{z}/{x}/{y}${(L.Browser.retina ? '@2x.png' : '.png')}`, {
		attribution: textAttribution
	}).addTo(map);
}



/**
 * @function module:leaflet~addMarker
 * @description Create a marker with the 'API Leaflet'
 * @param {Object} map - Map
 * @param {Object} location - Coordinates
 * @param {Object} location.latitude - Coordinates: latitude
 * @param {Object} location.longitude - Coordinates: longitude
 * @param {String} infoMarker - Text of Marker
 * @see Used in:
 * @see - 'leaflet.js' -> {@link module:leaflet.setMap}
 */
function addMarker(map, location, infoMarker) {
	L.marker(location).addTo(map)
		.bindPopup(infoMarker)
		.openPopup();
}