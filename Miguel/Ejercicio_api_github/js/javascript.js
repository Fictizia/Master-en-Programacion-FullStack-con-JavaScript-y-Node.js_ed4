//Ejercicio obtener informacion de usuario de git hub
/**
 * @description fetch to get user data from the api of github
 * @param {string} url //url created in the listener below
 */
function searchUser(url){
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        document.getElementById("resultado").innerHTML = "";

        var nombre = data.name; //Guardo el nombre en una variable para luego encontrar el correo del usuario en sus eventos de github.

        var p = document.createElement("p");
        p.setAttribute("id","informacionDeUsuario");
        document.getElementById("resultado").append(p);
        p.innerText = "Nombre y Apellidos: " + data.name + "\n" + "Nombre de usuario: " + data.login + "\n" + "Bio: " + data.bio + "\n" + "GitHub: " + data.html_url + "\n" + "Ciudad: " + data.location;
        var img = document.createElement("img");
        img.src = data.avatar_url;
        p.insertAdjacentElement("afterend",img);

        var urlEvent = url + "/events";

        fetch(urlEvent)
        .then(function(response){
            return response.json();
        })
        .then(function(data){

            var email;

            for(i = 0; i < data.length; i++){

                var commits = data[i].payload.commits;

                if(commits){

                    for(j = 0; j < commits.length; j++){

                        if(commits[j].author.name == nombre){

                            email = commits[j].author.email;

                            if(email != ""){                                
                                document.getElementById("informacionDeUsuario").innerText += "\n" + "Email: " + email;
                            }
                            return;
                        }
                    }
                 }               
            }if(email == undefined){ document.getElementById("informacionDeUsuario").innerText += "\n" + "Email: No encontrado." ;}           
        })        
    })
    .catch(function(error){console.error('Error:', error)
    });    
};

/** 
 * @description event assigned to the html button to call the fetch above
*/
document.getElementById("btnUser").addEventListener("click", function(){
    var usuario = document.getElementById("textBox").value;
    searchUser("https://api.github.com/users/" + usuario);
});


