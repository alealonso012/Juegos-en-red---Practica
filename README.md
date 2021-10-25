# OnePaOne
### Concepto general del videojuego. 
El juego tiene como base duelos entre dos jugadores con diferentes armas blancas en distintas arenas de combate. Con cada duelo ganado, se avanzará una arena hacia el lado rival y el jugador que se quede sin terreno perderá la partida. 
### Historia 
En una época medieval fantástica, los reinos vasallos de un imperio luchan en un torneo llamado el “OnePaOne” para demostrar al emperador quién tiene el guerrero más fuerte, pues este se volverá el terrateniente y defensor principal del imperio, con grandes recompensas para su reino. Numerosos luchadores de cada reino ofrecen sus habilidades para llevar la victoria a su patria y ser reconocidos como el mejor caballero.
### Diseño de niveles 
El diseño de nivel será bidimensional con escenarios con movimiento horizontal y diferentes plataformas verticales y caídas según en qué arena y lugar tenga lugar el duelo. Los escenarios tendrán límites en el movimiento horizontal y se cambiará de arena dentro del mismo mapa general cada vez que termine un duelo.
Los escenarios aprovecharán físicas no realistas para su ejecución, usando plataformas flotantes y paredes atravesables para aumentar la interacción con los mismos.
El diseño de cada arena usará una paleta de colores  más enfocada hacia el rojo o el azul, para indicar cuál de los dos jugadores va perdiendo y estimar cuál es la diferencia actual de victorias entre ambos jugadores. El mapa neutral (ambos jugadores han ganado las mismas veces) usará una paleta gris.
### Gameplay 
El objetivo principal del jugador es vencer a su rival con una diferencia de 3 victorias, momento en el que se declarará vencedor del combate, para esto contará con diferentes movimientos y habilidades según el personaje y arma equipada del mismo, estos se dividirán en:
 **- Movimiento general:**
Todos los personajes contarán con movilidad lateral, un salto y la capacidad de agacharse.
 **- Estocada / Ataque rápido:**
Un ataque rápido en línea recta por la postura que se esté usando en ese momento, para defenderse de este ataque basta con la defensa automática, por lo que este ataque se hará con intención de sorprender al rival.
 **- Cuchillada / Ataque fuerte:**
Un ataque cortante y más lento y coreografiado desde la postura actual, solo se puede defender de este ataque con otra cuchillada o con una parada, si el ataque llega hasta la defensa rival, creará una apertura para lanzar un ataque más seguro.
**- Cambio de postura:** 
Movimiento veloz en el que el personaje cambiará su postura de combate entre baja, media y alta. El personaje se defenderá automáticamente por la postura en la que se encuentre siempre que no esté atacando y atacará y parará por esta misma postura. Los movimientos variarán en forma y velocidad según postura adoptada.
**- Defensa pasiva:**
Mecánica general en la que un personaje se defiende automáticamente de cualquier ataque que llegue por la misma altura que su postura. Si se defiende de un lanzamiento de arma o de una cuchillada quedará sin defensa pasiva durante un breve lapso de tiempo. 
**- Parada:** 
Movimiento rápido defensivo, este movimiento rechaza un ataque rival y le deja sin defensa automática durante un tiempo para permitir un contraataque. Además es capaz  de parar cuchilladas.
**- Paso rápido:** 
Movimiento veloz hacia adelante o atrás,usado principalmente para acercarse  rápidamente al enemigo o esquivar un ataque, se puede realizar una estocada especial tras el mismo que contará con un poco más de rango y defensa automática durante la misma.
**- Lanzar arma:** 
Movimiento rápido que lanzará el arma actual por la postura actual, dejando al usuario desarmado. Si el arma alcanza al rival en el pecho o cabeza, será eliminado, si le alcanza en los pies lo tirará al suelo. Uno puede defenderse de este ataque con la defensa automática o con la parada. 
Mientras el personaje está en el aire no tiene defensa automática y se considera que tiene postura alta, mientras que se agacha se considera que está en postura baja y no puede dar pasos rápidos. 
Todos los personajes serán derrotados al recibir cualquier movimiento ofensivo sin defenderse, a menos de que se especifique lo contrario en la descripción del ataque.
El gameplay estará influenciado por el personaje y arma elegidos en la selección de personaje, ya que según el arma  variará el rango de las estocadas y las cuchilladas (desde cómo de lejos es capaz de acertar un golpe) y la potencia de las cuchilladas y las paradas (la cantidad de tiempo que el rival pierde su defensa pasiva tras acertar). Cada personaje tendrá acceso a diferentes armas relacionadas con el reino al que pertenecen. 
Habrá tres clases de armas: Ligera, media, pesada. 
Tres personajes, uno de cada reino, cada uno con dos armas (Ampliable)
Las armas ligeras se especializan en los ataques rápidos y pasos rápidos, tratando de sorprender al rival con cambios de postura y contraataques tras defenderse. A cambio tendrán ataques fuertes menos potentes y paradas menos duraderas.
Las armas medias no destacan en ninguna clase de ataque, pero se benefician de una parada más fuerte respecto al resto de clases. Es la clase de arma más equilibrada. 
Las armas pesadas tendrán mejores ataques fuertes y más duración en sus paradas, pero sus pasos rápidos y estocadas serán más lentos. Su estilo de combate se relacionará en hostigar la defensa del rival.

