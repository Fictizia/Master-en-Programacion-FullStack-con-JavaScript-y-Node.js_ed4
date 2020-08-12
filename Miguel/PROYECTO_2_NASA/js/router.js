//FRONT END ROUTER

/**
 * @file archivo con los scripts del router front de la aplicación
 */

 /**
 * Añadir listeners a los elementos del menú al cargar la applicación y renderizar la vista 'home' despues de terminar la animación
 */
window.addEventListener('load', () => {
  document.getElementById('home').addEventListener('click', e => {
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
  });
  document.getElementById('account').addEventListener('click', e => {
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
    accountListeners();
    firebaseUserList();
  });
  document.getElementById('data').addEventListener('click', e => {
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
    dataButtonsListeners();
  });
  setTimeout(() => {
    if(window.location.pathname == "/"){
      let id = "home";
      window.history.pushState({id}, id, `/${id}`);
      renderView(id);
    }
  }, 6100); 
});

/**
 *Función para añadir listeners a los botones de la vista de datos, estos actualizaran la ruta de la aplicacion, renderizaran la plantilla correspondiente y realizarán las diferentes llamadas a las APIs
 */
function dataButtonsListeners() {
  document.getElementById('pictureOfTheDay').addEventListener('click', function(e){
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `./data/${id}`);
    renderView(id);
    getImage(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  });
  document.getElementById('nearObjects').addEventListener('click', function(e){
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `./data/${id}`);
    renderView(id);
    getNearObjects(`https://api.nasa.gov/neo/rest/v1/feed?&api_key=${apiKey}`);
});
  document.getElementById('techTransfer').addEventListener('click', function(e){
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `./data/${id}`);
    renderView(id);
    getTechTransfer(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`);
  });
}

/**
 * Listener para los cambios de estado de la ruta y renderizado de las diferentes vistas al navegar por el historial
 */
window.onpopstate = function(e){
  if(e.state){
    let id = e.state.id;
    if(id == 'home'){
      renderView(id);
    }else if(id == 'account'){
      (async function (){
        await renderView(id);
        accountListeners();
        firebaseUserList();
      })();
    }else if(id == 'data'){
      (async function (){
        await renderView(id);
        dataButtonsListeners();
      })();
    }else if(id == 'pictureOfTheDay'){
      (async function (){
        await renderView(id);
        getImage(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
      })();
    } else if(id == 'nearObjects'){
      (async function (){
        await renderView(id);
        getNearObjects(`https://api.nasa.gov/neo/rest/v1/feed?&api_key=${apiKey}`);
      })();
    } else if(id == 'techTransfer'){
      (async function (){
        await renderView(id);
        getTechTransfer(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`);
      })();
    }
  }
};

/**
 *Función para renderizar la plantilla correspondiente a la ruta, las plantillas estan en templates.js
 * @param {string} id pathnam de la ruta actual
 */
function renderView(id){
  let template;
  templates.filter(function(obj){
    if( obj.idTemp === id){
      template = obj.template;
    }
  });
  document.getElementById('content').innerHTML = template;
}