export class Controles extends Phaser.Scene {

    constructor() {
        super({ key: 'Controles' });
    }
    preload(){
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('controles', "/resources/img/controles.png");
        this.load.image('Atras', "/resources/img/atras.png");
        this.load.image('Atras2', "/resources/img/atras2.png");
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0,0,this.game.renderer.width, this.game.renderer.height,0x000000,0.23).setOrigin(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height* 0.5, "controles").setScale(1.7);

        // var texto4 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Pantalla completa", {
        //     fontSize: "30px",
        //     fill: "#ffffff"
        // }).setOrigin(0.5);

        var atras = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.075, "Atras", {

        }).setOrigin(0.5).setScale(0.6).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Opciones", {});
        });

        atras.on("pointerover", () => {
            atras.setTexture("Atras2");
        });

        atras.on("pointerout", () => {
            atras.setTexture("Atras");
        });
    }
}