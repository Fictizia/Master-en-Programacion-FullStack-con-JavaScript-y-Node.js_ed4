/**
 * @file gradient.js
 * @module gradient
 * @description Create fluid and interactive gradient animations with this small javascript library granim.js
 * @see granim.js: {@link https://sarcadass.github.io/granim.js/index.html}, {@link https://sarcadass.github.io/granim.js/api-v2.0.0.html}
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @const colorGradients
 * @description Array of colors for gradients
 */
export const colorGradients = [
	['#ff9966', '#ff5e62'],
	['#fdbb2d', '#144D9B'],
	['#af4d9c', '#509AF4'],
	['#192A67', '#43bab8'],
	['#FF4E50', '#fdbb2d'],
	['#55d6c2', '#8E54E9'],
	['#B3FFAB', '#4776E6'],
	['#f2994a', '#13d8b9'],
	['#4CB8C4', '#bc3871'],
	['#c94936', '#3CD3AD'],
	['#ff72ff', '#bdd38d'],
	['#ffc300', '#6E48AA'],
	['#7f59a3', '#518c7c'],
	['#19607b', '#FFC837'],
	['#24C6DC', '#514A9D'],
	['#7d9157', '#ff72ff'],
];





/**
 * @function module:gradient.add
 * @description Added gradient with the javascript library granim.js
 * @param {string} selector Selector name to insert it
 * @param {Object} arrayColorGradients List of colors for create the gradient
 * @param {string} imagePath Image path
 */
export function add(selector, arrayColorGradients, imagePath) {
	let content = document.querySelector(selector);

	let canvas = document.createElement("canvas");
	canvas.setAttribute("id", "granim-canvas");
	content.appendChild(canvas);

	let canvasDOM = document.querySelector("#granim-canvas");

	let stylesCanvas = `
			width: 110%;
			height: 110%;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: -1;
		`;

	canvasDOM.style += `; ${stylesCanvas}`;

	new Granim({
		element: '#granim-canvas',
		name: 'granim',
		direction: 'diagonal',
		isPausedWhenNotInView: true,
		opacity: [1, 1],
		states: {
			"default-state": {
				gradients: arrayColorGradients,
				transitionSpeed: 5000
			}
		},
		image: {
			source: imagePath,
			position: ['center', 'bottom'],
			blendingMode: 'multiply'
		},
	});
}