var anime_id =location.search.slice(1);

fetch("https://api.jikan.moe/v3/anime/"+anime_id+"/episodes") 
.then(res => res.json())
.then(data => {
    console.log(data);
    document.getElementById("dataEpisodes").innerHTML +=  `<a href="anime.html?${anime_id}" class="back"><i class="fas fa-arrow-alt-circle-left"></i></a></Volver>`;
    for(let i=0; i<data.episodes.length; i++) {
        document.getElementById("dataEpisodes").innerHTML +=   `<div>
                                                                    <p><b>${data.episodes[i].episode_id}.</b> ${data.episodes[i].title}</p>
                                                                    <hr/>
                                                                </div>`
    }
})
.catch(err => console.log("Error "+ err))