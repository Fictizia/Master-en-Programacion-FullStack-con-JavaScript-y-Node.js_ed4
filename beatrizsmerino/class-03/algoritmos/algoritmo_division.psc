Algoritmo algoritmo_division
	
	// Dividir 2 numeros
	
	Escribir "Intoduzca 2 numeros"
	Leer numero1
	
	Repetir
		Leer numero2
		si numero2 == 0 Entonces
			Escribir "El divisor no puede ser 0. Introduce otro numero"
		FinSi
	Hasta Que numero2 != 0
	
	Escribir "Resultado ", (numero1 / numero2)

FinAlgoritmo