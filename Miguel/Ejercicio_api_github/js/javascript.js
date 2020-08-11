/**
 * @file exercise to get the data of a github user including his email from the events
 * @author Miguel Martin-Maestro Lopez
 * @version 1.2.0
 */

/**
 * @description fetch to get user data from the api of github
 * @param {string} url url created in the listener below
 */
function searchUser(url){
  fetch(url)
  .then(function(response){
    if(response.status === 404) {
      document.getElementById("resultado").innerHTML = "404 - USUARIO NO ENCONTRADO"
    } else if (response.status === 200) {
      response.json()
      .then(function(data){
        
        pintarDatos(data, url)
      
      })
    }
  })
  .catch(function(error) {console.error('Error-Usuario no encontrado:', error)
  })    
}
/**
 * @description function to paint users data
 * @param {object} data data received from searchUser function 
 * @param {string} url url of the last fetch needed to build the next fetch to users/events 
 */
function pintarDatos(data, url) {
  document.getElementById("resultado").innerHTML = ""
  var p = document.createElement("p")
  p.setAttribute("id","informacionDeUsuario")
  document.getElementById("resultado").append(p)
  p.innerText = "Nombre y Apellidos: " + data.name + "\n" + "Nombre de usuario: " + data.login + "\n" + "Bio: " + data.bio + "\n" + "GitHub: " + data.html_url + "\n" + "Ciudad: " + data.location
  var img = document.createElement("img")
  img.src = data.avatar_url
  p.insertAdjacentElement("afterend",img)

  if (data.email != null) {
    document.getElementById("informacionDeUsuario").innerText += "\n" + "Email: " + email
  } else {
    var urlEvent = url + "/events"
    var name = data.name
    buscarEmail (urlEvent, name)
  }
}

/**
 * @description function to find the email
 * @param {string} urlEvent the new url for fetch data about events
 * @param {string} name name to verify authorship of the commits to find the correct email
 */
function buscarEmail(urlEvent, name) {
  fetch(urlEvent)
  .then(function(response) {
    return response.json()
  })
  .then(function(data){
    var email
    for(i = 0; i < data.length; i++){
      var commits = data[i].payload.commits

      if(commits){
        for(j = 0; j < commits.length; j++){
          if(commits[j].author.name == name){
            email = commits[j].author.email
            if(email != ""){                                
              document.getElementById("informacionDeUsuario").innerText += "\n" + "Email: " + email
            }
            return
          }
        }
      }               
    }
    if(email == undefined){ document.getElementById("informacionDeUsuario").innerText += "\n" + "Email: No encontrado." }           
  })
}

/** 
 * @description it takes as part of the parameter of searchUser(url) the value entered by the user in the input
 * @event searchUser 
 * @fires btnUser#searchUser 
*/
document.getElementById("btnUser").addEventListener("click", function(){
  var usuario = document.getElementById("textBox").value
  searchUser("https://api.github.com/users/" + usuario)
})
