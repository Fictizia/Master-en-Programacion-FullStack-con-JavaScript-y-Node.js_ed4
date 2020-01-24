// - Ejercicios Eventos 3
// Partiendo del ejemplo de geometría, crear un programa que nos permita borrar/añadir figuras a nuestro HTML por medio de JS
// - Si la figura ya se encuentra pintada en nuestro HTML, no se puede volver a añadir
// - Si la figura a añadir no está en nuestro CSS, no podemos añadirla al HTML
// - Si la figura no está, no se puede borrar

// Añadir links CSS
var linkStyle = document.createElement("link");
linkStyle.setAttribute("rel", "stylesheet");
linkStyle.setAttribute("href", "style.css");
linkStyle.setAttribute("TYPE", "text/css");

document.head.appendChild(linkStyle);

// Añadir circulo por JS
// var divCirculo= document.createElement("div")
// divCirculo.setAttribute("id","circulo")
// divCirculo.setAttribute("class","forma")
//
// document.body.appendChild(divCirculo)

///////////////////////////////////////////////////////


// FIGURES
const figuresArray = [
  "circle",
  "square",
  "diamond",
  "hexagon",
  "oval",
  "parallelogram",
  "pentagon",
  "rectangle",
  "trapezoid",
  "triangle"
];

let option1 = document.getElementById("option1Figures");
let option2 = document.getElementById("option2Figures");
let buttonAddFigure = document.getElementById("buttonAddFigure");
let myCanvas = document.getElementById("canvas");




// GEOMETRIC FIGURE - CREATE SELECT
function createSelectFigures(select) {
  for (let index = 0; index < figuresArray.length; index++) {
    let element = figuresArray[index];
    //console.log(element);

    let optionElem = document.createElement("option");
    let optionTextElem = document.createTextNode(element);
    optionElem.setAttribute("value", element);
    optionElem.appendChild(optionTextElem);

    select.appendChild(optionElem);
  }
  //console.log(select);
}


// GET SELECT VALUE
function getSelectValue(select) {
  let selectValue = select.value;
  // console.info("Select Value: " + selectValue);
  return selectValue;
}


/*************************************************/


// GET INPUT VALUE
function getInputValue(input) {
  let inputValue = input.value;
  // console.info("Input Value: " + inputValue);
  return inputValue;
}


// GET INPUT VALUE
function checkValueFigure(figuresPermited, value) {
  let valueLowerCase = value.toLowerCase();
  let found = figuresPermited.includes(valueLowerCase);

  // console.info("Value ", value);
  // console.info(value, valueLowerCase);
  // console.log(found);

  let result;
  if (found) {
    result = true;
  } else {
    result = false;
  }

  return result;
}


/*************************************************/


// MESSAGE - CREATE
function createMessage(messageText) {
  let messageDom = document.getElementById("message");

  let messageElem = document.createElement("span");
  let messageTextElement = document.createTextNode(messageText);
  messageElem.setAttribute("class", "c-message");
  messageElem.setAttribute("id", "message");
  // let template = `<span class="c-form__message">${message}</span>`;

  if (!messageDom) {
    messageElem.appendChild(messageTextElement);
    // console.dir(messageElem);
    document.body.appendChild(messageElem);
  } else {
    // inputItem.parentNode.removeChild(messageDom);
    messageDom.innerHTML = messageText;
  }

  showMessage();
}

// MESSAGE - TYPE
function addTypeMessage(typeMessage) {
  let message = document.getElementById("message");

  if (message.hasAttribute("data-type")) {
    switch (typeMessage) {
      case "error":
        message.classList.replace("c-message--success", "c-message--error");
        break;
      case "success":
        message.classList.replace("c-message--error", "c-message--success");
        break;
      default:
        break;
    }
  } else {
    message.setAttribute("data-type", typeMessage);
    message.classList.add("c-message--" + typeMessage);
  }
}

// MESSAGE - REMOVE
function removeMessage() {
  let inputItem = document.getElementsByClassName("c-form__item")[0];
  let messageDom = document.getElementById("message");

  if (messageDom) {
    inputItem.parentNode.removeChild(messageDom);
  }
}


// MESSAGE - HIDE
function hideMessage() {
  let messageDom = document.getElementById("message");

  if (messageDom) {
    if (messageDom.classList.contains("is-show")) {
      messageDom.classList.replace("is-show", "is-hide");
    } else {
      messageDom.classList.add("is-hide");
    }
  }
}


// MESSAGE - SHOW 
function showMessage() {
  let messageDom = document.getElementById("message");

  if (messageDom) {
    if (messageDom.classList.contains("is-hide")) {
      messageDom.classList.replace("is-hide", "is-show");
    } else {
      messageDom.classList.add("is-show");
    }
  }
}


/*************************************************/


// GEOMETRIC FIGURE - ADD
function addFigure(nameFigure) {
  let figureLowerCase = nameFigure.toLowerCase();
  if (typeof figureLowerCase === "string") {
    let found = figuresArray.includes(figureLowerCase);

    if (found) {
      let figureElem = document.createElement("div");
      figureElem.setAttribute("class", "geometric-figure");
      figureElem.setAttribute("id", figureLowerCase);
      figureElem.setAttribute("title", figureLowerCase);
      figureElem.addEventListener("click", removeFigure);

      let figureDrawElem = document.createElement("span");
      figureDrawElem.setAttribute("class", "geometric-figure__picture");

      let figureButtonRemove = document.createElement("i");
      figureButtonRemove.setAttribute(
        "class",
        "geometric-figure__button-remove icon-circle-with-cross"
      );

      figureElem.appendChild(figureDrawElem);
      figureElem.appendChild(figureButtonRemove);
      myCanvas.appendChild(figureElem);
    }
  }
}


// GEOMETRIC FIGURE - CHECK ADDED
function checkFigureAdded(nameFigure) {
  let figuresInCanvas = myCanvas.getElementsByClassName("geometric-figure");
  let nameFigureLowerCase = nameFigure.toLowerCase();

  let figuresCanvasArray = [];
  for (let index = 0; index < figuresInCanvas.length; index++) {
    const figureItem = figuresInCanvas[index];
    let foundNameFigure = figureItem.getAttribute("id");
    figuresCanvasArray.push(foundNameFigure);
  }

  // console.info(figuresCanvasArray);
  let found = figuresCanvasArray.includes(nameFigureLowerCase);
  let result;
  if (found) {
    result = true;
  } else {
    result = false;
  }

  // console.info("result",result);
  return result;
}


// GEOMETRIC FIGURE - REMOVE
function removeFigure() {
  let figure = document.getElementsByClassName("geometric-figure");
  for (let index = 0; index < figure.length; index++) {
    const element = figure[index];
    element.addEventListener("click", function () {
      let thisElement = this;
      thisElement.remove();
      if (thisElement) {
        createMessage("The figure '" + thisElement.getAttribute("id") + "' was removed successfully");
        addTypeMessage("success");
      } else {
        createMessage("The figure '" + thisElement.getAttribute("id") + "' cannot be removed");
        addTypeMessage("error");
      }
    });
  }
}


/*************************************************/


createSelectFigures(option1);
buttonAddFigure.addEventListener("click", function () {
  let selectValue = getSelectValue(option1);
  addFigure(selectValue);

  if (!checkFigureAdded(option1)) {
    createMessage("The figure '" + selectValue + "' was added successfully");
    addTypeMessage("success");
  } else {
    createMessage("The figure '" + selectValue + "' cannot be added");
    addTypeMessage("error");
  }

  // console.dir(document.getElementsByClassName("geometric-figure"));
});

option2.addEventListener("keyup", function () {
  let option2Value = getInputValue(option2);

  // console.info(option2Value);
  // console.assert(option2Value !== "", "Esta vacio");

  if (checkValueFigure(figuresArray, option2Value)) {
    // console.info("Existe figure");
    if (checkFigureAdded(option2Value)) {
      createMessage("This figure '" + option2Value + "' has already been added");
      addTypeMessage("error");
    } else {
      addFigure(getInputValue(option2));
      createMessage("This figure '" + option2Value + "' was added successfully");
      addTypeMessage("success");
    }
  } else {
    // console.info("No existe figure");
    createMessage("Figure '" + option2Value + "' not available");
    addTypeMessage("error");
    if (option2Value == "") {
      hideMessage();
    }
  }

  // console.dir(document.getElementsByClassName("geometric-figure"));
});