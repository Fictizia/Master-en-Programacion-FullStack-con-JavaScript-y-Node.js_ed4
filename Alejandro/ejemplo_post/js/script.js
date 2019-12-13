function enviarForm(){
    alert("Se ha enviado");
    var pass = document.getElementById("pass").value;
    var user = document.getElementById("user").value;

    console.log("bienvenido "+user);

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://jsonplaceholder.typicode.com/posts');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        // "201 --> Código de registro creado"
        if (xhr.readyState == 4 && xhr.status === 201) {
            var respuesta = JSON.parse(xhr.responseText)
            console.log("respuesta:", respuesta);
            document.getElementById("resultado").innerHTML="Titulo: "+respuesta.title+", passsword: "+respuesta.body+", userId: "+respuesta.userId+"id remoto:"+respuesta.id;
        }   
    };
    // Estos son los datos que enviamos en el POST
    xhr.send(JSON.stringify({
        usuario: user,
        password: pass,
        userId: 123
    }));
}


document.getElementById("boton").addEventListener("click",enviarForm);