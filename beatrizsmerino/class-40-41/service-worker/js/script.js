
// WORKER 1
const worker1 = new Worker('./js/service-worker.js');

worker1.addEventListener('message', evento => {
    console.log('El worker 1 dice: ', evento.data);
    // worker.terminate()
}, false);

worker1.postMessage('Hola Mundo!\n');





// WORKER 2
const blob = new Blob(
    [document.querySelector("#worker").textContent],
    { type: "text/javascript" }
);
const worker2 = new Worker(window.URL.createObjectURL(blob));

worker2.addEventListener('message', evento => {
    console.log('El worker 2 dice: ', evento.data);
    // worker.terminate()
}, false);

worker2.postMessage('Hola Mundo!\n');