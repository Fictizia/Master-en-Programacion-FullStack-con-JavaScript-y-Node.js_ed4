// 5 - Crea una tabla usando la consola para mostrar el nombre de tus compañeros
// y el puesto que ocupa en la clase.

function mostrar_tabla_compis () {
    let compis = [
        {nombre: "Juan",    puesto: "alante izquierda"},
        {nombre: "Joaquin", puesto: "alante izquierda"},
        {nombre: "Aurora",  puesto: "alante derecha"},
        {nombre: "Pedro",   puesto: "alante derecha"},
        
        {nombre: "Emilio", puesto: "detras izquierda"},
        {nombre: "Miguel", puesto: "detras izquierda"},
        {nombre: "Ronald", puesto: "detras derecha"},
        {nombre: "Bea",    puesto: "detras derecha"}        
    ]
    console.table(compis);
}

mostrar_tabla_compis();

