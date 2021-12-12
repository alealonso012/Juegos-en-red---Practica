export class Inicio extends Phaser.Scene {

    //music1;

    constructor() {
        super("Inicio");
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('opciones', "/resources/img/Opciones.png");
        this.load.image('jugar', "/resources/img/Jugar.png");
        this.load.image('logo', "/resources/img/logo.png");
        this.load.audio('musica', '/resources/music/Menus.mp3');
        this.load.spritesheet("flecha", "/resources/img/Flecha.png", {
            frameHeight: 150,
            frameWidth: 150
        });
    }

    create() {
        if (this.music1 == undefined) {
            this.music1 = this.sound.add('musica', { volume: 0.2 });
            this.sound.stopAll();
            this.music1.play();
        }

        if (this.scene.get("Seleccion").music1 != undefined){
            this.sound.stopAll();
            this.music1.play();
        }

        this.add.image(-110, 0, "titulo_fondo").setOrigin(0).setScale(0.6);
        this.add.image(260 , this.game.renderer.height * 0.20, "logo").setScale(0.22);
        var playButton = this.add.image(260, 270, "jugar").setScale(0.17);
        var optionButton = this.add.image(260, 340, "opciones").setScale(0.13);

        var hoverSprite = this.add.sprite(100, 100, "flecha");
        hoverSprite.setScale(0.5);
        hoverSprite.setVisible(false);

        this.anims.create({
            key: "mover",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("flecha", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        playButton.setInteractive();
        optionButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = 135;
            hoverSprite.y = 270;
        })

        optionButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = 135;
            hoverSprite.y = 340;
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

    update() {

    }
}