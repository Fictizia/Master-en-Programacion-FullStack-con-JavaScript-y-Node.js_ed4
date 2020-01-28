Algoritmo algoritmo_switch
	
	// Escribir codigos de un juego
	// 1. Iniciando un videojuego
	// 2. Cargar partida
	// 3. Configuracion
	
	Escribir "Introduce un numero"
	Leer numero

	Segun numero
		1:
			Escribir "Iniciando videojuego"
		2:
			Escribir "Cargar partida"
		3:
			Escribir "Configuracion"
		De Otro Modo
			Escribir "Error. Introduce un valor entre 1, 2 o 3"
	FinSegun

FinAlgoritmo