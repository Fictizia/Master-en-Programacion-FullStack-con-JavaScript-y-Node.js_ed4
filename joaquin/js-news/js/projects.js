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
    const logoSrc = imagesHandler.getImageSrc(project.logo_url);
    const to = `to="/projects/${project.id}"`;
    const markup = `
      <div class="article-ranking">${project.ranking.toString().padStart(2,'0')}</div>
      <div class="article-description">
        <h2 class="router-link" ${to}>${project.name}</h2>
        <div class="router-link" ${to}>${project.description}</div>
        <div><span class="star router-link" ${to}>${starSvg}</span><span class="router-link" ${to}>${getStars(project.stargazers_count)}</span></div>
      </div>
      <div class="article-image">
        <img class="logo-image router-link" ${to} src="${logoSrc}">
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
    renderProjecToptList: topRanking => {
      const origin = "https://api.github.com";
      const url = origin + "/search/repositories?q=stars:>10000+topic:javascript"  
      const renderProjects = json => {
        removeLoadingImage();
        let projects = getProjects(json, topRanking)
          .map(project => renderProjectArticle(project));
          eventListenerHandler.listenRouterLinks('#spa-body section.home-projects > article .router-link', router.navigate);
      }
      dataHandler.get(url, renderProjects);
    }
  }
})();