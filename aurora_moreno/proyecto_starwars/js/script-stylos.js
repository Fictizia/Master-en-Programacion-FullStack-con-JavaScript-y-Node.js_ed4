function divDivisorOne() {

     document.getElementById("buttom-efectOne").style.backgroundColor = "#ffc500";
     document.getElementById("buttom-efectOne").style.transform = "perspective(300px) rotateX(20deg)";
     document.getElementById("sectionOne").style.color = "white";
}

function divDivisorTwo() {
     document.getElementById("buttom-efectTwo").style.backgroundColor = "#ffc500";
     document.getElementById("buttom-efectTwo").style.transform = "perspective(300px) rotateX(20deg)";
     document.getElementById("sectionTwo").style.color = "white";

}

function divDivisorOneNormal() {

     document.getElementById("buttom-efectOne").style.backgroundColor = "white";
     document.getElementById("buttom-efectOne").style.transform = "perspective(0px) rotateX(0deg)";
     document.getElementById("sectionOne").style.color = "black";
}

function divDivisorTwoNormal() {
     document.getElementById("buttom-efectTwo").style.backgroundColor = "white";
     document.getElementById("buttom-efectTwo").style.transform = "perspective(0px) rotateX(0deg)";
     document.getElementById("sectionTwo").style.color = "black";

}





var interval = setInterval( miTimer, 3000);

function miTimer() {
     var cargaIn = document.getElementById("initialLoad");
     cargaIn.style.opacity="0";
     cargaIn.style.zIndex="-2";
}