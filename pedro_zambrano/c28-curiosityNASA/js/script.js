const api_key = "C0ofIq6WivE1GPbA0Udmii5yEqCeiAPdmxFdYec6";

function NasaRequest(sol, ms) {
    return new Promise((resolve, reject) => {
        const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol="+sol+"&api_key="+api_key;
        console.log("Peticion enviada a:"+url);

        fetch(url).then(res => { 

            if(res.status === 200){
                res.json().then(data => {
                    if(data.photos.length === 0) {
                        console.log("Sol vacio, esperando próxima llamada...");
                        setTimeout(() => {
                            resolve(NasaRequest(sol-1, 1000)); 
                        }, ms);
                    } else {
                        resolve(data);
                    }
                })        
            } else {
                reject("ERROR");
            }

        })
    })
}

async function init() {
    var currentValue = await NasaRequest(2178, 1000);
    console.log("currentValue:", currentValue); 
}

init();

