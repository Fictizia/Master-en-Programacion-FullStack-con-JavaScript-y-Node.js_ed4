/**
 * @file createTemplate.js
 * @module createTemplate
 * @description Templates html
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 */
import * as tool from './tools.js';





/**
 * @function module:createTemplate.iconFlag
 * @description Create a template to icon flag
 * @param {Object} data Data flag
 * @param {String} classCSS Class name
 * @returns {String}
 * @see Used in: {@link module:tool.findCreateIconsFlags}
 */
export function iconFlag(data, classCSS) {
	let template = `<img class="${classCSS}" src="images/flags/svg/${data["flag"]}" alt="${data["lang"]}"></img>`;

	return template;
}



/**
 * @function module:createTemplate.modal
 * @description Create template to modal window
 * @param {String} idModal Id name
 * @param {Object} data Data modal
 * @returns {String}
 * @see Used in: {@link module:modal~insertModal}
 */
export function modal(idModal, data) {
	const template = `
		<div id="${idModal}" class="modal__wrapper">
			<div class="modal">
				<div class="modal__container">
					<div class="modal__inner">
						<button class="modal__button-close button-close button button--icon"
								aria-label="Cerrar ventana">
							<i class="button-close__icon fas fa-times"></i>
						</button>

						<div class="modal__content">
							${data}
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	return template;
}



/**
 * @function module:createTemplate.infoMovies
 * @description Create template to the info movies
 * @param {String} textSearch Text found
 * @param {String} totalSearch Total number results found
 * @returns {String}
 * @see Used in: {@link module:moviesAPI~getSetSearchInfoMovies}
 */
export function infoMovies(textSearch, totalSearch) {
	const template = `
		<div class="search-info">
			<h3>
				Resultados encontados:
			</h3>
			<p class="search-info__text">
				Con el texto: <em>${textSearch}</em>
			</p>
			<p class="search-info__total">
				Total: <em>${totalSearch}</em>
			</p>
		</div>
	`;

	return template;
}



/**
 * @function module:createTemplate.movie
 * @description Create template to the item list movies
 * @param {Object} data Data movie
 * @returns {String}
 * @see Used in: {@link module:moviesAPI~getListMovies}
 */
export function movie(data) {
	console.info("%cMovie:", tool.consoleCSS.info);
	console.info("Data:", data);

	const template = `
		<li id="${data.imdbID}" class="movie">
			<div class="movie__content">
				<div class="movie__list-buttons list-buttons">
					<div class="movie__list-buttons--favorite">
						<button class="movie__button button-favorite button button--icon"
								data-id="${data.imdbID}"
								data-type="favorite"
								data-task="like"
								aria-label="Guardar película favorita">
							<i class="movie__icon button-favorite__icon button__icon far fa-heart animate__animated animate__bounceIn"></i>
						</button>

						<button class="movie__button button-favorite button button--icon is-hide"
								data-id="${data.imdbID}"
								data-type="favorite"
								data-task="dislike"
								aria-label="Eliminar película favorita">
							<i class="movie__icon button-favorite__icon button__icon fas fa-heart animate__animated animate__bounceIn"></i>
						</button>
					</div>

					<button class="movie__button button-info button button--icon"
							data-id="${data.imdbID}"
							data-type="info"
							aria-label="Ver información de la película">
						<i class="movie__icon button-info__icon button__icon far fa-info"></i>
					</button>
				</div>

				<div class="movie__image">
					<img src="${(data.Poster === "N/A") ? "images/movie-image-not-found.png" : data.Poster}" alt="${data.Title}">
				</div>
				
				<div class="movie__body">
					<h3 class="movie__title">
						${data.Title}
						<span class="movie__year">
							(${data.Year})
						</span>
					</h3>
				</div>
			</div>
		</li>
		`;
	return template;
}



/**
 * @function module:createTemplate.paginationMovies
 * @description Create template to the pagination search
 * @param {Object} data Data pagination
 * @returns {String}
 * @see Used in: {@link module:moviesAPI~getSetSearchPaginationMovies}
 */
export function paginationMovies(data) {
	const template = `
		<nav id="moviesPagination" class="pagination__wrapper noselect" aria-label="Pagination">
			<ul class="pagination">
				<li class="pagination-item">
					<button id="paginationButtonPrev" class="pagination-button pagination-button--prev" data-pagination="${data.prev}">
						<i class="pagination-button__icon fa fa-chevron-left"></i>
					</button>
				</li>
				<li class="pagination-item">
					<button id="paginationButtonNow" class="pagination-button pagination-button--now" data-pagination="${data.now}">${data.pages}</button>
				</li>
				<li class="pagination-item">
					<button id="paginationButtonNext" class="pagination-button pagination-button--next" data-pagination="${data.next}">
						<i class="pagination-button__icon fa fa-chevron-right"></i>
					</button>
				</li>
			</ul>
		</nav>
	`;

	return template;
}



/**
 * @function module:createTemplate.pageErrorMovies
 * @description Create template to the message errors
 * @param {String} textError Text Error
 * @returns {String}
 * @see Used in: {@link module:moviesAPI~getSetPageErrorMovies}
 */
export function pageErrorMovies(textError) {
	const template = `
		<div class="search-error">
			<h3 class="search-error__title">
				Error de búsqueda
			</h3>
			<h4 class="search-error__subtitle">
				${textError}
			</h4>
			<img class="search-error__image" src="images/search-error.svg">
		</div>
	`;

	return template;
}



/**
 * @function module:createTemplate.tableFavorites
 * @description Create a table to the list of favorite movies
 * @returns {String}
 * @see Used in: {@link module:moviesCRUD~insertTableFavorites}
 */
export function tableFavorites() {
	const templateTable = `
		<div class="table__wrapper">
			<table id="favoriteListTable" class="table">
				<thead id="favoriteListTableHead" class="table__head">
					<tr class="table__tr">
						<th class="table__th" colspan="5">
							Mi lista de peliculas favoritas
						</th>
					</tr>
				</thead>
				<tbody id="favoriteListTableBody" class="table__body">
					<tr class="table__tr">
						<th class="table__th favorite-list__index">
							#
						</th>
						<th class="table__th favorite-list__date">
							Save date
						</th>
						<th class="table__th favorite-list__title">
							Título
						</th>
						<th class="table__th favorite-list__task-info favorite-list__task">
							Ver info
						</th>
						<th class="favorite-list__task-delete favorite-list__task table__th">
							<button id="buttonDeleteListFavorites" class="button-delete button"
								data-type="favorite"
								data-task="dislike"
								aria-label="Eliminar todas las películas favoritas">
								Eliminar todo
							</button>
						</th>
					</tr>
				</tbody>
				<tfoot id="favoriteListTableFooter" class="table__foot">
					<tr class="table__tr">
						<td class="table__td" colspan="5">
							<time class="timer"></time>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>`;

	return templateTable;
}



/**
 * @function module:createTemplate.tableRowFavorite
 * @description Create a template to the favorite movie
 * @param {Object} favorite Data of favorite
 * @returns {String}
 * @see Used in: {@link module:moviesCRUD~addTableRowFavorite}
 */
export function tableRowFavorite(favorite) {
	const template = `
		<tr class="table__tr" data-id="${favorite.id}">
			<td class="favorite-list__favorite-index table__td">
				${favorite.index}
			</td>
			<td class="favorite-list__favorite-date table__td">
				${favorite.date}
			</td>
			<td class="favorite-list__favorite-title table__td">
				${favorite.title}
			</td>
			<td class="favorite-list__favorite-task-info favorite-list__favorite-task table__td">
				<button class="modal__button-open favorite__button button-info button"
						data-id="${favorite.id}"
						data-type="info"
						aria-label="Ver información de la película">
					<i class="movie__icon button-info__icon button__icon far fa-info"></i>
				</button>
			</td>
			<td class="favorite-list__favorite-task-delete favorite-list__favorite-task table__td">
				<button class="favorite__button button-favorite button"
						data-id="${favorite.id}"
						data-type="favorite"
						data-task="dislike"
						aria-label="Eliminar película favorita">
					<i class="favorite__icon button-favorite__icon button__icon fas fa-heart"></i>
				</button>
			</td>
		</tr>`;
	return template;
}



/**
 * @function module:createTemplate.detailFavorite
 * @description Create template to detail favorite
 * @param {Object} data Data favorite
 * @return {String}
 * @see Used inside: {@link module:tool.findCreateIconsFlags}
 * @see Used in: {@link module:moviesCRUD~setDetailFavorite}
 */
export function detailFavorite(data) {
	let favoritePoster = (data.Poster === "N/A") ? 'images/movie-image-not-found.png' : data.Poster;

	let favoriteType = "";
	if (data.Type !== "N/A") {
		favoriteType = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Tipo:
				</strong>
				${data.Type}
			</p>
		`;
	};


	let favoriteGenre = "";
	if (data.Genre !== "N/A") {
		favoriteGenre = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Género:
				</strong>
				${data.Genre}
			</p>
		`;
	};


	let favoriteCountry = "";
	if (data.Country !== "N/A") {
		favoriteCountry = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					País:
				</strong>
				${data.Country}
				${tool.findCreateIconsFlags(data.Country, 'favorite-detail__icon favorite-detail__icon--flag')}
			</p>
		`;
	};


	let favoriteLanguage = "";
	if (data.Language !== "N/A") {
		favoriteLanguage = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Idioma:
				</strong>
				${data.Language}
			</p>
		`;
	};


	let favoriteProduction = "";
	if (data.Production !== "N/A") {
		favoriteProduction = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Producción:
				</strong>
				${data.Production}
			</p>
		`;
	};


	let favoriteRuntime = "";
	if (data.Runtime !== "N/A") {
		favoriteRuntime = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Duración:
				</strong>
				<time datetime="${data.Runtime}">
					${data.Runtime}
				</time>
				<i class="favorite-detail__icon fas fa-clock"></i>
			</p>
		`;
	};


	let favoriteYear = "";
	if (data.Year !== "N/A") {
		favoriteYear = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Año:
				</strong>
				<time datetime="${data.Year}">
					${data.Year}
				</time>
			</p>
		`;
	};


	let favoriteReleased = "";
	if (data.Released !== "N/A") {
		favoriteReleased = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Publicación:
				</strong>
				<time datetime="${data.Released}">
					${data.Released}
				</time>
				<i class="favorite-detail__icon fas fa-calendar-alt"></i>
			</p>
		`;
	};


	let favoriteDVD = "";
	if (data.DVD !== "N/A") {
		favoriteDVD = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Venta DVD:
				</strong>
				<time datetime="${favoriteDVD}">
					${favoriteDVD}
				</time>
				<i class="favorite-detail__icon fas fa-compact-disc"></i>
			</p>
		`;
	};


	let favoriteWriter = "";
	if (data.Writer !== "N/A") {
		favoriteWriter = `
			<p>
				<strong class="favorite-detail__subtitle">
					Escritor:
				</strong>
				${data.Writer}
				<i class="favorite-detail__icon fas fa-feather-alt"></i>
			</p>
		`;
	};


	let favoriteDirector = "";
	if (data.Director !== "N/A") {
		favoriteDirector = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Director:
				</strong>
				${data.Director}
				<i class="favorite-detail__icon fas fa-video"></i>
			</p>
		`;
	};


	let favoriteActors = "";
	if (data.Actors !== "N/A") {
		favoriteActors = `
			<p>
				<strong class="favorite-detail__subtitle">
					Actores:
				</strong>
				${data.Actors}
				<i class="favorite-detail__icon fas fa-users"></i>
			</p>
		`;
	};


	let favoritePlot = "";
	if (data.Plot !== "N/A") {
		favoritePlot = `
			<p>
				<strong class="favorite-detail__subtitle">
					Descripción:
				</strong>
				${data.Plot}
			</p>
		`;
	};


	let favoriteAwards = "";
	if (data.Awards !== "N/A") {
		favoriteAwards = `
			<p>
				<strong class="favorite-detail__subtitle">
					Premios:
				</strong>
				${data.Awards}
				<i class="favorite-detail__icon fas fa-trophy"></i>
			</p>
		`;
	};


	let favoriteImdbVotes = "";
	if (data.imdbVotes !== "N/A") {
		favoriteImdbVotes = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Imdb votes:
				</strong>
				${data.imdbVotes}
				<i class="favorite-detail__icon fas fa-star"></i>
			</p>
		`;
	};


	let favoriteImdbRating = "";
	if (data.imdbRating !== "N/A") {
		favoriteImdbRating = `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">
					Imdb clasificación:
				</strong>
				${data.imdbRating}
			</p>
		`;
	};


	let favoriteRatings = "";
	if (data.Ratings !== "N/A") {
		[...data.Ratings].map((rating) => {
			favoriteRatings += `
			<p class="favorite-detail__item">
				<strong class="favorite-detail__subtitle">${rating.Source}:</strong>
				${rating.Value}
			</p>
		`;
			return favoriteRatings;
		});
	}



	const template = `
		<div class="favorite-detail" data-id="${data.imdbID}">
			<h2 class="favorite-detail__title">
				${data.Title}
			</h2>

			<div class="favorite-detail__columns favorite-detail__row">
				<div class="favorite-detail__row">
					<img class="favorite-detail__poster" src="${favoritePoster}" alt="${data.Title}">
				</div>

				<div class="favorite-detail__row">
					${favoriteType}
					${favoriteGenre}
					${favoriteCountry}
					${favoriteLanguage}
					${favoriteProduction}
					${favoriteRuntime}
					${favoriteYear}
					${favoriteReleased}
					${favoriteDVD}
				</div>
			</div>

			<div class="favorite-detail__row">
				${favoriteWriter}
				${favoriteDirector}
				${favoriteActors}
				${favoritePlot}
				${favoriteAwards}
			</div>

			<div class="favorite-detail__row">
				<h3>
					Clasificaciones y votos:
				</h3>
				<p class="favorite-detail__item">
					<strong class="favorite-detail__subtitle">Imdb id:</strong>
					${data.imdbID}					
				</p>
				${favoriteImdbVotes}
				${favoriteImdbRating}
				${favoriteRatings}
			</div>
		</div>
	`;
	return template;
}