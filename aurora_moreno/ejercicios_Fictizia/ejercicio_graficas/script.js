
var url = 'http://airemad.com/api/v1/weather/S018';


function getWeather() {

    fetch(url)
        .then(res => res.json())
        .then(weatherInfo => {


            

            var globalDates = {

                labels: weatherInfo.list.map(hours => hours.dt_txt),
                series: [weatherInfo.list.map(dates => dates.main.humidity), weatherInfo.list.map(dates => dates.main.temp)]


            };
            console.log(weatherInfo);


            new Chartist.Line('.ct-chart', globalDates, { high: 125,
                low: 0, showArea: true,});

        })

}



getWeather()



