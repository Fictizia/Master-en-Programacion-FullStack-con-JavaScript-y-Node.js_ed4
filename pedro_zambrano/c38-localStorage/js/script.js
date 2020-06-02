document.getElementById("save").addEventListener('click', save);
document.getElementById("delete").addEventListener('click', deleteOne)
document.getElementById("deleteAll").addEventListener('click', deleteAll);

function save() {
    var name = document.getElementById('nameForm').value;
    var tlf = document.getElementById("tlf").value;

    if(name != '' && tlf != '') {
        var user = {
            name: name,
            tlf: tlf
        };

        localStorage.setItem(name, JSON.stringify(user));
        oneUser(name, tlf);    

        document.getElementById('nameForm').value = '';     
        document.getElementById("tlf").value = '';      
        printUsers();                   
    } else {
        alert("Completa los campos.");
    }
}

function deleteOne() {
    let name = document.getElementById('nameForm').value;
    if(name !== '') {
        localStorage.removeItem(name);
        printUsers();
    }
}

function deleteAll() {
    localStorage.clear();
    printUsers();
}


function printUsers() {
    if(localStorage.length === 0){
        document.getElementById('users').innerHTML = 'No hay usuarios.';
    } else {
        document.getElementById('users').innerHTML = '';
        for ( var i = 0; i < localStorage.length; i++ ) {
            let data = localStorage.getItem(localStorage.key(i));
            if(JSON.parse(data != null)){
                let name = JSON.parse(data).name;
                let tlf = JSON.parse(data).tlf;
                oneUser(name, tlf);
            }
        }
    }
}        

function oneUser(name, tlf) {
    document.getElementById('users').innerHTML +=   `<div class="col-12 card p-2">
                                                        <div class="row">
                                                            <span class="col-6 pl-4 font-weight-bold">${name}</span> 
                                                            <span class="col-5 badge badge-primary">${tlf}</span> 
                                                        </div>
                                                    </div>`;
}

printUsers();

//Boton recuperar pendiente