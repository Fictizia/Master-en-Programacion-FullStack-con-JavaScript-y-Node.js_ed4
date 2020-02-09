//	7 - Disena un algoritmo que aplique al precio de un producto un descuento cuando se den las siguientes caracteristicas.
//		
//	Se aplica un 25% cuando:
//		Estamos en los meses de invierno
//		Y no es viernes o fin de semana.
	
Algoritmo descuento_producto
	Escribir 'Introduzca el precio del producto:'
	Leer precio
	
	Escribir 'Introduzca el mes en el que estamos (1:Enero, 2:Febrero, ..., 12:Diciembre):'
	Leer mes
	
	Escribir 'Introduzca el día de la semana (1:Lunes, 2:Martes, ..., 7:Domingo):'
	Leer dia
	
	mes_invierno = (mes==1 O mes == 2 O mes == 12)
	viernes = (dia == 5)
	fin_de_semana = (dia == 6 O dia == 7)
	
	aplica_descuento = mes_invierno Y NO viernes Y NO fin_de_semana
	
	Si aplica_descuento Entonces
		descuento = redon(precio * 25 / 100)
	SiNo
		descuento = 0
	Fin Si
	
	precio_final = precio - descuento
	
	Si descuento == 0 Entonces
		Escribir 'El precio del producto sigue siendo ' + ConvertirATexto(precio)
	SiNo
		Escribir 'Enhorabuena, el precio del producto es ' + ConvertirATexto(precio_final) + ' (ahorra ' + ConvertirATexto(descuento) + ')'
	Fin Si
	
FinAlgoritmo
