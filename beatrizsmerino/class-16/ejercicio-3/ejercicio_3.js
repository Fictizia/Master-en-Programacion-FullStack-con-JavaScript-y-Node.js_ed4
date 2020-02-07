// 3 - Jugando con datos abiertos, saquemos los detalles de todos los cuadros eléctricos de Gijón por consola.
// URL petición AJAX http://opendata.gijon.es/descargar.php?id=163&tipo=JSON

// Podemos encontrar errores en las respuestas.
// cuadromando[5] ...
// calle: "Faustina &#193;lvarez Garc&#237;a"
// latitud: 43.526376045
// longitud: -5.685764873
// numero: ""
// potencia_w_: 17321
// ...


let urlAPI = "http://opendata.gijon.es/descargar.php?id=163&tipo=JSON";

let ejercicio3Content = document.getElementById("ejercicio3Content");
let ejercicio3Button = document.getElementById("ejercicio3Button");



function peticionAjax(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 1) {
            let loadingElem = document.createElement("div");
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
    console.info(object);
    let objectData = object.cuadromandos.cuadromando;

    let list = document.createElement("section");
    list.setAttribute("class", "list-of-electrical-panels");

    for (const key in objectData) {
        const element = objectData[key];
        let id = key;
        // let number = element.numero;
        let street = element.calle;
        let potency = element.potencia_w_;
        let longitude = element.longitud;
        let latitude = element.latitud;

        let number = (element.numero === null) ? "Not found data" : element.numero;

        console.table(
            {
                "index": key,
                "number": number,
                "potency": potency,
                "street": street,
                "latitude": latitude,
                "longitude": longitude
            }
        );

        let template = `
                <article id="${id}" class="electrical-panel" data-number=${number}>
                    <span class="electrical-panel__index">
                        ${parseInt(id) + 1}
                    </span>

                    <h2 class="electrical-panel__street">
                        C/${street}
                    </h2>
                    <div class="electrical-panel__coords coords">
                        <h3 class="coords__title electrical-panel__data-title">
                            Coordenadas:
                        </h3>
                        <ul class="coords__list electrical-panel__data-list">
                            <li class="coords__latitude">
                                <strong>
                                    Latitud:
                                </strong>
                                ${longitude}
                            </li>
                            <li class=coords__longitude">
                                <strong>
                                    Longitud:
                                </strong>
                                ${latitude}
                            </li>
                        </ul>
                    </div>
                    <p class="electrical-panel__number">
                        <strong>
                            Número de panel:
                        </strong>
                        ${number}
                    </p>
                    <p class="electrical-panel__potency">
                        <strong>
                            Potencia:
                        </strong>
                        ${potency}
                    </p>
                </article>
            `;
        list.innerHTML += template;
    }

    ejercicio3Content.appendChild(list);
}


ejercicio3Button.addEventListener("click", function () {
    if (ejercicio3Content.innerHTML == "") {
        let requestAPI = peticionAjax(urlAPI);
    }
});
