// 3 - Partiendo del ejercicio anterior mejora los estilos de cada mensaje usando estilos.

    // 2 - Crea un script que nos permita calcular el tiempo que se necesita para realizar 
    // las siguientes acciones.

    // Especificaciones:
    // Imprimir tu nombre usando console.log, console.info, console.warn

function calcular_tiempo_con_estilo () {
    console.time();
    console.log('%cJoaquin', 'font-family: Arial; font-weight: bold');
    console.info('%cJoaquin', 'background: cyan');
    console.warn('%cJoaquin', 'background: red; color: white; font-weight: bold; font-size: 16px');
    console.timeEnd();
}

calcular_tiempo_con_estilo();