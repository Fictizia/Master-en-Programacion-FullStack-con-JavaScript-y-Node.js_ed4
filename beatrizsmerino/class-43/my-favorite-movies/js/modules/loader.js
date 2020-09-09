/**
 * @file loader.js
 * @module loader
 * @description Loader animation
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:loader.add
 * @description Add loading animation.
 */
export function add() {
	let loader = document.getElementById("loader");
	if (!loader) {
		let loader = document.createElement("div");
		loader.setAttribute("id", "loader");
		loader.setAttribute("class", "loader");
		document.body.appendChild(loader);
	}
}



/**
 * @function module:loader.remove
 * @description Remove loading animation.
 */
export function remove() {
	let loader = document.getElementById("loader");
	if (loader) {
		document.body.removeChild(loader);
	}
}