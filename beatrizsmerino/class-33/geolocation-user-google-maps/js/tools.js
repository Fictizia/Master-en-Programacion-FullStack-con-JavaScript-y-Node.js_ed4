/**
 * @file Generic tools
 * @module tools
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:tools.getFontSize
 * @description Get the font size of an element html
 * Just grabbing the style.fontSize of an element may not work. If the font-size is defined by a stylesheet, this will report "" (empty string).
 * @param {Element} element - HTML Element
 * @return {Number}
 */
export function getFontSize(element) {
	const style = window.getComputedStyle(element, null).getPropertyValue('font-size');
	const fontSize = parseFloat(style);

	return fontSize;
}