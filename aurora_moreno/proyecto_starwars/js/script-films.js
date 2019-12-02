

var urlfilms = "https://swapi.co/api/films/?format=json"
var filmsImages = "https://starwars-visualguide.com/assets/img/films/"

films(urlfilms, filmsImages)

var errorControl = 0;



function films(urlfilms, filmsImages) {
    fetch(urlfilms)
        .then(
            document.getElementById("img-intro").style.height = "800px",
            document.querySelector(".twinkling").style.height = "657px",
            document.getElementById("procesLoad").innerHTML = '<div class="laser"><img src="img/laser-red.png"><div id="carga"></div>',
            document.getElementById("carga").style.animation = "loadanimation 1s 1"
        )
        .then(res => res.json())
        .then(filmsData => {
            var film = filmsData.results;
            document.getElementById("procesLoad").style.display = "none";
            document.getElementById("img-intro").style.height = "384px";
            document.querySelector(".twinkling").style.height = "230px";

            for (var x = 0; x < film.length; x++) {
                console.log(film[x].title + film[x].episode_id);
                var contenFilms = document.createElement("div");
                contenFilms.setAttribute("class", "prinFilms");
                contenFilms.setAttribute("id", "film" + x);

                document.getElementById("filmcont").appendChild(contenFilms);
                var y = x + 1

                var imgs = document.createElement("img");
                imgs.setAttribute("src", filmsImages + "/" + y + ".jpg");
                contenFilms.appendChild(imgs);

                var filmTitle = document.createElement("h1");
                filmTitle.innerText = film[x].title;
                contenFilms.appendChild(filmTitle);

                var filmDescript = document.createElement("p");

                var secondBox = document.createElement("div");
                secondBox.setAttribute("class", "secondBox");
                contenFilms.appendChild(secondBox)

                var sin_salto = film[x].opening_crawl.split("\r\n").join(" ");
                filmDescript.innerText = sin_salto;
                secondBox.appendChild(filmDescript);

                var filmDirector = document.createElement("h2");
                filmDirector.innerText = film[x].director;
                secondBox.appendChild(filmDirector);

            }

        })
        .catch(str => {
            document.getElementById("procesLoad").style.display = "none";
            document.getElementById("img-intro").style.height = "384px";
            document.querySelector(".twinkling").style.height = "230px";
            document.getElementById("filmcont").innerHTML = '<div class="errorBox"><img src="img/yoda-error.png"><div id="speak"><h3 id="errorText"></h3><a href="index.html">Volver</a></div></div>';

            if (errorControl === 0) {
                str = 'El contenido disponible no estar. Intentarlo más tarde debes.';
                write(str);
            }
        })

}


function write(str) {
    var text = str.split('');
    var d = 0;
    var print = setInterval(function () {
        document.getElementById("errorText").innerHTML += text[d];
        d++;
        if (d === text.length) {
            clearInterval(print);
        }

    }, 70);
    errorControl = 1;
};



