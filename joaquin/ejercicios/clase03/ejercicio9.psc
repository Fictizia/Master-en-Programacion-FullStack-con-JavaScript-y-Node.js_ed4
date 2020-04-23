
//	9 - Disena un algoritmo introducido un numero y pasarlo a numero romanos.
//		
//		Esperamos que el numero sea menor de 50

// Número romano I, V, X, L, C, M, X

Funcion romano <- rellena (repeticiones, letra_ini, letra_relleno, letra_siguiente)
	si (repeticiones == 4)
		romano = letra_relleno + letra_siguiente
	SiNo
		romano = letra_ini
		Para i<-1 Hasta repeticiones Con Paso 1 Hacer
			romano = romano + letra_relleno
		Fin Para	
	FinSi
FinFuncion

Funcion romano <- digito_decimal_a_romano ( digito_decimal, letra_uno, letra_cinco, letra_10 )
	Si (digito_decimal < 5) Entonces
		romano = rellena (digito_decimal, '', letra_uno, letra_cinco)
	SiNo
		romano = rellena ((digito_decimal - 5), letra_cinco, letra_uno, letra_10)
	Fin Si	
Fin Funcion

Funcion romano <- unidades_a_romano (unidades) 
	romano = digito_decimal_a_romano (unidades, 'I', 'V', 'X')
FinFuncion

Funcion romano <- decenas_a_romano (decenas) 
	romano = digito_decimal_a_romano (decenas, 'X', 'L', 'C')
FinFuncion

Funcion romano <- centenas_a_romano (centenas) 
	romano = digito_decimal_a_romano (centenas, 'C', 'D', 'M')
FinFuncion

Funcion romano <- millares_a_romano (millares) 
	romano = ''
	Para i<-1 Hasta millares Con Paso 1 Hacer
		romano = romano + 'M'
	Fin Para
FinFuncion

Algoritmo numero_decimal_a_romano
	Escribir 'Por favor, introduzca un numero del 0 a 3999'
	Leer numero_decimal
	
	digitos = ConvertirANumero(numero_decimal)
	unidades = digitos MOD 10
	
	digitos = (digitos - unidades) / 10
	decenas = digitos MOD 10
	
	digitos = (digitos - decenas) / 10
	centenas = digitos MOD 10
	
	digitos = (digitos - centenas) / 10
	millares = digitos MOD 10
	
	numero_romano = millares_a_romano(millares)
	numero_romano = Concatenar(numero_romano, centenas_a_romano (centenas))
	numero_romano = Concatenar(numero_romano, decenas_a_romano(decenas))
	numero_romano = Concatenar(numero_romano, unidades_a_romano(unidades))
	
	Escribir 'El número decimal ' + numero_decimal + ' en romanos se escribe ' + numero_romano
FinAlgoritmo
