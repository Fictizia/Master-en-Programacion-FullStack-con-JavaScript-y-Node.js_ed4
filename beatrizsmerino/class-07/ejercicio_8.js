// 8 - Hacer uso de for...in para sacar mensajes como este:
// Ejemplo de salida: Nombre: Jason Nissen, Apellidos: jasonnissen, puesto:1

//Ejemplo array de 3 objetos JSON:

var clase = [
  {
    "name": "Jason Nissen",
    "username": "jasonnissen",
    "puesto": 1
  },
  {
    "name": "Chris Rouw",
    "username": "chrisrouw",
    "puesto": 3
  },
  {
    "name": "Chad Feldmann",
    "username": "cfeldmann",
    "puesto": 2
  }
];



// - Resuelto con for in:
for (const key in clase) {
  const alumno = clase[key];

  console.group("Alumno: " + key);
  for (const attribute in alumno) {
    console.log(attribute + ": " + alumno[attribute] + "\n");
  }
  console.groupEnd();
}