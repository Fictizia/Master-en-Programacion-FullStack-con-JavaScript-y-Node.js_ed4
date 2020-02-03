function printGraph() {
    const urlWeather = "http://airemad.com/api/v1/weather/S004";
    fetch(urlWeather)
    .then(res => res.json())
    .then(data => {
        let days = data.list.map(a => a.dt_txt);
        let temp = data.list.map(a => a.main.temp);
        let humidity = data.list.map(a => a.main.humidity);

        //GRAPH
        var print = {
            labels: days,
            series: [temp, humidity]
        };

        new Chartist.Line('.ct-chart', print);

    })
}

printGraph();

