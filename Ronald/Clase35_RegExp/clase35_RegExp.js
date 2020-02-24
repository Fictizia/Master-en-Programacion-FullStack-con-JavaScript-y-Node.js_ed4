


/*
Para el email:
^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[^-<>]@[^-<>][a-zA-Z0-9-]+[^-<>]\.(?:[a-zA-Z0-9.]+)*$
  Esta parte permite escribir cualquier cosa excepto un -<>. 
                      entraría un @ obligatorio
                                           no permitiría seguir con -<>
                                                         necesitaria cualqier dato alfanumerico
                                                               entraría un punto obligatori y mas puntos opciones si van acompañados de campos alfanumericos


Para el DNI:
\b[0-9]{8}-?[A-Z]{1}   [0-9]{8}Permite encontrar exactamente 8 digitos del 0 al 9
                        -? permite encontar un guión opcional, + significa que lo encuentra 0 o 1 vez
                        [A-Z]{1} permite encontrar 1 sola letra de la A-Z
                        \b permite que empieze a contrar las restricciones desde el principio de la palabra o string, sino saldría valida un numero de mas de 8cifras ya que empezaria a contar las ultimas 8 antes  del guion y letra.

Para el NIE: 
se añade simplemente el digito de control y la necesidad de ser 7 digitos en lugar de 8, se explica mas adelante.


Para la contraseña:
^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%&])\S{6,20}$     ^inicio del string $fin del string
                                                            (patron) me irá valorando que se cumpla cada paton, (digitos), (letra mayuscula), (letra minucula), (caracter especial)
                                                            \S hace que se cuenten solo los caracteres sin espacios en blanco para así poder contar todo el string entre 6 y 20 caracteres
*/




//Sacaré primero todos las validaciones por consola, para una lectura rapida de los resultados:

//"RECONOCIMIENTO DEL EMAIL"
let listaEmails = [
    "demo@demo.com", 
    "demo_demo@demo.com.ar",
    "demo-demo12312@sub.dom.com.ar",
    "demo@novalido", 
    "novalido>@demo.com", 
    "demo@novalido-.com", 
    "demo@-novalido.com"	
];

let expresion1 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[^-<>]@[^-<>][a-zA-Z0-9-]+[^-<>]\.(?:[a-zA-Z0-9.]+)*$/;

for (i = 0; i < listaEmails.length; i++) {
	let email = listaEmails[i];
	let aprobado = expresion1.test(email);

	if (aprobado) { //si da true
		console.log('Correo aprobado: '+ email);
    }
    else {
        console.log("Correo rechazado: "+ email);
    }
}

//"RECONOCIMIENTO DEL DNI"

let listaDni = [
    "12345678-A", 
    "11223344A" ,
    "A11223344" ,
    "1234567K" ,
    "515162778888A",
    "12345678",
    "123-AAAAAA"   
];

let expresion2 = /\b[0-9]{8}-?[A-Z]{1}/;

for (i = 0; i < listaDni.length; i++) {
	let dni = listaDni[i];
	let aprobado = expresion2.test(dni);

	if (aprobado) {
		console.log('DNI aprobado: '+ dni);
    }
    else {
        console.log("DNI rechazado: "+ dni);
    }
};

//"RECONOCIMIENTO DEL NIE"

let listaNIE = [
    "12345678-A", 
    "X-1234567-A" ,
    "A-1234567-B" ,
    "1234567K" ,
    "515162778888A",
    "Y-1234567-F",
    "123-AAAAAA",
    "Z-1234567-B",
    "X1234567B",   
];

let expresion3 = /\b(X|Y|Z)-?[0-9]{7}-?[A-Z]{1}/;  //se añade el digito de control que puede ser X o Y o Z pero ninguna letra diferente a esas 3.
                                                  //así mismo ahora tienen que validarse 7 numero , ya no 8 como en el DNI

for (i = 0; i < listaNIE.length; i++) {
	let nie = listaNIE[i];
	let aprobado = expresion3.test(nie);

	if (aprobado) {
		console.log('NIE aprobado: '+ nie);
    }
    else {
        console.log("NIE rechazado: "+ nie);
    }
};


//"VALIDACION DE UNA CONTRASEÑA"

let listaContraseña = [
    "elpapichulo",
    "jennylachoni17",
    "JoseMaquinon1986",
    "elColetaPodemita666%",
    "monederoysupandadeVenezuela"
];

let expresion4 = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%&])\S{6,20}$/;

for (i = 0; i < listaContraseña.length; i++) {
	let contraseña = listaContraseña[i];
	let aprobado = expresion4.test(contraseña);

	if (aprobado) {  //si da true
		console.log('contraseña aprobada: '+ contraseña);
    }
    else {
        console.log("contraseña rechazada: "+ contraseña);
    }
}



//ahora el código que ejecuta los inputs del HTML y permite la entrada de datos.


//"RECONOCIMIENTO DEL EMAIL"
document.getElementById("envioEmail").addEventListener("click", function(){
    
    let expresion1 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[^-<>]@[^-<>][a-zA-Z0-9-]+[^-<>]\.(?:[a-zA-Z0-9.]+)*$/;
    let email = document.getElementById("email").value;
    let aprobado = expresion1.test(email);
    if (aprobado) {
        document.getElementById("resultadoEmail").innerHTML = "Correo aprobado :"+email;    
    }
    else {
        document.getElementById("resultadoEmail").innerHTML = "Correo rechazado :"+email;
    }
}); 

//"RECONOCIMIENTO DEL DNI"
document.getElementById("envioDNI").addEventListener("click", function(){
    
    let expresion2 = /\b[0-9]{8}-?[A-Z]{1}/;
    let dni = document.getElementById("dni").value;
    let aprobado = expresion2.test(dni);
    if (aprobado) {
        document.getElementById("resultadoDNI").innerHTML = "DNI aprobado :"+dni;    
    }
    else {
        document.getElementById("resultadoDNI").innerHTML = "DNI rechazado :"+dni;
    }
}); 

//"RECONOCIMIENTO DEL NIE"
document.getElementById("envioNIE").addEventListener("click", function(){
    
    let expresion3 = /\b(X|Y|Z)-?[0-9]{7}-?[A-Z]{1}/;
    let nie = document.getElementById("nie").value;
    let aprobado = expresion3.test(nie);
    if (aprobado) {
        document.getElementById("resultadoNIE").innerHTML = "NIE aprobado :"+nie;    
    }
    else {
        document.getElementById("resultadoNIE").innerHTML = "NIE rechazado :"+nie;
    }
}); 


//"VALIDACION DE CONTRASEÑA"
document.getElementById("envioContraseña").addEventListener("click", function(){
    
    let expresion4 = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%&])\S{6,20}$/;
    let contraseña = document.getElementById("contraseña").value;
    let aprobado = expresion4.test(contraseña);
    if (aprobado) {
        document.getElementById("resultadoContraseña").innerHTML = "Contraseña aprobada :"+contraseña;    
    }
    else {
        document.getElementById("resultadoContraseña").innerHTML = "Contraseña rechazada :"+contraseña;
    }
}); 

//Validacion contraseña, para la que escriba el cliente:
document.getElementById("envioContraseña2").addEventListener("click", function(){
    
    let expresion5 = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%&])\S{6,20}$/;
    let contraseña2 = document.getElementById("contraseña2").value;
    let aprobado = expresion5.test(contraseña2);
    if (aprobado) {
        document.getElementById("resultadoContraseña2").innerHTML = "Contraseña aprobada :"+contraseña2;    
    }
    else {
        document.getElementById("resultadoContraseña2").innerHTML = "Contraseña rechazada :"+contraseña2;
    }
}); 



