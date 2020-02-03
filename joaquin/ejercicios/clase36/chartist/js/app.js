/**
 * Render a chart showing prevision temperature for next 48 hours in Madrid
 */
const renderChart = async () => {
  /**
   * Fetch data from Carlos V Station (S002)
   */ 
  let weatherData = await new Promise ((resolve, reject) => {
    fetch('http://airemad.com/api/v1/weather/S001')
        .then(response=>response.json())
        .then(data=>resolve(data))
        .catch(error=>reject(error));
  });  
  const now = Date.now();
  const ONE_HOUR_MS = 3600*1000;
  /**
   * Filter data between last 3 hours and next 48 hours
   * Format measurement instants in hours:minutes format
   */
  weatherData = weatherData.list
    .filter(datum=>datum.dt*1000>Date.now()-ONE_HOUR_MS*3)
    .filter(datum=>datum.dt*1000<Date.now()+ONE_HOUR_MS*48)
    .map(datum=>{ 
      datum.dt_hh_mi=datum.dt_txt.split(' ')[1].substring(0,5); // moments in hours & minutes
      datum.temperature=datum.main.temp;
      return datum;
    });
  const data = {
    labels: weatherData.map(datum=>datum.dt_hh_mi),
    series: [weatherData.map(datum=>datum.temperature)]
  };
  new Chartist.Line('#chartId', data);
}

renderChart();
