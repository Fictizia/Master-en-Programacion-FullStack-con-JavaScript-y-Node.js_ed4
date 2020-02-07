// 3 - Diseña un script que sustituya todas las imágenes de las entradas de Tecnología del Mundo Today por imágenes dummy de gatitos.

// https://www.elmundotoday.com/noticias/tecnologia/
// https://placekitten.com/
// (ejercicio en la consola del navegador)

function changeImgs() {
  var images = document.querySelectorAll(
    ".td-big-grid-wrapper .td-big-grid-post"
  );
  console.log(images);

  let array = [];
  for (let index = 0; index < images.length; index++) {
    const image = images[index].querySelectorAll(
      ".td-image-wrap .entry-thumb"
    )[0];
    array.push(image.src);
    image.src = "http://placekitten.com/400/400";
  }
  console.log(array);
}
changeImgs();
