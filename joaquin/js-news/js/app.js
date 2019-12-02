const routesList = [
  { path: '/', name: 'home', render: home.render, default: true },
  { path: '/projects', name: 'projects' }, //, render: projects.render
  { path: '/projects/:id', name: 'project' },
  { path: '/articles', name: 'articles'},
  { path: '/tests', name: 'tests', render: tests.render },
  { path: '/documentation', name: 'documentation', externalLink: './jsdoc/index.html' }
];

router.initialize(routesList);
router.navigate('/');

// jsdoc -d=jsdoc -v ./js/*.js