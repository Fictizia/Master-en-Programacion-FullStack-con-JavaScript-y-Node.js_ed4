/**
 * @file Get the data from the API 'Rick and Morty' and display it. It generates a navigation menu filtering through the 3 types of data (characters, locations and episodes). It has a pagination in each of them. It has a searcher input to filter by name.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright Beatriz Sopeña Merino 2019. It is free software and you can find the source code on Github.
 * @see https://beatrizsmerino.github.io/rick-and-morty/
 */





/**
 * @const urlAPI
 * @description API route 'Rick and morty'
 * @type {string}
 */
const urlAPI = "https://rickandmortyapi.com/api/";

/**
 * @var appButton
 * @description App button
 * @type {HTMLElement}
 */
let appButton = document.getElementById("appButton");

/**
 * @var appContent
 * @description App content
 * @type {HTMLElement}
 */
let appContent = document.getElementById("appContent");





// TOOLS
//////////////////////////////////
/**
 * @function svgMe
 * @description Converts an `<img>` tag, with a `.svg` extention and a class `svgMe`, into a `<svg>` tag.
 * @return {object} Return the file svg
 * @example
 * <img id="rickAndMorty" class="svgMe" src="assets/images/rick-and-morty.svg" alt="Rick and Morty" title="Rick and Morty">
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
 * @param {string} string - string with the this letter in lowercase
 * @return {string} returns the same modified string
 * @example
 * var string = "dimension";
 * var newString = firstUpperCase(string);
 * console.log(newString); // Dimension
 */
function firstUpperCase(string) {
	let stingLowerCase = string.toLowerCase();
	let stringCapitalize = stingLowerCase.charAt(0).toUpperCase() + stingLowerCase.slice(1);
	return stringCapitalize;
}


/**
 * @function delay
 * @description Executes a function after a given time
 * @param {function} fn - function to execute
 * @param {number} ms - delay time in miliseconds
 * @example
 * delay(nameFunction(), 500);
 */
function delay(fn, ms) {
	let timer = 0;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(fn.bind(this, ...args), ms || 0);
	}
}





// AJAX HANDLER - FETCH
//////////////////////////////////
/**
 * @function ajaxHandler
 * @description API request
 * @param {string} url
 * @param {string} action
 * @return {object}
 * @example
 * const urlAPI = "https://rickandmortyapi.com/api/";
 * ajaxHandler(urlAPI, "filterAddContent");
 * @see setAction
 */
function ajaxHandler(url, action) {
	loaderAdd(appContent);

	fetch(url)
		.then(handleResponse)
		.then(function (data) {
			//console.log("%c--- Promise 2 ---", "padding: 0.5rem 1rem; color: #C0C0C0; background-color: #454545;");
			// console.info(data);
			console.log('data is', data);
			let timer = setInterval(function () {
				clearInterval(timer);
				loaderRemove(appContent);
				setAction(action, appContent, data);
			}, 3000);
		})
		.catch(function (error) {
			console.warn('error is', error);
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
 * @example
 * loaderCreate();
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
 * @example
 * loaderAdd();
 */
function loaderAdd() {
	let loader = loaderCreate();
	if (loader) {
		let timer = setInterval(function(){
			let loaderDom = document.getElementById("loader");
			if(!loaderDom){
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
 * @example
 * loaderRemove();
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
 * @param {string} url
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
 * @param {string} action
 * @param {HTMLElement} elementDom
 * @param {object} dataResponse
 * @see ajaxHandler
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
 * @param {HTMLElement} elementDom
 * @param {object} responseData
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
 * @param {HTMLCollectionOf} item
 * @param {Element} thisActive
 */
function filterActive(item, thisActive) {
	for (let index = 0; index < item.length; index++) {
		const element = item[index];
		if (element.classList.contains("is-active")) {
			//console.log("has class");
			element.classList.remove("is-active");
		}
		thisActive.classList.add("is-active");
	}
}


/**
 * @function filterAddContentInfo
 * @description Insert information to the content with the number of results of the request
 * @param {object} responseData
 * @return {Element}
 */
function filterAddContentInfo(responseData) {
	console.table(responseData.info);
	let listInfo = document.createElement("div");
	listInfo.setAttribute("class", "list-info");
	listInfo.innerHTML = "<p><strong>Results: </strong>" + responseData.info.count + "</p>";

	return listInfo;
}

/**
 * @function filterAddContentResults
 * @description Insert results to the content of the request
 * @param {object} responseData
 * @return {Element}
 */
function filterAddContentResults(responseData) {
	console.table(responseData.results);
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
 * @param {HTMLElement} elementDom
 * @param {object} responseData
 */
function filterAddContent(elementDom, responseData) {
	let list = document.createElement("section");
	list.setAttribute("class", "list");
	list.setAttribute("id", "list");

	const infoContent = filterAddContentInfo(responseData);
	const resultsContent = filterAddContentResults(responseData);

	function contentAdd(){
		list.appendChild(infoContent);
		list.appendChild(resultsContent);
		elementDom.appendChild(list);
	}

	function elementFound() {
		let element = document.querySelectorAll(".list");
		if (element != undefined) {
			console.dir(element);
			console.log(element.length);
			if(element.length == 0){
				contentAdd();
				paginationAdd(responseData);
			}else{
				filterRemoveContent();
				paginationRemove();
				contentAdd();
				paginationAdd(responseData);
				return true;
			}
		}
	}

	let timer = setInterval(function () {
		if(elementFound()){
			clearInterval(timer);
		}
	}, 100);
}

/**
 * @function filterRemoveContent
 * @description Remove the selected filter content of the application content
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





// CARD
//////////////////////////////////

/**
 * @function cardCreate
 * @description Create card with the data response
 * @param {Element} listCardsInner
 * @param {object} responseData
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

			//console.assert(typeof cardItemData === "string" || typeof cardItemData === "number", cardItemData + " es un " + typeof cardItemData);

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
 * @param {HTMLCollectionOf} item
 * @param {Element} thisView
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
 * @see searchAdd
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
 * @param {Element} filterActive
 * @see searchAdd
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
 * @param {Element} filterActive
 * @see filterActive
 */
function searchAdd(filterActive) {
	searchCreate();

	let searchBy = searchGet(filterActive);

	/**
	* @description Search by selected filter name when typing in the search engine input.
	* @event keyup
	* @type {object}
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
 * @param {object} responseData
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
 * @param {object} responseData
 */
function paginationSetCounter(responseData) {
	let buttonPrev = document.getElementById("buttonPrev");

	let paginationTotal = responseData.info.pages;
	let paginationNext = responseData.info.next;
	let paginationNow;

	//console.log(paginationNext);
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
	//console.log(paginationCounter);

	buttonPrev.parentNode.insertBefore(paginationCounter, buttonPrev.nextSibling);
}


/**
 * @function paginationAdd
 * @description Add pagination
 * @param {object} responseData
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
 */
function paginationRemove() {
	let pagination = document.getElementById("pagination");
	if (pagination) {
		appContent.removeChild(pagination);
	}
}


/**
 * @description Get API data
 * @event click
 * @type {object}
 */
appButton.addEventListener("click", function () {
	// alert("Get API data");
	appContentAdd(urlAPI);
	appContent.removeChild(document.getElementById("portal"));
	ajaxHandler(urlAPI, "filterAdd");
});


/**
 * @description Anonymous auto executed function
 */
(function () {
	svgMe();

	let timerFilterItem = setInterval(function () {
		let filterItem = document.getElementsByClassName("filter__item");
		if (filterItem.length > 0) {
			clearInterval(timerFilterItem);
			for (let index = 0; index < filterItem.length; index++) {
				const element = filterItem[index];

				/**
				* @description Remove / Add content and pagination when selecting the filter of the navigation menu.
				* @event click
				* @type {object}
				*/
				element.addEventListener("click", function () {
					filterRemoveContent();
					paginationRemove();
					searchRemove();

					filterActive(filterItem, this);
					searchAdd(this);
					ajaxHandler(this.getAttribute("data-url"), "filterAddContent");
				});
			}
		}
	});
})();
