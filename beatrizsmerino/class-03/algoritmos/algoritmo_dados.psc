Algoritmo algoritmo_dados

	// Programa que simula 100 tiradas de 2 dados y contar las veces que entre los 2 suman 10.
	
	contador <- 0
	
	Para i<-0 Hasta 100 Con Paso 1 Hacer
		numeroDado1 <- azar(6) + 1
		numeroDado2 <- azar(6) + 1
		
		Escribir "Dado 1: ", numeroDado1
		Escribir "Dado 2: ", numeroDado1
		
		sumaDados <- (numeroDado1 + numeroDado2)
		
		Si sumaDados = 10 Entonces
			contador = contador + 1
		SiNo
			contador = contador
		Fin Si
	Fin Para
	
	Escribir "Veces: ", contador

FinAlgoritmo