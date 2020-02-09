// 2 - Crea un script que nos permita calcular el tiempo que se necesita para realizar 
// las siguientes acciones.

// Especificaciones:
// Imprimir tu nombre usando console.log, console.info, console.warn

function calcular_tiempo () {
    console.time();
    console.log('Joaquin');
    console.info('Joaquin');
    console.warn('Joaquin');
    console.timeEnd();
}

calcular_tiempo();