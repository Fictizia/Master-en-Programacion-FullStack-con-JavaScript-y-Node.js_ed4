
/**
 * @file exercise to get photos of the curiosity robot from Mars
 * @author Miguel Martin-Maestro Lopez
 * @version 1.0.0
 * @description you need to get the api key from NASA API in https://api.nasa.gov/index.html#apply-for-an-api-key
 */
const token = "";

/**
 * @description the parameters must be entered in the async function below
 * @param {number} soles number of the sun we want information (sun are the Martian days)
 * @param {number} limit limit number to not exceed the number of calls
 * @returns robot data
 */
function NasaRequest(soles,limit){
  return new Promise((resolve, reject) => {     
    var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + soles + "&api_key=" + token; 

    if(limit>0){
      fetch(url)
      .then((response) => {
        if(response.ok){
          response.json()
          .then((data) => {          
            if(data.photos.length == 0){
              console.log(data);
              console.log("Este sol no tiene información, pasando al siguiente sol...");
              setTimeout(() => resolve(NasaRequest(soles-1,limit-1)), 1000)              
            }else{
              console.log("AQUI SI !");
              console.log(data);              
              resolve(data);              
            }
          })
        }else{
          reject("Error en la llamada.");
        }                 
      });
    }else{
       console.log("Límite de llamadas superado, intentelo de nuevo.")
    };  
  });
}; 

async function init(){  
  const currentValue = await NasaRequest(2205,15);
  console.log("currentValue:", currentValue);
  document.getElementById("resultado").querySelector("img").src = currentValue.photos[0].img_src;
}
init();




