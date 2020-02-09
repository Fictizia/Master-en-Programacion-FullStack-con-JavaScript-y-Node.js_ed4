// 4 - Agrupa cada tipo de mensaje y añade un contador de tiempo por cada grupo.

    // 3 - Partiendo del ejercicio anterior mejora los estilos de cada mensaje usando estilos.

        // 2 - Crea un script que nos permita calcular el tiempo que se necesita para realizar 
        // las siguientes acciones.

        // Especificaciones:
        // Imprimir tu nombre usando console.log, console.info, console.warn

function agrupar_por_tipo_mensaje () {
    console.time('Tiempo total');
        console.time('Tiempo console log');
            console.group('Grupo console log');
                console.log('%cJoaquin', 'font-family: Arial; font-weight: bold');
            console.groupEnd();    
        console.timeEnd('Tiempo console log');
        
        console.time('Tiempo console info');
            console.group('Grupo console info');
                console.info('%cJoaquin', 'background: cyan');
            console.groupEnd();    
        console.timeEnd('Tiempo console info');
        
        console.time('Tiempo console warn');
            console.group('Grupo console warn');
                console.warn('%cJoaquin', 'background: red; color: white; font-weight: bold; font-size: 16px');
            console.groupEnd();    
        console.timeEnd('Tiempo console warn');
        
    console.timeEnd('Tiempo total');
}

agrupar_por_tipo_mensaje();