
// method
export function toggleMenu (event) {
    this.classList.toggle('is-active');
    document.querySelector( ".menuppal" ).classList.toggle("is_active");
    document.querySelector( "#princMenu" ).style.opacity =1;
    document.querySelector('main').style.zIndex="-2";
    document.querySelector('main').style.position="relative";

  
    event.preventDefault();
  }
  
  