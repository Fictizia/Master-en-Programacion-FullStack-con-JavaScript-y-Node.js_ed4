//Rutas basicas.
const http = require('http'),
 url = require('url');
const adress = require('./adress');

http.createServer((request,response) => {

  const pathname = url.parse(request.url).pathname;

  if(pathname == '/'){
    response.writeHead(200,{'Content-type' : 'text/html; charset=utf-8'});
    response.write('Estas en el Index');
    response.end();
  } else if (pathname == '/quienes-somos'){
    response.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
    response.write('<h1>¿Quienes somos?</h1><p>Somos una empresa de reparto de comida a domicilio.</p>');
    response.end();

  } else if(pathname == '/donde-estamos'){
    response.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
    response.write('<h1>¿Donde estamos?</h1><p>Estamos en Madrid.</p>')

  } else if(pathname == '/que-hacemos'){
    response.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
    response.write('<h1>¿Que hacemos?</h1><p>Pizzas, hamburguesas, burritos, ramen ...</p>');
    response.end();

  } else if(pathname == '/contacto'){
    response.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
    response.write('<h1>Contacto</h1><p>Dirección: c/inventada nº 99, 99.999 Madrid. <br> Tlf: 99 999 99 99 <br> Correo: correoInventado@inventado.com </p>');
    response.end();
    
  }else {
    response.writeHead(404,{'Content-type':'text/plain; charset=utf-8'});
    response.write('ERROR PAGINA NO ENCONTRADA!!');
    response.end();
  }
}).listen(adress.env.PORT,adress.env.IP);

console.log(`Servidor escuchando en http://${adress.env.IP}:${adress.env.PORT}`);