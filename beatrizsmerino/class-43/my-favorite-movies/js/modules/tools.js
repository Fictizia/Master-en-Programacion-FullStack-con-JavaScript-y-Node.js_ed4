/**
 * @file tools.js
 * @module tool
 * @description Helper functions 
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires iconsPaths
 * @requires createTemplate
 */
import * as iconsPaths from './iconsPaths.js';
import * as createTemplate from './createTemplate.js';





/**
 * @const consoleCSS
 * @description CSS styles for the console.log, console.info, console.warn...
 * @type {Object}
 */
export const consoleCSS = {
	"title": `padding: 0.1rem 0.5rem; color: black; background-color: white;`,
	"info": `padding: 0.1rem 0.5rem; color: black; background-color: gold;`,
	"error": `padding: 0.1rem 0.5rem; color: white; background-color: tomato;`,
	"success": `padding: 0.1rem 0.5rem; color: white; background-color: teal;`
};



/**
 * @function module:tool.findTextArray
 * @description Find by a part of text into array
 * @param {Object} array Array to search in
 * @param {String} text Text to find
 * @returns {Object}
 */
export function findTextInArray(array, text) {
	let dataFound = array.filter(item => item.includes(text));
	console.info("Data found:", dataFound);
	return dataFound;
}



/**
 * @function module:tool.wrap
 * @description Wrap an HTML structure around an element
 * @param {Element} innerDOM Element to wrap
 * @param {String|null} tagWrapper HTML tag of wrapper
 * @param {String|null} classWrapper Class name for the tag of wrapper
 * @param {String|null} idWrapper Id name for the tag of wrapper
 * @returns {Element}
 */
export function wrap(innerDOM, tagWrapper = null, idWrapper = null, classWrapper = null) {
	let wrapperElem;

	// Create element
	if (tagWrapper === null) {
		wrapperElem = document.createElement('div')
	} else {
		wrapperElem = document.createElement(tagWrapper)
	}

	// Add id
	if (idWrapper !== null) {
		wrapperElem.setAttribute("id", idWrapper);
	}

	// Add class
	if (classWrapper !== null) {
		wrapperElem.setAttribute("class", classWrapper);
	}

	innerDOM.parentNode.insertBefore(wrapperElem, innerDOM);
	wrapperElem.appendChild(innerDOM);

	return wrapperElem;
}



/**
 * @function module:tool.getClosest
 * @description Get the parent element with a specific selector
 * @param {Element} childElement Child element
 * @param {String} parentSelector Selector of the parent element
 * @returns {Element|null}
 */
export function getClosest(childElement, parentSelector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function (s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) { }
				return i > -1;
			};
	}

	// Get the closest matching element
	for (; childElement && childElement !== document; childElement = childElement.parentNode) {
		if (childElement.matches(parentSelector)) return childElement;
	}
	return null;
};



/**
 * @function module:tool.stringToNode
 * @description Convert a string to node DOM
 * @param {String} String String to convert
 * @return {Element}
 */
export function stringToNode(string) {
	const node = document.createRange().createContextualFragment(string);
	return node;
}



/**
 * @function module:tool~convertNumberWith2Cifres
 * @description Convert 1 digit numbers to 2 digit numbers by adding a leading zero
 * @param {Number} number Number to convert
 * @return {String|Number}
 * @see Used in: {@link module:tool.getCurrentDate}
 */
function convertNumberWith2Cifres(number) {
	var numberToString = number.toString();
	var stringLenght = numberToString.length;

	if (stringLenght === 1) {
		var numberConverted = "0" + numberToString;
		return numberConverted;
	} else {
		return number;
	}
}



/**
 * @function module:tool.getCurrentDate
 * @description Get the current date in this format: 'yyyy-mm-dd hh:mm:ss'
 * @returns {String}
 * @see Used inside: {@link module:tool~convertNumberWith2Cifres}
 * @see Used in: {@link module:tool.getCurrentDateRealTime}
 */
export function getCurrentDate() {
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();
	let hour = today.getHours();
	let minute = today.getMinutes();
	let second = today.getSeconds();

	month = convertNumberWith2Cifres(month);
	day = convertNumberWith2Cifres(day);
	hour = convertNumberWith2Cifres(hour);
	minute = convertNumberWith2Cifres(minute);
	second = convertNumberWith2Cifres(second);

	let date = `${year}-${month}-${day}`;
	let time = `${hour}:${minute}:${second}`;

	let dateTime = `${date} ${time}`;

	// console.info("Current date: ", dateTime);
	return dateTime;
}



/**
 * @function module:tool.getCurrentDateRealTime
 * @description Get the current time in real time in this format: 'yyyy-mm-dd hh:mm:ss'
 * @see Used inside: {@link module:tool.getCurrentDate}
 * @see Used in: {@link}
 */
export function getCurrentDateRealTime() {
	let contentDOM = document.querySelectorAll(".timer");
	setInterval(function () {
		let currentDate = getCurrentDate();
		[...contentDOM].map(item => item.innerHTML = currentDate);
	}, 100);
}



/**
 * @function module:tool.findCreateIconsFlags
 * @description Find the country in the icon routes and create an image label with the flag icons
 * @param {String} stringLang Text to find
 * @param {String} classCSS Class name
 * @return {String}
 * @see Used inside: {@link module:createTemplate.iconFlag}
 * @see Used in: {@link}
 */
export function findCreateIconsFlags(stringLang, classCSS) {
	const iconsFlags = iconsPaths.flags;
	let langs = stringLang.toLowerCase().split(", ");

	let list = [];
	[...langs].map((lang) => {
		lang = lang.replace(" ", "-");

		for (const key in iconsFlags) {
			if (iconsFlags.hasOwnProperty(key)) {
				if (key === lang) {
					const element = iconsFlags[key];
					list.push({ lang: lang, flag: element });
				}
			}
		}
	});

	let template = "";
	[...list].map((item) => {
		template += createTemplate.iconFlag(item, classCSS)
	});

	return template;
}