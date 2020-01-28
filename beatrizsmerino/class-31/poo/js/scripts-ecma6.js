
/**
 * @class Person
 * @param {String} name 
 * @param {Number} age 
 * @param {String} gender 
 */
// ECMA6+
class Person {
    constructor(name, age, gender) {
        this._name = name;
        this._age = age;
        this._gender = gender;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get age() {
        return this._age;
    }
    set age(age) {
        this._age = age;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }

    details() {
        return console.log(`Nombre: ${this._name} \nEdad: ${this._age} \nGénero: ${this._gender}`);
    }

    static hello() {
        console.log("Hola!");
    }
}

// class === function
console.log("typeof Person", typeof Person);

// Instace of class person
console.group("%cPerson", "padding: 0.2rem 0.5rem; background-color: #5E7489;");
//----
// Check function static
Person.hello();
//----
let person1 = new Person();
person1.name = "Beatriz";
person1.age = 26;
person1.gender = "femenino";
// console.log(person1.name);
// console.log(person1.age);
// console.log(person1.gender);
//----
person1.details();
//----
let person2 = new Person("Juan", 20, "masculino");
person2.details();
//----
console.groupEnd();





/**
 * @class Student
 * @param {String} name
 * @param {Number} age
 * @param {String} gender
 * @param {String} course
 * @param {Number} group
 */
// ECMA6+
class Student extends Person {
    constructor(name, age, gender, course, group) {
        super(name, age, gender);
        this._course = course;
        this._group = group;
    }
    register() {
		/* 
		this.details();
		Access the function details of the person class
		but if we had a function with the same name within this class
		access it and not the class Person.
		Its better use super.details();
		*/
        super.details();
        return console.log(`Curso: ${this._course} \nGrupo: ${this._group}`);
    }

    static hello() {
        super.hello();
        return console.log("Buenos dias profesor!!");
    }
}

console.group("%cStudent", "padding: 0.2rem 0.5rem; background-color: #7A7959;");
//----
let student1 = new Student("Paco", 30, "masculino", "Master Fullstack de Javascript y node.js", 1);
Student.hello();
student1.register();
//----
console.groupEnd();





/**
 * @class Professor
 * @param {String} name
 * @param {Number} age
 * @param {String} gender
 * @param {String} subject
 * @param {Number} level
 */
// ECMA6+
class Professor extends Person {
    constructor(name, age, gender, subject, level) {
        super(name, age, gender);
        this._subject = subject;
        this._level = level;
    }

    assing() {
        super.details();
        return console.log(`Asignatura: ${this._subject} \nNivel: ${this._level}`);
    };

    static hello() {
        super.hello();
        return console.log("Buenos dias alumnos!!");
    }
}

console.group("%cProfessor", "padding: 0.2rem 0.5rem; background-color: #597A5F;");
//----
let professor1 = new Professor("Ulises Gascon", 28, "masculino", "Javascript", 1);
Professor.hello();
professor1.assing();
//----
console.groupEnd();