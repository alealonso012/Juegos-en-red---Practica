import { Inicio } from './Scenes/Inicio.js';
import { Opciones } from './Scenes/Opciones.js';
import { Controles } from './Scenes/Controles.js';
import { Menu } from './Scenes/Menu.js';
import { Revancha } from './Scenes/Revancha.js';
import { Seleccion } from './Scenes/Seleccion.js';
import { Escenario } from './Scenes/Escenario.js';
import { Creditos } from './Scenes/Creditos.js';
import { Logear } from './Scenes/Logear.js';
import { Registear } from './Scenes/Registear.js';
import { Leaderboard } from './Scenes/Leaderboard.js';

var inicio = new Inicio();
var opciones = new Opciones();
var controles = new Controles();
var menu = new Menu();
var revancha = new Revancha();
var seleccion = new Seleccion();
var creditos = new Creditos();
var logear = new Logear();
var registear = new Registear();
var leaderboard = new Leaderboard();

var Esc1 = new Escenario('Esc1', 'Revancha', 'Esc2', '/resources/img/Escenario5.json');
var Esc2 = new Escenario('Esc2', 'Esc1', 'Esc3', '/resources/img/Escenario3.json');
var Esc3 = new Escenario('Esc3', 'Esc2', 'Esc4', '/resources/img/Escenario1.json');
var Esc4 = new Escenario('Esc4', 'Esc3', 'Esc5', '/resources/img/Escenario2.json');
var Esc5 = new Escenario('Esc5', 'Esc4', 'Revancha', '/resources/img/Escenario4.json');

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'da',
    dom: {
        createContainer: true
    },
    backgroundColor: '#140f0f',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3500 },
            debug: false,
            debugShowBody: false
        }
    },
    scene: [inicio, opciones, logear, registear, leaderboard, creditos,  controles, menu, revancha, seleccion, Esc1, Esc2, Esc3, Esc4, Esc5],
    render: {
        pixelArt: true
    }
};

var game = new Phaser.Game(config);

