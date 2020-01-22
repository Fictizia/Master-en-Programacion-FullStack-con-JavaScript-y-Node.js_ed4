Algoritmo algoritmo_moneda
	
	// Programa que simula el lanzamiento de una moneda al aire e imprimir si ha salido cara o cruz.
	
	valor = azar(2)
	Escribir valor
	
	Segun valor Hacer
		0:
			moneda="cruz"
		1:
			moneda = "cara"
	Fin Segun
	
	Escribir "Ha salido ", moneda
	
FinAlgoritmo