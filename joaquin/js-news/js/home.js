/** @function */
const home = (() => {
  const renderPage = element => {
    let divDOM = document.createElement("div");
    divDOM.classList.add("home");
    element.innerHTML = '';
    element.appendChild(divDOM);
  }
  const renderHeader = () => {
    let divDOM = document.createElement("nav");
    divDOM.classList.add("home-body");
    document.querySelector('.home').appendChild(divDOM);
    const markup = `
      <header>
        <nav>
          <ul>
            <li class="router-link" to="/">HOME</li>
            <li class="router-link" to="/projects">PROJECTS</li>
            <li class="router-link" to="/articles">ARTICLES</li>
            <li class="router-link" to="/tests">TESTS</li>
            <li class="router-link" to="/documentation">DOCUMENTATION</li>
          </ul>
        </nav>
      </header>    
    `
    document.querySelector('.home').innerHTML = markup;
  }
  const renderBody = () => {
    let divDOM = document.createElement("div");
    divDOM.classList.add("home-body");
    document.querySelector('.home').appendChild(divDOM);
  }
  const renderSetionHeader = section => {
    const markup = `
      <img class="main-image link-image router-link" to="${section.to}" src="../assets/${section.image}">
      <h1 class="router-link" to="${section.to}">${section.title}</h1>
      ${section.loadingData ? '<img class="loading-image" src="../assets/loading-'+section.image+'">' : ''}
    `;
    let sectionDOM = document.createElement("section");
    sectionDOM.classList.add('home', section.className);
    sectionDOM.innerHTML = markup;
    document.querySelector('.home-body').appendChild(sectionDOM);
  }
  const renderProjects = () => {
    renderSetionHeader({
      className: 'home-projects',
      image: 'projects.png',
      to: '/projects',
      title: 'Top JavaScript projects on github',
      loadingData: true
    });
    projects.renderProjectList(3);
  }
  const renderArticles = () => {
    renderSetionHeader({
      className: 'home-articles',
      image: 'articles.png',
      to: '/articles',
      title: 'DEV JavaScript articles',
      loadingData: true
    });
  }
  const renderAppTests = () => {
    renderSetionHeader({
      className: 'home-tests',
      image: 'tests.png',
      to: '/tests',
      title: 'App tests'
    });
  }
  const renderAppDocumentation = () => {
    renderSetionHeader({
      className: 'home-documentation',
      image: 'documentation.png',
      to: '/documentation',
      title: 'App JSDoc'
    });
  }
  return {
    render: element => {      
      renderPage(element);
      renderHeader();
      renderBody();
      renderProjects();
      renderArticles();
      renderAppTests();
      renderAppDocumentation();
    }
  }
})();
