//1 - Captura los emails del siguiente texto.

// tests en https://regex101.com/r/o1ADpd/10/tests

const emails = "demo@demo.com, demo_demo@demo.com.ar, demo-demo12312@sub.dom.com.ar, demo@novalido, novalido>@demo.com, demo@novalido-.com, demo@-novalido.com"

const pattern = /^[\w|-]+@[\w]+(\.[\w]+)+$/;

emails.split(', ').filter(text=>pattern.test(text));
