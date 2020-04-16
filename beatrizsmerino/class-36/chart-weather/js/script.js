/**
 * @file Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 * @requires loader
 * @requires geolocation
 * @requires weatherOpenweather
 * @requires graphicChart
 */
import * as loader from './loader.js';
import * as geolocation from './geolocation.js';
import * as weatherOpenweather from './weather-openweather.js';
import * as weatherAiremad from './weather-airemad.js';
import * as graphicChart from './graphic-chart.js';





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function.
 * @see Used inside:
 * @see - 'geolocation.js' -> {@link module:geolocation.get}, {@link module:geolocation.showPosition}, {@link module:geolocation.showError}
 * @see - 'loader.js' -> {@link module:loader.add}, {@link module:loader.remove}
 * @see - 'weather-openweather.js' -> {@link module:weatherOpenweather.getDataByCoords}, {@link module:weatherOpenweather.setWidget}
 * @see - 'weather-airemad.js' -> {@link module:weatherAiremad.getStations}, {@link module:weatherAiremad.getWeatherById}
 * @see - 'graphic-chart.js' -> {@link module:graphicChart.set}
 */
(function () {
	geolocation.get()
		.then(position => {
			// console.info(position);

			loader.add();

			geolocation.showPosition(position);

			let coords = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
			// console.table(coords);

			return coords;

		}).then(coords => {
			weatherOpenweather.getDataByCoords(coords)
				.then(weatherCoords => {
					// console.info(weatherCoords);

					loader.remove();

					weatherOpenweather.setWidget({ widgetType: 5 }, "España", ".page__content");
					weatherOpenweather.setWidget({ widgetType: 2 }, coords, ".page__content");
				})
		})
		.catch(
			error => {
				loader.remove();

				geolocation.showError(error);
			}
		);


	weatherAiremad.getStations()
		.then(stations => {
			loader.add();

			// console.log(stations);

			const dataGraphicListStations = stations.map(station => {
				return {
					id: station.id,
					name: station.nombre_estacion
				};
			});

			const promises = dataGraphicListStations.map(station => {
				return weatherAiremad.getWeatherById(station.id)
					.then(weatherResponse => {
						return weatherResponse;
					});
			});

			return Promise.all(promises)
				.then(stationsWeather => ({ dataGraphicListStations, stationsWeather }))
		})
		.then(({ dataGraphicListStations, stationsWeather }) => {
			// console.log(stationsWeather);

			const dataGraphicListWeather = stationsWeather.map(stationsWeatherItem => {
				let dataGraphicWeather = {
					time: [],
					temperature: [],
					temperature_max: [],
					temperature_min: [],
					humidity: []
				};

				stationsWeatherItem.list.map(forecastItem => {
					dataGraphicWeather.time.push(moment(forecastItem.dt_txt).format('D/M/YY HH:mm'));
					dataGraphicWeather.temperature.push(forecastItem.main.temp);
					dataGraphicWeather.temperature_max.push(forecastItem.main.temp_max);
					dataGraphicWeather.temperature_min.push(forecastItem.main.temp_min);
					dataGraphicWeather.humidity.push(forecastItem.main.humidity);
				});

				return dataGraphicWeather;
			});

			return Promise.all(dataGraphicListWeather)
				.then((dataGraphicListWeather) => ({ dataGraphicListStations, dataGraphicListWeather }))
				.then(({ dataGraphicListStations, dataGraphicListWeather }) => {
					const dataGraphic = dataGraphicListStations.map((item) => item);

					for (let i = 0; i < dataGraphic.length; i++) {
						const dataGraphicItem = dataGraphic[i];
						dataGraphicItem.weather = dataGraphicListWeather[i];
					}

					return dataGraphic;

				}).then((dataGraphic) => dataGraphic);
		})
		.then(dataGraphic => {
			loader.remove();
			console.log(dataGraphic);
			graphicChart.set(dataGraphic, ".page__content");
		});
})();