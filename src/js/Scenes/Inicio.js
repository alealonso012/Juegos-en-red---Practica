export class Inicio extends Phaser.Scene {

    constructor() {
        super({ key: 'Inicio' });
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('opciones', "/resources/img/Opciones.png");
        this.load.image('jugar', "/resources/img/Jugar.png");
        this.load.image('logo', "/resources/img/logo.png");
        this.load.audio('musica', '/resources/music/Menus.mp3');
        this.load.spritesheet("flecha", "/resources/img/Flecha.png", {
            frameHeight: 16,
            frameWidth: 16
        });
    }

    create() {
        this.music1 = this.sound.add('musica');
        this.music1.play();

        this.add.image(-110, 0, "titulo_fondo").setOrigin(0).setScale(0.6);
        this.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height * 0.20, "logo");
        var playButton = this.add.image(260, 250, "jugar").setScale(0.17);
        var optionButton = this.add.image(260, 330, "opciones").setScale(0.13);

        var hoverSprite = this.add.sprite(100,100,"flecha");
        hoverSprite.setScale(3);
        hoverSprite.setVisible(false);

        this.anims.create({
            key: "mover",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("flecha",{
                frames: [0,1,2,3,4,5,6,7]
            })
        })

        playButton.setInteractive();
        optionButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = 150;
            hoverSprite.y = 240;
        })

        optionButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = 150;
            hoverSprite.y = 320;
        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        optionButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerdown", () => {
            console.log("Jugando");
            this.scene.start("Menu");
        })

        optionButton.on("pointerdown", () => {
            console.log("Opcioneando");
            this.scene.start("Opciones");
        })
    }
}