var anime_id =location.search.slice(1);

fetch("https://api.jikan.moe/v3/anime/"+anime_id+"/characters_staff") 
.then(res => res.json())
.then(data => {
    console.log(data);
    document.getElementById("dataCharacters").innerHTML +=  `<a href="anime.html?${anime_id}" class="back"><i class="fas fa-arrow-alt-circle-left"></i></a></Volver>`;
    for(let i=0; i<data.characters.length; i++) {
        document.getElementById("dataCharacters").innerHTML +=   `<div class="character">
                                                                    <h3>${data.characters[i].name}</h3>
                                                                    <img class="lazyload" data-src=${data.characters[i].image_url}>
                                                                  </div>`
    }
})
.catch(err => console.log("Error "+ err))