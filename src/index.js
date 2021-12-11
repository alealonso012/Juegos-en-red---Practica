import { Inicio } from './js/Scenes/Inicio.js';
import { Opciones } from './js/Scenes/Opciones.js';
import { Menu } from './js/Scenes/Menu.js';
import { Seleccion } from './js/Scenes/Seleccion.js';
import { Escenario1 } from './js/Scenes/Escenario1.js';
import { Escenario2 } from './js/Scenes/Escenario2.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#140f0f',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Inicio, Opciones, Menu, Seleccion, Escenario1, Escenario2],
    render:{
        pixelArt: true
    }
};
var game = new Phaser.Game(config);