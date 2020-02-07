// 2 - Hagamos la web del Metro más divertida.
// Saca el estado actual de todas las líneas del metro de Madrid por consola.
// Antes de Diciembre de 2018
// Después de Diciembre de 2018

// https://www.metromadrid.es/es

function subway() {
    let array = [];
    let lines = document.querySelectorAll(
        ".list__otraslineas .list__lineas__element"
    );

    // console.dir(lines);

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];

        let lineName = "";
        // let lineName = lines.querySelectorAll("a img")[0].class;
        // let lineLink = line.children[0].children[0];
        let lineLink = line.getElementsByTagName("img")[0];
        if (typeof lineLink !== "undefined") {
            lineName = lineLink.className;
        }
        //console.log(lineName);

        // let lineStatus = line.querySelectorAll("a span[class*=state]")[0];
        let lineSpan = line.children[1];

        let lineStatus = "";
        if (typeof lineSpan !== "undefined") {
            lineStatusClass = lineSpan.className;
            switch (lineStatusClass) {
                case " state--green ":
                    lineStatus = "Estación en buen estado";
                    break;
                case "top has-tip":
                    lineStatus = document.getElementById(lineSpan.dataset["toggle"]).innerText;
                    break;
                default:
                    break;
            }
        }
        // console.log(lineStatus);

        let arrayIndex = {
            id: index,
            name: lineName,
            status: lineStatus
        };

        array.push(arrayIndex);
    }

    console.info("Estados de las lineas de metro", array);
}

subway();
