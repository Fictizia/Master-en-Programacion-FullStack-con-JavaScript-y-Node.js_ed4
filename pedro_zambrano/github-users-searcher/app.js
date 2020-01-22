document.getElementById("search").addEventListener('click', search);

/**
 * Busca un usuario
 * * Proporciona foto, nombre, localizacion si dispone y email sacado de los push del usuario
 */

function search(){
     /**
     * Nombre de usuario de GitHub introducido
     * @param {string} user
     */

    user = document.getElementById("user").value;
    fetch('https://api.github.com/users/'+user)
    .then( res => res.json())
    .then ( data => {
        console.log(data);
            if(data.message == "Not Found") {
            document.getElementById("data").innerText = "Usuario no encontrado";
            document.getElementById("user").value = "";
        } else {
            fetch('https://api.github.com/users/'+ user +'/events')
            .then( res => res.json())
            .then( data2 => {
                console.log(data2)
                for(let i=0; i<=30; i++){
                    if(data2[i].type === "PushEvent"){
                        var push = i;
                        break;
                    }
                }
                document.getElementById("data").innerHTML = "";
                document.getElementById("data").innerHTML +=    `<div class="user">
                                                                    <h3>${data.login}</h3>
                                                                    <img src=${data2[0].actor.avatar_url}>
                                                                    <div class="info">
                                                                        <p>Name: ${data.name}</p>
                                                                        ${(data.location !== null ? `<p>Location: ${data.location}</p>` : null )}
                                                                        <p>Email: ${data2[push].payload.commits[0].author.email}</p>
                                                                    </div>    
                                                                </div>`            
            })
        }
    })
    .catch( err => console.log(err))
}