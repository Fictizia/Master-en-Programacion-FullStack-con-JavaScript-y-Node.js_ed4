/**
 * @class Person
 * @param {String} name 
 * @param {Number} age 
 * @param {String} gender 
 */
// ECMA5


var contador = 0;

//Define the object specific properties inside the constructor
function Person(name, age, gender) {

    this._id = contador++;
    this._name = name;
    this._age = age;
    this._gender = gender;

    function total() {
        var textPerson = "";

        if (contador === 1) {
            textPerson = "persona";
        } else {
            textPerson = "personas";
        }
        return console.log("%cSe ha creado " + contador + " " + textPerson, "padding: 0.2rem 0.5rem; background-color: #454545;");
    }

    total();
};

//Define the shared properties and methods using the prototype
Person.prototype.details = function () {
    return console.log("Id: " + this._id + "\nNombre: " + this._name + "\nEdad: " + this._age + "\nGénero: " + this._gender);
}


console.group("%cPerson", "padding: 0.2rem 0.5rem; background-color: #5E7489;");
//----
console.log(Person.prototype); // retorna el objeto en si
console.log(typeof Person.prototype); // retorna el tipo de dato (Objeto)
//----
var person1 = new Person("Alex", 32, "masculino");
person1.details();
//----
var person2 = new Person("Miguel", 45, "masculino");
person2.details();
//----
// Comprueba si un objeto se encuentra en la cadena de prototipado de otro.
console.log("Person.prototype === person1.__proto__", Person.prototype === person1.__proto__); // true
console.log("Person.prototype.isPrototypeOf(person1)", Person.prototype.isPrototypeOf(person1)); // true
console.log("Person.prototype === person2.__proto__", Person.prototype === person2.__proto__); // true
console.log("person1.__proto__ === person2.__proto__", person1.__proto__ === person2.__proto__); // true
//----
// Retorna una referencia a la función del Object que creó el objeto de la instancia
console.log("Person.prototype.constructor", Person.prototype.constructor); // retorna la funcion constructor (el objeto en si)
console.log("person1.constructor", person1.constructor); // retorna la funcion constructor del objeto person1 que es compartido por el objeto Person
//----
// Crea un objeto nuevo, utilizando un objeto existente como el prototipo del nuevo objeto creado.
var cloneObjetoPerson = Object.create(Person);
cloneObjetoPerson.name = "Noelia";
cloneObjetoPerson.age = 22;
cloneObjetoPerson.gender = "femenino";
console.log("cloneObjetoPerson", cloneObjetoPerson);
//----
// Devuelve una cadena que representa al objeto.
console.log("person2.toString()", person2.toString()); // Si llama al método toString en el objeto personalizado, devuelve el valor predeterminado heredado de Object
// Se puede sobreescribir el methodo toString();
Person.prototype.toString = function () {
    return this._name + " es un ser humano";
}
console.log("person2.toString()", person2.toString());
//----
console.groupEnd();




/**
 * @class Student
 * @param {String} course 
 * @param {Number} group 
 */
// ECMA5
function Student(course, group) {
    this._course = course;
    this._group = group;
    this._register = function () {
        return console.log("Curso: " + this._course + "\nGrupo: " + this._group);
    };
    this._register();
};

console.group("%cStudent", "padding: 0.2rem 0.5rem; background-color: #7A7959;");
//----
var student1 = new Person("Beatriz", 26, "femenino");
student1.details();
student1.prototype = new Student("Master Fullstack de Javascript y node.js", 1);
//----
var student2 = new Person("Sara", 20, "femenino");
student2.details();
student2.prototype = new Student("Máster en UX, diseño de producto digital e interfaces", 3);
//----
// not working
// student2.prototype._course = "Máster en UX, diseño de producto digital e interfaces";
// student2._group = 3; -> no se puede acceder a una propiedad que ha sido creada dentro con this
// student2.__proto__._group = 3; -> no se puede acceder a una propiedad que ha sido creada dentro con this
//----
student2.job = false;
console.log("student2", student2);
//----
console.groupEnd();




/**
 * @class Professor
 * @param {String} subject
 * @param {Number} level
 */
// ECMA5
var professor = function (subject, level) {
    this._subject = subject;
    this._level = level || 0;
    this._assing = function () {
        return console.log("Asignatura: " + this._subject + "\nNivel: " + this._level);
    };

    this._assing();
};

console.group("%cProfessor", "padding: 0.2rem 0.5rem; background-color: #597A5F;");
//----
var professor1 = new Person("Ulises Gascón", 34, "masculino");
professor1.details();
professor1.prototype = new professor("Javascript", 1);
//----
var professor2 = new Person("Mike Nøah", 30, "masculino");
professor2.details();
professor2.prototype = new professor("Diseño de productos digitales", 4);
//----
console.groupEnd();