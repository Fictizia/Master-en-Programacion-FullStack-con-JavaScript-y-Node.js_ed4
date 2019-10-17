![shieldsIO](https://img.shields.io/github/issues/Fictizia/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed3.svg)
![shieldsIO](https://img.shields.io/github/forks/Fictizia/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed3.svg)
![shieldsIO](https://img.shields.io/github/stars/Fictizia/Master-en-Programacion-FullStack-con-JavaScript-y-Node.js_ed3.svg)

![WideImg](http://fictizia.com/img/github/Fictizia-plan-estudios-github.jpg)

# Máster en Programación FullStack con JavaScript y Node.js
### JS, Node.js, Frontend, Backend, Firebase, Express, Patrones, HTML5_APIs, Asincronía, Websockets, Testing

## Clase 7

### While

- Estructura:
    ```javascript
    /*  --while--
    while (-Condición-) {
        -Instrucciones-
    };
    */
    ```

- Documentación:
    - [While en w3schools](http://www.w3schools.com/js/js_loop_while.asp)
    - [While en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)

- Bucle infinito:
    Este es un error muy común.

    ```javascript
    while (true) {
        console.log("Este texto se imprime hasta el infinito...");
    };
    ```

- Bucle que no se ejecutará:
    ```javascript
    while (false) {
        console.log("Este texto jamas se imprimirá...");
    };
    ```

- Ejemplo:
    ```javascript
    var control = 1;
    while (control <= 10) {
        console.log(control);
        control++;
    };
    ```


### For

- Estructura for clásico:
    ```javascript
    /*  --for--
    for (-Expresión inicial-; -Condición-; -Expresión Actualización-) {
        -Instrucciones-
    };
    */
    ```
- Estructura for/in:
    ```javascript
    /*  --for/in--
	for (-variable local- in -objeto iterable-) {
		-Instrucciones-
	}
    */
    ```

- Estructura for/of:
    ```javascript
    /*  --for/of--
	for (-variable local- of -secuencia iterable-) {
		-Instrucciones-
	}
    */
    ```

- Documentación:
    - [For en w3schools](http://www.w3schools.com/js/js_loop_for.asp)
    - [For en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
    - [Dominando el rendimiento](https://web.archive.org/web/20141205235948/https://blogs.oracle.com/greimer/entry/best_way_to_code_a)


- Ejemplo for clásico:
    ```javascript
    for (var i = 0; i < 10; i++) {
        console.log(i);
    }
    ```

- Ejemplo for/in:
    ```javascript
	var persona = {nombre:"Pepe", apellidos:"Perez", edad:25};

	var texto = "";
	for (var x in persona) {
	  texto += persona[x];
	}
	console.log(texto);
    ```

- Ejemplo for/of:
    ```javascript
	var frutas = ['Patatas', 'Pescado', 'Naranjas'];
	for (var producto of frutas) {
	  console.log("Producto: "+producto);
	}
    ```

### Do... While

- Estructura:
    ```javascript
    /* --Do...while--
    do{
       -Instrucciones-
    } while (-Condición-);
    */
    ```

- Documentación:
    - [Do... While en w3schools](http://www.w3schools.com/js/js_loop_while.asp)
    - [Do... While en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)

- Ejemplo:
    ```javascript
    var i = 0;
    do {
       i++;
       console.log(i);
   } while (i < 10);
    ```

- Al menos se ejecutará una vez, aunque la premisa no sea verdadera.

    ```javascript
    do{
       console.warn("me ejecuto")
    } while (false);
    ```

### Break y Continue

- *Continue* nos permite saltar parte del bucle.
```javascript
for (var i = 0; i < 10; i++) {
    
    // Salta el 5 y sigue...
    if (i === 5) { 
    	continue; 
    }
    
    console.log("El valor de i es "+i);
}
```

- *Break* nos permite salir del bucle.
```javascript
for (var i = 0; i < 10; i++) {
    
    // Llega a 5 y sale.
    if (i === 5) { 
    	break; 
    }
    
    console.log("El valor de i es "+i);
}
```

### Usos Avanzados

- Ejemplo usando decrecimiento:
    ```javascript
    for (var i = 10; i > 0; i--) {
        console.log(i);
    }    
    ```

- Ejemplo usando varios contadores:
    ```javascript
    for (var i = 0, x = 1, z = 2, tope = 10; i <= tope; x *= z, i++ ) {
        console.log("i vale "+i+", x vale "+x+", z vale "+z);
    }
    ```

### Ejercicios

Realiza los siguientes ejercicios usando en cada uno los tres tipos de bucles (Do...While, For, While )

**1 -** `Nivel Medio` :spades: Diseña un algoritmo para identificar a los clientes autorizados a entrar a nuestro sistema.
- Características:
	- La palabra clave es "Fictizia mola mucho"
	- Solo existen tres intentos
	- Si se pasan los tres intentos. Se despliega un mensaje informativo.

- Usando *for*
```javascript
	// Solución aquí
```

- Usando *while* y *break*
```javascript
	//Solución aquí
```

- Usando *Do...While*
```javascript
	// Solución aquí
```


**2 -** Diseña un algoritmo que imprima los numeros del 1 al 100.

- Usando *for*
```javascript
	// Solución aquí
```

- Usando *while*
```javascript
	// Solución aquí
```

- Usando *Do...While*
```javascript
	// Solución aquí
```


**3 -** Diseña un algoritmo que imprima los numeros del 100 al 0.

- Usando *for*
```javascript
	// Solución aquí
```

- Usando *while*
```javascript
	// Solución aquí
```

- Usando *Do...While*
```javascript
	// Solución aquí
```


**4 -** Diseña un algoritmo que imprima los numeros pares entre 0 y 100.

- Usando *for*
```javascript
	// Solución aquí
```

- Usando *while*
```javascript
	// Solución aquí
```

- Usando *Do...While*
```javascript
	// Solución aquí
```

**5 -** Diseña un algoritmo que imprima los números impares entre un número dado por el usuario y los siguientes 50 números.

- Usando *for* (desestructurado)
```javascript
	// Solución aquí
```

- Usando *while*
```javascript
	// Solución aquí
```

- Usando *Do...While*
```javascript
	// Solución aquí
```

**6 -** Diseña un algoritmo que imprima la suma de los 50 primeros numeros pares y el total de números impares partiendo de un número dado por el usuario
- Usando *for*
```javascript
	// Solución aquí
```

- Usando *while*
```javascript
	// Solución aquí
```

- Usando *Do...While*
```javascript
	// Solución aquí
```

**7 -** `Nivel Avanzado` :diamonds: Diseña un algoritmo introducido un numero y pasarlo a número romanos.
- Esperamos que el número sea menor de 50

![numeros_romanos](../assets/clase7/9460c638-b45e-4e83-bc57-329520115601.jpeg)

- Usando *for*
```javascript
	// Solución aquí
```

- Usando *while*
```javascript
	// Solución aquí
```

- Usando *Do...While*
```javascript
	// Solución aquí
```

**8 -** Hacer uso de for...in para sacar mensajes como este:

> Ejemplo de salida:
> Nombre: Jason Nissen, Apellidos: jasonnissen, puesto:1
```javascript
//Ejemplo array de 3 objetos JSON:
var clase =
[	{"name":"Jason Nissen","username":"jasonnissen","puesto":1},
	{"name":"Chris Rouw","username":"chrisrouw","puesto":3},
	{"name":"Chad Feldmann","username":"cfeldmann","puesto":2}];
```


