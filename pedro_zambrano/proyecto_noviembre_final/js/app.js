// fetch("https://api.jikan.moe/v3/anime/1/news") //Noticias anime
// .then(res => res.json())
// .then(data => {
//     console.log(data);
// })
// .catch(err => console.log("Error "+ err))

fetch("https://api.jikan.moe/v3/search/anime?q=boku no hero academia&limit=10") 
.then(res => res.json())
.then(data => {
    console.log(data);
    for(let i=0; i<data.results.length; i++) {
        document.getElementById("data").innerHTML +=   `<div class="anime">
                                                            <img src=${data.results[i].image_url} class="picture">
                                                            <div class="info">
                                                                <h3>${data.results[i].title}</h3>
                                                                <hr/>
                                                                <p><b>Type</b>: ${data.results[i].type}</p>
                                                                <p><b>Episodes</b>: ${data.results[i].episodes}</p>
                                                                <p><b>Score</b>: ${data.results[i].score}</p>
                                                                <p><b>Synopsis</b>: ${data.results[i].synopsis}</p>
                                                            </div>
                                                        </div>`;
    }
   return data;
})
.then( data => {
    var animes = document.getElementsByClassName("anime");
    var arr = Array.from(animes)
    console.log(arr);

    for(let i=0; i<arr.length; i++) {
        arr[i].addEventListener('mouseenter', function(){
            for(let j=0; j<arr.length; j++) {
                if(arr[i] != arr[j]) {
                    arr[j].style.filter = "blur(1.5px)";
                }
            }
        })
        arr[i].addEventListener('mouseleave', function(){
            for(let j=0; j<arr.length; j++) {
                if(arr[i] != arr[j]) {
                    arr[j].style.filter = "blur(0px)";
                }
            }
        })

        arr[i].addEventListener('click', function(){ 
            location.href = "anime.html?"+data.results[i].mal_id;     
        })
    }

    
    
})
.catch(err => console.log("Error "+ err))





