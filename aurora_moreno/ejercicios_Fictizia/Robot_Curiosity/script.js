// var token = 'LtjY6jb3gYkX04nu8yCuI70Ibe6TlqFIVfzs1JV3';

// async function NasaRequest() {

//     for (var soles = 2080; soles > 2070; soles--) {


//         let request = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' + soles + '&api_key=' + token);

//         let text = await request.json();

//         if (text.photos.length === 0) {
//             soles--;
//             console.log("Este Sol no tiene información");
//         }
//         else {
         
//             console.log(text.photos[0].sol);
//             console.log(text.photos[0].img_src);
//             var images = document.getElementById('images');
//             images.setAttribute('src', text.photos[0].img_src)
//         }

//     }

// };

// NasaRequest();


var token = 'LtjY6jb3gYkX04nu8yCuI70Ibe6TlqFIVfzs1JV3';

async function NasaRequest(soles) {

        let request = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' + soles + '&api_key=' + token);

        let text = await request.json();

        if (text.photos.length === 0) {
            console.log("Este Sol no tiene información");
            NasaRequest(soles-1);
        }

        else {
            console.log(text.photos[0].sol);
            console.log(text.photos[0].img_src);
            return text.photos[0].img_src;
        }


};

async function init(){
    for(let i = 2080; i> 2070; i--){
        var result = await NasaRequest(i);
        var images = document.getElementById('images');
            images.setAttribute('src', result);
    }

}

NasaRequest();





var token = 'LtjY6jb3gYkX04nu8yCuI70Ibe6TlqFIVfzs1JV3';

function NasaRequest(soles, solesfinal) {

        fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' + soles + '&api_key=' + token)
        .then(request => {request.json().then(res => {

                if (res.photos.length === 0) {
                    NasaRequest(sol-1);
                    console.log("Este Sol no tiene información");
                }
                else {
                    
                        setTimeout(() => {
                            console.log(res.photos[0].sol);
                            console.log(res.photos[0].img_src);
                            var images = document.getElementById('images');
                            images.setAttribute('src', res.photos[0].img_src);
                            if(soles > solesfinal){
                                NasaRequest(soles-1, 2070)
                            }
                        }, 2000)
                   
                }

            })

        })

};

NasaRequest(2080, 2070);











// const token = 'LtjY6jb3gYkX04nu8yCuI70Ibe6TlqFIVfzs1JV3';


// function NasaRequest() {
//     return new Promise((resolve, reject) =>)

// }; 

// async function init() {
//   const currentValue = await NasaRequest(2080, 1000);
//   console.log("currentValue:", currentValue);
// }
// init();






// const token = 'LtjY6jb3gYkX04nu8yCuI70Ibe6TlqFIVfzs1JV3';

// async function NasaRequest(soles=400, limit=true, frecuency=0) {
//   return new Promise((resolve, reject) => {
//     const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${soles}&api_key=${token}`;
//     console.log("request started for:", url);
//     fetch(url).then(res => {
//       if (res.status === 200){
//         res.json().then(data => {
//           data = data.photos;
//           if(data.length === 0 && !limit) {
//             setTimeout(()=> {
//               console.log(`Delay for next request ${frecuency}ms`)
//               NasaRequest(soles-1, limit === false ? limit : limit-1, frecuency);
//             }, frecuency)
//           } else {
//             resolve(data);
//           }
//         })
//       } else {
//         reject(`ERROR in request, status ${res.status}`)
//       }
//     });
//   })
// }; 


// async function init() {
//   const currentValue = await NasaRequest(2071, false, 1000);
//   console.log("currentValue:", currentValue);
// }
// init();