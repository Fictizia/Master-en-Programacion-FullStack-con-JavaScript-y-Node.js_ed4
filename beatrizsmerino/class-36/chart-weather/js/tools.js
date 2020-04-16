/**
 * @file Tools global
 * @module tool
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:tool.insertTagScript
 * @description Insert the tag html 'script'.
 * @param {Object} attributeList - Attributes list for customized the tag script
 * @see Used in:
 * @see - 'graphic-chart.js' -> {@link module:graphicChart.set}
 */
export function insertTagScript(attributeList, callback) {
	const scriptElem = document.createElement("script");

	Object.keys(attributeList).map(key => {
		if (attributeList[key] !== null) {
			scriptElem.setAttribute(key, attributeList[key])
		}
	});

	scriptElem.onload = callback;
	document.getElementsByTagName("head")[0].appendChild(scriptElem);
}