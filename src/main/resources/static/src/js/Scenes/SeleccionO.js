var jugador;
var ws;
var bListo1 = false;
var bListo2 = false;
var bSelec1 = false;
var bSelec2 = false;
var desconectado = false;
var j1 = "JUGADOR 1";
var j2 = "JUGADOR 2";
var tListo;

export class SeleccionO extends Phaser.Scene {

    constructor() {
        super({ key: 'SeleccionO' });
    }

    init(data) {
        // this.data.set("jugador", data.jugador);
        // this.data.set("socket", data.socket);
        // console.log(this.data.get("jugador"));
        jugador = data.jugador;
        ws = data.socket;
    }

    preload() {
        bListo1 = false;
        bListo2 = false;
        bSelec1 = false;
        bSelec2 = false;
        desconectado = false;

        this.load.image('selectscreen', "/resources/img/SelectScreen.png");
        this.load.image('borde', "/resources/img/Characterborder.png");
        this.load.image('borde2', "/resources/img/Readyborder.png");
        this.load.image('listo1', "/resources/img/Listo.png");
        this.load.image('listo2', "/resources/img/Listo2.png");
        this.load.audio('battlemusic', '/resources/music/EpicBattle.mp3');
        this.load.spritesheet("character", "/resources/img/CharacterSelect.png", {
            frameHeight: 600,
            frameWidth: 500
        });
        if (this.scene.get("Inicio").data.get("ingles")) {
            j1 = "PLAYER 1";
            j2 = "PLAYER 2";
            tListo = "READY";
        }
        else {
            j1 = "JUGADOR 1";
            j2 = "JUGADOR 2";
            tListo = "LISTO";
        }
    }

    create() {
        this.music1 = this.sound.add('battlemusic', { volume: this.scene.get('Inicio').music1.volume });
        this.sound.stopAll();
        this.music1.play({ loop: true });

        this.add.image(0, 0, "selectscreen").setScale(1).setOrigin(0);
        var jugador1 = this.add.bitmapText(this.game.renderer.width * 0.265, this.game.renderer.height * 0.065, "Alagard", j1)
            .setScale(1.4).setTint(0xaf0080).setOrigin(0.5);

        var jugador2 = this.add.bitmapText(this.game.renderer.width * 0.745, this.game.renderer.height * 0.065, "Alagard", j2)
            .setScale(1.4).setTint(0X00ff00).setOrigin(0.5);
        this.rect1 = this.add.rectangle(this.game.renderer.width * 0.095, this.game.renderer.height * 0.588, 210, 330, 0xffffff, 0).setInteractive();
        var rect2 = this.add.rectangle(this.game.renderer.width * 0.204945, this.game.renderer.height * 0.588, 210, 330, 0xffffff, 0).setInteractive();
        this.rect3 = this.add.rectangle(this.game.renderer.width * 0.575, this.game.renderer.height * 0.588, 210, 330, 0xffffff, 0).setInteractive();
        var rect4 = this.add.rectangle(this.game.renderer.width * 0.6845, this.game.renderer.height * 0.588, 210, 330, 0xffffff, 0).setInteractive();
        this.select1 = false;
        this.select2 = false;
        this.ready1 = false;
        this.ready2 = false;

        var listo = this.add.rectangle(this.game.renderer.width * 0.26, this.game.renderer.height * 0.875, 300, 110, 0xffffff, 0).setInteractive();
        var listo2 = this.add.rectangle(this.game.renderer.width * 0.74, this.game.renderer.height * 0.875, 300, 110, 0xffffff, 0).setInteractive();

        this.hover1Img = this.add.image(0, this.rect1.y, "borde").setVisible(false);
        this.hover2Img = this.add.image(0, this.rect1.y, "borde").setVisible(false);

        this.RecuadroIzq = this.add.image(listo.x, listo.y, "borde2").setVisible(false);
        this.RecuadroDcha = this.add.image(listo2.x, listo2.y, "borde2").setVisible(false);
        this.add.bitmapText(this.game.renderer.width * 0.265, this.game.renderer.height * 0.88, "Alagard", tListo).setScale(1.1).setTint(0x311b24).setOrigin(0.5);
        this.add.bitmapText(this.game.renderer.width * 0.74, this.game.renderer.height * 0.88, "Alagard", tListo).setScale(1.1).setTint(0x311b24).setOrigin(0.5);
        this.ListoImg = this.add.bitmapText(this.game.renderer.width * 0.2, this.game.renderer.height * 0.88, "Alagard", tListo).setScale(1.1).setVisible(false).setOrigin(0.5);
        this.Listo2Img = this.add.bitmapText(this.game.renderer.width * 0.74, this.game.renderer.height * 0.88, "Alagard", tListo).setScale(1.1).setVisible(false).setOrigin(0.5);

        this.CharacterDown = this.add.sprite(100, 100, "character");
        this.CharacterDown.setScale(1.2);
        this.CharacterDown.setVisible(false);
        this.CharacterDown.setTint("0xaf0080");

        this.CharacterDown2 = this.add.sprite(100, 100, "character");
        this.CharacterDown2.setScale(1.2);
        this.CharacterDown2.setVisible(false);
        this.CharacterDown2.setTint("0x00ff00");
        this.CharacterDown2.flipX = true;

        this.anims.create({
            key: "idleSelec",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                frames: [0, 1]
            })
        })

        this.CharacterDown.play("idleSelec");
        this.CharacterDown2.play("idleSelec");
        if (jugador == 1) {
            this.rect1.on("pointerover", () => {
                if (!this.select1) {
                    this.hover1Img.setVisible(true);
                    this.hover1Img.setX(this.rect1.x);
                }
            })
            this.rect1.on("pointerout", () => {
                if (!this.select1) this.hover1Img.setVisible(false);
            })
            this.rect1.on("pointerdown", () => {
                this.CharacterDown.setVisible(true);
                this.CharacterDown.x = this.game.renderer.width * 0.28;
                this.CharacterDown.y = this.game.renderer.height * 0.33;
                this.CharacterDown.play("idleSelec");
                this.hover1Img.setX(this.rect1.x);
                this.select1 = true;
                var msg = { tipo: "Seleccion", mensaje: "Selec1" }
                ws.send(JSON.stringify(msg));
            })

            rect2.on("pointerover", () => {
                if (!this.select1) {
                    this.hover1Img.setVisible(true);
                    this.hover1Img.setX(rect2.x);
                }
            })
            rect2.on("pointerout", () => {
                if (!this.select1) this.hover1Img.setVisible(false);
            })
            rect2.on("pointerdown", () => {
                this.hover1Img.setX(rect2.x);
                this.select1 = true;
                var msg = { tipo: "Seleccion", mensaje: "Selec2" }
                ws.send(JSON.stringify(msg));
            })
            listo.on("pointerdown", () => {
                if (this.select1) {
                    this.RecuadroIzq.setVisible(true);
                    this.ListoImg.setVisible(true);
                    this.ready1 = true;
                    var msg = { tipo: "Seleccion", mensaje: "Listo" }
                    ws.send(JSON.stringify(msg));
                }
            })
        } else {
            this.rect3.on("pointerover", () => {
                if (!this.select2) {
                    this.hover2Img.setVisible(true);
                    this.hover2Img.setX(this.rect3.x);
                }
            })
            this.rect3.on("pointerout", () => {
                if (!this.select2) this.hover2Img.setVisible(false);
            })
            this.rect3.on("pointerdown", () => {
                this.CharacterDown2.setVisible(true);
                this.CharacterDown2.x = this.game.renderer.width * 0.72;
                this.CharacterDown2.y = this.game.renderer.height * 0.33;
                this.CharacterDown2.play("idleSelec");
                this.hover2Img.setX(this.rect3.x);
                this.select2 = true;
                var msg = { tipo: "Seleccion", mensaje: "Selec1" }
                ws.send(JSON.stringify(msg));
            })

            rect4.on("pointerover", () => {
                if (!this.select2) {
                    this.hover2Img.setVisible(true);
                    this.hover2Img.setX(rect4.x);
                }

            })
            rect4.on("pointerout", () => {
                if (!this.select2) this.hover2Img.setVisible(false);
            })
            rect4.on("pointerdown", () => {
                this.hover2Img.setX(rect4.x);
                this.select2 = true;
            })




            listo2.on("pointerdown", () => {
                if (this.select2) {
                    this.RecuadroDcha.setVisible(true);
                    this.Listo2Img.setVisible(true);
                    this.ready2 = true;
                    var msg = { tipo: "Seleccion", mensaje: "Listo" }
                    ws.send(JSON.stringify(msg));
                }
            })

        }
        ws.onmessage = function (msg) {
            console.log("WS message: " + msg.data);
            var msj = JSON.parse(msg.data)
            var tipo = msj.tipo;
            var mensaje = msj.mensaje;
            if (tipo == "Seleccion") {
                if (jugador == 2) {
                    if (mensaje == "Selec1") {
                        bSelec1 = true;
                    } else if (mensaje == "Listo") {
                        bListo1 = true;
                    }
                } else {
                    if (mensaje == "Selec1") {
                        bSelec2 = true;
                    } else if (mensaje == "Listo") {
                        bListo2 = true;
                    }
                }
            } else if (tipo == "Desconectado") {
                desconectado = true;
            }
        }
    }

    update() {
        if (this.ready1 && this.ready2) this.scene.start("EscO3", { derecha: true, jugador: jugador, socket: ws });
        if (bListo1) {
            this.RecuadroIzq.setVisible(true);
            this.ListoImg.setVisible(true);
            this.ready1 = true;
        }
        if (bListo2) {
            this.RecuadroDcha.setVisible(true);
            this.Listo2Img.setVisible(true);
            this.ready2 = true;
        }
        if (bSelec1) {
            this.CharacterDown.setVisible(true);
            this.CharacterDown.x = this.game.renderer.width * 0.28;
            this.CharacterDown.y = this.game.renderer.height * 0.33;
            // if (this.CharacterDown.anims.currentAnim.key != "idleSelec"){
            //     this.CharacterDown.play("idleSelec");
            //     }

            this.hover1Img.setX(this.rect1.x);
            this.select1 = true;
            this.bSelec1 = false;

            console.log("bSelec1 = true");
        }
        if (bSelec2) {
            this.CharacterDown2.setVisible(true);
            this.CharacterDown2.x = this.game.renderer.width * 0.76;
            this.CharacterDown2.y = this.game.renderer.height * 0.33;
            // if (this.CharacterDown2.anims.currentAnim.key != "idleSelec"){
            // this.CharacterDown2.play("idleSelec");
            // }
            this.hover2Img.setX(this.rect3.x);
            this.select2 = true;
            this.bSelec2 = false;
            console.log("bSelec2 = true");
        }
        if (desconectado)
            this.scene.start("RevanchaO", { jugador: jugador, socket: ws, rechazar: true });
    }

}
