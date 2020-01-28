Algoritmo algoritmo_condicional
	
	// Inserta la edad que tienes para conocer tu etapa
	
	Escribir "Inserta un numero"
	Leer num
	
	si num<=0 Entonces
		Escribir "No es valido"
	SiNo
		si num>0 && num<=1 Entonces
			Escribir "Bebe"
		FinSi
		si num>=1 && num<=3 Entonces
			Escribir "Ni–o peque–o"
		FinSi
		si num>3 && num<=5 Entonces
			Escribir "Preescolar"
		FinSi
		si num>5 && num<12 Entonces
			Escribir "Primaria"
		FinSi
		si num>12 && num<18 Entonces
			Escribir "Adolescente"
		FinSi
		si num==18 Entonces
			Escribir "Mayor de edad"
		FinSi
		si num>18 && num<30 Entonces
			Escribir "Adulto joven"
		FinSi
		si num>=30 && num<40
			Escribir "Viejunial"
		FinSi
		si num>=40 && num<50
			Escribir "Cuarenton"
		FinSi
		si num>=50 && num<90
			Escribir "Viejo"
		FinSi
		si num>=90 && num<100
			Escribir "Matusalen!!"
		FinSi
	FinSi
	
FinAlgoritmo