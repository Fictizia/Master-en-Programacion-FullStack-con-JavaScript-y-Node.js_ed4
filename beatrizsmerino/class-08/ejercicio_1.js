// Diseña un algoritmo que simula el lanzamiento de una moneda al aire e imprimir si ha salido cara o cruz.

function coins(){
    var coin = Math.floor(Math.random() * (2 - 0)) + 0;
    console.log(coin);

    if(coin === 0){
        console.log("ha salido cara");
    }else{
        console.log("ha salido cruz");
    }
}

coins();