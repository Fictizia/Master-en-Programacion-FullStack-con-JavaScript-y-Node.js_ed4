// Crear la clase Persona propiedades nombre, edad y género, 
//   y el método obtDetalles(), que muestra por pantalla las propiedades de la persona.
// Crear la clase Estudiante, que hereda de Persona, e incluye las propiedades curso y grupo 
//   y el método registrar(), que muestre por pantalla el resultado.
// Crear la clase Profesor, que hereda de Persona, e incluye las propiedades asignatura y nivel 
//   y el método asignar(), que muestre por pantalla el resultado.
// Crear los objetos y casos de prueba necesarios para comprobar el correcto funcionamiento de la jerarquía de clases.



class Persona {
  constructor(nombre, edad, genero) {
    this._nombre = nombre;
    this._edad = edad;
    this._genero = genero;
  }
  set nombre (nombre) {this._nombre = nombre}
  get nombre ()       {return this._nombre}
  set edad (edad)     {this._edad = edad}
  get edad ()         {return this._edad}
  set genero (genero) {this._genero = genero}
  get genero ()       {return this._genero}
  
  obtDetalles() {
    console.log(`Persona
      Nombre: ${this._nombre}
      edad: ${this._edad}
      genero: ${this._genero}`);
  }
}

class Estudiante extends Persona {
  constructor(nombre, edad, genero) {
    super(nombre, edad, genero);
  }
  get curso () {return this._curso}
  get grupo () {return this._grupo}
  
  registrar(curso, grupo) {
    this._curso = curso;
    this._grupo = grupo;
    this.obtDetalles();
  }
  obtDetalles() {
    console.log(`Estudiante
      Nombre: ${this._nombre}
      edad: ${this._edad}
      genero: ${this._genero}
      registrad${this.genero=='F'?'a':'o'} en el curso: ${this._curso}, grupo: ${this._grupo}`);
  }
}

class Profesor extends Persona {
  constructor(nombre, edad, genero) {
    super(nombre, edad, genero);
  }
  get asignatura () {return this._asignatura}
  get nivel ()      {return this._nivel}
  
  asignar(asignatura, nivel) {
    this._asignatura = asignatura;
    this._nivel = nivel;
    this.obtDetalles();
  }
  obtDetalles() {
    console.log(`Profesor${this.genero=='F'?'a':''}
      Nombre: ${this._nombre}
      edad: ${this._edad}
      genero: ${this._genero}
      imparte la asignatura: ${this._asignatura} (nivel ${this._nivel})`);
  }
}

let noa = new Persona('Noa', 5, 'F');
noa.obtDetalles();
console.assert(noa.nombre=='Noa');
console.assert(noa.edad==5);
console.assert(noa.genero=='F');

let guillermo = new Estudiante('Guillermo',21,'M');
guillermo.registrar(2,'C');
console.assert(guillermo.nombre='Guillermo');
console.assert(guillermo.edad==21);
console.assert(guillermo.genero=='M');
console.assert(guillermo.curso==2);
console.assert(guillermo.grupo=='C');

let angela = new Profesor('Ángela', 32, 'F');
angela.asignar('POO', 'avanzado');
console.assert(angela.nombre=='Ángela');
console.assert(angela.edad==32);
console.assert(angela.genero=='F');
console.assert(angela.asignatura=='POO');
console.assert(angela.nivel=='avanzado');

let rafa = new Profesor('Rafael', '41', 'M');
rafa.asignar('Python', 'básico');
console.assert(rafa.nombre=='Rafael');
console.assert(rafa.edad==41);
console.assert(rafa.genero=='M');
console.assert(rafa.asignatura=='Python');
console.assert(rafa.nivel=='básico');
