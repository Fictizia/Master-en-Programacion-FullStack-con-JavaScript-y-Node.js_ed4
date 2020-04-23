//REG EXP nº1 => Valida correos.
const patron1 = /^[A-Za-z]+[A-Za-z0-9-_]*@\w+\.[A-Za-z]+\.*[A-Za-z]*\.*[A-Za-z]*/;
var arrCorreos = ["demo@demo.com", "demo_demo@demo.com.ar", "demo-demo12312@sub.dom.com.ar", "demo@novalido", "novalido>@demo.com", "demo@novalido-.com", "demo@-novalido.com"];
function validarCorreos(arr){
  console.log("***********************");
  for(let i of arr){
    if(patron1.test(i)){
      console.log("Correo valido: " + i);
    }
  }
  console.log("***********************");
};
validarCorreos(arrCorreos);

//REG EXP nº2 => Valida DNI.
const patron2 = /\d{8}-?[A-Z]$/;
var arrDni = ["12345678-A", "11223344A", "A11223344", "1234567K"];
function validarDni(arr){
  for(let i of arr){
    if(patron2.test(i)){
      console.log("DNI valido: " + i);
    }
  }
  console.log("***********************");
};
validarDni(arrDni);

//REG EXP nº3 => Valida NIE.
const patron3 = /^[XYZ]-?\d{7}-?[A-Z]$/;
var arrNie = ["X-1234567-A", "X1234567A", "Z1234567M","X-1233456", "1234567"];
function validarNie(arr){
  for(let i of arr){
    if(patron3.test(i)){
      console.log("NIE valido: " + i);
    }
  }
  console.log("***********************");
};
validarNie(arrNie);

//REG EXP nº4 => Empieza con 4 números pares, seguido de una "@", seguido de tres letras mayúsculas o minúsculas, seguido de un punto y terminado en los mismos cuatro digitos con los que empezó.(Ejemplo para referenciadores)
const patron4 = /^([2468]{4})@[A-Za-z]{3}\.\1$/;
const arr4 = ["2424@AAA.2424","8468@aAa.8468","6666@aaa.6666","1234@AAA.1234","2222@aaa.4444","2222@2222"];
function validarPatron4(arr){
  for(let i of arr){
    if(patron4.test(i)){
      console.log(i);
    }
  }
  console.log("***********************");
};
validarPatron4(arr4);

//REG EXP nº5 => Comprobar seguridad de una contraseña.
const patron5 = /^(?=[\w|\W]*\d)(?=[\w|\W]*[@#$%])(?=[\w|\W]*[A-Z])(?=[\w|\W]*[a-z])\S{6,20}$/;
function validarContraseña(){
  let contraseña = document.getElementById("textBox").value;
  if(patron5.test(contraseña)){
    alert(`La contraseña ${contraseña} es segura.`);
  }else{
    alert(`La contraseña "${contraseña}" no es segura, introduce una contraseña que cumpla las siguientes condiciones:
    =>Debe contener como mínimo<=
    -Una mayúscula.
    -Una minúscula.
    -Un carácter numérico.
    -Un carácter especial (@#%$).
    -De 8 a 20 caracteres.
    -No puede incluir espacion.`)
  }
}
document.getElementById("btn").addEventListener("click",validarContraseña);