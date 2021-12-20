export class Inicio extends Phaser.Scene {

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
        }
        if (!this.music1.isPlaying) {
            this.sound.stopAll();
            this.music1.play({ loop: true });
        }

        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.image(this.game.renderer.width * 0.3, this.game.renderer.height * 0.3, "logo").setScale(0.47);
        var playButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.525, "jugar").setScale(0.24);
        var optionButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.62, "opciones").setScale(0.24);

        var creditosButton = this.add.text(this.game.renderer.width * 0.89, this.game.renderer.height * 0.95, "Créditos", {
            fontStyle: 'bold',
            fontSize: "60px",
            fill: "#30212c"
        }).setOrigin(0.5);

        var hoverSprite = this.add.sprite(100, 100, "flecha");
        hoverSprite.setScale(0.85);
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
        creditosButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = playButton.x - 180;
            hoverSprite.y = playButton.y;
        })

        optionButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = optionButton.x - 250;
            hoverSprite.y = optionButton.y;
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

        creditosButton.on("pointerdown", () => {
            console.log("Creditos");
            this.scene.start("Creditos");
        })
    }

    update() {

    }
}