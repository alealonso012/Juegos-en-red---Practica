export class Controles extends Phaser.Scene {

    constructor() {
        super({ key: 'Controles' });
    }
    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        if (this.scene.get("Inicio").data.get("ingles")) {
            this.load.image('controles_ingles', "/resources/img/controles_ingles.png");

        } else {
            this.load.image('controles', "/resources/img/controles.png");
        }

        this.load.image('Atras', "/resources/img/atras.png");
        this.load.image('Atras2', "/resources/img/atras2.png");
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.7).setOrigin(0);

        if (this.scene.get("Inicio").data.get("ingles")) {
            this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.55, "controles_ingles").setScale(1).setOrigin(0.5);
        } else {
            this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.55, "controles").setScale(1).setOrigin(0.5);

        }

        var atras = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.075, "Atras2", {

        }).setOrigin(0.5).setScale(0.6).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Opciones", {});
        });

        atras.on("pointerover", () => {
            atras.setTexture("Atras");
        });

        atras.on("pointerout", () => {
            atras.setTexture("Atras2");
        });
    }
}