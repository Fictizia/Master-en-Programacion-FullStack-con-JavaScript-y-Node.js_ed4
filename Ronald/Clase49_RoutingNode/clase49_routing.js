const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname; 
  if (pathname === '/' || pathname === 'index') {
    fs.readFile('./html/index.html', 'utf-8', (error, data) => {
      if(!error){
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
          });
        res.end(data);
       
      }else{
        throw error;
      }
    })
  } else if (pathname === '/quienes-somos') {
      fs.readFile('./html/about.html', 'utf-8', (error, data) => {
        if(!error){
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
            });
          res.end(data);
         
        }else{
          throw error;
        }
      })
      
  } else if (pathname === '/contacto'){
    fs.readFile('./html/contact.html', 'utf-8', (error, data) => {
      if(!error){
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
          });
        res.end(data);
      }else{
        throw error;
      }
    })
  } else {
      res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end('Querido... 404!');
  }
}).listen(8080);
console.log(`Servidor funcionando en puerto 8080`);