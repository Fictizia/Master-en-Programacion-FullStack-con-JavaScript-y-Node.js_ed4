self.addEventListener('message', evento => {
    self.postMessage(evento.data + "Hola desde el Web worker");
    // self.close();
}, false);