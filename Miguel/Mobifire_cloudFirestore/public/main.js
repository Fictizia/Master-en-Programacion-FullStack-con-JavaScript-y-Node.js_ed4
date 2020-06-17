// JS para la vista cliente

const search = document.getElementById('getFilm');
const details = document.getElementById('getDetails');
const deleteFilm = document.getElementById('deleteFilm');
const updateName = document.getElementById('updateName');


search.addEventListener('click', () => {
  try{
    const name = document.getElementById('name');
    window.location.href = 'create/' + name.value;
  }
  catch(err){
    console.error(err)
  }
})

details.addEventListener('click', () => {
  try{
    const name = document.getElementById('name');
    window.location.href = 'film/' + name.value;
  }
  catch(err){
    console.error(err)
  }
})

deleteFilm.addEventListener('click', (() => {
  try{
    const name = document.getElementById('name').value;
    var allow = confirm(`¿Seguro que quieres borrar la pelicula ${name}?`);
    if(allow){
      postDelete(name);
    }
  }
  catch(err){
    console.error(err)
  }
}))

updateName.addEventListener('click', () => {
  try{
    const name = document.getElementById('name');
    var newName = prompt(`Actualiza el nombre de ${name.value} a:`);
    if(newName){
      postUpdate(name.value, newName);
    }
  }
  catch(err){
    console.error(err)
  }
})


function postDelete(name) {
  var xhr = new XMLHttpRequest();
  var url = `${window.location}film/${name}/delete`;
  xhr.open('POST', url, true);
  xhr.send();
}

function postUpdate(id, newName){
  var xhr = new XMLHttpRequest();
  var url = `${window.location}film/${id}/update`;
  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`name=${newName}`); 
}
