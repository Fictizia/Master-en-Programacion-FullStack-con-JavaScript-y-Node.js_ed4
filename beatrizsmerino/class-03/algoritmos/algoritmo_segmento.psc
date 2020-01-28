Algoritmo algoritmo_segmento
	
	// Calcula el porcentaje de hombres y mujeres en nuestro curso.
	// Pista: Calcular porcentajes (segmento * 100) / total
	
	Escribir "Numero de mujeres y de hombres"
	Leer numeroMujeres
	Leer numeroHombres
	
	total= numeroMujeres + numeroHombres
	porcentajeMujeres = (numeroMujeres * 100 / total)
	porcentajeHombres = (numeroHombres * 100 / total)
	
	Escribir "Hay ", porcentajeMujeres, "% de mujeres y ", porcentajeHombres "% de hombres"
	
FinAlgoritmo