import { victoria } from '../client.js';

var jugador;
var ws;

var listo1 = false;
var listo2 = false;
var rechazada1 = false;
var rechazada2 = false;
var cambio;
var desconectado;
export class RevanchaO extends Phaser.Scene {

    constructor() {
        super({ key: 'RevanchaO' });
    }

    init(data) {
        this.Derecha = data.derecha;
        console.log(this.Derecha);
        jugador = data.jugador;
        ws = data.socket;
        if (data.rechazar != undefined && data.rechazar == true)
            desconectado = true;
        else desconectado = false;
    }

    preload() {
        //desconectado = false;
        listo1 = false;
        listo2 = false;
        rechazada1 = false;
        rechazada2 = false;

        cambio = false;
        if (desconectado) {
            if (jugador == 1) {
                rechazada2 = true;
                this.Derecha = false;
            } else {
                rechazada1 = true;
                this.Derecha = true;

            }
            cambio = true;
        }


        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('player1', "/resources/img/Player1.png");
        this.load.image('player2', "/resources/img/Player2.png");
    }


    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        var textoGanador = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.15, "Ha ganado ", {
            fontStyle: "bold",
            fontSize: "65px",
            fill: "#e8d59e"
        }).setOrigin(0.5);
        if (!this.Derecha) {
            this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, "player1").setScale(0.5);
            if (this.scene.get('Inicio').data.get('logeado')) victoria(this.scene.get('Inicio').data.get('user'));
        } else {
            this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, "player2").setScale(0.5);
        }

        if (this.scene.get('Inicio').data.get('logeado')) {
            var usuarioGanador = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.25, this.scene.get('Inicio').data.get('user'), {
                fontStyle: "bold",
                fontSize: "75px",
                fill: "#e8d59e"
            }).setOrigin(0.5);
            console.log("Mensaje ganador")
        }

        this.textoRevancha = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.6, "¿Revancha?", {
            fontStyle: "bold",
            fontSize: "50px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        this.textoSalir = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.9, "Volver al menú principal", {
            fontStyle: "bold",
            fontSize: "50px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setVisible(false);

        this.textoSi = this.add.text(this.game.renderer.width * 0.4, this.game.renderer.height * 0.7, "Sí", {
            fontStyle: "bold",
            fontSize: "50px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();
        this.textoNo = this.add.text(this.game.renderer.width * 0.6, this.game.renderer.height * 0.7, "No", {
            fontStyle: "bold",
            fontSize: "50px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        this.textoSi.on("pointerdown", () => {
            //this.scene.start("Seleccion");
            var msg = { tipo: "Revancha", mensaje: "Si" }
            ws.send(JSON.stringify(msg));
            if (jugador == 1) {
                listo1 = true;
            } else {
                listo2 = true;
            }
            cambio = true;
        })

        this.textoNo.on("pointerdown", () => {
            if (jugador == 1) {
                rechazada1 = true;
            }
            else {
                rechazada2 = true;
            }
            var msg = { tipo: "Revancha", mensaje: "No" }
            ws.send(JSON.stringify(msg));
            cambio = true;
        })

        ws.onmessage = function (msg) {
            console.log("WS message: " + msg.data);
            var msj = JSON.parse(msg.data)
            var tipo = msj.tipo;
            if (tipo == "Revancha") {
                var mensaje = msj.mensaje;
                if (mensaje == "Si") {
                    if (jugador == 1) {
                        listo2 = true;
                        console.log("Jugador 2 listo");
                    } else {
                        listo1 = true;
                        console.log("Jugador 1 listo");
                    }
                } else if (mensaje == "No") {
                    if (jugador == 1) {
                        rechazada2 = true;
                    } else {
                        rechazada1 = true;
                    }
                } else if (tipo == "Desconectado") {
                    if (jugador == 1) rechazada2 = true;
                    if (jugador == 2) rechazada1 = true;
                }
            }
            console.log("A");
            cambio = true;
        }
    }

    update() {
        //Gestor
        if (cambio) {
            console.log(listo1);
            console.log(listo2);

            console.log("Cambio")

            if (rechazada1 || rechazada2) {
                this.textoSi.setVisible(false).removeInteractive();
                this.textoNo.setVisible(false).removeInteractive();
                ws.close();
                if (rechazada1) {
                    if (jugador == 1) {
                        this.scene.start("Inicio", {});
                    } else if (jugador == 2) {
                        this.textoRevancha.setText("El oponente se ha desconectado");
                        this.textoSalir.setVisible(true).setInteractive();
                    }
                } else if (rechazada2) {
                    if (jugador == 1) {
                        this.textoRevancha.setText("El oponente se ha desconectado");
                        this.textoSalir.setVisible(true).setInteractive();

                    } else if (jugador == 2) {

                        this.scene.start("Inicio", {});
                    }
                }
                this.textoSalir.on("pointerdown", () => {
                    this.scene.start("Inicio", {});
                })


            } else if (listo1 && listo2) {
                console.log("Ambos listos");
                this.scene.start("SeleccionO", { jugador: jugador, socket: ws });

            } else if ((listo1 && jugador == 1) || (listo2 && jugador == 2)) {
                this.textoSi.setVisible(false).removeInteractive();
                this.textoNo.setVisible(false).removeInteractive();
                this.textoSalir.setVisible(true).setInteractive();
                this.textoSalir.on("pointerdown", () => {
                    var salir = { tipo: "Revancha", mensaje: "No"};
                    ws.send(JSON.stringify(salir));
                    this.scene.start("Inicio", {});
                })

                console.log("Estoy listo");

                this.textoRevancha.setText("Esperando al oponente...");


            } else if ((listo1 && jugador == 2) || (listo2 && jugador == 1)) {
                console.log("El otro esta listo");
                this.textoSi.setText("Aceptar");
                this.textoNo.setText("Rechazar");
                this.textoRevancha.setText("¡El oponente quiere revancha!");
            }
            cambio = false;
        }
    }
}