/**
 * @file Proyect of the best-selling books in the Hardcover Fiction category made with The New York Times API.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @const keyAPI
 * @description API token 'New York Times Best Sellers'.
 * Change the string 'XXXXXXXXX' by the API KEY
 *   1 - Go to your account: https://developer.nytimes.com/accounts/login
 *   2 - Go to the link: https://developer.nytimes.com/my-apps
 *   3 - Find your app or create one new
 *   4 - Copy the API KEY generated or create one new
 * @type {String}
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
let keyAPI = "XXXXXXXXX";


/**
 * @const urlAPIListCategories
 * @description API route to list of categories 'New York Times Best Sellers'.
 * @type {String}
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
let urlAPIListCategories = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=" + keyAPI;


/**
 * @const urlAPIListBooks
 * @description API route to the books of the category selected 'New York Times Best Sellers'.
 * @type {String}
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
let urlAPIListBooks = "https://api.nytimes.com/svc/books/v3/lists/current/";





// AJAX HANDLER - FETCH
//////////////////////////////////

/**
 * @function ajaxHandler
 * @description API request.
 * @param {String} url - root of the API
 * @param {String} action - name of the action to excute
 * @return {Object}
 * @see Used inside: {@link activeLoader.add}, {@link activeLoader.remove},{@link emptyContent}, {@link setAction}, {@link error404}
 * @see Used in: {@link setButtonReadMore}, {@link setButtonBack}, {@link functionAnonimAutoExecuted}
 */
function ajaxHandler(url, action) {
	// console.info(url);

	activeLoader.add();

	fetch(url)
		.then(function (response) {
			if (response.status === 200) {
				response.json().then(function (data) {
					let timer = setInterval(function () {
						activeLoader.remove();
						console.info(data);
						emptyContent();
						setAction(action, data);
						clearInterval(timer);
						return data;
					}, 3000);
				});
			} else if (response.status === 404) {
				console.warn(response.status);
				let timer = setInterval(function () {
					activeLoader.remove();
					error404();
					clearInterval(timer);
					return response.status;
				}, 1000);
			}
		}).catch(function (error) {
			console.warn(error);
		});
}

/**
 * @function setAction
 * @description List of functions to choose from.
 * @param {String} action - name of the action to excute
 * @param {Object} responseData - response data of the ajax handler (json)
 * @see Used inside: {@link setDataListCategories}, {@link setDataListBooks}
 * @see Used in: {@link ajaxHandler}
 */
function setAction(action, responseData) {
    switch (action) {
        case "setDataListCategories":
            setDataListCategories(responseData);
            break;
        case "setDataListBooks":
            setDataListBooks(responseData);
            break;
        default:
            break;
    }
}



// LOADER
//////////////////////////////////

/**
 * @namespace activeLoader
 * @description Add/remove loader animation.
 * @returns {Object} Functions and properties publics
 * @see Used in: {@link ajaxHandler}
 */
const activeLoader = (function () {
	/**
	 * @method activeLoader~add
	 * @description Add loading animation.
	 */
	function add() {
		let loader = document.getElementById("loader");
		if (!loader) {
			let loader = document.createElement("div");
			loader.setAttribute("id", "loader");
			loader.setAttribute("class", "loader");
			document.body.appendChild(loader);
		}
	}

	/**
	 * @method activeLoader~remove
	 * @description Remove loading animation.
	 */
	function remove() {
		let loader = document.getElementById("loader");
		if (loader) {
			document.body.removeChild(loader);
		}
	}

	/**
	 * @public
	 * @see {@link method:activeLoader~add}, {@link method:activeLoader~remove}
	 */
	return {
		add: add,
		remove: remove
	}
})();



// ERROR 404
//////////////////////////////////

/**
 * @function error404
 * @description Add a html template, with a image svg with 404 error.
 * @see Used inside: {@link setButtonBack}
 * @see Used in: {@link ajaxHandler}
 */
function error404() {
	let template = `
		<div class="message-error">
			<img class="message-error__image" src="img/error-404.svg">
		</div>
		`;
	document.getElementsByClassName("page__content")[0].innerHTML = template;
	document.getElementsByClassName("page")[0].classList.add("is-error404");
	setButtonBack("message-error");
}



// SET DATA BOOKS
//////////////////////////////////

/**
 * @function emptyContent
 * @description Empty the ".page__content"
 * @see Use in: {@link ajaxHandler}
 */
function emptyContent() {
	document.getElementsByClassName("page__content")[0].innerHTML = "";
}


/**
 * @function setDataListCategories
 * @description Insert a html template with the list of categories. Each category have a button and set it a request to the category.
 * @param {Object} response - response data of the ajax handler (json)
 * @see Use inside: {@link setButtonReadMore}
 * @see Use in: {@link setAction}
 */
function setDataListCategories(response) {
	let listCategories = response.results;
	// console.log(listCategories);

	let listCategoriesDom = document.createElement("div");
	listCategoriesDom.setAttribute("id", "listCategories");
	listCategoriesDom.setAttribute("class", "list-categories");

	for (let index = 0; index < listCategories.length; index++) {
		const category = listCategories[index];

		let categoryDom = document.createElement("article");
		categoryDom.setAttribute("class", "category");
		categoryDom.setAttribute("data-index", index.toString());

		let template = `<div class='category__inner'>
							<h3 class='category__title category__item'>
								#${index + 1} ${category.list_name}
							</h3>
							
							<div class='category__text category__item'>
								<p>
									<strong>
										Oldest:
									</strong>
									${category.oldest_published_date}
								</p>
								<p>
									<strong>
										Newest:
									</strong>
									${category.newest_published_date}
								</p>
								<p>
									<strong>
										Updated:
									</strong>
									${category.updated}
								</p>
							</div>

							<button class='category__button category__item button--read-more button' data-category="${category.list_name_encoded}">
								READ MORE <i class='button__icon button__icon--right fas fa-arrow-circle-right'></i>
							</button>
						</div>`;

		categoryDom.innerHTML = template;
		listCategoriesDom.appendChild(categoryDom);
	}

	// console.log(listBooksDom);
	document.getElementsByClassName("page__content")[0].appendChild(listCategoriesDom);

	setButtonReadMore();
}


/**
 * @function setButtonReadMore
 * @description Add click event to the category button with a request to the category given in the attribute 'data-category'.
 * @see Use inside: {@link ajaxHandler}
 * @see Use in: {@link setDataListBooks}
 */
function setButtonReadMore() {
	let categoriesButton = document.querySelectorAll(".category__button");
	for (let index = 0; index < categoriesButton.length; index++) {
		const categoryDom = categoriesButton[index];

		let category = categoryDom.getAttribute("data-category");
		categoryDom.addEventListener("click", function () {
			ajaxHandler(urlAPIListBooks + category + ".json?api-key=" + keyAPI, "setDataListBooks");
		});
	}
}


/**
 * @function setDataCategoryTitle
 * @description Create and add a html template with the title of the selected category
 * @param {Object} response - response data of the ajax handler (json)
 * @see Use in: {@link setDataListBooks}
 */
function setDataCategoryTitle(response) {
	console.log(response.results.list_name);

	let template = `
		<h2 class="list-books__category">
			${response.results.list_name}
		</h2>
	`;
	document.getElementsByClassName("page__content")[0].innerHTML = template;
}


/**
 * @function setButtonBack
 * @description Create and add a html template of a button for back to the category list.
 * @param {ElementHTML} classElementDom 
 * @see Use inside: {@link ajaxHandler}
 * @see Use in: {@link error404}, {@link setDataListBooks}
 */
function setButtonBack(classElementDom) {
	let template = `
				<button id="buttonBack" class="button--back button">
					<i class="button__icon button__icon--left fas fa-arrow-circle-left"></i> Back to categories
				</button>
				`;
	document.getElementsByClassName(classElementDom)[0].innerHTML += template;
	document.getElementById("buttonBack").addEventListener("click", function () {
		ajaxHandler(urlAPIListCategories, "setDataListCategories");
	});
}


/**
 * @function setDataBooks
 * @description Insert a html template with the title of the category, one button for back to the category list and the list of books of the category selected.
 * @param {Object} response - response data of the ajax handler (json).
 * @see Used insed: {@link setDataCategoryTitle}, {@link setButtonBack}
 * @see Used in: {@link setAction}
 */
function setDataListBooks(response) {
	setDataCategoryTitle(response);
	setButtonBack("page__content");

	let listBooks = response.results.books;
	// console.log(listBooks);

	let listBooksDom = document.createElement("div");
	listBooksDom.setAttribute("id", "listBooks");
	listBooksDom.setAttribute("class", "list-books");

	for (let index = 0; index < listBooks.length; index++) {
		const book = listBooks[index];

		let bookDom = document.createElement("article");
		bookDom.setAttribute("class", "book");
		bookDom.setAttribute("data-index", index.toString());

		let template = `<div class='book__inner'>
							<h3 class='book__title book__item'>
								#${index + 1} ${book.title}
							</h3>
							<img class='book__image book__item' src='${book.book_image}' alt='Image Default'>
							<span class='book__ranking book__item'>
								Weeks on list: ${book.weeks_on_list}
							</span>
							<div class='book__text book__item'>
								<p>
									${book.description}
								</p>
							</div>

							<a class='book__item button--amazon button' href="${book.amazon_product_url}" target='_blank'>
								BUY AT AMAZON <i class='button__icon button__icon--right fas fa-arrow-circle-right'></i>
							</a>
						</div>`;

		bookDom.innerHTML = template;

		listBooksDom.appendChild(bookDom);
	}

	// console.log(listBooksDom);
	document.getElementsByClassName("page__content")[0].appendChild(listBooksDom);
}





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside: {@link ajaxHandler}
 */
(function () {
	ajaxHandler(urlAPIListCategories, "setDataListCategories");
})()