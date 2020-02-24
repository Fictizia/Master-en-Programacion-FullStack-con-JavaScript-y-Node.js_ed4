// 5 - Disena un programa que simula cien tiradas de dos dados y contar las veces que entre los dos suman 10.

Algoritmo cien_tiradas
	dado1 = 0
	dado2 = 0
	contador = 0
	Para tirada<-1 Hasta 100 Con Paso 1 Hacer
		dado1=azar(6)+1
		dado2=azar(6)+1
		Si dado1+dado2=10 Entonces
			contador = contador + 1
			Escribir 'tirada ' + ConvertirATexto(tirada) + ': dado1 > ' + ConvertirAtexto(dado1) + ', dado2 > ' + ConvertirAtexto(dado2)
		Fin Si
	Fin Para
	Escribir 'Los dos dados han sumado 10 ' + ConvertirAtexto(contador) + ' veces'
FinAlgoritmo
