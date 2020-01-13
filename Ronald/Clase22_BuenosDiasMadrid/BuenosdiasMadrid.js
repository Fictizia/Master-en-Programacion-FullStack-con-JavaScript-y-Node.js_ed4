

function tiempo_actual(){
    fetch("http://airemad.com/api/v1/weather/S036")
     .then(function(response){
         
        return response.json();

     })
     .then(function(data){
        
         var fecha = new Date();
         console.log(fecha);
         console.log(fecha.getDay());   
         var dia = fecha.getDay();
         switch(dia){
            case 0 :
               document.getElementById("dia1").innerHTML = "Lunes";
               document.getElementById("dia2").innerHTML = "Martes";
               document.getElementById("dia3").innerHTML = "Miércoles";
               document.getElementById("dia4").innerHTML = "Jueves";
               break;
            case 1 :
               document.getElementById("dia1").innerHTML = "Martes";
               document.getElementById("dia2").innerHTML = "Miécoles";
               document.getElementById("dia3").innerHTML = "Jueves";
               document.getElementById("dia4").innerHTML = "Viernes";
               break;
            case 2 :
               document.getElementById("dia1").innerHTML = "Miercoles";
               document.getElementById("dia2").innerHTML = "Jueves";
               document.getElementById("dia3").innerHTML = "Viernes";
               document.getElementById("dia4").innerHTML = "Sábado";
               break;
            case 3 :
               document.getElementById("dia1").innerHTML = "Jueves";
               document.getElementById("dia2").innerHTML = "Viernes";
               document.getElementById("dia3").innerHTML = "Sábado";
               document.getElementById("dia4").innerHTML = "Domingo";
               break;
            case 4 :
               document.getElementById("dia1").innerHTML = "Viernes";
               document.getElementById("dia2").innerHTML = "Sábado";
               document.getElementById("dia3").innerHTML = "Domingo";
               document.getElementById("dia4").innerHTML = "Lunes";
               break;
            case 5 :
               document.getElementById("dia1").innerHTML = "Sábado";
               document.getElementById("dia2").innerHTML = "Domingo";
               document.getElementById("dia3").innerHTML = "Lunes";
               document.getElementById("dia4").innerHTML = "Martes";
               break;
            case 6 :
               document.getElementById("dia1").innerHTML = "Domingo";
               document.getElementById("dia2").innerHTML = "Lunes";
               document.getElementById("dia3").innerHTML = "Martes";
               document.getElementById("dia4").innerHTML = "Miércoles";
               break;
            
         }
         

        document.getElementById("icono0").setAttribute("src", "icons/"+data.list[1].weather[0].icon+".png");
        document.getElementById("descripcion0").innerHTML = data.list[1].weather[0].description;
        document.getElementById("datos0").innerHTML = data.list[1].main.temp+" ºC<br>"+"Min "+data.list[1].main.temp_min+" ºC | "+"Max "+data.list[1].main.temp_max+" ºC<br>"+
        "Hum "+data.list[1].main.humidity+"% | "+"Pres "+data.list[1].main.pressure+" psi<br>"+
        "Viento "+data.list[1].wind.deg+"º | "+data.list[1].wind.speed+" Km/h";
           /* console.log(data.list[1].main.temp);
            data.list[1].main.temp_min
            data.list[1].main.temp_max
            data.list[1].main.humidity
            data.list[1].main.pressure
            data.list[1].wind.deg
            data.list[1].wind.speed
            console.log(data.list[1].weather[0].description);
            console.log(data.list[1].weather[0].icon);
           */
        
        document.getElementById("icono1").setAttribute("src", "icons/"+data.list[9].weather[0].icon+".png");
        document.getElementById("descripcion1").innerHTML = data.list[9].weather[0].description;
        document.getElementById("datos1").innerHTML = data.list[9].main.temp+" ºC<br>"+"Min "+data.list[9].main.temp_min+" ºC | "+"Max "+data.list[9].main.temp_max+" ºC<br>"+
        "Hum "+data.list[9].main.humidity+"% | "+"Pres "+data.list[9].main.pressure+" psi<br>"+
        "Viento "+data.list[9].wind.speed+" Km/h"; 

        
        document.getElementById("icono2").setAttribute("src", "icons/"+data.list[17].weather[0].icon+".png");
        document.getElementById("descripcion2").innerHTML = data.list[17].weather[0].description;
        document.getElementById("datos2").innerHTML = data.list[17].main.temp+" ºC<br>"+"Min "+data.list[17].main.temp_min+" ºC | "+"Max "+data.list[17].main.temp_max+" ºC<br>"+
        "Hum "+data.list[17].main.humidity+"% | "+"Pres "+data.list[17].main.pressure+" psi<br>"+
        "Viento "+data.list[17].wind.speed+" Km/h"; 

        
        document.getElementById("icono3").setAttribute("src", "icons/"+data.list[25].weather[0].icon+".png");
        document.getElementById("descripcion3").innerHTML = data.list[25].weather[0].description;
        document.getElementById("datos3").innerHTML = data.list[25].main.temp+" ºC<br>"+"Min "+data.list[25].main.temp_min+" ºC | "+"Max "+data.list[25].main.temp_max+" ºC<br>"+
        "Hum "+data.list[25].main.humidity+"% | "+"Pres "+data.list[25].main.pressure+" psi<br>"+
        "Viento "+data.list[25].wind.speed+" Km/h";

        
        document.getElementById("icono4").setAttribute("src", "icons/"+data.list[33].weather[0].icon+".png");
        document.getElementById("descripcion4").innerHTML = data.list[33].weather[0].description;
        document.getElementById("datos4").innerHTML = data.list[33].main.temp+" ºC<br>"+"Min "+data.list[33].main.temp_min+" ºC | "+"Max "+data.list[33].main.temp_max+" ºC<br>"+
        "Hum "+data.list[33].main.humidity+"% | "+"Pres "+data.list[33].main.pressure+" psi<br>"+
        "Viento "+data.list[33].wind.speed+" Km/h";  
      
     })
     .catch(function(error){
         console.log(error)
     })
};

tiempo_actual();

document.getElementById("imagenTrafico").setAttribute("src","http://informo.munimadrid.es/cameras/Camara01305.jpg?v=52087");
document.getElementById("imagenTrafico").setAttribute("width","70%");



function contaminacion(){
   fetch("http://airemad.com/api/v1/pollution/S024")
    .then(function(response){
        
       return response.json();

    })
    .then(function(data){
       for (x in data){
          if (data[x].parameter != undefined){
            console.log(data[x].parameter);
            document.getElementById("datosContaminacion").innerHTML +="<b>"+data[x].parameter+" ("+data[x].abrebiation+"):</b> "+data[x].values[12].valor+" &microg "+ "| Medido por "+data[x].technique+"<br><br>"
          }
          
       }
       //aplicarle un for in
       //document.getElementById("datosContaminacion").innerHTML = data.SO2.parameter+" ("+data.SO2.abrebiation+") :"+data.SO2[12].valor+"&micro g  Medido por: " +data.SO2.technique;
       

    })
    .catch(function(error){
        console.log(error)
    })
};

contaminacion();

