/**
 * @file modal.js
 * @module modal
 * @description Modal window
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 * @requires templates
 */
import * as tool from './tools.js';
import * as createTemplate from './createTemplate.js';





/**
 * @function module:modal~setScrollModal
 * @description Added css classes to set scroll modal
 * @see Used in: {@link module:modal~insertModal}
 */
function setScrollModal() {
	const modalContainer = document.getElementsByClassName("modal__container");
	const modalInner = document.getElementsByClassName("modal__inner");
	const modalContent = document.getElementsByClassName("modal__content");

	[...modalContainer].map((item) => item.classList.add("scroll"));
	[...modalInner].map((item) => item.classList.add("scroll__inner"));
	[...modalContent].map((item) => item.classList.add("scroll__content"));
}



/**
 * @function module:modal~insertModal
 * @description Insert modal and add it scroll and animation
 * @param {String} idContent Id name
 * @param {Object} data Data modal
 * @see Used inside:
 * {@link module:createTemplate.modal},
 * {@link module:tool.stringToNode},
 * {@link module:modal~setScrollModal},
 * @see Used in: {@link module:modal~openModal}
 */
async function insertModal(idContent, data) {
	const content = document.getElementById(idContent);
	let template = createTemplate.modal(`${idContent}Modal`, data);
	let templateNode = tool.stringToNode(template);
	await content.appendChild(templateNode);

	await setScrollModal();

	const modal = document.getElementsByClassName('modal');
	const modalWrapper = document.getElementsByClassName('modal__wrapper');
	[...modal].map((item) => item.classList.add('animate__animated', 'animate__zoomIn'));
	[...modalWrapper].map((item) => item.classList.add('animate__animated', 'animate__FadeIn', 'is-open'));
}



/**
 * @function module:modal~removeModal
 * @description Added animation and Remove modal
 * @see Used in: {@link module:modal~setEventsModal}
 */
function removeModal(modal, modalWrapper) {
	modal.classList.add('animate__animated', 'animate__zoomOut');
	modalWrapper.classList.add('animate__animated', 'animate__fadeOut', 'is-close');
	setTimeout(() => modalWrapper.parentNode.removeChild(modalWrapper), 1500);
}



/**
 * @function module:modal~openModal
 * @description Open modal
 * @param {String} idContent Id name
 * @param {Object} data Data modal
 * @see Used inside: {@link module:modal~insertModal}
 * @see Used in: {@link module:modal~setEventsModal}
 */
function openModal(idContent, data) {
	insertModal(idContent, data);
}



/**
 * @function module:modal~closeModal
 * @description Close modal
 * @see Used inside: {@link module:tool.getClosest}, {@link module:modal~removeModal}
 * @see Used in: {@link module:modal~setEventsModal}
 */
function closeModal() {
	const modals = document.getElementsByClassName("modal");
	const modalsButton = document.getElementsByClassName("modal__button-close");

	[...modalsButton].map((button) => {
		button.addEventListener('click', function () {
			const $modal = tool.getClosest(this, ".modal");
			const $modalWrapper = tool.getClosest(this, ".modal__wrapper");
			removeModal($modal, $modalWrapper);
		});
	});

	[...modals].map((modals) => {
		if (modals) {
			window.addEventListener("click", function (event) {
				const modalWrapper = document.getElementsByClassName("modal__wrapper");
				[...modalWrapper].map((wrapper) => {
					//if you click on anything except the modal itself or the "open modal" link, close the modal
					if (event.target === wrapper) {
						const $thisModal = event.target.firstElementChild;
						const $thisModalWrapper = event.target;
						removeModal($thisModal, $thisModalWrapper);
					}
				});
			});
		}
	});
}



/**
 * @function module:modal~setEventsModal
 * @description Set events modal: open/close
 * @param {String} idContent Id name
 * @param {Object} data Data modal
 * @see Used inside: {@link module:modal~openModal}, {@link module:modal~closeModal}
 * @see Used in: {@link module:modal.getSetModal}
 */
function setEventsModal(idContent, data) {
	openModal(idContent, data);
	closeModal();
}



/**
 * @function module:modal.getSetModal
 * @description Create, insert and added events modal
 * @param {String} idContent Id name
 * @param {Object} data Data modal
 * @see Used inside: {@link module:modal~setEventsModal}
 * @see Used in: {@link module:moviesCRUD~setDetailFavorite}
 */
export function getSetModal(idContent, data) {
	setEventsModal(idContent, data);
}