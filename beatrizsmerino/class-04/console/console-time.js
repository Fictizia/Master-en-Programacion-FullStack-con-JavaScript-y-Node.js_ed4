// Crea un script que nos permita calcular el tiempo que se necesita para realizar la siguientes acciones.

// Especificaciones:
// Imprimir tu nombre usando console.log, console.info, console.warn



// Tiempo que tardan los 3 juntos
console.time("Calc Time");
console.log("Beatriz Sopeña Merino");
console.info("Beatriz Sopeña Merino");
console.warn("Beatriz Sopeña Merino");
console.timeEnd("Calc Time");




// Tiempo que tardan por separado
console.time("Time of console.log");
console.log("Beatriz Sopeña Merino");
console.timeEnd("Time of console.log");

console.time("Time of console.info");
console.info("Beatriz Sopeña Merino");
console.timeEnd("Time of console.info");

console.time("Time of console.warn");
console.warn("Beatriz Sopeña Merino");
console.timeEnd("Time of console.warn");