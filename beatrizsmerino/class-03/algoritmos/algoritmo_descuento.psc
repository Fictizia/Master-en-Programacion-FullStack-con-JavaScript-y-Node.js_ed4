Algoritmo algoritmo_descuento

	//	Aplique al precio de un producto un descuento cuando se den las siguientes caracteristicas.
	//	Se aplica un 25% cuando:
	//	- Estamos en los meses de invierno
	//	- Y no es viernes o fin de semana.

	Escribir "Introduce el mes (numeros del 1 al 12)."
	Leer mes

	Segun mes Hacer
		1:
			mesNombre = "Enero"
		2:
			mesNombre = "Febrero"
		3:
			mesNombre = "Marzo"
		4:
			mesNombre = "Abril"
		5:
			mesNombre = "Mayo"
		6:
			mesNombre = "Junio"
		7:
			mesNombre = "Julio"
		8:
			mesNombre = "Agosto"
		9:
			mesNombre = "Septiembre"
		10:
			mesNombre = "Octubre"
		11:
			mesNombre = "Noviembre"
		12:
			mesNombre = "Diciembre"
		De Otro Modo:
			mesNombre = "Introduce un numero del 1 al 12"
	Fin Segun

	Escribir "Es ", mesNombre

	Si mes>= 11 o mes<=2 Entonces
		Escribir "Estamos en invierno y tienes un descuento."

		Escribir "Introduce el dia de la semana (numeros del 1 al 7)."
		Leer dia

		Si dia>=1 o dia<=7 Entonces

			Segun dia Hacer
				1:
					diaNombre = "Lunes"
				2:
					diaNombre = "Martes"
				3:
					diaNombre = "Miercoles"
				4:
					diaNombre = "Jueves"
				5:
					diaNombre = "Viernes"
				6:
					diaNombre = "Sabado"
				7:
					diaNombre = "Domingo"
				De Otro Modo:
					diaNombre = "Introduce un numero del 1 al 7"
			Fin Segun

			Escribir "Es ", diaNombre

			Si dia=6 o dia=7
				Escribir "Es temporada de invierno y finde semana. �Consigue tu descuento del 25% ya!"

				Escribir "Introduce el precio (�)."
				Leer precio

				Escribir "Precio final con el descuento del 25% es de ", (precio * 25)/100, "�"
			SiNo
				Escribir "Solo los fines de semana hay descuentos."
			FinSi
		FinSi
	SiNo
		Escribir "No es temporada de invierno. No hay descuentos."
	FinSi

FinAlgoritmo