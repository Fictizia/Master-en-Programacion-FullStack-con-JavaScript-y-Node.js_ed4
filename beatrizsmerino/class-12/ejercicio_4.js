// 4 - Nos creamos un array de objetos con la informacion, links y fotografias de l@s profes de Fictizia
// https://www.fictizia.com/profesorado
// (ejercicio en la consola del navegador)

function professors() {
  let professors = document.querySelectorAll(".microCardsWrapper .microCard");

  let professorsData = [];

  for (let index = 0; index < professors.length; index++) {
    const professor = professors[index];
    const professorImg = professor.querySelector("img").src;
    const professorName = professor.querySelector("h3").textContent;
    const professorDescription = professor.querySelector("p").textContent;
    const professorLinks = professor.querySelectorAll("ul.microBtns li");

    let professorLinksArray = [];
    for (let index = 0; index < professorLinks.length; index++) {
      const professorLink = professorLinks[index].querySelector("a").href;
      professorLinksArray.push(professorLink);
    }
    // console.log(professorLinksArray);

    let professorData = {
      name: professorName,
      imgSrc: professorImg,
      description: professorDescription,
      links: professorLinksArray
    };
    professorsData.push(professorData);
  }

  console.info(professorsData);
}

professors();
