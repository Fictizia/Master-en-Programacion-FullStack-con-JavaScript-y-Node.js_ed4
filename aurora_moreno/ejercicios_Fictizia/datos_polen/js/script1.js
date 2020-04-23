function peticionAjax(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {

        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var info = JSON.parse(xmlHttp.responseText);
            var bigContent = document.createElement("div");
            bigContent.setAttribute("id", "big");
            bigContent.setAttribute("class", "grid1");
            document.body.appendChild(bigContent);

            var selector = document.createElement("div");
            selector.setAttribute("id", "desplegable");
            selector.innerHTML="Desplegable V";
            document.body.appendChild(selector);
            var plantArray = [];

            for (var i = 0; i < info.length; i++) {
                var resultado = info[i].mediciones;
                var lugar = document.createElement("h2");
                lugar.setAttribute("onclick", "sitios"+i + "()");
                lugar.setAttribute("class", "titulo");
                lugar.innerHTML = info[i].name;

                var contenedor = document.createElement("div");
                contenedor.setAttribute("id", "cont" + i);
                bigContent.appendChild(contenedor);

                var contenedor2 = document.createElement("div");
                contenedor2.setAttribute("id", "cont2" + i);
                contenedor2.setAttribute("class", "cajasPlants" + i);
                contenedor2.style.display="none";
                bigContent.appendChild(contenedor2);

                
                

                switch (i) {
                    case 0:
                        contenedor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><path class="cls-1 path2" d="M1.9,62.1c10.4-12.3,50.4,12.4,62.5-2.5,7.6-9.4-.2-29.1,3-30s5.1,13,12,14.5c13.9,3.1,31.1-46.2,40.5-44,11.9,2.9.7,86.9,7.5,88,3.6,0.6,3.3-23.4,19.5-35.5,18.5-13.7,38.9,2.5,98,8.5,44.5,4.5,48-3.2,60.5,5.5,30.6,21.4,12.6,69.8,46,91,16.1,10.2,34.2,7.7,38,20s-9.8,18.6-6.5,28.5c5.6,16.8,47.6,6.7,58,26,7.9,14.8-12.5,28.8-5,51,6.2,18.3,23.1,17.4,26,33,3.7,19.6-18.4,46-38.5,46.5-16.1.4-22.7-16.1-30.5-12.5-12.4,5.7-10.8,54.7,8,75.5a18.1,18.1,0,0,1,4.5,7.5c4,14-10.8,35.7-26,37.5s-18.5-18.1-36.5-21c-24.6-4-33.4,30.8-67.5,37.5-28,5.5-58.4-10.9-74-30.5-19.1-24-4.6-38.4-19.5-61C150.4,347.8,57.7,370,47.4,336c-2.3-7.5,0-18.1,5.5-25,10.5-13.3,28.2-6.6,33-15,8.3-14.6-42.2-40.4-55-94.5-5.5-23.2,2.8-22.8-2.5-53.5C19.6,97-7.3,72.9,1.9,62.1Z"/></svg>'
                        contenedor.appendChild(lugar);
                        var forma1 = document.querySelector('.cls-1');
                        var length = forma1.getTotalLength();
                        console.log(length);
                        break;

                    case 1:
                        contenedor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><path class="cls-2" d="M2,9.9C-7.5,24.3,19.8,42.6,16.1,78.5,13.5,103.1-.3,105.1,2,123.8c3.2,25.8,32.6,48.5,59.3,53.9,11.9,2.4,12.6-.8,22.6,2.3,22.9,7.1,27.9,26.3,46.1,41.4s34.7,11.4,56.2,19.5c68.5,25.9,58.4,130.5,112.4,142.1,22.5,4.8,46.9-8.5,59.3-21.1,17.9-18,10.5-33.4,26.5-60.1,23.4-38.8,55.7-33.6,60.1-56.2,5.1-26.1-34.9-47.5-91.3-103-48.8-48.1-45.4-77.2-71-81.2-35.7-5.5-46.8,41.3-103,54.6C125.9,128.6,61.2,104.3,50.4,70,42.7,45.5,65,24.8,52.8,9.9S10.4-2.9,2,9.9Z"/></svg>'
                        contenedor.appendChild(lugar);
                        break;

                        case 2:
                            contenedor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><path class="cls-3" d="M26.5,89c10.6,25.6,22,63.7,16.7,108C34.6,268-11,305.5,2.5,323s65.9-24.5,148.7-26c102.6-1.8,158.6,62.2,184.7,38,22.8-21.2-27.8-63.2-16.7-152,7.3-58.5,36.3-96.2,17.3-150.7-7.7-22-10.3-29.1-16-31.3-27-10.5-70,63.9-118.7,70.7a87.5,87.5,0,0,0-33.3,10.7A86.5,86.5,0,0,0,147.8,99C136.9,110,107.6,115.2,26.5,89Z"/></svg>'
                            contenedor.appendChild(lugar);
                            break;
                }

                


                for (var x in resultado) {
                    var caja = document.createElement("div");
                    caja.setAttribute("class", "plantas" + i);
                    
                    plantArray.push(x);
                    contenedor2.appendChild(caja);

                    var planta = document.createElement("h3");

                    

                    planta.setAttribute("class", "planta");
                    planta.setAttribute("id", x);
                    planta.innerHTML = x;
                    caja.appendChild(planta);
                    

                    var niveles = document.createElement("h4");
                    niveles.setAttribute("class", "niveles");
                    niveles.innerHTML = "Niveles: " + resultado[x]["resumen"];
                    caja.appendChild(niveles);


                }
            }
          plantArray.splice(10, 30);

          for (g=0; g< plantArray.length; g++){
              var selecPlant = document.createElement("p");
              selecPlant.innerHTML= plantArray[g];
          }
          console.log(plantArray);



        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
            console.error("ERROR! 404");
            console.info(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();

}

function sitios0() {
    cont20.style.display="inline";
    cont20.style.textAlign="left";
    cont1.style.display="none";
    cont2.style.display="none";    
    
    document.querySelector(".cerrar").style.display="inline";

    document.querySelector(".grid1").classList.add("grid2");
    document.querySelector(".grid1").classList.remove("grid1");

}

function sitios1() {
    cont21.style.display="inline";
    cont21.style.textAlign="left";
    cont0.style.display="none";
    cont2.style.display="none";    

    document.querySelector(".grid1").classList.add("grid2");
    document.querySelector(".grid1").classList.remove("grid1");
    document.querySelector(".cerrar").style.display="inline";

}

function sitios2() {
    cont22.style.display="inline";
    cont22.style.textAlign="left";
    cont1.style.display="none";
    cont0.style.display="none";    

    document.querySelector(".grid1").classList.add("grid2");
    document.querySelector(".grid1").classList.remove("grid1");
    document.querySelector(".cerrar").style.display="inline";

}


document.querySelector(".cerrar").addEventListener("click", function(){
    cont20.style.display="none";
    cont21.style.display="none";
    cont22.style.display="none";
    cont1.style.display="inline";
    cont0.style.display="inline"; 
    cont2.style.display="inline";       

    document.querySelector(".grid2").classList.add("grid1");
    document.querySelector(".grid2").classList.remove("grid2");
    document.querySelector(".cerrar").style.display="none";

})

peticionAjax("http://airemad.com/api/v1/pollen");


// var imagen = document.createElement("img");
//imagen.setAttribute("src", info);
//imagen.setAttribute("id", "imageng");
//document.body.appendChild(imagen);