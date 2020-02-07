// Diseña un algoritmo que simula cien tiradas de dos dados y contar las veces que entre los dos suman 10.



function dados(){
    var numTiradas = 0;
    var contador = 0;

    for(var i = 0; i<100; i++){
        var dado1 = Math.floor(Math.random() * (7 - 1) + 1);
        var dado2 = Math.floor(Math.random() * (7 - 1) + 1);
        var sumaDados = dado1+dado2;
        numTiradas++;

        if(sumaDados === 10){
            console.group("%cTirada " + i + ": " + sumaDados, "padding: 0.1rem 0.5rem; background-color: #454545; color: #fefefe;;");
            console.log("%cDado 1: " + dado1, "padding: 0.1rem 0.5rem; background-color: #6e0000; color: #fefefe;");
            console.log("%cDado 2: " + dado2, "padding: 0.1rem 0.5rem; background-color: #00006e; color: #fefefe;");
            console.groupEnd("Tirada");
            contador++;
        }
    }

    console.log("Numero de tiradas: " + i);
}

dados();