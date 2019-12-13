
/**
 *  Metodo para unir dos cadenas
 * 
 *  @example
 *  union("hola","madrid")
 *  Devuelve -> "hola madrid"
 * 
 *  @param {string} cadena1 Primera cadena
 *  @param {string} cadena2 Segunda cadena
 *  @returns {string} Devuelve la cadena concatenada
 * 
 */
function union(cadena1,cadena2){
    return cadena1+" "+cadena2;
}

/**
 *  Metodo para devolver datos del polen a raíz de una URL
 *  @param {string} url La url para hacer la peticion AJAX
 *  @example peticionPolen("url_datos_polen.html")
 * 
 */
function peticionPolen(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var respuesta = JSON.parse(xmlHttp.responseText);
            console.info(respuesta);
            // Mostrar en el DOM
            /*
            var resultado = document.createElement("p");
            resultado.setAttribute("id","resultado2");
            resultado.innerHTML = respuesta[0].mediciones.Aliso.fecha;
            document.body.appendChild(resultado);
            */

            // Mostrar todos los datos
            respuesta.forEach(function(estacion){ // Arganzuela, Salamanca, Ciudad Universitaria
                var div_estacion = document.createElement("div");
                div_estacion.setAttribute("id",estacion.id);
                var nombre = document.createElement("h2");
                
                nombre.innerHTML = estacion.name;
                div_estacion.appendChild(nombre); // div --> h2
                document.getElementById("mediciones").appendChild(div_estacion); // mediciones ->div --> h2
                

                var lista = document.createElement("ul");
                // Rellenar lista
                for (medida in estacion.mediciones){
                    var medicion = document.createElement("li");

                   medicion.innerHTML = medida+": Fecha:"+estacion.mediciones[medida].fecha+", Valor:"+estacion.mediciones[medida].valor;

                    console.log(medicion);

                    lista.appendChild(medicion);// Juntar UL con LIs
                }

                div_estacion.appendChild(lista);
            });




        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
            console.error("ERROR! 404");
            console.info(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

document.getElementById("boton2").addEventListener("click",function(){
    peticionPolen("http://airemad.com/api/v1/pollen")
});