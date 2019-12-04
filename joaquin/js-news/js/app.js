const routesList = [
  { path: '/', name: 'home', render: home.render, default: true, headerOption: true },
  { path: '/projects', name: 'projects', headerOption: true }, //, render: projects.render
  { path: '/projects/:id', name: 'project' },
  { path: '/articles', name: 'articles', headerOption: true},
  { path: '/tests', name: 'tests', render: tests.render, headerOption: true },
  { path: '/documentation', name: 'documentation', externalLink: './jsdoc/index.html', headerOption: true }
];

spa.renderHeader(routesList);
router.initialize(routesList);
cacheHandler.enableLocalStorage();
imagesHandler.enableCacheImage();
router.navigate('/');

// jsdoc -d=jsdoc -v ./js/*.js