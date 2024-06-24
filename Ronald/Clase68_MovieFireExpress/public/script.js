// aqui el codigo para la vista cliente
const buscar = document.getElementById('getFilm');
buscar.addEventListener('click', ()=>{
    const name = document.getElementById('nombre').value.toLowerCase();
    window.location.href = '/create/'+name; //le redirecciono a la ruta del create
});


/*
const borrar = document.getElementById("delete");
borrar.addEventListener('click', ()=>{
    const nameDelete = document.getElementById('nombreEliminar').value;
    window.location.href = `/film/${nameDelete}/delete`; //le redirecciono a la ruta del delete
})
*/