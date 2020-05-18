# Class 17. Exercise: New York Times. Hardcore fiction

Utilizando la API del NYTimes vamos a crear una web que nos muestre los libros más vendidos de la categoria
Hardcover Fiction

**Especificaciones:**

-   Consigue tus credenciales dandote de alta
-   Debes incluir una animación mientras esperamos la carga del contenido.
-   Los libros deben estar organizados según el orden de la lista oficial
-   Debes incluir la carátula del libro
-   Debes incluir la cantidad de semanas que lleva en la lista
-   Debes incluir la descripción
-   Debes incluir el titulo y la posición que ocupa en la lista(#1 titulo....#2 titulo....)
-   Debes incluir el link para poder comprar el libro en amazon(debe abrirse en otra pestaña)

**Trucos:**

-   Mira en detalle la documentación oficial:
    [https://developer.nytimes.com/get-started](https://developer.nytimes.com/get-started)
-   Usa el Books API:
    [https://developer.nytimes.com/my-apps/new-app](https://developer.nytimes.com/my-apps/new-app)

## Project setup

### Install packages npm

```
npm install
```

### Generate the documentation JSDOCS

```
npm run docs
```

### Add the API KEY

In the `js/scripts.js` file change the string `XXXXXXXXX` by the API KEY:

1. Go to your account: https://developer.nytimes.com/accounts/login
2. Go to the link: https://developer.nytimes.com/my-apps
3. Find your app or create one new
4. Copy the API KEY generated or create one new
