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

- js/**spa.js** renderiza el esqueleto de la SPA y la cabecera

- js/**home.js** gestiona la vista del home

- js/**project.js** se encarga de la vista de proyectos y la lista de proyectos del home

- js/**articles.js** se encarga de la vista de artículos y la lista de artículos del home

- js/**tests.js** ejecutas tests sobre la app probando la funcionalidad de la misma. En caso de no cumplirse las condiciones exigidas, console.assert muestra la excepción por consola.

- Se ha generado la **documentación** de la app con JSDoc, aunq a penas está documentado el código. Toda la documentación está almacenada en ./jsdoc. Se ha utilizado jsdoc -d=jsdoc -v ./js/*.js

**Delegamos** responsabilidades en distintos **handlers**:

- js/handlers/**cache-handler.js** implementa una **cache** básica en **memoria** o  **local** (localStorage) para almacenar los datos devueltos por las consultas ajax y las imagenes renderizadas en formato base64

- js/handlers/**data-handler.js** se encarga de las consultas asíncronas ajax. 

> - Si estamos **offline** busca los datos en la cache.
>
> - Si estamos **online** busca datos _frescos_ en la cache: datos consultados hace menos de 20 segundos
>
>> - Si no los encuentra o están caducados vuelve a consultar al origen de los mismos.
>
> - En el caso de las consultas al repositorio de **github**, verifica si puede realizar la consulta:
>
>> - Si puede realizar la consulta la ejecuta.
>>
>> - Si no puede consultar pero tiene datos en caché (caducados) los devuelve
>>
>> - Si no puede consultar y no tiene datos en caché espera el tiempo indicado por github y vuelve a consultar.

- js/handlers/**event-listener-handler.js** añade la funcionalidad asociada a eventos sobre elementos del DOM

- js/handlers/**images-handler.js** se encarga de la conversión de las imágenes a base64 para el almacenamiento en cache y posterior renderizado de las mismas con independencia de la conexión a la red.

En el directorio **/assets** dejamos las imágenes

**Pendientes**:

- [ ] Vista de proyectos

- [ ] Lista de artículos en el home

- [ ] Vista de artículos

- [ ] Vista de tests

- [ ] Documentación del código + generación de JSDoc

Actualmente en construcción