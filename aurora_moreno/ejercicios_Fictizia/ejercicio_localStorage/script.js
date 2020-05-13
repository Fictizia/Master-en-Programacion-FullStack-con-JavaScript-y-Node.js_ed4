document.getElementById('save').addEventListener("click", function () {
    var nombre = document.getElementById('nameBox').value;
    var phone = document.getElementById('phoneBox').value;




    if (localStorage.getItem(nombre) !== nombre) {

        localStorage.setItem(nombre, nombre);
        localStorage.setItem(phone, phone);

        var nombres = document.createElement("h4");
        nombres.innerText = nombre;

        document.getElementById('nombres').appendChild(nombres);

        var telefonos = document.createElement("h4");
        telefonos.innerText = phone;

        document.getElementById('telefonos').appendChild(telefonos);


    }

    else {

        console.log("Ese usuario ya existe");


    }




    if (controlador === true) {

    }


})


document.getElementById('clearAll').addEventListener("click", function () {

    localStorage.clear();


})
