var formData = new FormData();

formData.append("usuario", "Alex");
formData.append("id", 123456); // todo se convierte a String

console.log(formData)
/*
// Contenido desde un <input type="file"> desde el HTML
formData.append("fichero1", fileInputElement.files[0]);

// Fichero creado al vuelo con JavaScript
var content = '<a id="a"><b id="b">hey!</b></a>'; // El contenido del nuevo fichero
var blob = new Blob([content], { type: "text/xml"});

formData.append("otro_fichero", blob);
*/
var request = new XMLHttpRequest();
request.open("POST", "http://jsonplaceholder.typicode.com/posts");
request.setRequestHeader('Content-Type', 'multipart/form-data');
request.onload = function() {
    // "201 --> Código de registro creado"
      if (request.readyState == 4 && request.status === 201) {
          alert("Se ha añadido a usuario"+request.usuario);
          console.log(request);
      }
}

request.send(formData);

/**********Probando XML**********/
function loadXML(url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {

        var data = request.responseXML;
        var discos = data.getElementsByTagName("CD");
        console.log(discos[0].getElementsByTagName("TITLE")[0].innerHTML); 
        //console.log(data.childNodes[0]); 
        for (var i = 0; i < discos.length; i++) {
            var disco  = discos[i];
            console.log("---------------------")
            console.log("Título:", directParser(disco, "TITLE"))
            console.log("Artista:", directParser(disco, "ARTIST"))
            console.log("Año:", directParser(disco, "YEAR"))
            }
      }
    };
    request.open("GET", url, true);
    request.send();
  }
  
  function directParser (item, property){
      return item.getElementsByTagName(property)[0].childNodes[0].nodeValue;
  }
  loadXML("https://www.w3schools.com/xml/cd_catalog.xml"); 

