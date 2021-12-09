export class Inicio extends Phaser.Scene {

    constructor() {
        super({ key: 'Inicio' });
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/title_bg.jpg");
        this.load.image('opciones', "/resources/img/options_button.png");
        this.load.image('jugar', "/resources/img/play_button.png");
        this.load.image('logo', "/resources/img/logo.png");
        this.load.audio('maincra', '/resources/music/mainkra.mp3');
    }

    create() {
        this.music = this.sound.add('maincra');
        this.music.play();

        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");
        var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "jugar");
        var optionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "opciones");

        playButton.setInteractive();
        optionButton.setInteractive();

        playButton.on("pointerover", () => {
            console.log("hover");
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