import { victoria } from '../client.js';

jugador;
ws;

listo1;
listo2;
rechazada = true;

export class RevanchaO extends Phaser.Scene {

    constructor() {
        super({ key: 'RevanchaO' });
    }

    init(data) {
        this.Derecha = data.derecha;
        console.log(this.Derecha);
        jugador = data.jugador;
        ws = data.socket;

    }

    preload() {
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
        })

        this.textoNo.on("pointerdown", () => {
            rechazada = false;
            this.scene.start("Inicio", {});
        })

        ws.onmessage = function (msg) {
            cambio = true;
            console.log("WS message: " + msg.data);
            var msj = JSON.parse(msg.data)
            var tipo = msj.tipo;
            if(tipo == "Revancha"){
                var mensaje = msj.mensaje;
                if(mensaje == "Si"){
                    if(jugador==1){
                        listo2 = true;
                    }else{
                        listo1 == true;
                    }
                }else if(mensaje == "No"){
                    rechazada = true;
                }
            }
            cambio = true;
        }
    }

    update(){
        //Gestor
        if(cambio){
            if(rechazada){
                ws.close();
                this.textoRevancha.setText("El oponente se ha desconectado");
                this.textoSi.setVisible(false).removeInteractive();
                this.textoNo.setVisible(false).removeInteractive();
                this.textoSalir.setVisible(true).setInteractive();
                this.textoSalir.on("pointerdown", () => {
                    this.scene.start("Inicio", {});
                })
            }else if(listo1&&listo2){
                this.scene.start("SeleccionO", {jugador: jugador, socket: ws});
            }else if(listo1&&jugador==1||listo2&&jugador==2){
                this.textoRevancha.setText("Esperando al oponente...");
            }else if(listo1&&jugador==2||listo2&&jugador==2){
                this.textoRevancha.setText("¡El oponente quiere revancha!");
            }
        }
    }
}