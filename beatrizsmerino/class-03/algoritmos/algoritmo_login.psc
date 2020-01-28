Algoritmo algoritmo_login
	
	// Identificar a los clientes autorizados a entrar a nuestro sistema.
	// Caracteristicas:
	// - La palabra clave es "Fictizia mola mucho"
	// - Solo existen 3 intentos
	// - Si se pasan los 3 intentos. Se despliega un mensaje informativo.
	
	claveValida <- "Fictizia mola mucho"
	contador <- 3
	Escribir "Intentos: ", contador
	
	Escribir "Contrasena:"
	Leer clave
	
	Mientras clave != claveValida y contador>1 Hacer
		contador <- contador - 1
		Escribir "Intentos: ", contador
		
		Escribir "Prueba de nuevo."
		Escribir "Contrasena:"
		Leer clave
	Fin Mientras
	
	Si clave == claveValida Entonces
		Escribir "Enorabuena estas autorizado a entrar en nuestro sistema."
	SiNo
		Escribir "Has probado demasiadas veces y se ha bloqueado el acceso. Intentalo mas tarde."
	Fin Si
	
FinAlgoritmo