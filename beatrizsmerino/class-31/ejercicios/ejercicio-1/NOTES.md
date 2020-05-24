[https://medium.com/better-programming/prototypes-in-javascript-5bba2990e04b](https://medium.com/better-programming/prototypes-in-javascript-5bba2990e04b)

Cuando se crea una funcion (en este caso seria como una clase), el motor de javascript le agrega la propiedad prototype. Un objeto que por defecto tiene dentro una funcion constructor() que apunta de nuevo a la propiedad prototype de la funcion.

Cuando se crea el objeto (instanciar el objeto) se agrega en el la propiedad **proto** o dunder proto, que apunta a la funcion constructor() del objeto prototype.

El objeto prototipo de la función constructora se comparte entre todos los objetos creados utilizando la función constructora.

Como el objeto prototype es de tipo objeto se le pueden adjuntar propiedades y metodos, que son compartidos con la funcion constructor().

```
Person.prototype.name = "Bea";
Person.prototype["name"] = "Bea";
```

Cuando intentamos acceder a una propiedad de un objeto, los motores de JavaScript primero intentan encontrar la propiedad en el objeto, si la propiedad está presente en el objeto emite su valor. Sin embargo, si la propiedad no está presente en el objeto entonces se trata de encontrar la propiedad en el objeto prototipo o dunder proto del objeto. Si se encuentra la propiedad, se devuelve el valor; de lo contrario, el motor de JavaScript intenta encontrar la propiedad en el protocolo de protección del objeto. Esta cadena continúa hasta que la propiedad proto dunder es null. En estos casos, la salida será undefined.

Si se crea la funcion (clase) vacia y desde fuera se van agregando propiedades y metodos y se instancian objetos de esa funcion, estos compartiran los valores de las propiedades y metodos. Para solucionar esto los metodos y las prpiedades se crean dentro de la funcion con la parabra resevada this.

Los prototipos son un conjunto de normas para integrar Programación Orientada a Objetos en JavaScript. Entonces, siguiendo estas reglas nosotros debemos ser capaces de crear las distintas metodologías de la Orientación a Objetos: herencia, encapsulamiento, abstracción y polimorfismo. Su uso permite disponer de direfentes formas de crear objetos, tener herencia en las propiedades y metodos (constructores), lo que es muy util para encapsular y reutilizar codigo.
