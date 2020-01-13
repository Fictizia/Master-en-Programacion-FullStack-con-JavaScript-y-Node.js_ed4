
//Esta función nos daría el tiempo actua en Madrid al cargarse la página. Los datos están actualizados 
//mediante una llamada ajax con los radares metereológicos de Madrid.

/**
 * Da el tiempo metereológico actual en Madrid
 * @param {string} url - La url a la que se hace la llamada ajax
 */

function tiempo(url){
    fetch(url)
     .then(function(response){
         
        return response.json();

     })
     .then(function(data){
         
         var cajadiv = document.createElement("div");
         var titulo = document.createElement("h3");
         var condicion = document.createElement("p");
         var logo = document.createElement("img");
         var recomendacion = document.createElement("p");

         cajadiv.appendChild(titulo)
         cajadiv.appendChild(logo);
         cajadiv.appendChild(condicion);
         cajadiv.appendChild(recomendacion);
         document.getElementById("tiempo").appendChild(cajadiv);

         /**
          * fecha en la que se conecta el usuario
          * @type {object} objeto Date
          */
         var fecha = new Date(); // Cre la hora en la que se conecta el usuario o actualiza la página
         var dia = fecha.getDate();
         //Saco el mes en string ya que con getMonth me saca sólo el número de mes.
         var mes = fecha.toLocaleString("es-Es", {month:"long" } ).charAt(0).toUpperCase() + fecha.toLocaleString("es-Es", {month:"long" } ).slice(1);       //añado el chartAt(0).toUpercase() para que me convierta la primera letra del mes en Mayuscula y añado el slice(1) para que me imprima el resto e letras desde la posion 1.
         var ano = fecha.getFullYear();
         var hora = fecha.getHours();
         var minutos = ("0"+fecha.getMinutes()).slice(-2); //agrego el 0 y el slice(-2) porque cuando los minutos son menosres de 10 me da solo un digito
         document.getElementsByTagName("H3")[0].innerHTML = data.name+" ("+data.sys.country+") "+"<br>"+dia+" "+mes+" "+ano+"  |  "+hora+":"+minutos+" hrs";
         var a = data.main.temp; 
         var b = a-273.15; // Como los datos de la tempetatura me vienen en Kelvin , los paso a centigrados y luego lo redondeo  con Math.round
         

         document.getElementsByTagName("P")[0].innerHTML = "Temp: "+Math.round(b)+"º  "+"| " +data.weather[0].main; 

         document.getElementsByTagName("IMG")[0].setAttribute("src","icons/"+data.weather[0].icon+".png");
        document.getElementsByTagName("P")[1].innerHTML = "Hola Motero!!, Ahora mismo tenemos: \" "+data.weather[0].description+" \" con: "+Math.round(b) +"º , con lo cual lleva la ropa adecuada cuando salgas!";

     })
     .catch(function(error){
         console.log(error)
     })
};

tiempo("http://api.openweathermap.org/data/2.5/weather?q=Madrid,es&APPID=5f19e66b0aa418702b8aa2478a9750f0");


//Esta función mostrará las noticias mas populares actualmente en rtve, cuando el cliente de click en un botón.

/**
 * Muestra las noticias mas populares actualmente en rtve
 * @param {string} url - La url a la que se hace la llamada ajax
 */

function noticias(url){
    fetch(url)
     .then(function(response){
        return response.json();
     })
     .then(function(data){
       
        var lista = data.page.items
        for (var i=0;i<lista.length;i++){
            var cajadiv = document.createElement("DIV");
            var titulo = document.createElement("H3");
            var foto = document.createElement("IMG");
            var descripcion = document.createElement("P");
            cajadiv.appendChild(titulo);
            cajadiv.appendChild(foto);
            cajadiv.appendChild(descripcion);
            document.getElementById("cajanoticias").appendChild(cajadiv);
            document.getElementsByTagName("IMG")[2+i].setAttribute("width","100%");
            document.getElementsByTagName("IMG")[2+i].setAttribute("height","30%");
            document.getElementsByTagName("H3")[1+i].innerHTML += "<br>"+lista[i].longTitle+"<br>"; //le añado 1 al i porque ya hay un h3 previo
            if (lista[i].imageSEO == null){
                document.getElementsByTagName("IMG")[2+i].setAttribute("src","rtve2.jpg")
            } 
            else{
                document.getElementsByTagName("IMG")[2+i].setAttribute("src",lista[i].imageSEO);
            };         
            document.getElementsByTagName("P")[2+i].innerHTML += "Para la noticia en detalle:<br>" +lista[i].htmlUrl;
            

     }
    }
     )
     .catch(function(error){
         console.log(error)
     });
};

document.getElementById("videos").addEventListener("click",function(){
    noticias("http://api.rtve.es/api/noticias/mas-populares.json");
})

//Esta función mostrará las carreras populares que tiene planificada la Comunidad de Madrid en los próximos meses, mediante una llamada de ajax. 
// Ojo, es necesario tener activado el plugin de CORS para que funcione la llamada.

/**
 * Muestra las carreras populares que tiene planificado Madrid en los próximos meses.
 * @param {string} url - La url a la que se hace la llamada ajax
 */
function carreras(url){
    fetch(url)
     .then(function(response){
     return response.json();
     })
     .then(function(data){
        var lista = data["@graph"]
        for (var i=0;i<lista.length;i++){
            var cajadiv = document.createElement("div")
            var titulo = document.createElement("h4");
            var enlace = document.createElement("a");
            cajadiv.appendChild(titulo);
            cajadiv.appendChild(enlace);
            document.getElementById("listaCarreras").appendChild(cajadiv);
            document.getElementsByTagName("H4")[i].innerHTML += "<br>"+lista[i].title+"<br>";
            var direccion = lista[i].link;
            document.getElementsByTagName("A")[i].setAttribute("href",direccion);
            document.getElementsByTagName("A")[i].innerHTML += "ir la pagina oficial";
            
        }
         
     })
     .catch(function(error){
         console.log(error)
     });
};

document.getElementById("carreras").addEventListener("click",function(){
    carreras("https://datos.madrid.es/egob/catalogo/300261-0-agenda-proximas-carreras.json")
});

//Los datos de los de las cámaras de tráfico en la ruta que cojo habitualmente , los he colocado directamente desde el Html.



