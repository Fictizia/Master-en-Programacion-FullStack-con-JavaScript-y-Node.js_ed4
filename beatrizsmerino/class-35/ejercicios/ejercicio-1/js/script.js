// Ejercicio 1
// Captura los emails del siguiente texto.
// demo@demo.com, demo_demo@demo.com.ar, demo-demo12312@sub.dom.com.ar, demo@novalido, novalido>@demo.com, demo@novalido-.com, demo@-novalido.com

// Solución aquí
// ["demo@demo.com", "demo_demo@demo.com.ar", "demo-demo12312@sub.dom.com.ar"]



const emailsString = "demo@demo.com, demo_demo@demo.com.ar, demo-demo12312@sub.dom.com.ar, demo@novalido, novalido>@demo.com, demo@novalido-.com, demo@-novalido.com";

console.info(emailsString);

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const newRegexEmail = new RegExp(regexEmail, "gi");
if (newRegexEmail.test(emailsString)) {
	console.log("Valid");
} else {
	console.log("Invalid");
}


const emailsArr = emailsString.split(", ");
console.info(emailsArr);

const emailsValid = emailsArr.filter(item => {
	return item.match(regexEmail);
});
console.info(emailsValid);