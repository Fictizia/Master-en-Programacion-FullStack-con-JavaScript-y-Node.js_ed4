// 6 - Disena un programa para calcular el porcentaje de hombres y mujeres en nuestro curso.
//	
// Trucos:
//	 Calcular porcentajes (segmento*100)/total
	
Algoritmo porcentaje_hombre_mujeres
	numero_hombres <- 7
	numero_mujeres <- 2
	total <- numero_hombres + numero_mujeres
	porc_hombres = redon((numero_hombres * 100) / total)
	porc_mujeres = redon((numero_mujeres * 100) / total)
	Escribir 'El procentaje de hombres es del ' + ConvertirATexto(porc_hombres) + '%'
	Escribir 'El procentaje de mujeres es del ' + ConvertirATexto(porc_mujeres) + '%'
FinAlgoritmo
