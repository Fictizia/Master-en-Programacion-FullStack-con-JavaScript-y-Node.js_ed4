// EJEMPLO AJAX FETCH

function ajaxHandler(url) {
	// iniciar animacion
	removeResult();
	addTimeout();
	fetch(url)
		.then(function (response) {
			console.log("--- Promesa 1 ---");
			console.log(response);
			// Hacer la conversion a JSON
			return response.json();
		})
		.then(function (data) {
			console.log("--- Promesa 2 ---");
			console.log(data);

			// Timeout
			// Terminar animacion
			let timer = setInterval(function () {
				removeTimeout();
				addResult(data);
				clearInterval(timer);
			}, 3000);

		})
		.catch(function (error) {
			// Timeout
			// Terminar animacion
			console.log(error);
		});
}



function addResult(responseData) {
	let resultDom = document.getElementById("result");
	let responseElem = document.createElement("div");
	let responseElemText = document.createTextNode(responseData.result);
	responseElem.setAttribute("id", "response");
	responseElem.appendChild(responseElemText);
	resultDom.appendChild(responseElem);
	// resultDom.innerText = responseData.result;

	// styles
	resultDom.style.width = "10rem";
	resultDom.style.height = "10rem";
	resultDom.style.marginTop = "3rem";
	resultDom.style.padding = "2rem";
	resultDom.style.display = "flex";
	resultDom.style.justifyContent = "center";
	resultDom.style.alignItems = "center";
	resultDom.style.fontSize = "8rem";
	resultDom.style.border = "2px solid black";
	resultDom.style.borderRadius = "50%";
}

function removeResult() {
	let resultDom = document.getElementById("result");
	let responseDom = document.getElementById("response");
	// console.log(responseDom);

	if (responseDom) {
		console.info("Exist #response");
		resultDom.removeChild(responseDom);
	} else {
		console.info("No exist #response");
	}
}



function addTimeout() {
	let loader = document.getElementById("loader");
	if (!loader) {
		let resultDom = document.getElementById("result");
		let template = `
			<div class="spinner">
				<div class="double-bounce1"></div>
				<div class="double-bounce2"></div>
			</div>
			`;
		let timeout = document.createElement("div");
		timeout.setAttribute("id", "loader");
		resultDom.appendChild(timeout);
		document.getElementById("loader").innerHTML = template;
	}
}

function removeTimeout() {
	let loader = document.getElementById("loader");
	if (loader) {
		let resultDom = document.getElementById("result");
		let loader = document.getElementById("loader");
		resultDom.removeChild(loader);
	}
}



let button = document.getElementById("button");
button.addEventListener("click", function () {
	let loader = document.getElementById("loader");
	if (!loader) {
		// alert("Lanzando el fetch!!");
		ajaxHandler("https://api.rand.fun/games/rockpaperscissorslizardspock", function (data) {
			console.log("Data:", data);
		});
	}
});




// Extension para crear VPN
// https://chrome.google.com/webstore/detail/touch-vpn/bihmplhobchoageeokmgbdihknkjbknd?hl=es
