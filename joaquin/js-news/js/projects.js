const projects = (() => {
  const removeLoadingImage = () => {
    const loadingImageDOM = document.querySelector('section.home-projects img.loading-image');
    loadingImageDOM.parentNode.removeChild(loadingImageDOM);
  }
  const getProjects = (json, topRanking) => {
    let projects = json.items
      .filter((project, index) => topRanking ? index<topRanking : true)
      .map((project, index) => {project.ranking=index+1; return project;})
      .map(project => setProjectLogo (project));
    return projects;
  }
  const projectLogos = {
    'react': 'react-logo-512.png'
  }
  const setProjectLogo = (project) => {
    const logoUrl = projectLogos[project.name] ? '../assets/logos/' + projectLogos[project.name] : project.owner.avatar_url;
    project.logo_url = logoUrl;
    return project;
  }
  const starSvg = `    
    <svg>
      <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z">
    </svg>
  `;
  const getStars = (stars) => {
    return stars > 1000 ? (stars/1000).toFixed(1)+"k" : stars.toString();
  }
  const renderProjectArticle = project => {
    const to = `to="/projects/${project.id}"`;
    const markup = `
      <div class="article-ranking">${project.ranking.toString().padStart(2,'0')}</div>
      <div class="article-description">
        <h2 class="router-link" ${to}>${project.name}</h2>
        <div class="router-link" ${to}>${project.description}</div>
        <div><span class="star router-link" ${to}>${starSvg}</span><span class="router-link" ${to}>${getStars(project.stargazers_count)}</span></div>
      </div>
      <div class="article-image">
        <img class="logo-image router-link" ${to} src="${project.logo_url}">
      </div>
    `;
    let articleDOM = document.createElement("article");
    articleDOM.setAttribute("data-project-id", project.id);
    articleDOM.innerHTML = markup;
    document.querySelector('.home-projects').appendChild(articleDOM);
  }
  return {
    render: element => {
      const projectTemplate = project => {
        return `
          project
        `
      }
      element.innerHTML = projectsTemplates
    },
    renderProjectList: topRanking => {
      const origin = "https://api.github.com";
      const url = origin + "/search/repositories?q=stars:>10000+topic:javascript"  
      const renderProjects = json => {
        removeLoadingImage();
        let projects = getProjects(json, topRanking)
          .map(project => renderProjectArticle(project));
          eventListenerHandler.listenRouterLinks('section.home-projects > article .router-link', router.navigate);
      }
      dataHandler.get(url, renderProjects);
    }
  }
})();

/*
// Si puede consultar consulta
// Si no puede consultar y no tiene datos espera
// Si no puede consultar y tiene datos muestra esos datos

// Consulta de proyectos
// https://api.github.com/search/repositories?q=stars:%3E10000+topic:javascript
// https://api.github.com/search/repositories?q=stars:>10000+topic:javascript
{
  "message": "API rate limit exceeded for 95.122.229.239. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
  "documentation_url": "https://developer.github.com/v3/#rate-limiting"
}
// repositories.json consultado el 27/11/2019 00:50


//https://developer.github.com/v3/#rate-limiting
//Increasing the unauthenticated rate limit for OAuth applications



// Sin restricciones podemos consultar nuestro rate_limit
https://api.github.com/rate_limit

resources.search.remaining > me quedan 9 consultas
resources.search.reset > 1574813258
new Date(1574813258 * 1000)
Wed Nov 27 2019 01:07:38 GMT+0100 (hora estándar de Europa central)

{
  "resources": {
    "core": {
      "limit": 60,
      "remaining": 60,
      "reset": 1574816361
    },
    "search": {
      "limit": 10,
      "remaining": 9,
      "reset": 1574813099
    },
    "graphql": {
      "limit": 0,
      "remaining": 0,
      "reset": 1574816361
    },
    "integration_manifest": {
      "limit": 5000,
      "remaining": 5000,
      "reset": 1574816361
    }
  },
  "rate": {
    "limit": 60,
    "remaining": 60,
    "reset": 1574816361
  }
}

Consulto rate_limit,
si no puedo > espiner y timer con el tiempo q me queda
si puedo > adelante


*/