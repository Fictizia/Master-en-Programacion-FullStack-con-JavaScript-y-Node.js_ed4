document.getElementById("enviar").addEventListener("click", function(){
    let nombre = document.getElementById("usuario").value;
    console.log(nombre);
    let telefono = document.getElementById("telefono").value;
    console.log(telefono);
    let correo = document.getElementById("correo").value;
    console.log(correo);
    let usuario = {
        name : nombre,
        phone : telefono,
        email : correo,

    }
    
    localStorage.setItem(nombre, JSON.stringify(usuario) );
});


document.getElementById("recuperar").addEventListener("click",function(){
    
    let nombre = document.getElementById("usuario").value;
    document.getElementById("resultado").innerHTML = localStorage.getItem(nombre);
    
    
    let cajaAvatar= document.createElement("div");
    let avatar = document.createElement("img");
    cajaAvatar.appendChild(avatar);
    document.getElementById("resultado").appendChild(cajaAvatar);
    document.getElementsByTagName("img")[0].setAttribute("src", `https://api.adorable.io/avatars/70/${nombre}.png`);
    
});

document.getElementById("borrar").addEventListener("click",function(){
    
    let nombre = document.getElementById("usuario").value;


localStorage.removeItem(nombre);
document.getElementById("resultado").innerHTML = `El usuario ${nombre} ha sido borrado de la ageda de contactos`;
});


document.getElementById("mostrarTodos").addEventListener("click",function(){
    document.getElementById("resultado").innerHTML = "";
    for (let i=0; i<localStorage.length; i++){
        document.getElementById("resultado").innerHTML += `<br>${localStorage.getItem(localStorage.key(i))}`;
    }
});

document.getElementById("borrarTodos").addEventListener("click",function(){
    localStorage.clear();
    document.getElementById("resultado").innerHTML = `Han sido borrados todos los contactos de la agenda`;
});




