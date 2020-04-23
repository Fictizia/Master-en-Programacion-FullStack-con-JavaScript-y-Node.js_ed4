function grafico() {

    var url = "http://airemad.com/api/v1/weather/S002";

    fetch(url)
        .then(res => res.json())
        .then(date => {
            let dias = date.list.map(a => a.dt_txt);
            let temperatura = date.list.map(a => a.main.temp);
            let humedad = date.list.map(a => a.main.humidity);

            var pintar = {
                labels: dias,
                series: [temperatura, humedad],

            };

            new Chartist.Line('.ct-chart', pintar, {
                low: 0,
                showArea: true,
            });

        })
}
grafico();