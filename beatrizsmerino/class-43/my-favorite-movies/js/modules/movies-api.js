/**
 * @file movies-api.js
 * @module moviesAPI
 * @description Get and search data movies, and print the interface
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 * @requires loader
 * @requires createTemplate
 * @requires moviesCRUD
 */
import * as tool from './tools.js';
import * as loader from './loader.js';
import * as createTemplate from './createTemplate.js';
import * as moviesCRUD from './movies-crud.js';





/**
 * @const module:moviesAPI~apiUrl
 * @description URL of OMDb API.
 * @type {String}
 */
const apiUrl = "http://www.omdbapi.com";



/**
 * @const module:moviesAPI~apiKey
 * @description KEY of OMDb API.
 * - Connexion OMDb API (The Open Movie Database)
 * 	- Create the API KEY {@link http://www.omdbapi.com/apikey.aspx}
 * 	- Find the API KEY in the email used
 * 	- Change this string 'XXXXXXXXXXXX' for yor data
 * @type {String}
 */
const apiKey = "XXXXXXXXXXXX";



/**
 * @function module:moviesAPI~saveSearchTextMovie
 * @description Save search text into input hidden and find by the text #searchInput or #searchInputHidden.
 * @returns {String}
 * @see Used in: {@link module:moviesAPI.searchByTextMovie}, {@link module:moviesAPI.setSearchResultsMovies}
 */
function saveSearchTextMovie() {
	const searchInput = document.getElementById("searchInput");
	const searchInputHidden = document.getElementById("searchInputHidden");
	let searchInputValue = searchInput.value;
	let searchInputHiddenValue = searchInputHidden.value;

	// Remove the whitespace from both sides of the string
	searchInputValue.trim();

	// Replace the whitespace from the middle of the string by +
	searchInputValue.replace(/\s/g, "+");

	// Search by the text #searchInput or #searchInputHidden
	let searchText = "";
	if (searchInputValue !== "" && searchInputHiddenValue === "" || searchInputValue !== "" && searchInputHiddenValue !== "") {
		// Get text to the search input and set his value to the input hidden
		searchInputHidden.setAttribute("value", searchInputValue);
		searchText = searchInputValue;
	} else if (searchInputValue === "" && searchInputHiddenValue !== "") {
		searchText = searchInputHiddenValue;
	}

	return searchText;
}



/**
 * @function module:moviesAPI.searchByTextMovie
 * @description Get the movies according to the text of the input and the pagination to search
 * @param {Number} pagination Search page number
 * @returns {Object|String}
 * @see Used inside: {@link module:moviesAPI~saveSearchTextMovie}
 * @see Used in: {@link module:moviesAPI~getSetSearchPaginationMovies}, {@link module:moviesAPI.setEventsSearchMovies}
 */
export async function searchByTextMovie(pagination) {

	// Search by the input hidden value or input value
	const searchInput = document.getElementById("searchInput");
	const searchInputValue = searchInput.value;
	const searchInputHiddenValue = saveSearchTextMovie();

	let valueSearch;
	if (searchInputHiddenValue !== "") {
		valueSearch = searchInputHiddenValue;
	} else {
		valueSearch = searchInputValue;
	}


	try {
		const url = `${apiUrl}/?type=movie&s=${valueSearch}&page=${pagination}&apikey=${apiKey}`;

		const find = await fetch(url);
		const json = await find.json();

		return json;

	} catch (error) {
		throw new Error("Error:", error);
	}
}



/**
 * @function module:moviesAPI.searchByIdMovie
 * @description Check if exist movie by id
 * @param {String} id Id name
 * @returns {Object|String}
 * @see Used in: {@link module:moviesCRUD~getIdMovie}
 */
export async function searchByIdMovie(id) {
	try {
		const url = `${apiUrl}/?type=movie&i=${id}&apikey=${apiKey}`;

		const find = await fetch(url);
		const json = await find.json();
		return json;

	} catch (error) {
		throw new Error("Error:", error);
	}
}



/**
 * @function module:moviesAPI~emptySearchInputMovie
 * @description Clean search input
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function emptySearchInputMovie() {
	const searchInput = document.getElementById("searchInput");
	searchInput.value = "";
}



/**
 * @function module:moviesAPI~emptySearchResultsMovies
 * @description Clean search results
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function emptySearchResultsMovies() {
	const searchResults = document.getElementById("searchResults");
	searchResults.innerHTML = "";
}



/**
 * @function module:moviesAPI.checkLoadSearchResultsMovies
 * @description Check if search results it is empty
 * @param {String} callbackFunction Name of callback function
 * @see Used in: {@link module:moviesCRUD.tasksFavorite}
 */
export function checkLoadSearchResultsMovies(callbackFunction) {
	const searchResults = document.getElementById("searchResults");

	let timerSearch = setInterval(function () {
		if (searchResults.innerHTML !== "") {
			clearInterval(timerSearch);
			callbackFunction();
		}
	}, 100);
}



/**
 * @function module:moviesAPI~getSetSearchInfoMovies
 * @description Create and return the information about the data found
 * @param {Object} data Search results info
 * @returns {Object}
 * @see Used inside: {@link module:tool.stringToNode}, {@link module:createTemplate.infoMovies}
 * @see Used in: {@link module:moviesAPI~setListMovies}
 */
function getSetSearchInfoMovies(data) {
	const searchInputHidden = document.getElementById("searchInputHidden");

	const textSearch = searchInputHidden.value;
	const totalSearch = data.totalResults;

	let template = createTemplate.infoMovies(textSearch, totalSearch);
	let templateNode = tool.stringToNode(template);

	return templateNode;
}



/**
 * @function module:moviesAPI~getListMovies
 * @description Create and return the list of movies
 * @param {Object} data Search results data
 * @returns {Object}
 * @see Used inside:
 * {@link module:tool.stringToNode},
 * {@link module:createTemplate.movie}
 * @see Use in: {@link module:moviesAPI~setListMovies}
 */
function getListMovies(data) {
	const list = document.createElement("ul");
	list.setAttribute("id", "listMovies");
	list.setAttribute("class", "list-movies");

	const items = data.Search.map(search => {
		let item = createTemplate.movie(search);
		let itemNode = tool.stringToNode(item);

		return itemNode;
	});

	items.map(item => {
		list.appendChild(item);
	});

	return list;
}



/**
 * @function module:moviesAPI~setListMovies
 * @description Print Search info and results
 * @param {Object} content Content to insert the data
 * @param {Object} data Search results data
 * @see Used inside: {@link module:moviesAPI~getSetSearchInfoMovies}, {@link module:moviesAPI~getListMovies}
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function setListMovies(content, data) {
	// Search info
	let searchInfo = getSetSearchInfoMovies(data);
	content.appendChild(searchInfo);

	// List results
	let searchResults = getListMovies(data);
	content.appendChild(searchResults);
}



/**
 * @function module:moviesAPI~setSwiperMovies
 * @description Add structure swiper to the results search
 * @see Used inside: {@link module:tool.wrap}, {@link module:tool.stringToNode}
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function setSwiperMovies() {

	function addStructure() {
		const listDom = document.getElementById("listMovies");
		const itemsDom = listDom.children;

		// Add swiper-wrapper
		listDom.classList.add("class", "swiper-wrapper");


		// Add swiper-slide
		Array.from(itemsDom).map(item => item.classList.add("swiper-slide"));

		// Add swiper-container
		const swiperContainer = tool.wrap(listDom, null, null, "swiper-container");


		// Add swiper
		const swiper = tool.wrap(swiperContainer, null, "moviesSwiper", "swiper");
		const swiperDom = document.getElementById("moviesSwiper");


		// Add swiper-button
		const templateSwiperButton = `
			<div id="moviesSwiperButtonPrev" class="swiper-button-prev"></div>
			<div id="moviesSwiperButtonNext" class="swiper-button-next"></div>
		`;
		const templateSwiperButtonNode = tool.stringToNode(templateSwiperButton);
		swiperDom.appendChild(templateSwiperButtonNode);
	}

	function create() {
		var mySwiper = new Swiper("#moviesSwiper .swiper-container", {
			slidesPerView: 1,
			spaceBetween: 10,
			threshold: 50,

			// Navigation arrows
			navigation: {
				prevEl: '#moviesSwiperButtonPrev',
				nextEl: '#moviesSwiperButtonNext',
			},

			// Breakpoints
			breakpoints: {
				500: {
					slidesPerView: 1,
				},
				600: {
					slidesPerView: 2,
				},
				700: {
					slidesPerView: 3,
				},
				900: {
					slidesPerView: 4,
				},
				1200: {
					slidesPerView: 5,
				},
				1400: {
					slidesPerView: 6,
				},
			}
		})
	}

	addStructure();
	create();
}



/**
 * @function module:moviesAPI~getSetSearchPaginationMovies
 * @description Create and print pagination of results from 10 to 10
 * @param {Object} content Content to insert the pagination
 * @param {Object} data Data for get the data pagination
 * @param {Number} pagination Page to go
 * @see Used inside:
 * {@link module:tool.stringToNode},
 * {@link module:createTemplate.paginationMovies},
 * {@link module:moviesAPI.searchByTextMovie}, {@link module:moviesAPI.setSearchResultsMovies}
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function getSetSearchPaginationMovies(content, data, pagination) {

	// Max number of results into pagination
	let formTo = 10;
	let paginationMax = Math.round(data.totalResults / formTo);
	if (paginationMax < 1) {
		paginationMax = 1
	}


	// Indicate the displayed results
	let paginationPages = `1 - ${formTo}`;
	if (data.totalResults < formTo) {
		paginationPages = `1 - ${data.totalResults}`;
	} else if ((Math.round(data.totalResults / formTo)) === pagination) {
		paginationPages = `${(pagination * formTo) - formTo + 1} - ${data.totalResults}`;
	} else {
		paginationPages = `${(pagination * formTo) - formTo + 1} - ${pagination * formTo}`;
	}


	const paginationData = {
		"pages": paginationPages,
		"prev": pagination - 1,
		"now": pagination,
		"next": pagination + 1,
	}


	// Create and print pagination
	const paginationTemplate = createTemplate.paginationMovies(paginationData);
	let paginationTemplateNode = tool.stringToNode(paginationTemplate);
	content.appendChild(paginationTemplateNode);


	// Add event got to the page... and disabled/ability buttons
	let paginationButtons = document.getElementsByClassName("pagination-button");
	Array.from(paginationButtons).map(button => {
		if (
			button.getAttribute("id") !== "paginationButtonNow" &&
			parseInt(button.getAttribute("data-pagination")) === 0 ||
			parseInt(button.getAttribute("data-pagination")) >= paginationMax + 1
		) {
			button.setAttribute("disabled", "disabled");
		} else {
			button.removeAttribute("disabled");
		}

		/**
		 * @event {click}
		 * @description When you click on the button pagination search:
		 * - Search by text the movie and go to the prev/next page
		 * - Set search results of the movies
		 */
		button.addEventListener("click", function () {
			let paginationGo = parseInt(this.getAttribute("data-pagination"));

			if (paginationGo >= 1 && paginationGo < data.totalResults) {
				searchByTextMovie(paginationGo).then(data => {
					setSearchResultsMovies(data, paginationGo);
					moviesCRUD.tasksFavorite();
					moviesCRUD.updateButtonsFavorite();
				});
			}
		});
	});
}



/**
 * @function module:moviesAPI~showHideInfoMovie
 * @description Show/Hide info Movie
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function showHideInfoMovie() {
	const movieInfoButton = document.querySelectorAll(".movie__button[data-type='info']");

	/**
	 * @event {click}
	 * @description When you click on the button movie info:
	 * - Show/Hide the info movie
	 * - Hide the info movie after 10 seconds
	 */
	Array.from(movieInfoButton).map((button) => {
		button.addEventListener("click", function (event) {
			var movie = tool.getClosest(event.target, '.movie');
			movie.classList.toggle("is-view");

			setTimeout(() => movie.classList.remove("is-view"), 10000);
		});
	});
}



/**
 * @function module:moviesAPI~getSetPageErrorMovies
 * @description Create and print message error
 * @param {Object} content Content to insert the info error
 * @param {String} textError Text error of API
 * @see Used inside: {@link module:createTemplate.pageErrorMovies}
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function getSetPageErrorMovies(content, textError) {
	let messageError;
	switch (textError) {
		case "Invalid API key!":
			messageError = "¡Clave de OMDb API no válida!";
			break;
		case "Movie not found!":
			messageError = "Película no encontrada!"
			break;
		case "Too many results.", "Incorrect IMDb ID.":
			messageError = "Introduce al menos 3 caracteres para realizar la búsqueda."
			break;
		default:
			break;
	}

	(typeof messageError === "undefined") ? messageError = textError : messageError;

	const template = createTemplate.pageErrorMovies(messageError);

	content.innerHTML = template;
}



/**
 * @function module:moviesAPI.setSearchResultsMovies
 * @description Clean and print results in the interface
 * @param {Object} data Search results data
 * @param {Number} pagination Page to go
 * @see Used inside: {@link module:moviesAPI~saveSearchTextMovie}, {@link module:moviesAPI~emptySearchInputMovie}, {@link module:moviesAPI~emptySearchResultsMovies}, {@link module:moviesAPI~setListMovies}, {@link module:moviesAPI~setSwiperMovies}, {@link module:moviesAPI~getSetSearchPaginationMovies}, {@link module:moviesAPI~showHideInfoMovie}, {@link module:moviesAPI~getSetPageErrorMovies}
 * @see Used in: {@link module:moviesAPI.setEventsSearchMovies}
 */
export function setSearchResultsMovies(data, pagination) {
	const content = document.getElementById("searchResults");

	if (data.Response === "True") {
		saveSearchTextMovie();

		emptySearchInputMovie();
		emptySearchResultsMovies();

		setListMovies(content, data);
		setSwiperMovies();
		getSetSearchPaginationMovies(content, data, pagination);
		showHideInfoMovie();
	} else {
		getSetPageErrorMovies(content, data.Error);
	}
}



/**
 * @function module:moviesAPI.setEventsSearchMovies
 * @description Events for execute the search movies (input, button and pagination of the search)
 * @see Used inside:
 * {@link module:loader.add}, {@link module:loader.remove},
 * {@link module:moviesAPI.searchByTextMovie}, {@link module:moviesAPI.setSearchResultsMovies},
 * {@link module:moviesCRUD.updateButtonsFavorite}, {@link module:moviesCRUD.tasksFavorite}, {@link module:moviesCRUD.hideListFavorites}
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function setEventsSearchMovies() {
	const searchInput = document.getElementById("searchInput");
	const searchButton = document.getElementById("searchButton");


	/**
	 * @event {click}
	 * @description When you click on the search button:
	 * - Search the movie by the entered text
	 * - Show an animation while the animation is loading
	 * (loading time is not real, it is forced to 7 seconds to show animation longer)
	 * - Show search results
	 * - Update button state based on saved movies I liked or didn't like
	 * - Adds save and delete tasks for searched movie buttons
	 * - Force hide the favorites list if it is open
	 */
	searchButton.addEventListener("click", function (event) {
		event.preventDefault();

		let paginationGo = 1;
		loader.add();

		searchByTextMovie(paginationGo)
			.then((data) => {
				setTimeout(function () {
					loader.remove();
					setSearchResultsMovies(data, paginationGo);
					moviesCRUD.updateButtonsFavorite();
					moviesCRUD.tasksFavorite();
					moviesCRUD.hideListFavorites();
				}, 7000);
			});
	});


	/**
	 * @event {keyup}
	 * @description When you press enter key:
	 * - Trigger the event click executed on search button
	 */
	searchInput.addEventListener("keyup", function (event) {
		if (event.keyCode === 13) {
			searchButton.click();
		}
	});
}