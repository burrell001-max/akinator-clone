window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.es = {
  sudoku: [
    "- Cada fila, cada columna y cada caja deben contener cada dígito exactamente una vez.",
    "- Las cifras doradas vienen dadas y no cambian; Comprobar marca los errores sin revelar la solución.",
    "- El cronómetro empieza con tu primera entrada y se detiene en el momento en que se resuelve la cuadrícula.",
    "- Tu mejor tiempo para cada dificultad se guarda en este navegador y nunca sale del dispositivo."
  ],
  nonogram: [
    "- Los números junto a una fila o sobre una columna indican, en orden, las series de casillas llenas, con al menos un hueco entre ellas.",
    "- Marca con una cruz las casillas que hayas deducido vacías; una casilla marcada nunca cuenta como llena ni impide ganar.",
    "- Cualquier disposición que cumpla todas las pistas de filas y columnas vale como resuelta, porque la comprobación es sobre las pistas.",
    "- La cuadrícula diaria se genera a partir de la fecha, así que hoy es la misma para todos, y la racha cuenta los días consecutivos resueltos."
  ],
  merge: [
    "- Un movimiento cuenta solo si al menos una ficha cambia de sitio o dos fichas se fusionan.",
    "- Dos fichas se fusionan como mucho una vez por movimiento, así que una línea de cuatro iguales forma dos parejas y no una ficha gigante.",
    "- La puntuación es la suma de cada valor creado por una fusión: fusionar un par de 64 suma 128.",
    "- Tu mejor puntuación se guarda en este navegador con la clave mg-merge-best y nunca sale del dispositivo.",
    "- La ronda termina cuando el tablero está lleno y no quedan dos fichas vecinas iguales, y Nuevo tablero reinicia la puntuación."
  ],
  anagram: [
    "- 100 puntos por una palabra resuelta sin ayuda, 75 si se ha revelado la pista.",
    "- Un intento fallido no cuesta nada más que tiempo; sigue probando hasta acertar o pasar a la siguiente.",
    "- El mejor total de diez rondas se guarda en tu navegador, y las respuestas tienen de cinco a nueve letras y ningún nombre propio.",
    "- No se sube nada: la mejor puntuación vive solo en localStorage, en este dispositivo."
  ],
  wordguess: [
    "- Seis intentos para una palabra de cinco letras; verde es la letra correcta en el lugar correcto y amarillo la correcta en otro lugar.",
    "- Cada intento debe ser una palabra que el juego conozca, así que el teclado avisa cuando una entrada no está en la lista.",
    "- Cada partida nueva elige otra palabra, y tu racha de victorias se guarda en este navegador.",
    "- Quedarse sin intentos revela la palabra y termina la partida; la racha vuelve a cero."
  ],
  crossword: [
    "- Diez pistas por ronda, todas sacadas al azar de un banco de veintiséis.",
    "- Diez puntos por respuesta correcta, tres menos por cada pista usada en esa pregunta y nada por saltar.",
    "- La ortografía importa, pero las mayúsculas no: las respuestas se comparan en mayúsculas y sin espacios.",
    "- Tu mejor puntuación se guarda con la clave mg-clueclues-best en este navegador y nunca sale del dispositivo.",
    "- La ronda termina cuando el reloj llega a cero, y la casilla de respuesta se bloquea hasta que empieces otra vez."
  ],
  pairs: [
    "- Levanta dos cartas a la vez y deja la pareja boca arriba cuando coincidan.",
    "- Si no coinciden, se vuelven a girar al momento, así que recordar lo que viste es todo el juego.",
    "- La ronda termina cuando se emparejan las seis parejas; se cuentan los movimientos y el tiempo.",
    "- Tu mejor resultado se guarda en este navegador con una clave mg- y no se sube a ninguna parte."
  ],
  sequence: [
    "- Los números son enteros entre 1 y 99, todos distintos, y se ordenan de menor a mayor.",
    "- Las palabras son palabras corrientes, todas distintas, y se ordenan alfabéticamente sin distinguir mayúsculas.",
    "- Un clic que no sea el siguiente elemento del orden cuenta como error y el elemento sigue disponible.",
    "- Tu puntuación es el tiempo empleado; el mejor tiempo de cada conjunto y longitud se guarda en este navegador con la clave mg-sort-best.",
    "- Cambiar el conjunto o la longitud empieza una ronda nueva al instante."
  ],
  sort: [
    "- Los números van del 10 al 99, y cada número pertenece a una única caja.",
    "- Un punto por cada clasificación correcta y un punto menos por cada error, nunca por debajo de cero.",
    "- Tu racha de clasificaciones correctas más larga aparece destacada; tu mejor puntuación se guarda en este navegador con la clave mg-bins-best.",
    "- La ronda termina cuando el reloj llega a cero, y las cajas se bloquean hasta que vuelvas a empezar.",
    "- No se descarga nada y no se sube ninguna ronda: la puntuación vive solo en localStorage."
  ],
  math: [
    "- Fácil: sumas y restas con números hasta 20.",
    "- Medio: multiplicaciones del 2 al 12, divisiones exactas y sumas o restas pequeñas hasta 30.",
    "- Difícil: multiplicaciones hasta 20, divisiones exactas y sumas o restas con números hasta 100.",
    "- Un punto por respuesta correcta, sin bonus por rapidez dentro de la ronda: el reloj es la presión.",
    "- Tu mejor puntuación en cada dificultad se guarda en este navegador con la clave mg-math-best.",
    "- Cuando el reloj llega a cero la ronda termina y la entrada se bloquea hasta que vuelvas a empezar."
  ],
  slide: [
    "- Solo se mueve la ficha que comparte un lado con el hueco; las vecinas en diagonal no pueden.",
    "- Cada barajado sale de unos cientos de movimientos legales desde el tablero resuelto, así que siempre existe solución.",
    "- Tu puntuación es el número de movimientos, con el tiempo como desempate para tus propios registros.",
    "- El mejor número de movimientos de cada tamaño de tablero se guarda en este navegador con la clave mg-slide-best.",
    "- Barajar empieza un tablero nuevo, reinicia los contadores y conserva la mejor puntuación."
  ],
  pattern: [
    "- Cinco secuencias al día, un intento para cada una y siempre con respuestas enteras.",
    "- Las respuestas solo pueden ser negativas en el conjunto de restas, y aun ahí la secuencia se mantiene por encima de cero.",
    "- Tu mejor día es el mayor número de aciertos de cinco, guardado con la clave mg-pattern-best.",
    "- La racha diaria se guarda con la clave mg-pattern-streak y cuenta los días consecutivos en que completaste el conjunto.",
    "- Reiniciar vuelve a jugar los cinco puzles de hoy; no genera otros nuevos."
  ],
  codebreak: [
    "- Fácil: tres cifras del 1 al 5, sin repetir, ocho intentos.",
    "- Medio: cuatro cifras del 1 al 6, con repeticiones, diez intentos.",
    "- Difícil: cinco cifras del 1 al 8, con repeticiones, doce intentos.",
    "- Ganas si aciertas el código exacto; tu puntuación es el número de intentos usados, y la mejor puntuación de cada dificultad se guarda en tu navegador.",
    "- Quedarse sin intentos revela el código, y la ronda cuenta como derrota: la mejor puntuación no se toca."
  ]
};
