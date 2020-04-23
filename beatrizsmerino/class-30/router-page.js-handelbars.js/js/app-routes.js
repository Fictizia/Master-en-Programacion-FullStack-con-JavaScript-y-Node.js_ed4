/**
 * @file Use the 'page.js' library.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright 2020
 * @see {@link https://github.com/beatrizsmerino/exercises-javascript-node}
 */





/**
 * @function setRouter
 * @description Init router of single page application.
 * Defines a route mapping path to the given callback(s).
 * @see Used inside: {@link setContentPageHome}, {@link setContentPageStations}, {@link setContentPageStation}, {@link setContentPageError404}
 * @see Used in: {@link functionAnonimAutoExecuted}
 */
function setRouter() {
    // Base path
    page.base('/');

    // Specifying routes
    page('/', setContentPageHome);
    page('stations', setContentPageStations);
    page('stations/:id', setContentPageStation);
    page('error404', setContentPageError404);
    page('*', setContentPageError404);

    // Set up the router to start and actively watch for changes
    // page(); or page.start();
    page.start();
    page('/');
}