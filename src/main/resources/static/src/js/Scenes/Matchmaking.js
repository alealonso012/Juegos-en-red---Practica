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
        ws = null;
        terminado = false;
        abierto = false;
        cambio = false;
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('online', "/resources/img/Online.png");
        this.load.image('Atras', "/resources/img/atras.png");
        this.load.image('Atras2', "/resources/img/atras2.png");

        this.load.bitmapFont(
            'Alagard',
            './src/fonts/Alagard.png',
            './src/fonts/Alagard.xml'
        );
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        // this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "Selección de modo", {
        //     fontSize: "40px",
        //     fill: "#ffffff"
        // }).setOrigin(0.5);
        this.texto = this.add.bitmapText(this.game.renderer.width * 0.5, this.game.renderer.height * 0.4, "Alagard", "Conectando con el servidor...")
        .setScale(1).setTint(0xe8d59e).setOrigin(0.5);

        ws = new WebSocket('ws://192.168.1.129:8080/online');
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

        this.anims.create({
            key: "mover",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("flecha", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        var atras = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.075, "Atras2")
            .setOrigin(0.5).setScale(0.6).setInteractive();

        atras.on("pointerdown", () => {
            ws.close();
            this.scene.start("Menu", {});
        });

        atras.on("pointerover", () => {
            atras.setTexture("Atras");
        });

        atras.on("pointerout", () => {
            atras.setTexture("Atras2");
        });
    }

    update(){
        if(cambio){
            if(terminado){
                this.scene.start("SeleccionO", {jugador: jugador, socket:ws, rechazar: undefined})
            }
            else if(abierto){
                this.texto.setText("Buscando partida...");
            }
            cambio = false;
        }
    }

}