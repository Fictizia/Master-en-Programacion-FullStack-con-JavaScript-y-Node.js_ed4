//Ejercicio gráfica de humedad y temperatura de madrid usando Chartist.
//Variable donde se guardaran los datos de las etiquetas y las barras de la gráfica. 
var data = {
  labels: [],
  series: [ [],[],[] ]
};
//Función para obtener datos y pintar la gráfica.
function llamada(url){
    fetch(url)
    .then(res => res.json())
    .then(dat => {
      console.log(dat);
      let lista = dat.list;
      for(i = 0; i < lista.length; i++){
        if(lista[i].dt_txt.slice(11) == "15:00:00"){
          data.series[1].push(lista[i].main.temp_max);
          data.series[2].push(lista[i].main.humidity);
          data.labels.push(lista[i].dt_txt.slice(0,10));
        }else if(lista[i].dt_txt.slice(11) == "03:00:00"){                
          data.series[0].push(lista[i].main.temp_min);                
        }            
      }
      var chart = new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
      //Función para animar la grafica *MINIFICADA*
      var seq=0,delays=50,durations=500;chart.on("created",function(){seq=0}),chart.on("draw",function(e){if(seq++,"bar"===e.type)e.element.animate({opacity:{begin:seq*delays+1e3,dur:durations,from:0,to:1}});else if("label"===e.type&&"x"===e.axis)e.element.animate({y:{begin:seq*delays,dur:durations,from:e.y+100,to:e.y,easing:"easeOutQuart"}});else if("label"===e.type&&"y"===e.axis)e.element.animate({x:{begin:seq*delays,dur:durations,from:e.x-100,to:e.x,easing:"easeOutQuart"}});else if("point"===e.type)e.element.animate({x1:{begin:seq*delays,dur:durations,from:e.x-10,to:e.x,easing:"easeOutQuart"},x2:{begin:seq*delays,dur:durations,from:e.x-10,to:e.x,easing:"easeOutQuart"},opacity:{begin:seq*delays,dur:durations,from:0,to:1,easing:"easeOutQuart"}});else if("grid"===e.type){var a={begin:seq*delays,dur:durations,from:e[e.axis.units.pos+"1"]-30,to:e[e.axis.units.pos+"1"],easing:"easeOutQuart"},s={begin:seq*delays,dur:durations,from:e[e.axis.units.pos+"2"]-100,to:e[e.axis.units.pos+"2"],easing:"easeOutQuart"},t={};t[e.axis.units.pos+"1"]=a,t[e.axis.units.pos+"2"]=s,t.opacity={begin:seq*delays,dur:durations,from:0,to:1,easing:"easeOutQuart"},e.element.animate(t)}});
    })
    .catch(err => console.log(`Error: ${err}`));
}
//Opciones de la grafica *MINIFICADAS*
var options={seriesBarDistance:30},responsiveOptions=[["screen and (min-width: 641px) and (max-width: 1024px)",{seriesBarDistance:10,axisX:{labelInterpolationFnc:function(n){return n}}}],["screen and (max-width: 640px)",{seriesBarDistance:5,axisX:{labelInterpolationFnc:function(n){return n[0]}}}]];
//Llamada a la 
llamada("http://airemad.com/api/v1/weather/S002");