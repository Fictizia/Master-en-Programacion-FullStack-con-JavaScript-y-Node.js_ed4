// Función para crear la animación y avisar al usuario que se ha registrado correctamente

export  function initAnimation (userName, section, mensaje) {

    let sucessMessg = document.createElement('h3');

    sucessMessg.innerText = userName + mensaje;

    section.style.transform = "translateY(-521px)";

    setTimeout(() => {
        section.style.display = "none";
        document.querySelector('nav').classList.remove('hidden')
        document.querySelector('#user_select').appendChild(sucessMessg);
    }, 2000);

}