/**
 * @file Use the 'handlebars.js' and 'moment.js' libraries.
 * This functions:
 * - Add id page.
 * - Add title page.
 * - Compiled html templates (text/x-handlebars-template).
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright 2020
 * @see {@link https://github.com/beatrizsmerino/exercises-javascript-node}
 */




/**
 * @function formatDate
 * @description Block Helper of handlebars for format date
 * @param {String} datetime - Date to transform
 * @param {String} format - Format for convert the date
 * @return {String}
 * @see Used in: {@link index.html}
 */
Handlebars.registerHelper("formatDate", function (datetime, format) {
    const date = new Date(datetime);
    return moment(date).format(format);
});





/**
 * @function setContentPageHome
 * @description Set the content of Home page
 * @see Used in: {@link setRouter}
 */
function setContentPageHome() {
    document.getElementsByClassName("page")[0].setAttribute("id", "pageHome");
    document.getElementById("pageTitle").textContent = "Home";

    let template = document.getElementById("home").innerHTML;
    // console.log(template);

    let compile = Handlebars.compile(template);
    let compiledHTML = compile({
        urlAPIdoc: "https://airemad.docs.apiary.io/",
        urlPagejs: "https://visionmedia.github.io/page.js/",
        urlHandlebars: "https://handlebarsjs.com/"
    });
    // console.log(typeof compiledHTML);

    let compiledHTMLCleanned = DOMPurify.sanitize(compiledHTML);
    // console.log("DOMPurify", compiledHTMLClean);

    document.getElementById("app").innerHTML = compiledHTMLCleanned;
}



/**
 * @function setContentPageStations
 * @description Set the content of Stations page
 * @see Used in: {@link setRouter}
 */
function setContentPageStations() {
    document.getElementsByClassName("page")[0].setAttribute("id", "pageStations");
    document.getElementById("pageTitle").textContent = "Stations";

    let template = document.getElementById("stations").innerHTML;
    let compile = Handlebars.compile(template);

    getData(urlAPI + optionsAPI.stations)
        .then(response => {
            let data = { station: response };
            // console.log(data);

            let compiledHTML = compile(data);
            // console.log(typeof compiledHTML);

            let compiledHTMLClean = DOMPurify.sanitize(compiledHTML);
            // console.log("DOMPurify", compiledHTMLClean);

            document.getElementById("app").innerHTML = compiledHTMLClean;
        })
}



/**
 * @function setContentPageStation(ctx)
 * @param {Object} ctx - Context, contain properties and methods as the parameters
 * @description Set the content of Station page
 * @see Used in: {@link setRouter}
 */
function setContentPageStation(ctx) {
    document.getElementsByClassName("page")[0].setAttribute("id", "pageStation");
    document.getElementById("pageTitle").textContent = "Station";

    let template = document.getElementById("station").innerHTML;
    let compile = Handlebars.compile(template);

    const stationId = ctx.params.id;
    // console.log(ctx);

    Promise.all(
        [
            getData(urlAPI + optionsAPI.stations + stationId),
            getData(urlAPI + optionsAPI.pollution + stationId),
            getData(urlAPI + optionsAPI.weather + stationId),
            getData(urlAPI + optionsAPI.pollen + stationId),
            getData(urlAPI + optionsAPI.acustic + stationId)
        ]
    )
        .then((responses) => {
            // console.log(responses);

            let dataResponses = {
                station: responses[0],
                pollution: responses[1],
                weather: responses[2],
                pollen: responses[3],
                acustic: responses[4]
            }
            // console.log(data);


            Object.keys(dataResponses).map((key) => {
                if (dataResponses[key] === 404 || dataResponses[key] === 500) {
                    dataResponses[key] = false;
                }
            });
            // console.log(dataResponses);


            let compiledHTML = compile(dataResponses);
            // console.log(typeof compiledHTML);

            let compiledHTMLClean = DOMPurify.sanitize(compiledHTML);
            // console.log("DOMPurify", compiledHTMLClean);

            document.getElementById("app").innerHTML = compiledHTMLClean;
        });

}



/**
 * @function setContentPageError404
 * @description Set the content of Error 404 page
 * @see Used in: {@link setRouter}
 */
function setContentPageError404() {
    document.getElementsByClassName("page")[0].setAttribute("id", "pageError404");
    document.getElementById("pageTitle").textContent = "Page not found";

    let template = document.getElementById("error404").innerHTML;
    let compile = Handlebars.compile(template);

    let images = [
        "barcelona.png",
        "madrid.png",
        "granada.png"
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];
    // console.log(randomImage);

    let compiledHTML = compile({ image: randomImage });
    // console.log(typeof compiledHTML);

    let compiledHTMLClean = DOMPurify.sanitize(compiledHTML);
    // console.log("DOMPurify", compiledHTMLClean);

    document.getElementById("app").innerHTML = compiledHTMLClean;
}