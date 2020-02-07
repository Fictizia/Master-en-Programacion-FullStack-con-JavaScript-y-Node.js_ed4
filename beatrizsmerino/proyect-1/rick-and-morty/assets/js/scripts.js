/**
 * @file Get the data from the API 'Rick and Morty' and display it. It generates a navigation menu filtering through the 3 types of data (characters, locations and episodes). It has a pagination in each of them. It has a searcher input to filter by name.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright Beatriz Sopeña Merino 2019. It is free software and you can find the source code on Github.
 * @see {@link https://beatrizsmerino.github.io/rick-and-morty/}
 */





/**
 * @const urlAPI
 * @description API route 'Rick and morty'
 * @type {String}
 * @see Used in: {@link ajaxHandler}
 */
const urlAPI = "https://rickandmortyapi.com/api/";


/**
 * @var appButton
 * @description App button
 * @type {HTMLElement}
 * @see Used in: {@link click}
 */
let appButton = document.getElementById("appButton");


/**
 * @var appContent
 * @description App content
 * @type {HTMLElement}
 * @see Used in: {@link setAction}, {@link appContentAdd}, {@link filterRemoveContent}, {@link searchCreate}, {@link searchRemove}, {@link paginationCreate}, {@link paginationRemove}, {@link click}
 */
let appContent = document.getElementById("appContent");





// TOOLS
//////////////////////////////////

/**
 * @function svgMe
 * @description Converts an `<img>` tag, with a `.svg` extention and a class `svgMe`, into a `<svg>` tag.
 * @return {Object} Return the file svg
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
function svgMe() {
	let images = document.querySelectorAll("img.svgMe");

	// console.info("Array of images -> ", images);

	images.forEach(image => {
		let imgId = image.getAttribute("id");
		let imgClass = image.getAttribute("class");
		let imgUrl = image.getAttribute("src");

		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				// console.info("request in xml -> ", request.responseXML);
				callback(request.responseXML);
			}
		};

		function callback(requestXML) {
			let imgSvg = requestXML.querySelector("svg");

			// console.info("data type of 'data' -> ", typeof requestXML);
			// console.info("'data' -> ", requestXML);
			// console.info("images with svgMe -> ", imgSvg);

			if (typeof imgId !== "undefined") {
				// console.info(imgId);
				imgSvg.setAttribute("id", imgId);
			}

			if (typeof imgClass !== "undefined") {
				// console.info(imgClass);
				imgSvg.setAttribute("class", imgClass);
				imgSvg.classList.add("svgMe--replaced");
			}

			imgSvg.removeAttribute("xmlns:a");
			if (
				!imgSvg.getAttribute("viewBox") &&
				imgSvg.getAttribute("height") &&
				imgSvg.getAttribute("width")
			) {
				imgSvg.setAttribute(
					"viewBox",
					"0 0 " +
					imgSvg.getAttribute("height") +
					" " +
					imgSvg.getAttribute("width")
				);
			}

			image.replaceWith(imgSvg);
		}

		request.open("GET", imgUrl);
		request.send();
	});
}


/**
 * @function firstUpperCase
 * @description Converts the first letter of a string to uppercase
 * @param {String} string - string with the this letter in lowercase
 * @return {String} returns the same modified string
 * @see Used in: {@link cardCreate}
 */
function firstUpperCase(string) {
	let stingLowerCase = string.toLowerCase();
	let stringCapitalize = stingLowerCase.charAt(0).toUpperCase() + stingLowerCase.slice(1);
	return stringCapitalize;
}


/**
 * @function delay
 * @description Executes a function after a given time
 * @param {Function} fn - function to execute
 * @param {Number} ms - delay time in miliseconds
 * @see Used in: {@link searchAdd}
 */
function delay(fn, ms) {
	let timer = 0;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(fn.bind(this, ...args), ms || 0);
	};
}





// AJAX HANDLER - FETCH
//////////////////////////////////

/**
 * @function ajaxHandler
 * @description API request
 * @param {String} url - root of the API
 * @param {String} action - name of the action to excute
 * @return {object}
 * @see Used inside: {@link loaderAdd}, {@link loaderRemove}, {@link setAction}
 * @see Used in: {@link searchAdd}, {@link paginationAdd}, {@link click}
 */
function ajaxHandler(url, action) {
	loaderAdd();

	fetch(url)
		.then(handleResponse)
		.then(function (data) {
			// console.log("%c--- Promise 2 ---", "padding: 0.5rem 1rem; color: #C0C0C0; background-color: #454545;");
			// console.info(data);
			// console.info('data is', data);
			let timer = setInterval(function () {
				clearInterval(timer);
				loaderRemove();
				messageRemove("messageError404");
				setAction(action, appContent, data);
			}, 3000);
		})
		.catch(function (error) {
			// console.warn('error is', error);
			if (error.status === 404) {
				loaderRemove();
				messageError404Add();
			}
		});

	function handleResponse(response) {
		let contentType = response.headers.get('content-type')
		if (contentType.includes('application/json')) {
			return handleJSONResponse(response);
		} else if (contentType.includes('text/html')) {
			return handleTextResponse(response);
		} else {
			// Other response types as necessary. I haven't found a need for them yet though.
			throw new Error(`Sorry, content-type ${contentType} not supported`);
		}
	}

	function handleJSONResponse(response) {
		return response.json()
			.then(json => {
				if (response.ok) {
					return json;
				} else {
					return Promise.reject(Object.assign({}, json, {
						status: response.status,
						statusText: response.statusText
					}));
				}
			});
	}

	function handleTextResponse(response) {
		return response.text()
			.then(text => {
				if (response.ok) {
					return json;
				} else {
					return Promise.reject({
						status: response.status,
						statusText: response.statusText,
						err: text
					});
				}
			});
	}
}





// LOADER
//////////////////////////////////
/**
 * @function loaderCreate
 * @description Creation of a loading animation
 * @return {HTMLElement}
 * @see Used in: {@link loaderAdd}
 */
function loaderCreate() {
	let template = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        `;
	let loader = document.createElement("div");

	loader.setAttribute("id", "loader");
	loader.setAttribute("class", "loader");
	loader.innerHTML = template;

	return loader;
}


/**
 * @function loaderAdd
 * @description Add loading animation
 * @see Used in: {@link ajaxHandler}
 */
function loaderAdd() {
	let loader = loaderCreate();
	if (loader) {
		let timer = setInterval(function () {
			let loaderDom = document.getElementById("loader");
			if (!loaderDom) {
				clearInterval(timer);
				// document.querySelectorAll(".page__item").style.filter = "blur(1rem)";
				document.body.classList.add("is-searching");
				document.body.appendChild(loader);
			}
		}, 100);
	}
}


/**
 * @function loaderRemove
 * @description Remove loading animation
 * @see Used in: {@link ajaxHandler}
 */
function loaderRemove() {
	let loaderDom = document.getElementById("loader");
	if (loaderDom) {
		//scripts.jsdocument.querySelectorAll(".page__item").style.filter = "none";
		document.body.classList.remove("is-searching");
		document.body.removeChild(loaderDom);
	}
}





// FILTER
//////////////////////////////////

/**
 * @function appContentAdd
 * @description Add link of the API to the app content
 * @param {String} url - root of the API
 * @see Used in: {@link click}
 */
function appContentAdd(url) {
	let linkId = document.getElementById("linkApi");

	if (!linkId) {
		let link = document.createElement("a");
		let linkText = document.createTextNode(url);

		link.setAttribute("id", "linkApi");
		link.setAttribute("href", url);
		link.setAttribute("target", "_blank");
		link.appendChild(linkText);
		appContent.appendChild(link);
	}
}


/**
 * @function setAction
 * @description List of functions to choose from
 * @param {String} action - name of the action to excute
 * @param {HTMLElement} elementDom - DOM element where the response data is inserted
 * @param {Object} dataResponse - response data of the ajax handler (json)
 * @see Used inside: {@link filterAdd}, {@link filterAddContent}
 * @see Used in: {@link ajaxHandler}
 */
function setAction(action, elementDom, dataResponse) {
	if (action === "filterAdd") {
		filterAdd(elementDom, dataResponse);
	} else if (action === "filterAddContent") {
		filterAddContent(elementDom, dataResponse);
	}
}


/**
 * @function filterAdd
 * @description Add navigation menu filtering through the 3 types of data (characters, locations and episodes) to the app content.
 * @param {HTMLElement} elementDom - DOM element where the filter is inserted
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used in: {@link setAction}
 */
function filterAdd(elementDom, responseData) {
	let navId = document.getElementById("filter");

	if (!navId) {
		let list = document.createElement("ul");
		list.setAttribute("id", "filter");
		list.setAttribute("class", "filter");

		for (const key in responseData) {
			const element = responseData[key];
			let item = document.createElement("li");
			let itemText = document.createTextNode(key);

			item.setAttribute("data-filter", key);
			item.setAttribute("data-url", element + "?page=1");
			item.setAttribute("class", "filter__item");

			item.appendChild(itemText);
			list.appendChild(item);
		}

		elementDom.appendChild(list);
	}
}


/**
 * @function filterActive
 * @description Add class 'is-active' to the item of the navigation clicked.
 * @param {HTMLCollectionOf} item - filter list
 * @param {Element} thisActive - filter selected
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
function filterActive(item, thisActive) {
	for (let index = 0; index < item.length; index++) {
		const element = item[index];
		if (element.classList.contains("is-active")) {
			// console.log("has class");
			element.classList.remove("is-active");
		}
		thisActive.classList.add("is-active");
	}
}


/**
 * @function filterAddContentInfo
 * @description Insert information to the content with the number of results of the request
 * @param {Object} responseData - response data of the ajax handler (json)
 * @return {Element}
 * @see Used in: {@link filterAddContent}
 */
function filterAddContentInfo(responseData) {
	// console.table(responseData.info);
	let listInfo = document.createElement("div");
	listInfo.setAttribute("class", "list-info");
	listInfo.innerHTML = "<p><strong>Results: </strong>" + responseData.info.count + "</p>";

	return listInfo;
}


/**
 * @function filterAddContentResults
 * @description Insert results to the content of the request
 * @param {Object} responseData - response data of the ajax handler (json)
 * @return {Element}
 * @see Used inside: {@link cardCreate}, {@link cardMoveImage}, {@link cardWhenClicked}
 * @see Used in: {@link filterAddContent}
 */
function filterAddContentResults(responseData) {
	// console.table(responseData.results);
	let listCards = document.createElement("div");
	let listCardsInner = document.createElement("div");

	listCards.setAttribute("class", "list-cards");

	listCardsInner.setAttribute("id", "filterResult");
	listCardsInner.setAttribute("class", "list-cards__inner");

	cardCreate(listCardsInner, responseData);
	cardMoveImage();
	cardWhenClicked();

	listCards.appendChild(listCardsInner);

	return listCards;
}


/**
 * @function filterAddContent
 * @description Add the filter content application
 * @param {HTMLElement} elementDom - DOM element where the filter content is inserted
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used inside: {@link filterAddContentInfo}, {@link filterAddContentResults}...
 * @see Used in: {@link setAction}
 */
function filterAddContent(elementDom, responseData) {
	let list = document.createElement("section");
	list.setAttribute("class", "list");
	list.setAttribute("id", "list");

	const infoContent = filterAddContentInfo(responseData);
	const resultsContent = filterAddContentResults(responseData);

	/**
	* @function filterAddAllContent
	* @description Insert the content
	* @see {@link filterFoundContent}
	*/
	function filterAddAllContent() {
		list.appendChild(infoContent);
		list.appendChild(resultsContent);
		elementDom.appendChild(list);
	}

	/**
	 * @function filterFoundContent
	 * @description Check if the contents of one filter are shown and before loading another one, delete it
	 * @see Used inside: {@link filterAddAllContent}, {@link filterRemoveContent}, {@link paginationRemove}, {@link paginationAdd}
	 */
	function filterFoundContent() {
		let element = document.querySelectorAll(".list");
		if (element != undefined) {
			// console.dir(element);
			// console.log(element.length);
			if (element.length == 0) {
				filterAddAllContent();
				paginationAdd(responseData);
			} else {
				filterRemoveContent();
				paginationRemove();
				filterAddAllContent();
				paginationAdd(responseData);
				return true;
			}
		}
	}

	let timer = setInterval(function () {
		if (filterFoundContent()) {
			clearInterval(timer);
		}
	}, 100);
}


/**
 * @function filterRemoveContent
 * @description Remove the selected filter content of the application content
 * @see Used in: {@link searchAdd}, {@link filterAddContent}, {@link paginationAdd}, {@link functionAnonimAutoExecuted}
 */
function filterRemoveContent() {
	let list = document.querySelectorAll(".list");
	for (let index = 0; index < list.length; index++) {
		const element = list[index];
		if (element && element.innerHTML !== "") {
			appContent.removeChild(element);
		}
	}
}





// MESSAGE
//////////////////////////////////
/**
 * @function messageAdd
 * @description Create the message component
 * @param {String} messageId - Id for events js
 * @param {String} messageClass - Class css with modifier BEM of the message
 * @param {String} messageText - Text of the message
 * @see Used inside: {@link messageCloseAdd}
 * @see Used in: {@link messageError404Add}, {@link messageAlertAdd}
 */
function messageAdd(messageId, messageClass, messageText) {
	let messageDom = document.getElementById(messageId);

	let messageButton;
	switch (messageClass) {
		case "message-alert":
			messageButton = messageCloseAdd();
			messageButton = messageButton.outerHTML;
			break;
		case "message-error404":
			messageButton = "";
		default:
			break;
	}

	if (!messageDom) {
		let messageElem = document.createElement("div");
		messageElem.setAttribute("id", messageId);
		messageElem.setAttribute("class", `message ${messageClass}`);

		let templateMessage = `
			<div class="message__inner">
				${messageButton}
				<div class="message__content">
					<p>
						${messageText}
					</p>
				</div>
			</div>
		`;
		messageElem.innerHTML = templateMessage;
		return messageElem;
	}
}



/**
 * @function messageCloseAdd
 * @description Create a button for remove the message
 * @see Used in: {@link messageAlertAdd}
 */
function messageCloseAdd() {
	let buttonDom = document.createElement("button");
	buttonDom.classList.add("message__button-close");

	return buttonDom;
}


/**
 * @function messageRemove
 * @description Remove the message component
 * @param {String} messageId - id of the message to remove
 * @see Used in: {@link ajaxHandler}
 */
function messageRemove(messageId) {
	let messsage = document.getElementById(messageId);
	if (messsage) {
		messsage.parentElement.removeChild(messsage);
		// console.log("Message removed");
	}
}


/**
 * @function messageError404Add
 * @description Add message error 404 (search not found)
 * @see Used inside: {@link messageAdd}
 * @see Used in: {@link ajaxHandler}
 */
function messageError404Add() {
	filterRemoveContent();
	paginationRemove();

	let templateMessage = messageAdd("messageError404", "message-error404", "Error 404.</br> Search not found");
	appContent.appendChild(templateMessage);
}


/**
 * @function messageAlertAdd
 * @description Create a alert personalized
 * @param {String} messageName - Name of message in camellCase
 * @param {String} messageText - Text of message
 * @see Used inside: {@link messageAdd}, {@link messageRemove}
 */
function messageAlertAdd(messageName, messageText) {
	let messageId = "messageAlert" + messageName;
	let templateMessage = messageAdd(messageId, "message-alert", messageText);
	document.body.appendChild(templateMessage);
	document.querySelector("#" + messageId + " .message__button-close").addEventListener("click", function () {
		messageRemove(messageId);
	});
}





// CARD
//////////////////////////////////

/**
 * @function cardCreate
 * @description Create card with the data response
 * @param {Element} listCardsInner - DOM element that wraps up the card list
 * @param {object} responseData - response data of the ajax handler (json)
 * @see Used inside: {@link firstUpperCase}
 * @see Used in: {@link filterAddContentResults}
 */
function cardCreate(listCardsInner, responseData) {
	// console.group("Results");
	for (const key in responseData.results) {
		const element = responseData.results[key];
		let card = document.createElement("article");

		card.setAttribute("class", "card");
		card.setAttribute("data-index", key);

		let cardButton = document.createElement("span");
		cardButton.setAttribute("class", "card__button icon-eye");

		// console.group("Result " + key);
		for (const titleData in element) {
			const cardItemData = element[titleData];
			// console.info(firstUpperCase(titleData) + ": " + cardItemData);

			let cardItemDom = document.createElement("div");
			cardItemDom.setAttribute("class", "card__data");
			cardItemDom.setAttribute("data-type", titleData);

			if (titleData !== "image") {
				let cardParagraphDom = document.createElement("h4");
				cardParagraphDom.setAttribute("class", "card__subtitle");
				let cardParagraphTextDom = document.createTextNode(
					firstUpperCase(titleData) + ": "
				);
				cardParagraphDom.appendChild(cardParagraphTextDom);
				cardItemDom.appendChild(cardParagraphDom);
			} else {
				let cardImageDom = document.createElement("img");
				cardImageDom.setAttribute("src", cardItemData);
				cardItemDom.appendChild(cardImageDom);
			}

			// console.assert(typeof cardItemData === "string" || typeof cardItemData === "number", cardItemData + " es un " + typeof cardItemData);

			if (typeof cardItemData === "object") {
				if (Array.isArray(cardItemData)) {
					let cardUlDom = document.createElement("ul");
					cardUlDom.setAttribute("class", "card__list");

					for (let index = 0; index < cardItemData.length; index++) {
						const cardUlData = cardItemData[index];

						let cardLiDom = document.createElement("li");
						let cardLiTextDom = document.createTextNode(cardUlData);

						cardLiDom.appendChild(cardLiTextDom);
						cardUlDom.appendChild(cardLiDom);
					}

					cardItemDom.appendChild(cardUlDom);
				} else {
					let cardUlDom = document.createElement("ul");
					cardUlDom.setAttribute("class", "card__list");

					for (const key in cardItemData) {
						const cardUlData = cardItemData[key];

						let cardLiDom = document.createElement("li");
						let cardLiTextDom = document.createTextNode(cardUlData);

						cardLiDom.appendChild(cardLiTextDom);
						cardUlDom.appendChild(cardLiDom);
					}

					cardItemDom.appendChild(cardUlDom);
				}
			} else {
				if (titleData !== "image") {
					let cardParagraphDom = document.createElement("p");
					let cardParagraphTextDom = document.createTextNode(cardItemData);

					cardParagraphDom.appendChild(cardParagraphTextDom);
					cardItemDom.appendChild(cardParagraphDom);
				}
			}

			card.appendChild(cardButton);
			card.appendChild(cardItemDom);
		}
		// console.groupEnd();

		listCardsInner.appendChild(card);
	}
	// console.groupEnd();
}


/**
 * @function cardMoveImage
 * @description Move the card image up.
 * @see Used in: {@link filterAddContentResults}
 */
function cardMoveImage() {
	let timer = setInterval(function () {
		let cardData = document.querySelectorAll(".card__data");
		if (cardData) {
			clearInterval(timer);
			let card = document.querySelectorAll(".card");
			for (let index = 0; index < card.length; index++) {
				const element = card[index];
				let imageItem = element.querySelector(".card__data[data-type='image']");
				if (imageItem) {
					element.removeChild(imageItem);
					element.insertBefore(imageItem, element.firstChild);
				}
			}
		}
	}, 300);
}


/**
 * @function cardToggleView
 * @description See more card info
 * @param {HTMLCollectionOf} item - list of cards
 * @param {Element} thisView - card selected
 * @see Used in: {@link cardWhenClicked}
 */
function cardToggleView(item, thisView) {
	for (let index = 0; index < item.length; index++) {
		const element = item[index];
		if (!thisView.classList.contains("is-view")) {
			element.classList.remove("is-view");
		}
	}
	thisView.classList.toggle("is-view");
}


/**
 * @function cardWhenClicked
 * @description Event click in the card
 * @see Used inside: {@link cardToggleView}
 * @see Used in: {@link click}
 */
function cardWhenClicked() {
	let timerCard = setInterval(function () {
		let cardItem = document.getElementsByClassName("card");

		if (cardItem.length > 0) {
			clearInterval(timerCard);
			for (let index = 0; index < cardItem.length; index++) {
				const element = cardItem[index];

				/**
				* @description View more card info when click it.
				* @event click
				* @type {object}
				* @see Used inside: {@link cardToggleView}
				*/
				element.addEventListener("click", function (e) {
					cardToggleView(cardItem, this);
				});
			}
		}
	});
}





// SEARCH
//////////////////////////////////

/**
 * @function searchCreate
 * @description Create searcher
 * @see Used in: {@link searchAdd}
 */
function searchCreate() {
	let searchDom = document.createElement("div");
	let searchInnerDom = document.createElement("div");
	let searchIconDom = document.createElement("div");
	let searchInput = document.createElement("input");

	searchDom.setAttribute("id", "search");
	searchDom.setAttribute("class", "search");
	searchInnerDom.setAttribute("class", "search__inner");
	searchIconDom.setAttribute("class", "search__icon icon-magnifying-glass");

	searchInput.setAttribute("id", "searchInput");
	searchInput.setAttribute("class", "search__input");

	searchInnerDom.appendChild(searchIconDom);
	searchInnerDom.appendChild(searchInput);
	searchDom.appendChild(searchInnerDom);
	appContent.appendChild(searchDom);
}


/**
 * @function searchGet
 * @description Get the active filter to find it.
 * @param {Element} filterActive - filter selected
 * @see Used in: {@link searchAdd}
 */
function searchGet(filterActive) {
	let searchInput = document.getElementById("searchInput");
	let filterActiveText = filterActive.getAttribute("data-filter");
	searchInput.setAttribute("placeholder", "Search by name of " + filterActiveText);

	let searchBy;
	switch (filterActiveText) {
		case "characters":
			searchBy = "character";
			break;
		case "episodies":
			searchBy = "episode";
			break;
		case "locations":
			searchBy = "location";
			break;
		default:
			break;
	}

	// console.assert(searchBy !== "", "Not Search");
	// console.log(searchBy);

	return searchBy;
}


/**
 * @function searchAdd
 * @description Add searcher
 * @param {Element} filterActive - filter selected
 * @see Used inside: {@link searchCreate}, {@link searchGet}...
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
function searchAdd(filterActive) {
	searchCreate();

	let searchBy = searchGet(filterActive);

	/**
	* @description Search by selected filter name when typing in the search engine input.
	* @event keyup
	* @type {Object}
	* @see Used inside: {@link delay}, {@link filterRemoveContent}, {@link paginationRemove}, {@link ajaxHandler}
	*/
	document.getElementById("searchInput").addEventListener("keyup", delay(function (e) {
		let valueInput = this.value;

		filterRemoveContent();
		paginationRemove();
		ajaxHandler(urlAPI + searchBy + "/?" + "name" + "=" + valueInput, "filterAddContent");

		// console.log(this);
		// console.log(this.value);
		// console.log(urlAPI + searchBy + "/?" + "name" + "=" + valueInput);
		// console.assert(valueInput, "Input hasn`t value");
	}, 500));
}


/**
 * @function searchRemove
 * @description Remove searcher
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
function searchRemove() {
	let search = document.getElementById("search");
	if (search) {
		appContent.removeChild(search);
	}
}




// PAGINATION
//////////////////////////////////

/**
 * @function paginationCreate
 * @description Create pagination
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used in: {@link paginationAdd}
 */
function paginationCreate(responseData) {
	let pagination = document.createElement("div");
	pagination.setAttribute("class", "pagination");
	pagination.setAttribute("id", "pagination");

	let buttonNext = document.createElement("div");
	buttonNext.setAttribute("class", "pagination__button icon-chevron-right");
	buttonNext.setAttribute("id", "buttonNext");
	buttonNext.setAttribute("data-url", responseData.info.next);

	let buttonPrev = document.createElement("div");
	buttonPrev.setAttribute("class", "pagination__button icon-chevron-left");
	buttonPrev.setAttribute("id", "buttonPrev");
	buttonPrev.setAttribute("data-url", responseData.info.prev);

	pagination.appendChild(buttonPrev);
	pagination.appendChild(buttonNext);
	appContent.appendChild(pagination);
}


/**
 * @function paginationSetCounter
 * @description Create counter pagination
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used in: {@link paginationAdd}
 */
function paginationSetCounter(responseData) {
	let buttonPrev = document.getElementById("buttonPrev");

	let paginationTotal = responseData.info.pages;
	let paginationNext = responseData.info.next;
	let paginationNow;

	// console.log(paginationNext);
	if (paginationNext == "") {
		paginationNow = paginationTotal;
	} else {
		var paginationNextUrl = new URL(paginationNext);
		var numPageNext = paginationNextUrl.searchParams.get("page");
		paginationNow = parseInt(numPageNext) - 1;

		if (paginationNow <= 1 || isNaN(paginationNow)) {
			paginationNow = 1;
		}
	}


	// console.log(paginationNext);
	// console.log(paginationNow);


	let paginationCounter = document.createElement("div");
	let paginationCounterText = document.createTextNode(
		paginationNow.toString() + " - " + paginationTotal.toString()
	);

	paginationCounter.setAttribute("class", "pagination__counter");
	paginationCounter.appendChild(paginationCounterText);
	// console.log(paginationCounter);

	buttonPrev.parentNode.insertBefore(paginationCounter, buttonPrev.nextSibling);
}


/**
 * @function paginationAdd
 * @description Add pagination
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used inside: {@link paginationCreate}, {@link paginationSetCounter}...
 * @see Used in: {@link filterFoundContent}
 */
function paginationAdd(responseData) {
	paginationCreate(responseData);
	paginationSetCounter(responseData);

	let button = document.getElementsByClassName("pagination__button");
	for (let index = 0; index < button.length; index++) {
		const element = button[index];

		/**
		* @description Remove/Add content and pagination by selecting the filter from the navigation menu.
		* @event click
		* @type {object}
		* @see Used inside: {@link filterRemoveContent}, {@link paginationRemove}, {@link ajaxHandler}
		*/
		element.addEventListener("click", function () {
			let url = this.getAttribute("data-url");

			if (url !== "") {
				filterRemoveContent();
				paginationRemove();
				ajaxHandler(url, "filterAddContent");
			}
		});
	}
}


/**
 * @function paginationRemove
 * @description Remove pagination
 * @see Used in: {@link functionAnonimAutoExecuted}, {@link filterAddContent}, {@link searchAdd}, {@link paginationAdd}
 */
function paginationRemove() {
	let pagination = document.getElementById("pagination");
	if (pagination) {
		appContent.removeChild(pagination);
	}
}





// ADBLOCK
//////////////////////////////////

/**
 * @function adblockDetected
 * @description Callback executed if adblock is installed
 * @see Used inside {@link messageAlert}
 * @see Used in: {@link checkAdblock}
 **/
function adblockDetected() {
	let message = "<i class='message-alert__icon icon-warning'></i> AdBlock is enabled";
	// console.warn(message);
	// alert(message);
	messageAlertAdd("AdBlock", message);
}


/**
 * @function adblockDisabled
 * @description Callback executed if adblock is disabled
 * @see Used in: {@link checkAdblock}
 **/
function adblockDisabled() {
	let message = "AdBlock is not enabled";
	// console.info(message);
}


/**
 * @function adblockVerify
 * @description Verify if the user has installed the Adblock browser extension
 * @see Used inside: {@link adblockDetected} {@link adblockDisabled}
 * @see Used in: {@link functionAnonimAutoExecuted}
 **/
function adblockVerify() {
	if (typeof blockAdBlock === "undefined") {
		adblockDetected();
	} else {
		blockAdBlock.onDetected(adblockDetected);
		blockAdBlock.onNotDetected(adblockDisabled);
	}
}





/**
 * @description Get API data
 * @event click
 * @type {Object}
 * @see Used inside: {@link appContentAdd}, {@link ajaxHandler}
 */
appButton.addEventListener("click", function () {
	// alert("Get API data");
	appContentAdd(urlAPI);
	appContent.removeChild(document.getElementById("portal"));
	ajaxHandler(urlAPI, "filterAdd");
});


/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside: {@link svgMe}...
 */
(function () {
	adblockVerify();
	svgMe();

	let timerFilterItem = setInterval(function () {
		let filterArray = document.getElementsByClassName("filter__item");
		if (filterArray.length > 0) {
			clearInterval(timerFilterItem);
			for (let index = 0; index < filterArray.length; index++) {
				const filterItem = filterArray[index];

				/**
				* @description Remove / Add content and pagination when selecting the filter of the navigation menu.
				* @event click
				* @type {object}
				* @see Used inside: {@link filterRemoveContent}, {@link paginationRemove}, {@link searchRemove}, {@link filterActive}, {@link searchAdd}, {@link ajaxHandler}
				*/
				filterItem.addEventListener("click", function () {
					filterRemoveContent();
					paginationRemove();
					searchRemove();

					filterActive(filterArray, this);
					searchAdd(this);
					ajaxHandler(this.getAttribute("data-url"), "filterAddContent");
				});
			}
		}
	});
})();
