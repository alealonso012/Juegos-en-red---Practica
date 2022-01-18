# Camlann

## Integrantes del equipo:
#### Alejandro Alonso Pérez; Correo: a.alonsop.2019@alumnos.urjc.es; Cuenta: alealonso012.
#### Félix Álvarez Diez; Correo: f.alvarezd.2019@alumnos.urjc.es; Cuenta: FelinexA10.
#### Jordan Alejandro Amaya Carmona; Correo: ja.amaya.2019@alumnos.urjc.es; Cuenta: JAAmaya.
#### Javier Sanchez Muñoz; Correo: j.sanchezm.2019@alumnos.urjc.es; Cuenta: Whikkot.

### Concepto general del videojuego. 
###### El juego tiene como base duelos entre dos jugadores con diferentes armas blancas en distintas arenas de combate. Con cada duelo ganado, se avanzará una arena hacia el lado rival y el jugador que se quede sin terreno perderá la partida.


### Historia 
###### En una época medieval fantástica, los reinos vasallos de un imperio luchan en un torneo llamado el “OnePaOne” para demostrar al emperador quién tiene el guerrero más fuerte, pues este se volverá el terrateniente y defensor principal del imperio, con grandes recompensas para su reino. Numerosos luchadores de cada reino ofrecen sus habilidades para llevar la victoria a su patria y ser reconocidos como el mejor caballero.


### Diseño de niveles 
###### El diseño de nivel será bidimensional con escenarios con movimiento horizontal y diferentes plataformas verticales y caídas según en qué arena y lugar tenga lugar el duelo. Los escenarios tendrán límites en el movimiento horizontal y se cambiará de arena dentro del mismo mapa general cada vez que termine un duelo.
###### Los escenarios aprovecharán físicas no realistas para su ejecución, usando plataformas flotantes y paredes atravesables para aumentar la interacción con los mismos.
###### El diseño de cada arena usará una paleta de colores  más enfocada hacia el rojo o el azul, para indicar cuál de los dos jugadores va perdiendo y estimar cuál es la diferencia actual de victorias entre ambos jugadores. El mapa neutral (ambos jugadores han ganado las mismas veces) usará una paleta gris.


### Gameplay 
###### El objetivo principal del jugador es vencer a su rival con una diferencia de 3 victorias, momento en el que se declarará vencedor del combate, para esto contará con diferentes movimientos y habilidades según el personaje y arma equipada del mismo, estos se dividirán en:

#### **- Movimiento general:**
###### Todos los personajes contarán con movilidad lateral, un salto y la capacidad de agacharse.

#### **- Estocada / Ataque rápido:**
###### Un ataque rápido en línea recta por la postura que se esté usando en ese momento, para defenderse de este ataque basta con la defensa automática, por lo que este ataque se hará con intención de sorprender al rival.

#### **- Cuchillada / Ataque fuerte:**
###### Un ataque cortante y más lento y coreografiado desde la postura actual, solo se puede defender de este ataque con otra cuchillada o con una parada, si el ataque llega hasta la defensa rival, creará una apertura para lanzar un ataque más seguro.

#### **- Cambio de postura:** 

###### Movimiento veloz en el que el personaje cambiará su postura de combate entre baja, media y alta. El personaje se defenderá automáticamente por la postura en la que se encuentre siempre que no esté atacando y atacará y parará por esta misma postura. Los movimientos variarán en forma y velocidad según postura adoptada.

#### **- Defensa pasiva:**
###### Mecánica general en la que un personaje se defiende automáticamente de cualquier ataque que llegue por la misma altura que su postura. Si se defiende de un lanzamiento de arma o de una cuchillada quedará sin defensa pasiva durante un breve lapso de tiempo. 

#### **- Parada:** 
###### Movimiento rápido defensivo, este movimiento rechaza un ataque rival y le deja sin defensa automática durante un tiempo para permitir un contraataque. Además es capaz  de parar cuchilladas.

#### **- Paso rápido:** 
###### Movimiento veloz hacia adelante o atrás,usado principalmente para acercarse  rápidamente al enemigo o esquivar un ataque, se puede realizar una estocada especial tras el mismo que contará con un poco más de rango y defensa automática durante la misma.

#### **- Lanzar arma:** 
###### Movimiento rápido que lanzará el arma actual por la postura actual, dejando al usuario desarmado. Si el arma alcanza al rival en el pecho o cabeza, será eliminado, si le alcanza en los pies lo tirará al suelo. Uno puede defenderse de este ataque con la defensa automática o con la parada. 


###### Mientras el personaje está en el aire no tiene defensa automática y se considera que tiene postura alta, mientras que se agacha se considera que está en postura baja y no puede dar pasos rápidos. 
###### Todos los personajes serán derrotados al recibir cualquier movimiento ofensivo sin defenderse, a menos de que se especifique lo contrario en la descripción del ataque.
###### El gameplay estará influenciado por el personaje y arma elegidos en la selección de personaje, ya que según el arma  variará el rango de las estocadas y las cuchilladas (desde cómo de lejos es capaz de acertar un golpe) y la potencia de las cuchilladas y las paradas (la cantidad de tiempo que el rival pierde su defensa pasiva tras acertar). Cada personaje tendrá acceso a diferentes armas relacionadas con el reino al que pertenecen. 
###### Habrá tres clases de armas: Ligera, media, pesada. 
###### Tres personajes, uno de cada reino, cada uno con dos armas (Ampliable)
###### Las armas ligeras se especializan en los ataques rápidos y pasos rápidos, tratando de sorprender al rival con cambios de postura y contraataques tras defenderse. A cambio tendrán ataques fuertes menos potentes y paradas menos duraderas.
###### Las armas medias no destacan en ninguna clase de ataque, pero se benefician de una parada más fuerte respecto al resto de clases. Es la clase de arma más equilibrada. 
###### Las armas pesadas tendrán mejores ataques fuertes y más duración en sus paradas, pero sus pasos rápidos y estocadas serán más lentos. Su estilo de combate se relacionará en hostigar la defensa del rival.


### Interfaz de usuario y controles del juego

###### Respecto a la interfaz de usuario in-game, como barras de vida o minimapa, el juego carecería de estas al tratar de tener un estilo en pantalla lo más limpio posible. Toda la información necesaria para el jugador durante la partida se incluirá de manera directa en el juego en sí, sin ventanas ni interfaces externas. 
###### En cuanto a los controles, el juego se jugaría con mando o con teclado y cada acción del juego estaría asociado a una tecla/botón diferente, esto se podría modificar en el menú de opciones.

Acción | Teclado | Mando (DS4)
------------ | ------------- | -------------
Movimiento lateral | AD | Joystick izq. horizontal 
Agacharse | S | Joystick izq. abajo
Saltar | W | Cruz
Bajar de plataforma | S (Doble) | Joystick izq. abajo (doble)
Paso rápido | Espacio | Círculo
Cambiar postura | M/N | Joystick derecho
Estocada | K | R1
Cuchillada | J | R2
Lanzar arma | L | Triángulo
Parada | V | L1
Rendición | Escape (Mantener) | Cuadrado+L2 (Mantener)


### Arte
###### El estilo visual del videojuego sería minimalista con una ambientación de fantasía medieval.
###### Los escenarios serán poco detallados y con colores apagados para resaltar la acción y los personajes. Habrá un total de 7 pantallas en las cuales se verá reflejado el jugador que lleva la ventaja mediante el entorno y los colores. 
###### En cuanto a los avatares, serían todos bastante similares en cuanto a simplicidad y diseño, basándose en guerreros reales de distintas partes del mundo y de la historia. Se diferenciarán en un color característico que identifica a cada jugador y algunos detalles como por ejemplo accesorios, sombreros, etc. Las posturas de dichos personajes serán diferentes debido a que proceden de distintos reinos. 
###### Por último cada arma tendrá un aspecto único para poder identificarla fácilmente. Estas estarán inspiradas en armas reales que concuerden con la ambientación, como espadas, mandobles o alabardas. 
###### Además cada reino estará basado en una facción histórica diferenciable, los tres primeros estarán basados en caballeros medievales, bárbaros y samuráis. Las armas que usará el personaje, así como su diferenciación respecto al resto de personajes serán correspondientes con su símil histórico.


### Sonido y música
###### El estilo de música utilizado será medieval melódico, es decir, sin letra en las que destacan instrumentos de estilo de la época medieval. Inspirada en bandas sonoras de juegos como los de la saga “The Witcher”.
###### La intensidad de la música cambiaría dependiendo de si el jugador está en los menús siendo esta más calmada, en la selección de personaje en la que sería un poco más animada o en la batalla in-game en la que tendría bastante intensidad.

# Fase 2
## Flujo de pantallas
##### Como se puede ver en la imagen, tenemos una pantalla inicial y de esta se puede navegar hasta la pestaña de opciones y a la pestaña de jugar. Desde la pantalla de opciones se podrá volver a la pantalla inicial mediante el botón de salir. Si le hemos dado al botón de jugar iremos a la pantalla de selección de modo en la cual podemos elegir entre jugar local u online. El botón de jugar online no funciona porque en esta fase no se pedia jugar online y el botón de local te lleva a la selección de personaje donde ambos jugadores elegirán con quien querrán jugar. Una vez ambos jugadores esten listos se pasara a las escenas in-game las cuales son varias y se irán saltando de unas otras dependiendo del jugador que gane cada ronda. Una vez un jugador gane la partida se ira a la pantalla de revancha la cual te dará la opción de volver a jugar o no. Si se selecciona la opción de volver a jugar te llevará a la pantalla de selección de personajes y si se le da a no te llevará a la pantalla de inicio del juego.
<img src=".\ImagenesReadme\FlujoDePantallas.png">

### Escena de menu principal:
##### Esta escena esta compuesta de un fondo y dos botones(jugar y opciones), que sirven unicamente para llevarte a las pantallas siguientes: selección de modo y opciones. Todos los diseños de esta escena son propios.
<img src=".\ImagenesReadme\MenuPrincipal.png">

### Escena de opciones:
##### En este escena los jugadores tendrán las posibilidades de modificar el volumen de la musica de fondo si asi lo desean y de volver al menu principal por el botón de salir. Todos los diseños de esta escena son propios.
<img src=".\ImagenesReadme\Opciones.png">

### Escena de controles
##### En esta escena se muestra una imagen de los controles de ambos personajes y un botón de atrás que te lleva a la pantalla anterior, en este caso, la pantalla de opciones.
<img src=".\ImagenesReadme\controlesFoto.png">

### Escena de selección de modo
##### En esta escena el jugador podrá elegir entre jugar local u online. La opción de jugar online no funciona porque para esta entrega no había que implementarlo. Pero el botón de jugar en local si que funciona y te llevaria  a la pantalla de selección de personaje.
<img src=".\ImagenesReadme\selectorModo.png">

### Escena de selección de personaje
##### En esta escena ambos jugadores podrán elegir sus respectivos personajes pulsando las banderitas que representan a cada uno. Una vez ambos jugadores hayan elegido sus personajes deberán darle los dos al botón de listo para que empiece la partida. Todos los diseños de esta escena son propios.
<img src=".\ImagenesReadme\SelectorPersonaje.png">

### Escenas In-game
##### Estas son un conjunto de 5 escenas entre las que los jugadores iran cambiando según vayan gananado rondas hasta que uno de los jugadores acumule 3 victorias seguidas. Los diseño de estas escenas no son propios debido a que el fondo del escenario y los tiles utilizados son sacados de internet de páginas de assets de uso gratutito. Las cuales son:
##### Fondo del escenario: https://oisougabo.itch.io/free-platformer-16x16?download
##### Mapa de tiles: https://szadiart.itch.io/pixel-dark-forest
<img src=".\ImagenesReadme\InGame.png">

### Pantalla de revancha
##### Una vez uno de los dos jugadores haya ganado te llevará a esta pantalla en la cual se anunciará el jugador ganador y le dará la opción de una revancha a la cual si se le da a que si llevará a la pantalla de selección de personaje y si se le da a que no, llevará a la pantalla de menú principal.
<img src=".\ImagenesReadme\Revancha.png">

# Fase 3

## Diagrama de clases
<img src=".\ImagenesReadme\DiagramaClases.png">

### Pantalla de créditos
##### En esta pantalla se ven todos los reconocimientos a los participantes en el desarrollo del juego
<img src=".\ImagenesReadme\Creditos.png">

### Pantalla de Log In / Register
##### En esta pantalla los usuarios podrán crearse una cuenta con nombre de usuario y contraseña para que se les registre su puntuación en el juego
<img src=".\ImagenesReadme\Login.png">

### Pantalla de Ranking de puntuaciones
##### En esta pantalla se ven todos los records de partidas ganadas de los usuarios registrados en el juego
<img src=".\ImagenesReadme\LeaderBoard.png">

# Fase 4
## Actualización diagrama de clases
##### En la siguiente imagen se muestran las diferentes clases de la API REST para establecer conexión entre usuario y servidor, más las utilizadas para manejar todo lo referente al uso de WebSockets
<img src=".\ImagenesReadme\DiagramaDeClasesActualizado.png">

##### La música que se escuchará a lo largo del juego serán canciones sacados de internet de libre uso.
##### Menus: {Stopping by the Inn} by Twin Musicom (twinmusicom.org)
##### In-game: {Epic Battle} by Twin Musicom (twinmusicom.org)
