var anime_id =location.search.slice(1);

fetch("https://api.jikan.moe/v3/anime/"+anime_id) //Individuales
.then(res => res.json())
.then(data => {
    console.log(data);
    //Quitar autoplay
    if(data.trailer_url != null){
        var yt_url = data.trailer_url.slice(0, -1)+"0"; 
    } else {
        var yt_url = null; 
    }
    document.getElementById("dataAnime").innerHTML +=    `<a href="index.html" class="back"><i class="fas fa-arrow-alt-circle-left"></i></a>
                                                        <div class="oneAnime">
                                                            <h2>${data.title}</h2>
                                                            <p class="mid">${(yt_url) ? `<iframe class="ytVideo" src=${yt_url} frameborder="0"></iframe>` : ""}</p>
                                                            <nav class="menuAnime">
                                                                <ul>
                                                                    <li><a href="Characters.html?${data.mal_id}">Characters</a></li>
                                                                    ${(data.episodes != 1) ? `<li><a href="episodes.html?${data.mal_id}">Episodes</a></li>` : ""}
                                                                    <li><a href="news.html?${data.mal_id}">News</a></li>
                                                                </ul>
                                                            </nav>
                                                            <div class="infoPosition">
                                                                <div class="details1">
                                                                    <img src=${data.image_url}>
                                                                </div>
                                                                <div class="details2">
                                                                    <p><b>Synopsis</b> <hr class="divide"/>${(data.synopsis === null)?"Coming.":data.synopsis}</p>
                                                                </div>
                                                            </div>
                                                        </div>`;
})
.catch(err => console.log("Error "+ err))