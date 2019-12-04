/** @function */
const router = (() => {
  let routes = {};
  let defaultRoute = {};
  let currentRoute = {};
  return {
    getCurrentRoute: () => currentRoute,
    getRoutes: () => routes,
    initialize: routesList => {
      console.log('router.initialize');
      const addRoutes = routesList => {
        routesList.map(route => {
          routes[route.path] = route;
          routes[route.path].params = {};
          if (route.default) {
            defaultRoute = routes[route.path];
          }
        });
      }
      addRoutes(routesList);
      eventListenerHandler.listenHashchange(router.navigate);
    },
    navigate: to => {
      console.log('navivate:', to)
      const calculateCurrentRoute = () => {
        let route = routes[to] || defaultRoute;
        const isProjectId = (() => {
          if (to.indexOf('/projects/') == 0) {
            const id = to.substr("/projects/".length);
            return !isNaN(id);
          }
          return false
        })();

        if (isProjectId) {
          const projectId = (() => Number(to.substr("/projects/".length)))();
          route = routes['/projects/:id'];
          route.params = { id: projectId };
          route.hash = '#' + to;
        } else {
          route.hash = '#' + (routes[to] ? to : defaultRoute.path);
        }
        return route;
      }
      const manageWindowHistory = () => {
        const params = currentRoute.params;
        const title = currentRoute.name;
        const url = window.location.origin + '/' + currentRoute.hash;
        window.history.pushState(params, title, url);
      }
      const renderRoute = () => {        
        const spaBodyDOM = document.getElementById('spa-body');
        spaBodyDOM.removeAttribute('class');        
        currentRoute.hasOwnProperty('render')
          ? (spaBodyDOM.innerHTML=null, currentRoute.render())
          : spaBodyDOM.innerHTML = `<div><br><br>${JSON.stringify(currentRoute)}</div>`;
      }
      currentRoute = calculateCurrentRoute();
      if (currentRoute.externalLink) {
        if (currentRoute.externalLink.indexOf("./") == 0) {
          window.open(window.location.origin + currentRoute.externalLink.substr(1) , '_blank');
        }        
      } else {
        manageWindowHistory();
        renderRoute();
        eventListenerHandler.listenRouterLinks('#spa-body .router-link', router.navigate);
      }      
    }
  }
})();