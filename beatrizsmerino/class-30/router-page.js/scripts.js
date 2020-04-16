// Base path
page.base('/');

// Specifying routes
page('/', getPageHome);
page('home', getPageHome);
page('about', getPageAbout);
page('portfolio', getPagePortfolio);
page('services', getPageServices);
page('contact', getPageContact);
page('*', getPageError404);

// Init router
// page(); or page.start();
page.start();


function getPageHome() {
	document.getElementById("pageTitle").textContent = "Home";
}

function getPageAbout() {
	document.getElementById("pageTitle").textContent = "About";
}

function getPagePortfolio() {
	document.getElementById("pageTitle").textContent = "Portfolio";
}

function getPageServices() {
	document.getElementById("pageTitle").textContent = "Services";
}

function getPageContact() {
	document.getElementById("pageTitle").textContent = "Contact";
}

function getPageError404() {
	document.getElementById("pageTitle").textContent = "Page not found. Error 404";
}