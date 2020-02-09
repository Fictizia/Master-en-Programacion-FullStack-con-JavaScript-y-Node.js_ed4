//	8 - Disena un algoritmo para identificar a los clientes autorizados a entrar a nuestro sistema.
//			
//		Caracteristicas:
//			La palabra clave es "Fictizia mola mucho"
//			Solo existen tres intentos
//			Si se pasan los tres intentos. Se despliega un mensaje informativo.

Algoritmo clientes_autorizados
	intentos = 3
	clave_correta = Falso
	Repetir
		Escribir 'Por favor, introduzca la palabra clave:'
		Leer clave
		Si clave == 'Fictizia mola mucho' Entonces
			Escribir 'Enhorabuena, es un cliente autorizado'
			clave_correcta = Verdadero
		SiNo
			intentos = intentos - 1
			Si intentos == 0 Entonces
				Escribir 'No es un cliente autorizado'
			SiNo
				Escribir 'Clave incorrecta, le quedan ' + ConvertirATexto(intentos) + ' intentos'
			Fin Si			
		Fin Si
	Hasta Que intentos == 0 O clave_correcta
	
FinAlgoritmo
