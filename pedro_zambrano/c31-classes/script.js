class Persona {
    constructor(nombre, edad, genero){
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero;
    }

    obtDetalles() {
        console.log("Su nombre es "+this.nombre+", tiene "+this.edad+" años y es "+this.genero+".");
    }
}

class Estudiante extends Persona {
    constructor(nombre, edad, genero, curso, grupo){
        super (nombre, edad, genero);
        this.curso = curso;
        this.grupo = grupo;
    }

    registrar() {
        console.log(this.nombre+", tiene "+this.edad+" años, es "+this.genero+" pertenece al grupo "+this.grupo+" y curso "+this.curso+".");
    }
}

class Profesor extends Persona {
    constructor(nombre, edad, genero, asignatura, nivel) {
        super (nombre, edad, genero);
        this.asignatura = asignatura;
        this.nivel = nivel;
    }

    asignar() {
        console.log("El profesor "+this.nombre+", tiene "+this.edad+" años, es "+this.genero+", da "+this.asignatura+" de nivel "+this.nivel+".");
    }
}

var alumno = new Estudiante("Pedro", "18", "hombre", "JS", "1");
console.log({alumno});
alumno.obtDetalles();
alumno.registrar();

var profe = new Profesor("Paco","30","hombre","Programacion", "3");
console.log({profe}),
profe.asignar();