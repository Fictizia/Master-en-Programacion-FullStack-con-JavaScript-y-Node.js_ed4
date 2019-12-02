var anime_id =location.search.slice(1);

fetch("https://api.jikan.moe/v3/anime/"+anime_id+"/news") 
.then(res => res.json())
.then(data => {
    console.log(data);
    document.getElementById("dataNews").innerHTML +=  `<a href="anime.html?${anime_id}" class="back"><i class="fas fa-arrow-alt-circle-left"></i></a></Volver>`;
    for(let i=0; i<data.articles.length; i++) {
        document.getElementById("dataNews").innerHTML +=   `<div class="new">
                                                                <h3 class="title_new">${data.articles[i].title}</h3>
                                                                <a href="${data.articles[i].url}" target="blank"><img data-src=${data.articles[i].image_url} class="img_news lazyload"></a>
                                                                <p>${data.articles[i].intro}</p>
                                                            </div>
                                                            <hr/>`
    }
})
.catch(err => console.log("Error "+ err)) 