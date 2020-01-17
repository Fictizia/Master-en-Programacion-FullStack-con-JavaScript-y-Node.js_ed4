const token = "geatEZfSbcmm9SjS7nEBtSWsp9Xia1hAV6gTqkqv";

async function NasaRequest(soles, limit, frecuency) {

    return new Promise((resolve, reject) => {

        const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + soles + "&api_key=" + token;

        console.log("url: ", url);

        fetch(url).then(respuesta => {

            if (respuesta.status === 200) {

                respuesta.json().then(data => {
                    console.log("data", data);
                    var dato = data.photos;
                    if (dato.length === 0 && (limit > 0 || limit === false)) {
                        setTimeout(() => {
                            console.log("Delay for next request", frecuency)
                            resolve(NasaRequest(soles - 1, limit === false ? limit : limit - 1, frecuency));
                        }, frecuency)
                    } else {
                        resolve(data.photos);
                        //console.log("resolve",dato);
                    }
                })
            } else {
                reject("ERROR in request, status", respuesta.status)
            }
        });
    })
};

async function init() {
    const currentValue = await NasaRequest(500, false, 1000);
    console.log('tremenda cumbia')
    console.log("currentValue:", currentValue);

    for (i = 0; i < currentValue.length; i++) {

        console.log("imagen", currentValue[i]);
        var url = currentValue[i].img_src;
        console.log("url",url);
        var img = document.createElement("img");
        img.setAttribute("src", url);
        img.setAttribute("width", 300);
        img.setAttribute("height", 300);
        document.getElementById("imagen").appendChild(img);
    }
}
init();