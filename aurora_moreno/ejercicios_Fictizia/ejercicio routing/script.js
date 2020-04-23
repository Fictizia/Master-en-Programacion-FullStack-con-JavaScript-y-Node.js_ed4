page.base('');
page('/', index);
page('/estaciones', state);
page('/estaciones/:placeId', placeId);
page();


var urlPoll = "http://airemad.com/api/v1/pollution"


function index() {
    document.querySelector('h2#states')
        .textContent = 'viewing index';
}



function state() {
    var template = document.getElementById('template').innerHTML;
    fetch(urlPoll)

        .then((response) => response.json())

        .then((data) => {


            data["id"] = function () {
                return this.id;
            }

            data["name"] = function () {
                return this.name;
            }

            var result = Mustache.render(template, { data, ids: data.id, name: data.name });

            document.getElementById('target').innerHTML = result;

            console.log(data);
        })

}


function placeId(ctx) {

    var template = document.getElementById('templateIndv').innerHTML;

    document.querySelector('h2#states')
        .textContent = 'viewing contact ' + (ctx.params.placeId || '');

    fetch(urlPoll + "/" + ctx.params.placeId)

        .then((response) => response.json())

        .then((dataInd) => {


            var keysJson = Object.keys(dataInd);
            for(let i = 0; i<keysJson; i++){

            var result = Mustache.render(template, { dataInd, name: dataInd.name, pollution: dataInd[keysJson[i]].parameter })}


            document.getElementById('target').innerHTML = result;


            console.log(dataInd);
        })

}

