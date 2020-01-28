// Agrupa cada tipo de mensaje y añade un contador de tiempo por cada grupo.

console.group("console.log");
console.log("%cBeatriz Sopeña Merino", "padding: 0.5rem 1rem; color: white; background-color: #3EBDFF;");
console.groupEnd();

console.group("console.info");
console.info("%cBeatriz Sopeña Merino", "padding: 0.5rem 1rem; color: #454545; background-color: gold;");
console.groupEnd();

console.group("console.warn");
console.warn("%cBeatriz Sopeña Merino", "padding: 0.5rem 1rem; color: white; background-color: tomato;");
console.groupEnd();