var terminado = false;
var abierto = false;
var jugador;
var cambio = false;
var ws;
export class Matchmaking extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Matchmaking' });
    }

    preload() {
        //this.data.set("Terminado", false)
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('online', "/resources/img/Online.png");
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        // this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "Selección de modo", {
        //     fontSize: "40px",
        //     fill: "#ffffff"
        // }).setOrigin(0.5);
        this.texto = this.add.text(this.game.renderer.width * 0.5, this.game.renderer.height * 0.4, "Conectando con el servidor...", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        ws = new WebSocket('ws://localhost:8080/online');
        ws.onopen = function () {
            var msg = {tipo: "Busqueda", mensaje: "Abrir"}
            ws.send(JSON.stringify(msg));
        }
        ws.onerror = function (e) {
            console.log("WS error: " + e);
        }
        ws.onmessage = function (msg) {
            console.log("WS message: " + msg.data);
            var msj = JSON.parse(msg.data)
            var tipo = msj.tipo;
            if(tipo == "Busqueda"){
                var mensaje = msj.mensaje;
                if(mensaje == "Terminada"){
                    jugador = msj.jugador;
                    terminado = true;
                }else if(mensaje == "Abierta"){
                    abierto = true;
                }
            }
            cambio = true;
        }

        var onlineButton = this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.25, "online").setScale(0.24);

        this.anims.create({
            key: "mover",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("flecha", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        onlineButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        var atras = this.add.text(this.game.renderer.width * 0.07, this.game.renderer.height * 0.05, "Atrás", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Menu", {});
        })
    }

    update(){
        if(cambio){
            if(terminado){
                this.scene.start("SeleccionO", {jugador: jugador, socket:ws})
            }
            else if(abierto){
                this.texto.setText("Buscando partida...");
            }
            cambio = false;
        }
    }

}