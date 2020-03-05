/**
 * @file Graphic canvas with the 'Chart API'
 * https://www.chartjs.org/
 * https://cdnjs.com/libraries/Chart.js
 * @module graphicChart
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 */
import * as tool from './tools.js';





/**
 * @function module:graphicChart.set
 * @description Set graphic of 'Chart API'.
 * @param {Object} data - Data of the graphic
 * @param {String} elementDOM - Selector string of the element html
 * @see Used in:
 * - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function set(data, elementDOM) {
	let content = document.createElement("div");
	let idContent = "chartList";
	let classContent = "chart__list";

	content.setAttribute("id", idContent);
	content.setAttribute("class", classContent);
	document.querySelector(elementDOM).appendChild(content);

	tool.insertTagScript({ src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js", async: "async", defer: null }, function () {
		createCanvasGraphic(data, `#${idContent}`);
		createHeaderGraphic(".chart__item");
	});
}





/**
 * @function module:graphicChart~createCanvasGraphic
 * @description Create the graphic canvas with the data.
 * @param {Object} data - Data of the graphic
 * @param {String} elementDom - Selector element of the DOM
 * @see Used in:
 * - 'graphic-chart.js' -> {@link module:graphicChart.set}
 */
function createCanvasGraphic(data, elementDom) {
	function graphic(graphicId, graphicTitle, graphicLabels, graphicDataSets) {
		if (!document.querySelector(`#${graphicId}`)) {
			let content = document.querySelector(elementDom);

			let graphicItem = document.createElement("div");
			graphicItem.setAttribute("class", "chart__item");

			let graphicCanvas = document.createElement("canvas");
			graphicCanvas.id = graphicId;
			graphicCanvas.setAttribute("class", "chart__canvas mixed-chart");

			graphicItem.appendChild(graphicCanvas);
			content.appendChild(graphicItem);

			// let graphicContext = document.getElementById(graphicId);
			let graphicContext = graphicCanvas.getContext('2d');
			let graphicData = {
				type: 'bar',
				data: {
					datasets: [
						{
							yAxisID: 'A',
							label: 'Temperature minimum',
							data: graphicDataSets.graphicDataA2,
							type: 'line',
							borderWidth: 2,
							borderDash: [5, 5],
							pointRadius: 5,
							pointHoverRadius: 10,
							color: '#52f2db',
							borderColor: '#52f2db',
							backgroundColor: 'rgb(82, 242, 219, 0.4)',
							hidden: true
						},
						{
							yAxisID: 'A',
							label: 'Temperature medium',
							data: graphicDataSets.graphicDataA1,
							type: 'line',
							borderWidth: 2,
							borderDash: [5, 5],
							pointRadius: 5,
							pointHoverRadius: 10,
							color: '#63bfa5',
							borderColor: '#63bfa5',
							backgroundColor: 'rgb(99, 191, 165, 0.4)',
							// showLine: false
						},
						{
							yAxisID: 'A',
							label: 'Temperature maximum',
							data: graphicDataSets.graphicDataA3,
							type: 'line',
							borderWidth: 2,
							borderDash: [5, 5],
							pointRadius: 5,
							pointHoverRadius: 10,
							color: '#518c7c',
							borderColor: '#518c7c',
							backgroundColor: 'rgb(81, 140, 124, 0.4)',
							hidden: true
						},
						{
							yAxisID: 'B',
							label: 'Humidity',
							data: graphicDataSets.graphicDataB,
							backgroundColor: 'lightblue',
						},
					],
					labels: graphicLabels
				},
				options: {
					responsive: true,
					title: {
						display: true,
						padding: 20,
						fontFamily: "'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS'",
						fontSize: 25,
						fontColor: '#333',
						text: graphicTitle
					},
					scales: {
						yAxes: [{
							id: 'A',
							type: 'linear',
							position: 'left',
							ticks: {
								bounds: 'data',
								// suggestedMax: 50,
								// suggestedMin: 0,
								callback: function (value, index, values) {
									return value + 'ºC';
								}
							}
						}, {
							id: 'B',
							type: 'linear',
							position: 'right',
							ticks: {
								suggestedMax: 100,
								suggestedMin: 0,
								bounds: 'data',
								callback: function (value, index, values) {
									return value + '%';
								}
							},
							gridLines: {
								display: false
							}
						}]
					},
					legend: {
						display: true,
						labels: {
							fontFamily: "'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS'",
							fontSize: 15,
							fontColor: '#333'
						}
					},
					tooltips: {
						mode: 'index',
						intersert: false
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
				}
			};

			let mixedChart = new Chart(graphicContext, graphicData);
		}
	}

	let graphics = data.forEach(function (data, index) {
		graphic(
			data.id,
			data.name,
			data.weather.time,
			{
				graphicDataA1: data.weather.temperature,
				graphicDataA2: data.weather.temperature_min,
				graphicDataA3: data.weather.temperature_max,
				graphicDataB: data.weather.humidity
			}
		);
	});
}




/**
 * @function module:graphicChart~createHeaderGraphic
 * @description Create a header with a switch button.
 * @param {String} classItems - Class element of the DOM
 * @see Used in: 
 * - 'graphic-chart.js' -> {@link module:graphicChart.set}
 */
function createHeaderGraphic(classItems) {
	let listGraphics = document.querySelectorAll(classItems);


	function switchGraphic() {
		let graphicHeader = document.createElement("div");
		graphicHeader.setAttribute("class", "chart__header");

		let graphicButton = document.createElement("button");
		let graphicButtonContent = document.createRange().createContextualFragment(
			`<label class="switch">
				<input type = "checkbox">
				<span class="slider round"></span>
			</label>`);
		graphicButton.setAttribute("class", "chart__switch");
		graphicButton.appendChild(graphicButtonContent);
		graphicHeader.appendChild(graphicButton);

		graphicButton.addEventListener("click", function () {
			let checkbox = this.getElementsByTagName("input")[0];

			if (checkbox.checked == true) {
				this.closest(classItems).classList.add("is-show");
			} else {
				this.closest(classItems).classList.remove("is-show");
			}
		});

		return graphicHeader;
	}


	function defaultGraphic(itemGraphic) {
		itemGraphic.classList.add("is-show");
		itemGraphic.querySelector("button");
		itemGraphic.querySelector(".chart__switch input").setAttribute("checked", "checked");
	}

	const set = async (listGraphics) => {
		return Promise.all(Array.from(listGraphics).map(item => {
			let graphicHeader = switchGraphic();
			item.prepend(graphicHeader);
		}));
	}


	set(listGraphics).then(() => {
		let firstGraphic = document.querySelector(classItems);
		let secondGraphic = document.querySelectorAll(classItems)[1];
		defaultGraphic(firstGraphic);
		defaultGraphic(secondGraphic);
	});
}