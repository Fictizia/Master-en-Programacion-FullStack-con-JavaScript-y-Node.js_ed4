// 1. - Sacar en el html los datos de polen.



let urlAPI = "http://airemad.com/api/v1/pollen";

let ejercicio1Content = document.getElementById("ejercicio1Content");
let ejercicio1Button = document.getElementById("ejercicio1Button");



function peticionAjax(url) {
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.onreadystatechange = function () {

		if (xmlHttp.readyState === 1) {
			let loadingElem = document.createElement("p");
			loadingElem.setAttribute("id", "loading");
			let loadingText = document.createTextNode("...");

			loadingElem.appendChild(loadingText);
			document.body.appendChild(loadingElem);

		} else if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			let url = JSON.parse(xmlHttp.responseText);
			setData(url);
			// remove element loading
			let loading = document.getElementById("loading");
			document.body.removeChild(loading);

		} else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
			console.error("ERROR! 404");
			console.info(JSON.parse(xmlHttp.responseText));
		}
	};
	xmlHttp.open("GET", url, true);
	xmlHttp.send();
}

function setData(object) {
	object.forEach((element) => {
		let locationElem;

		function location() {
			const locationName = element.name;
			const locationId = element.id;
			const locationLongitude = element.UTM_longitud;
			const locationLatitude = element.UTM_latitud;
			const locationHeight = element.altura;

			// LOCATION
			locationElem = document.createElement("div");
			locationElem.setAttribute("data-index", locationId);
			locationElem.setAttribute("class", "location");


			// NAME
			let nameElem = document.createElement("h2");
			let nameText = document.createTextNode(locationName);
			nameElem.setAttribute("class", "location__name");
			nameElem.appendChild(nameText);
			locationElem.appendChild(nameElem);


			// INFO:
			let infoElem = document.createElement("div");
			infoElem.setAttribute("class", "location__info");

			/* INFO: latitude and longitude */
			let infoParagraph1Elem = document.createElement("p");
			infoParagraph1Elem.style.margin = "0px";
			let infoParagraph1Text = document.createTextNode("Longitud and Latitud (" + locationLongitude + ", " + locationLatitude + ")");
			infoParagraph1Elem.appendChild(infoParagraph1Text);

			/* INFO: height */
			let infoParagraph2Elem = document.createElement("p");
			infoParagraph2Elem.style.margin = "0px";
			let infoParagraph2Text = document.createTextNode("Height: " + locationHeight);
			infoParagraph2Elem.appendChild(infoParagraph2Text);

			infoElem.appendChild(infoParagraph1Elem);
			infoElem.appendChild(infoParagraph2Elem);
			locationElem.appendChild(infoElem);
		}

		function parameters() {
			let locationParameters = element.parametros;

			for (const key in locationParameters) {
				// POLLEN: parameters
				let parametersElem = document.createElement("div");
				parametersElem.setAttribute("class", "parameters");

				let parametersNameElem = document.createElement("h4");
				parametersNameElem.setAttribute("class", "parameters__title");
				parametersNameElem.style.marginBottom = "0px";
				let parametersNameText = document.createTextNode("Parameters: ");
				parametersNameElem.appendChild(parametersNameText);
				parametersElem.appendChild(parametersNameElem);

				let parametersListElem = document.createElement("ul");
				parametersListElem.setAttribute("class", "parameters__list");

				const middle = element.medio;
				const high = element.alto;
				const veryHigh = element.muy_alto;
				// -----------
				let middleElem = document.createElement("li");
				let middleText = document.createTextNode("Medio: " + middle);
				middleElem.appendChild(middleText);
				parametersListElem.appendChild(middleElem);
				// -----------
				let highElem = document.createElement("li");
				let highText = document.createTextNode("Alto: " + high);
				highElem.appendChild(highText);
				parametersListElem.appendChild(highElem);
				// -----------
				let veryHighElem = document.createElement("li");
				let veryHighText = document.createTextNode("Muy alto: " + veryHigh);
				veryHighElem.appendChild(veryHighText);
				parametersListElem.appendChild(veryHighElem);

				parametersElem.appendChild(parametersListElem);
				// console.log(parametersElem);

				return parametersElem;
			}
		}

		function measurements() {
			let locationMeasurements = element.mediciones;

			for (const key in locationMeasurements) {
				const element = locationMeasurements[key];

				// POLLEN: measurements
				let measurementsElem = document.createElement("div");
				measurementsElem.setAttribute("class", "measurements");

				let measurementsNameElem = document.createElement("h4");
				measurementsNameElem.setAttribute("class", "measurements__title");
				measurementsNameElem.style.marginBottom = "0px";
				let measurementsNameText = document.createTextNode("Measurements: ");
				measurementsNameElem.appendChild(measurementsNameText);
				measurementsElem.appendChild(measurementsNameElem);

				let measurementsListElem = document.createElement("ul");
				measurementsListElem.setAttribute("class", "measurements__list");

				const date = element.fecha;
				const value = element.valor;
				const summary = element.resumen;
				// -----------
				let dateElem = document.createElement("li");
				let dateText = document.createTextNode("Fecha: " + date);
				dateElem.appendChild(dateText);
				measurementsListElem.appendChild(dateElem);
				// -----------
				let valueElem = document.createElement("li");
				let valueText = document.createTextNode("Valor: " + value);
				valueElem.appendChild(valueText);
				measurementsListElem.appendChild(valueElem);
				// -----------
				let summaryElem = document.createElement("li");
				let summaryText = document.createTextNode("Resumen: " + summary);
				summaryElem.appendChild(summaryText);
				measurementsListElem.appendChild(summaryElem);

				measurementsElem.appendChild(measurementsListElem);
				// console.log(measurementsElem);

				return measurementsElem;
			}
		}

		(function () {
			location();

			let listPollenElem = document.createElement("div");
			listPollenElem.setAttribute("class", "location__list-pollen");


			let locationParameters = element.parametros;
			let pollenElem, pollenItemElem;
			for (const key in locationParameters) {
				const element = locationParameters[key];

				// POLLEN
				pollenElem = document.createElement("ul");
				pollenElem.setAttribute("class", "pollen");

				// POLLEN: name
				pollenItemElem = document.createElement("li");
				let pollenNameElem = document.createElement("h3");
				pollenNameElem.setAttribute("class", "pollen__name");
				let pollenNameText = document.createTextNode(key);
				pollenNameElem.appendChild(pollenNameText);
				pollenItemElem.appendChild(pollenNameElem);

				pollenItemElem.appendChild(parameters());
				pollenItemElem.appendChild(measurements());

				pollenElem.appendChild(pollenItemElem);
				listPollenElem.appendChild(pollenElem);
				locationElem.appendChild(listPollenElem);
			}
		})();


		ejercicio1Content.appendChild(locationElem);
	});
}


ejercicio1Button.addEventListener("click", function () {
	if(ejercicio1Content.innerHTML == ""){
		let requestAPI = peticionAjax(urlAPI);
	}
});