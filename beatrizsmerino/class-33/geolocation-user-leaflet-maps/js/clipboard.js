/**
 * @file Copy in the clipboard
 * @module clipboard
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:clipboard.create
 * @description Create the template html of the 'clipboard' component, and add a width to 'ch' according to your number of characters
 * @param {String} text - Text of the 'clipboard' component
 * @return {String}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link module:geolocation~printCoords}
 */
export function create(text) {
	// console.log(text.length);

	/* Resize the width of the input element */
	// const widthCharacter = 8;
	// const width = `style="width:${((text.length + 1) * widthCharacter)}px"`;

	// The CSS units 'ch'. It is the relative length to the width of the digit '0'.
	const width = `style="width:${text.length}ch"`;

	const template = `
		<div class="clipboard">
			<input class="clipboard__field" type="text" value="${text}" readonly ${width}/>
			<button class="clipboard__button button">
				<i class="icon icon-copy">
					<svg class="icon__svg">
						<use class="icon__use" xlink:href="#iconCopy"/>
					</svg>
				</i>
			</button>
		</div>
		`;

	return template;
}





/**
 * @function module:clipboard.afterCreate
 * @description Callback function that runs after creating the 'clipboard' component
 * @see Used inside:
 * @see - 'clipboard.js' -> {@link module:clipboard~addEventClick}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 */
export function afterCreate() {
	addEventClick();
}





/**
 * @function module:clipboard~copy
 * @description Copy the text of an element on the clipboard.
 * @param {Object} inputField - This element must be an 'input' or 'textarea' html tag.
 * @see Used in:
 * @see - 'clipboard.js' -> {@link module:clipboard.afterCreate}
 */
function copy(inputField) {
	const copyText = inputField;

	/* Get the text field */
	// console.log(typeof copyText);
	// console.log(copyText.value.lenght);
	// copyText.focus();
	copyText.select();

	/* Get the text field - For mobile devices */
	copyText.setSelectionRange(0, copyText.value.lenght);

	/* Copy the text inside the element field */
	document.execCommand("copy");

	/* Alert the copied text */
	alert("Copied the text:\n" + copyText.value);
}



/**
 * @function module:clipboard~addEventClick
 * @description Add a click event for the 'clipboard' component button.
 * @see Used inside:
 * @see - 'clipboard.js' -> {@link module:clipboard~copy}
 * @see Used in:
 * @see - 'clipboard.js' -> {@link module:clipboard.afterCreate}
 */
function addEventClick() {
	const buttonsDom = document.getElementsByClassName("clipboard__button");
	// console.log(buttonsDom);

	Array.from(buttonsDom).map(button => {
		// console.log(button);

		/**
		 * @event click
		 */
		button.addEventListener("click", function () {
			// console.log(button.parentElement);
			let fieldDom = button.parentElement.querySelector(".clipboard__field");
			// console.log(fieldDom, typeof fieldDom);
			// console.log(fieldDom.value);
			copy(fieldDom);
		});
	});
}