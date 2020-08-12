/**
 * Listener para la primera carga de la aplicacion para las animaciones iniciales
 */
window.addEventListener('load', function() {
  document.styleSheets[0].addRule("p.system::after","background-color: rgb(145, 255, 0);box-shadow: 0 0 20px white");
  document.styleSheets[0].addRule("p.fuel::after","width: 3rem");
  document.styleSheets[0].addRule("p.energy::after","width: 5.8rem");
  document.styleSheets[0].addRule("p.shield::after","width: 1.5rem; background-color: crimson");
  document.styleSheets[0].addRule(".content"," width: 75%; height: 76vh;padding: 2%;");
  document.styleSheets[0].addRule("body","color: rgb(114, 243, 114) ");
  document.styleSheets[0].addRule(".lights-2,.lights-3","background-color: rgb(145, 255, 0);box-shadow: 0 0 10px white");
  document.styleSheets[0].addRule(".lights-1","background-color:  rgb(248, 103, 50);box-shadow: 0 0 10px white");
  document.styleSheets[0].addRule(".hud__right","top:40%");
});