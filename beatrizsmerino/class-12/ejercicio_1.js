// 1 - Saca una lista de los cursos disponibles en Fictizia en el área de Desarrollo interactivo y Web y conviertelo en Markdown.
//https://www.fictizia.com/planes/desarrollo-interactivo-y-web
// (ejercicio en la consola del navegador)

function courses() {
  let sections = document.querySelectorAll(".plansWrapper section");
  //.mastersList article.card
  //console.log(sections);

  console.group(
    "Lista de los cursos disponibles en Fictizia en el área de Desarrollo interactivo y Web y conviertelo en Markdown: "
  );
  console.log(
    "# Cursos de Fictizia en el Área de Desarrollo interactivo y Web"
  );

  for (let index = 0; index < sections.length; index++) {
    const section = sections[index].querySelectorAll("article.card");
    //console.log(section);

    for (let index = 0; index < section.length; index++) {
      const course = section[index].querySelectorAll("header h1 a")[0];
      //console.log(course);
      console.log("- [" + course.textContent + "](" + course.href + ")");
    }
  }
  console.groupEnd();
}
courses();
