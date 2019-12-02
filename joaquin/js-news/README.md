# js-news
versión 1.0.0

La app **js-news** muestra información relevante relacionada con javascript: 

- los **proyectos** open source de **GitHub** con mayor número de estrellas y 

- los **artículos** más importantes de **DEV**

Esta primera versión / release todavía está muy verde pero al menos implementa la base.

Sigue la siguiente estructura:

- **index.html** única vista de la app

- **style.css** para el estilo de toda la app

- js/**app.js** inicializa el router (cargando las rutas) y navega al home

- js/**router.js** se encarga de la navegacion: router.navidate(to). Implementa un router **SPA**

Gestionamos las **vistas** con:

- js/**home.js** gestiona la vista del home

- js/**project.js** se encarga de la vista de proyectos y la lista de proyectos del home

- js/**articles.js** se encarga de la vista de artículos y la lista de artículos del home

- js/**tests.js** ejecutas tests sobre la app probando la funcionalidad de la misma. En caso de no cumplirse las condiciones exigidas, console.assert muestra la excepción por consola.

- Se ha generado la **documentación** de la app con JSDoc, aunq a penas está documentado el código. Toda la documentación está almacenada en ./jsdoc. Se ha utilizado jsdoc -d=jsdoc -v ./js/*.js

**Delegamos** responsabilidades en distintos **handlers**:

- js/handlers/**cache-handler.js** implementa una **cache en memoria** básica de los datos devueltos por las consultas ajax

- js/handlers/**data-handler.js** se encarga de las consultas asíncronas ajax. En el caso de las consultas de proyectos sobre la api de github, retrasa el refresco de datos (p.e. 20 seg) para permitir más consultas sin esperar a la limitación impuesta por la api en el número de consultas. Durante ese período, si ya ha consultado los datos y están en caché, devuelve éstos

- js/handlers/**event-listener** añade la funcionalidad asociada a eventos sobre elementos del DOM

En el directorio **/assets** dejamos las imágenes

**Pendientes**:

- [ ] Vista de proyectos

- [ ] Lista de artículos en el home

- [ ] Vista de artículos

- [ ] Vista de tests

- [ ] Documentación del código + generación de JSDoc

- [ ] Mejora de cache local en el navegador

Actualmente en construcción