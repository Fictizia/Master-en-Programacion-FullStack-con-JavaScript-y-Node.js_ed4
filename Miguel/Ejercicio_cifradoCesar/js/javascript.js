//Cifrado Cesar.
function cesar(){
  var resultado = "";
  var textAndMove = getTextAndMove();
  var validacion = validar(textAndMove[0],textAndMove[1]);
  if(validacion == true){
    let txtSplit = textAndMove[0].split("");
    let move = textAndMove[1];
    txtSplit.forEach(element => {
      if(element != " " && element === element.toUpperCase()){
        var startIndex = element.charCodeAt();
        if(startIndex + move > 90 ){
          var startIndex = startIndex - 26;
        }
        let elementEncrypt = String.fromCharCode(startIndex + move);
        resultado += elementEncrypt;
      }else if(element != " " && element === element.toLowerCase()){  
        var startIndex = element.charCodeAt();
        if(startIndex + move > 122){
          var startIndex = startIndex - 26;
        }
        let elementEncrypt = String.fromCharCode(startIndex + move);
        resultado += elementEncrypt;
      }else{
        resultado += element;
      };    
    });
    document.getElementById("resultado").innerText = resultado;
  }else{
    throw new Error("Solo se puede introducir letras mayúsculas o minúsculas(excluidas 'ñ' y 'Ñ')en el texto y únicamente números del 1 al 9 en el desplazamiento");
  }
};
//Listener al boton.
document.getElementById("btn").addEventListener("click",cesar);

//Funcion para obtener texto y movimiento.
function getTextAndMove(){
  let content = document.getElementById("textBox").value;
  if(content.indexOf(",") != -1){
    var txt = content.split(",")[0];
    var move = parseInt(content.split(",")[1]);
  }else{
    var txt = content;
    var move = 1;
  }
  return [txt,move];
}
//Funcion para validar input.
function validar(txt,move){
  const patronTxt = /^[A-Z,a-z]+$/;
  const patronNum = /^[1-9]$/;
  if(patronTxt.test(txt) && patronNum.test(move)){
    return true;
  }
};