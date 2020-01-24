// Ejercicios
// 1 - Twitter no nos permite usar la consola porque han sobreescrito los métodos.... ¡Es hora de solucionarlo!

// :trollface: Puedes simularlo en cualquier pestaña haciendo esto:


function addCSS(element, cssObj) {
	for (var property in cssObj) {
		element.style[property] = cssObj[property];
	}
}

var loggerDiv = document.createElement('div');
loggerDiv.setAttribute("id", "logger");
document.body.appendChild(loggerDiv);
addCSS(document.getElementById("logger"), {
	"z-index": 1000,
	"font-family": "monospace",
	"color": "rgb(21, 157, 25)",
	"background-color": "black",
	"position": "fixed",
	"max-height": "300px",
	"min-height": "75px",
	"min-width": "100%",
	"bottom": "0px",
	"left": "0px",
	"padding": "10px",
	"overflow": "scroll",
	"margin": "0px",
	"box-sizing": "border-box",
	"padding-top": "30px"
});


var loggerHeader = document.createElement('h3');
loggerHeader.setAttribute("id", "logger-header");
loggerHeader.innerText = "H4CK3D TWITTER CONSOLE";
document.getElementById("logger").appendChild(loggerHeader);


addCSS(document.getElementById("logger-header"), {
	"border-bottom": "1px solid rgb(21, 157, 25)",
	"color": "rgb(21, 157, 25)",
	"z-index": 10000,
	"position": "fixed",
	"display": "block",
	"margin-top": "-30px",
	"width": "100%",
	"background-color": "black",
	"line-height": "30px"
});



// Solve (edge case): Break `console = null` logic
if (!console || typeof (console) !== "object") {
	// poner en otra tab -> Object.keys(console)
	var expectedThings = ["debug", "error", "info", "log", "warn", "dir", "dirxml", "table", "trace", "group", "groupCollapsed", "groupEnd", "clear", "count", "assert", "markTimeline", "profile", "profileEnd", "timeline", "timelineEnd", "time", "timeEnd", "timeStamp", "context", "memory"];
	window.console = console || {};

	expectedThings.forEach(function (item) {
		console[item] = function () { }
	});
}



// Restore beahviour with DOM support hack
for (var method in console) {
	console[method] = function (msg) {
		loggerDiv.innerHTML += `<p>${method === "memory" ? new Date().getTime() : method}: ${msg}</p>`;
	};
}

console.log("Hi Twitter, U just got PWNED!");

console.hide = function () {
	loggerDiv.style.display = "none";
};

console.show = function () {
	loggerDiv.style.display = "block";
};


// Probando mi simulacion de consola
console.log("holi! consola");
console.info("Práctica: Hacking Twitter");
console.table({ "index": 1, "name": "Twitter", "type": "Social media" });
console.table(["apples", "oranges", "bananas"]);






// 2 - Saca en un Array los ultimos 100 usuarios que han twiteado sobre #javascript en Twitter Notas:
// Entrar en https://twitter.com/hashtag/javascript?src=hash&lang=es
// No necesitas estar logeado
// Necesitas primero resolver el ejercicio anterior para poder tener una consola disponible
var scrollSpeed = 1000;
var totalUsuariosUnicos = 50;

function validFrame() {
	var users = getUsers();
	console.log(`Ya tenemos ${users.size}/${totalUsuariosUnicos} usuarios únicos`);
	if (users.size >= totalUsuariosUnicos) {
		clearInterval(scrollInterval);
		for (let user of users) {
			console.log(`User: ${user}`);
		}
		return false;
	} else {
		return true;
	}
}
function getUsers() {
	var usuariosSlctr = document.querySelectorAll(".stream-item-header > a")
	var usuarios = new Set()

	for (var i = 0; i < usuariosSlctr.length; i++) {
		usuarios.add(usuariosSlctr[i].href.replace("https://twitter.com/", "@"))
	}
	return usuarios
}

var scrollInterval = setInterval(function () {
	if (validFrame()) {
		console.log("¡Necesitamos scrollear más!")
		window.scrollTo(0, document.body.scrollHeight);
	}
}, scrollSpeed);




// 3 - Publica un tweet sin usar el ratón desde la web de Twitter.com... mencionando a @fictiziaEscuela :-)
// document.getElementById("global-new-tweet-button").click();
// document.querySelector("div.tweet-box.rich-editor.is-showPlaceholder > div").innerText = "@fictiziaEscuela Esto es una prueba... ignorar... Gracias! 🔥🔥🔥";
// document.querySelector(".SendTweetsButton").click();

// Event click to button for open the window tweet
document.querySelector("#react-root > div > div > div > header > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-jw8lkh.r-e7q0ms > a").click();

// Remove placeholder
var placeholderElem = document.querySelector("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-t23y2h.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-15d164r.r-5f2r5o.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div.css-1dbjc4n.r-184en5c > div > div > div > div > div > div > div > div.css-1dbjc4n.r-18u37iz > div.css-901oao.r-hkyrab.r-6koalj.r-16y2uox.r-1qd0xha.r-1b6yd1w.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0 > div > div > div > div.public-DraftEditorPlaceholder-root");
document.querySelector("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-t23y2h.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-15d164r.r-5f2r5o.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div.css-1dbjc4n.r-184en5c > div > div > div > div > div > div > div > div.css-1dbjc4n.r-18u37iz > div.css-901oao.r-hkyrab.r-6koalj.r-16y2uox.r-1qd0xha.r-1b6yd1w.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0 > div > div > div").removeChild(placeholderElem);

// Insert text to the field
var fatherElem = document.querySelector("#react-root > div > div > div.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-184en5c > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-t23y2h.r-1wbh5a2.r-rsyp9y.r-1pjcn9w.r-htvplk.r-1udh08x.r-1potc6q > div > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > div:nth-child(1) > div > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-15d164r.r-5f2r5o.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div.css-1dbjc4n.r-184en5c > div > div > div > div > div > div > div > div.css-1dbjc4n.r-18u37iz > div.css-901oao.r-hkyrab.r-6koalj.r-16y2uox.r-1qd0xha.r-1b6yd1w.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0 > div > div > div > div.DraftEditor-editorContainer > div > div > div > div > span");
var newElem = document.createElement("span");
newElem.setAttribute("data-text", true);
fatherElem.parentNode.replaceChild(newElem, fatherElem);
var tweet = "@fictiziaEscuela Esto es una prueba... ignorar... Gracias! 🔥🔥🔥";
newElem.innerText = tweet;

// It doesn't work, the tweet button cannot be enabled, it is protected
// Force keyup to enable tweet button
// document.addEventListener("keyup", function (e) {
//	e.preventDefault();
// 	console.dir(e.target);
// });
// function triggerEvent(el, type, keyCode) {
// 	if ('createEvent' in document) {
// 		// modern browsers, IE9+
// 		var e = document.createEvent('HTMLEvents');
// 		e.keyCode = keyCode;
// 		e.initEvent(type, false, true);
// 		el.dispatchEvent(e);
// 	} else {
// 		// IE 8
// 		var e = document.createEventObject();
// 		e.keyCode = keyCode;
// 		e.eventType = type;
// 		el.fireEvent('on' + e.eventType, e);
// 	}
// }
// var field = document.querySelector("div.notranslate.public-DraftEditor-content");
// field.dispatchEvent(new Event('focus'));
// field.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'a' }));
// triggerEvent(field, 'keyup', 13);

// var twittear = document.querySelector("#react-root > div > div > div > main > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-1tlfku8.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-184en5c > div.css-1dbjc4n.r-156q2ks > div:nth-child(1) > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-15d164r.r-5f2r5o.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div:nth-child(2) > div > div > div:nth-child(2) > div.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1w2pmg.r-1n0xq6e.r-1vuscfd.r-1dhvaqw.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr");
// twittear.setAttribute("aria-disabled", "false");
// twittear.setAttribute("data-focusable", "true");
// twittear.removeAttribute("disabled");

// Add event click to button tweet
twittear.click();
