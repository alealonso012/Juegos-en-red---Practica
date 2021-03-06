var volumen;

export class Seleccion extends Phaser.Scene {

    constructor() {
        super({ key: 'Seleccion' });
    }

    preload() {
        this.load.image('selectscreen', "/resources/img/SelectScreen.png");
        this.load.image('borde', "/resources/img/Characterborder.png");
        this.load.image('borde2', "/resources/img/Readyborder.png");
        this.load.image('listo1', "/resources/img/Listo.png");
        this.load.image('listo2', "/resources/img/Listo2.png");
        this.load.image('player1', "/resources/img/Player1.png");
        this.load.image('player2', "/resources/img/Player2.png");
        this.load.audio('battlemusic', '/resources/music/EpicBattle.mp3');
        this.load.spritesheet("character", "/resources/img/CharacterSelect.png", {
            frameHeight: 600,
            frameWidth: 500
        });
    }

    create() {
        this.music1 = this.sound.add('battlemusic', {volume: this.scene.get('Inicio').music1.volume });
        this.sound.stopAll();
        this.music1.play({loop: true});

        this.add.image(0, 0, "selectscreen").setScale(1).setOrigin(0);
        this.add.image(this.game.renderer.width * 0.265, this.game.renderer.height*0.059, "player1").setScale(0.3);
        this.add.image(this.game.renderer.width * 0.745, this.game.renderer.height*0.059, "player2").setScale(0.3);
        var rect1 = this.add.rectangle(this.game.renderer.width * 0.095, this.game.renderer.height*0.588, 210, 330, 0xffffff, 0).setInteractive();
        var rect2 = this.add.rectangle(this.game.renderer.width * 0.204945, this.game.renderer.height*0.588, 210, 330, 0xffffff, 0).setInteractive();
        var rect3 = this.add.rectangle(this.game.renderer.width * 0.575, this.game.renderer.height*0.588, 210, 330, 0xffffff, 0).setInteractive();
        var rect4 = this.add.rectangle(this.game.renderer.width * 0.6845, this.game.renderer.height*0.588, 210, 330, 0xffffff, 0).setInteractive();
        this.select1 = false;
        this.select2 = false;
        this.ready1 = false;
        this.ready2 = false;

        var listo = this.add.rectangle(this.game.renderer.width * 0.26, this.game.renderer.height*0.875, 300, 110, 0xffffff, 0).setInteractive();
        var listo2 = this.add.rectangle(this.game.renderer.width * 0.74, this.game.renderer.height*0.875, 300, 110, 0xffffff, 0).setInteractive();

        var hover1Img = this.add.image(0, rect1.y, "borde").setVisible(false);
        var hover2Img = this.add.image(0, rect1.y, "borde").setVisible(false);

        var RecuadroIzq = this.add.image(listo.x, listo.y, "borde2").setVisible(false);
        var RecuadroDcha = this.add.image(listo2.x, listo2.y, "borde2").setVisible(false);
        this.add.image(this.game.renderer.width * 0.261, this.game.renderer.height*0.875, "listo1").setScale(0.3);
        this.add.image(this.game.renderer.width * 0.741, this.game.renderer.height*0.875, "listo1").setScale(0.3);
        var ListoImg = this.add.image(this.game.renderer.width * 0.261, this.game.renderer.height*0.875, "listo2").setScale(0.3).setVisible(false);
        var Listo2Img = this.add.image(this.game.renderer.width * 0.741, this.game.renderer.height*0.875, "listo2").setScale(0.3).setVisible(false);

        var CharacterDown = this.add.sprite(100,100,"character");
        CharacterDown.setScale(1.2);
        CharacterDown.setVisible(false);
        CharacterDown.setTint("0xff0080");

        var CharacterDown2 = this.add.sprite(100,100,"character");
        CharacterDown2.setScale(1.2);
        CharacterDown2.setVisible(false);
        CharacterDown2.setTint("0x20c0ff");

        this.anims.create({
            key: "idleSelec",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                frames: [0, 1]
            })
        })

        rect1.on("pointerover", () => {
            if (!this.select1) {
                hover1Img.setVisible(true);
                hover1Img.setX(rect1.x);
            }
        })
        rect1.on("pointerout", () => {
            if (!this.select1) hover1Img.setVisible(false);
        })
        rect1.on("pointerdown", () => {
            CharacterDown.setVisible(true);
            CharacterDown.x = this.game.renderer.width * 0.28;
            CharacterDown.y = this.game.renderer.height * 0.33;
            CharacterDown.play("idleSelec");
            hover1Img.setX(rect1.x);
            this.select1 = true;
        })

        rect2.on("pointerover", () => {
            if (!this.select1) {
                hover1Img.setVisible(true);
                hover1Img.setX(rect2.x);
            }
        })
        rect2.on("pointerout", () => {
            if (!this.select1) hover1Img.setVisible(false);
        })
        rect2.on("pointerdown", () => {
            hover1Img.setX(rect2.x);
            this.select1 = true;
        })
        rect3.on("pointerover", () => {
            if (!this.select2) {
                hover2Img.setVisible(true);
                hover2Img.setX(rect3.x);
            }
        })
        rect3.on("pointerout", () => {
            if (!this.select2) hover2Img.setVisible(false);
        })
        rect3.on("pointerdown", () => {
            CharacterDown2.setVisible(true);
            CharacterDown2.x = this.game.renderer.width * 0.76;
            CharacterDown2.y = this.game.renderer.height * 0.33;
            CharacterDown2.play("idleSelec");
            hover2Img.setX(rect3.x);
            this.select2 = true;
        })

        rect4.on("pointerover", () => {
            if (!this.select2) {
                hover2Img.setVisible(true);
                hover2Img.setX(rect4.x);
            }

        })
        rect4.on("pointerout", () => {
            if (!this.select2) hover2Img.setVisible(false);
        })
        rect4.on("pointerdown", () => {
            hover2Img.setX(rect4.x);
            this.select2 = true;
        })

        listo.on("pointerdown", () => {
            if (this.select1) {
                RecuadroIzq.setVisible(true);
                ListoImg.setVisible(true);
                this.ready1 = true;
            }
        })

        listo2.on("pointerdown", () => {
            if (this.select2) {
                RecuadroDcha.setVisible(true);
                Listo2Img.setVisible(true);
                this.ready2 = true;
            }
        })
    }

    update()
    {
        if(this.ready1&&this.ready2)this.scene.start("Esc3", {derecha: true});
    }

}