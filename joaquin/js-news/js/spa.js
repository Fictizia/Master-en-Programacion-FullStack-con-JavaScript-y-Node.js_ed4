const spa = (() => {
  const renderPage = () => {
    let divDOM = document.createElement('div');
    divDOM.setAttribute('id', 'spa');
    document.getElementById('app').appendChild(divDOM);
  }
  const renderHeader = routesList => {
    const markup = `
      <header>
        <nav>
          <ul>
          </ul>
        </nav>
      </header>    
    `;
    document.getElementById('spa').innerHTML = markup;
    const ulDOM = document.querySelector('#spa ul');    
    routesList
      .filter(route => route.headerOption)
      .map(route => {
        let liDOM = document.createElement('li');
        liDOM.classList.add("router-link");
        liDOM.setAttribute('to', route.path);
        liDOM.innerText = route.name.toUpperCase();
        ulDOM.appendChild(liDOM);
      });
  }
  const renderBody = () => {
    let spaBodyDOM = document.createElement("div");
    spaBodyDOM.setAttribute('id', 'spa-body');
    document.getElementById('spa').appendChild(spaBodyDOM);
  }
  return {
    renderHeader: routesList => {
      renderPage();
      renderHeader(routesList);
      eventListenerHandler.listenRouterLinks('#spa .router-link', router.navigate);   
      renderBody();
    }
  }
})();