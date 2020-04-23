// 1 - Utiliza .assert para controlar cuando se muestra tu nombre por consola.
function validar_nombre (nombre) {
    nombre_clave = 'Joaquin';
    console.assert(nombre===nombre_clave, 'El nombre introducido no es correcto');
    return nombre;
}

validar_nombre('Ana');

validar_nombre('Joaquin');
