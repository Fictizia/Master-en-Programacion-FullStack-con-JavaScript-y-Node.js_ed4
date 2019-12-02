function goBack() {
    location.reload();
}
var generacion1 = 151
var url = `https://pokeapi.co/api/v2/pokemon/?limit=${generacion1}`
fetch(url)
    .then( (res) => (res.json()))
    .then( (datos) => generaHtml(datos))
    const generaHtml = (res) => {
        console.log(res.results)
        for(i=0; i<res.results.length; i++){
            pokemonName = res.results[i].name
            //console.log(pokemonName)
            pokemonLink = res.results[i].url
            //console.log(pokemonLink)
            document.getElementById("listas").innerHTML += `
                                                            <div class="container" style="">
                                                            <div class="row align-items-center">
                                                            <div class="col" id="lista"> 
                                                            <span># ${i+1} ${pokemonName} </span><br>
                                                            <button onclick=showPokemon("${pokemonLink}")>Mostrar</button>                                                         
                                                            </div>
                                                            </div>
                                                            </div>`;
                                                            
        }
    };
function showPokemon(url){
fetch(url)
    .then( (data) => data.json())
    .then( (pokemon) => generateHtml(pokemon))
        const generateHtml = (data) => {
        console.log(data)
        const html = `<div class="container">
                        <div class"row">
                            <div class="col-3 align-items-between justify-content-center"> <img src=${data.sprites.front_default}> </div>
                            <div id="details">
                                <span>Nº: ${data.id}<br> Nombre: ${data.name}</div>
                                <span>Altura: ${data.height}</span>
                                <span>Peso: ${data.weight}</span>
                            </div>
                            <div id="stats">
                                <span>HP : ${data.stats[5].base_stat}</span><br>
                                <span>Ataque : ${data.stats[4].base_stat}</span><br>
                                <span>Defensa : ${data.stats[3].base_stat}</span><br>
                                <span>Ataque especial : ${data.stats[2].base_stat}</span><br>
                                <span>Defensa especial : ${data.stats[1].base_stat}</span><br>    
                                <span>Velocidad : ${data.stats[0].base_stat}</span><br>
                            </div>
                            <div id="tipoP">
                            </div>
                            <div id="Habilidades">
                            </div>
                        </div>
                    </div>
                    `
        const pokemonDiv = document.querySelector('.pokemon')
        pokemonDiv.innerHTML = html

        for(i=0;i<data.types.length;i++){
            tipos = data.types[i].type.name
            document.querySelector('#tipoP').innerHTML += 
                    ` <span>Tipo-${i+1} : ${tipos}</span><br>`
        }
        for(i=0;i<data.abilities.length;i++){
            habilidad = data.abilities[i].ability.name
            document.querySelector('#Habilidades').innerHTML += 
                    ` <span>Habilidad-${i+1} : ${habilidad}</span><br>`
        }
    }
}


  




