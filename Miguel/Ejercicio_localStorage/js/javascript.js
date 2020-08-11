//Ejercicio LocalStorage
//Evento crear y guardar contacto.
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click",function(){
  let clave =  document.getElementById("textBox1").value;
  if(!/^[A-Za-z]{3,10}$/.test(clave)) {
    console.warn("El nombre introducido no es valido")
    return
  }

  let tlf = document.getElementById("textBox2").value;
  if (!/^[0-9]{9}$/.test(tlf)) {
    console.warn("El telefono introducido no es valido")
    return
  }

  let mail = document.getElementById("textBox3").value;  
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    console.warn("El email introducido no es valido")
    return
  }

  if(clave && tlf && mail){
    let coincidencias = false;
    for(let i in localStorage){    
      if(`Contacto-${clave}` == i){
        coincidencias = true;
      }; 
    };
    if(coincidencias == false){
      let avatar = `https://api.adorable.io/avatars/150/${clave}.png`;
      let contacto = {Telefono:tlf,Correo:mail,Avatar:avatar};
      localStorage.setItem(`Contacto-${clave}`, JSON.stringify(contacto));
      console.log(`Nuevo contacto guardado => Nombre: ${clave}   Tlf: ${contacto.Telefono}   Correo: ${contacto.Correo}`);
      pintarContactos();
    }else{
      console.warn(`Error, el contacto ${clave} ya existe. Prueba con otro nombre.`);
    };
  }else{
    console.warn("Error, es necesario rellenar todos los campos => (Nombre/Movil/Correo)");
  };
});

//Recuperar datos de un contacto
const btn2 = document.getElementById("btn2");
btn2.addEventListener("click",function(){
  let clave = document.getElementById("textBox1").value;
  for(let i in localStorage){    
    if(`Contacto-${clave}` == i){
      let coincidencia = JSON.parse(localStorage[i]);
      document.getElementById(`textBox2`).value = coincidencia.Telefono;
      document.getElementById(`textBox3`).value = coincidencia.Correo;
    }; 
  };
});

//Eliminar contacto
const btn3 = document.getElementById("btn3");
btn3.addEventListener("click",function(){
  let clave = document.getElementById("textBox1").value;
  let coincidencias = false;
  for(let i in localStorage){    
    if(`Contacto-${clave}` == i ){
      coincidencias = true;
    }; 
  };
  if(coincidencias){
    let confirmacion = confirm(`¿Seguro que quieres borrar a ${clave} de tu lista de contactos?`);
    if(confirmacion){
      document.getElementById(`Contacto-${clave}`).remove();
      console.log(`El contacto "${clave}" fue borrado de tu lista.`)
      return localStorage.removeItem(`Contacto-${clave}`); 
    };          
  }else{
    console.warn(`No existe ${clave} en tu lista de contactos.`);
  };
});

//Vaciar la lista de contactos.
const btn4 = document.getElementById("btn4");
btn4.addEventListener("click",function(){
  let confirmacion = confirm(`¿Seguro que quieres eliminar todos los contactos de tu lista?`);
  if(confirmacion){
    document.getElementById("resultado").innerHTML = "";
    console.log("Toda tu lista de contactos fue borrada.")
    return localStorage.clear(); 
  };          
});

//Función para pintar la lista de contactos en el html.
function pintarContactos(){  
  document.getElementById("resultado").innerHTML = "";
  for(let i in localStorage){
    if(i.slice(0,8) == "Contacto"){ 
      let contacto = JSON.parse(localStorage[i]);
      let resultado = document.getElementById("resultado");
      let tarjetaContacto = `<div id=${i}><img src=${contacto.Avatar}><p>${i.slice(9)}</br>Tlf: ${contacto.Telefono}</br>Correo: ${contacto.Correo}</p></div>`;      
      resultado.innerHTML += tarjetaContacto;
    };   
  };
};
pintarContactos();