//Ejercicio transacciones de bitcoins con websockets
var contadorBtc = 0;
var datosCambio;

// REQUEST
const request = new XMLHttpRequest();

request.onreadystatechange = function(){

  if(request.readyState === 4 && request.status === 200) {
    datosCambio = JSON.parse(request.response);
    
    for(let i in datosCambio){
      document.getElementById("tabla").innerHTML += `
      <tr>
        <td>${i}</td>
        <td>${datosCambio[i].buy} ${datosCambio[i].symbol}</td>
      </tr>
      `
    }
  }
}

request.open('GET','https://blockchain.info/es/ticker?cors=true');
request.send();


// WEBSOCKET
var myWebSocket = new WebSocket('wss://ws.blockchain.info/inv');

myWebSocket.onopen = function(){
  console.log('Web Socket abierto');
  myWebSocket.send(JSON.stringify({"op":"unconfirmed_sub"}));
}

myWebSocket.onmessage = function(message){
  let datosJson = JSON.parse(message.data);
  // console.log('Mensaje recibido: ', datosJson);

  var transaccion = 0;
  for(i = 0; i < datosJson.x.out.length; i++) {
    transaccion += datosJson.x.out[i].value;    
  }
  
  transaccionEnBTC = (transaccion/100000000);
  contadorBtc += transaccionEnBTC;
  // console.log(contadorBtc);

  document.getElementById("contador").innerText = contadorBtc.toFixed(3);
}

myWebSocket.onerror = function(error) {
  console.log('Error: ', error)
}