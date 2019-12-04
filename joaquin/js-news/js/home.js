/** @function */
const home = (() => {
  const renderBody = () => document.getElementById('spa-body').classList.add("home-body")
  const renderSetionHeader = section => {
    const mainImgSrc = imagesHandler.getImageSrc('../assets/'+section.image);
    const loadingImageSrc = section.loadingData ? imagesHandler.getImageSrc('../assets/loading-'+section.image) : '';
    const markup = `
      <img class="main-image link-image router-link" to="${section.to}" src="${mainImgSrc}">
      <h1 class="router-link" to="${section.to}">${section.title}</h1>
      ${section.loadingData ? '<img class="loading-image" src="'+loadingImageSrc+'">' : ''}
    `;
    let sectionDOM = document.createElement("section");
    sectionDOM.classList.add('home', section.className);
    sectionDOM.innerHTML = markup;
    document.getElementById('spa-body').appendChild(sectionDOM);
  }
  const renderProjects = () => {
    renderSetionHeader({
      className: 'home-projects',
      image: 'projects.png',
      to: '/projects',
      title: 'Top JavaScript projects on github',
      loadingData: true
    });
    projects.renderProjecToptList(3);
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
    render: () => {
      renderBody();
      renderProjects();
      renderArticles();
      renderAppTests();
      renderAppDocumentation();
    }
  }
})();
