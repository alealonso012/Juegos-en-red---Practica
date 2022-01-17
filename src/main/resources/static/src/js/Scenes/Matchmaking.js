export class Matchmaking extends Phaser.Scene {

    constructor() {
        super({ key: 'Matchmaking' });
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('online', "/resources/img/Online.png");
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        // this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "Selección de modo", {
        //     fontSize: "40px",
        //     fill: "#ffffff"
        // }).setOrigin(0.5);

        var ws = new WebSocket('ws://localhost:8080/online');
        ws.onopen = function () {
            var msg = {tipo: "Busqueda", mensaje: "Abrir"}
            ws.send(JSON.stringify(msg));
        }
        ws.onerror = function (e) {
            console.log("WS error: " + e);
        }
        ws.onmessage = function (msg) {
            console.log("WS message: " + msg.data);
        }

        var onlineButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.53, "online").setScale(0.24);

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

}