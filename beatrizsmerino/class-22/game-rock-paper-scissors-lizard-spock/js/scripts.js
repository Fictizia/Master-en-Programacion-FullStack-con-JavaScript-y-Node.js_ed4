// EJEMPLO AJAX FETCH

function ajaxHandler(url) {
	removeResponse();
	createResponse("responseUser");
	createResponse("responseComputer");
	addLoader();

	Promise.all([
		fetch(url).then(value => value.json()),
		fetch(url).then(value => value.json())
	])
		.then((allResponses) => {
			const response1 = allResponses[0];
			const response2 = allResponses[1];

			console.log(response1);
			console.log(response2);

			let timer = setInterval(function () {
				removeLoader();
				addResponseUser(response1);
				addResponseComputer(response2);
				addResultGame(response1.result, response2.result);
				clearInterval(timer);
			}, 3000);
		})
		.catch(function (error) {
			removeLoader();
			console.log(error);
		});
}



function addLoader() {
	const loader = document.getElementsByClassName("loader");

	if (loader.length === 0) {
		let responseDOM = document.querySelectorAll(".response");

		if (responseDOM) {
			for (response of responseDOM) {
				let loaderElem = document.createElement("div");

				const loaderTemplate = `
					<div class="spinner">
						<div class="double-bounce1"></div>
						<div class="double-bounce2"></div>
					</div>
					`;
				loaderElem.setAttribute("class", "loader");
				loaderElem.innerHTML = loaderTemplate;

				response.appendChild(loaderElem);
			}
		}
	}
}

function removeLoader() {
	let loader = document.getElementsByClassName("loader");

	if (loader.length === 0) {
		const responseDOM = document.querySelectorAll(".response");

		for (response of responseDOM) {
			response.remove(loader);
		}
	}
}



function createResponse(responseId) {
	let resultDom = document.getElementById("result");
	let responseElem = document.createElement("div");

	responseElem.setAttribute("id", responseId);
	responseElem.setAttribute("class", "response");

	resultDom.appendChild(responseElem);
}

function insertResponse(responseId, responseContent) {
	let responseElem = document.getElementById(responseId);
	responseElem.innerHTML = responseContent;
}

function addResponseUser(responseData) {
	insertResponse("responseUser", responseData.result);
}

function addResponseComputer(responseData) {
	insertResponse("responseComputer", responseData.result);
}

function removeResponse() {
	let resultDom = document.getElementById("result");
	let responseDOM = document.querySelectorAll(".response");

	// console.log(responseDOM);
	if (responseDOM) {
		for (response of responseDOM) {
			// console.info("Exist #" + response.getAttribute("id"));
			resultDom.removeChild(response);
		}
	} else {
		console.info("No exist response");
	}
}



function addResultGame(resultUser, resultComputer) {
	const resultDom = document.getElementById("result");
	const resultMessageElem = document.createElement("div");
	let responseContent = null;
	let responseStatus = null;

	resultMessageElem.setAttribute("id", "message");
	resultMessageElem.setAttribute("class", "message");

	switch (resultUser) {
		case "💎":
			switch (resultComputer) {
				case "💎":
					responseStatus = 2;
					responseContent = "Tie";
					break;
				case "📄":
					responseStatus = 0;
					responseContent = "Game over. Paper covers rock";
					break;
				case "✂️":
					responseStatus = 1;
					responseContent = "You win. Rock crushes scissors";
					break;
				case "🐊":
					responseStatus = 1;
					responseContent = "You win. Rock crushes lizard";
					break;
				case "🖖":
					responseStatus = 0;
					responseContent = "Game over. Spock vaporizes rock";
					break;
				default:
					break;
			}
			break;

		case "📄":
			switch (resultComputer) {
				case "💎":
					responseStatus = 1;
					responseContent = "You win. Paper covers rock";
					break;
				case "📄":
					responseStatus = 2;
					responseContent = "Tie";
					break;
				case "✂️":
					responseStatus = 0;
					responseContent = "Game over. Scissors cuts paper";
					break;
				case "🐊":
					responseStatus = 0;
					responseContent = "Game over. Lizard eats paper";
					break;
				case "🖖":
					responseStatus = 1;
					responseContent = "You win. Paper disproves Spock";
					break;
				default:
					break;
			}
			break;
		case "✂️":
			switch (resultComputer) {
				case "💎":
					responseStatus = 0;
					responseContent = "Game over. Rock crushes scissors";
					break;
				case "📄":
					responseStatus = 1;
					responseContent = "You win. Scissors cuts paper";
					break;
				case "✂️":
					responseStatus = 2;
					responseContent = "Tie";
					break;
				case "🐊":
					responseStatus = 1;
					responseContent = "You win. Scissors decapitates lizard";
					break;
				case "🖖":
					responseStatus = 0;
					responseContent = "Game over. Spock smashes scissors";
					break;
				default:
					break;
			}
			break;
		case "🐊":
			switch (resultComputer) {
				case "💎":
					responseStatus = 0;
					responseContent = "Game over. Rock crushes lizard";
					break;
				case "📄":
					responseStatus = 1;
					responseContent = "You win. Lizard eats paper";
					break;
				case "✂️":
					responseStatus = 0;
					responseContent = "Game over. Scissors decapitates lizard";
					break;
				case "🐊":
					responseStatus = 2;
					responseContent = "Tie";
					break;
				case "🖖":
					responseStatus = 1;
					responseContent = "You win. Lizard poisons Spock";
					break;
				default:
					break;
			}
			break;
		case "🖖":
			switch (resultComputer) {
				case "💎":
					responseStatus = 1;
					responseContent = "You win. Spock vaporizes rock";
					break;
				case "📄":
					responseStatus = 0;
					responseContent = "Game over. Paper disproves Spock";
					break;
				case "✂️":
					responseStatus = 1;
					responseContent = "You win. Spock smashes scissors";
					break;
				case "🐊":
					responseStatus = 0;
					responseContent = "Game over. Lizard poisons Spock";
					break;
				case "🖖":
					responseStatus = 2;
					responseContent = "Tie";
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}

	let responseElemText = document.createTextNode(responseContent);

	switch (responseStatus) {
		case 0:
			resultMessageElem.classList.add("is-game-over");
			break;
		case 1:
			resultMessageElem.classList.add("is-game-win");
			break;
		case 2:
			resultMessageElem.classList.add("is-game-tie");
			break;
		default:
			break;
	}

	resultMessageElem.classList.add("is-show");
	resultMessageElem.appendChild(responseElemText);
	resultDom.appendChild(resultMessageElem);

	removeResultGame();
}

function removeResultGame() {
	const resultDom = document.getElementById("result");
	const messageDOM = document.getElementById("message");
	setTimeout(function () {
		messageDOM.classList.add("is-show");
		resultDom.removeChild(messageDOM);
	}, 10000);
}



let button = document.getElementById("button");
button.addEventListener("click", function () {
	let exerciseInfo = document.getElementById("exerciseInfo");
	let loader = document.getElementsByClassName("loader");

	if (!exerciseInfo.classList.contains("is-hide")) {
		exerciseInfo.classList.add("is-hide");
	}

	// console.log(loader);
	if (loader.length === 0) {
		// alert("Lanzando el fetch!!");
		ajaxHandler("https://api.rand.fun/games/rockpaperscissorslizardspock", function (data) {
			console.log("Data:", data);
		});
	}
});




// Extension para crear VPN
// https://chrome.google.com/webstore/detail/touch-vpn/bihmplhobchoageeokmgbdihknkjbknd?hl=es
