//ejercicio de constructores con class de ES6
class Persona {
  constructor(nombre,edad,genero){
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;    
  }
  obtDetalles(){console.log(`Nombre: ${this.nombre} Edad: ${this.edad} Género: ${this.genero}`)}
}

class Estudiante extends Persona{
  constructor(nombre,edad,genero,curso,grupo){
    super(nombre,edad,genero);
    this.curso = curso;
    this.grupo = grupo;
  }
  registrar(){console.log(`${this.nombre} de ${this.edad} años, ${this.genero}, esta en el curso ${this.curso} y en el grupo ${this.grupo}.`)}
}

class Profesor extends Persona{
  constructor(nombre,edad,genero,asignatura,nivel){
    super(nombre,edad,genero);
    this.asignatura = asignatura;
    this.nivel = nivel;
  }
  asignar(){console.log(`${this.nombre} dara la clase de ${this.asignatura} del nivel ${this.nivel}.`) }
}


//Ejemplos de prueba.
var yo = new Persona("Miguel",26,"varón");
yo.obtDetalles();

var Maria = new Estudiante("María",30,"mujer","3º","B");
Maria.obtDetalles();
Maria.registrar();

var Manolo = new Profesor("Manolo",40,"varón","inglés","medio");
Manolo.obtDetalles();
Manolo.asignar();