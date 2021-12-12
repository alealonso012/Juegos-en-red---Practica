import { Inicio } from './js/Scenes/Inicio.js';
import { Opciones } from './js/Scenes/Opciones.js';
import { Controles } from './js/Scenes/Controles.js';
import { Menu } from './js/Scenes/Menu.js';
import { Revancha } from './js/Scenes/Revancha.js';
import { Seleccion } from './js/Scenes/Seleccion.js';
import { Escenario1 } from './js/Scenes/Escenario1.js';
import { Escenario2 } from './js/Scenes/Escenario2.js';
import { Escenario3 } from './js/Scenes/Escenario3.js';
import { Escenario4 } from './js/Scenes/Escenario4.js';
import { Escenario5 } from './js/Scenes/Escenario5.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#140f0f',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug : true,
            debugShowBody : true
        }
    },
    scene: [Inicio, Opciones, Controles, Menu, Revancha, Seleccion, Escenario1, Escenario2, Escenario3, Escenario4, Escenario5],
    render:{
        pixelArt: true
    }
};
var game = new Phaser.Game(config);
