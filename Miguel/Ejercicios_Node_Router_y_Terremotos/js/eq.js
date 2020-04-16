//Obterer los datos de los terremotos segun magnitud de la ultima hora.
const https = require('https');
const process = require('process');

if(!process.argv[2]){
  console.log('Es necesario pasar un parametro que defina la magnitud');
  process.exit();
} else if (!['1.0','2.5','4.5','all'].includes(process.argv[2])){
  console.log('El parametro de magnitud solo puede ser un valor de entre: [1.0, 2.5, 4.5, all]');
  process.exit();
};

const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${process.argv[2]}_hour.geojson`;

https.get(url,(response) => {
  var data;
  var json;

  response.on('data', (chunk) => {  //Recibe un buffer(chunk) y hay que pasarlo a string para leerlo.
    data = chunk.toString();
  });

  response.on('end', () => { //Con la respuesta terminada pasamos el string del buffer de antes a JSON para manipularlo.
    try{
      json = JSON.parse(data);
      console.log( `
      ********************************************************
      Titulo: ${json.metadata.title}
          ---------------------------
      Total: ${json.metadata.count}
      Estado: ${json.metadata.status}
          ---------------------------
      ${new Date(json.metadata.generated)}
          ---------------------------`);
      json.features.forEach(element => {
        console.log(`
        ${element.properties.title}
        ${new Date(element.properties.time)}
        Magnitud: ${element.properties.mag}
        Estado: ${element.properties.status}
        Tipo: ${element.properties.type}
        Lugar: ${element.properties.place}
        Coordenadas: ${element.geometry.coordinates[0]}, ${element.geometry.coordinates[1]}
        Info: ${element.properties.url}
        Detalles: ${element.properties.detail}
        `);        
      });
      console.log(`       ********************************************************`);
    }catch(err) {
      console.log(`Error => ${err}`);
    }
  });
});

console.log('Finalizado con éxito.');