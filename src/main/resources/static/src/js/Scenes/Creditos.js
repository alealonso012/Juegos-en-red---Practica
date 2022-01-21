export class Creditos extends Phaser.Scene {

    constructor() {
        super({ key: 'Creditos' });
    }
    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('logoequipo', "/resources/img/logoequipo.png");
        this.load.image('logoinsta', "/resources/img/logoinsta.png");
        this.load.image('Atras', "/resources/img/atras.png");
        this.load.image('Atras2', "/resources/img/atras2.png");
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        var logoe = this.add.image(this.game.renderer.width * 0.4, this.game.renderer.height * 0.35, 'logoequipo');
        var logoi = this.add.image(this.game.renderer.width * 0.4, this.game.renderer.height * 0.65, 'logoinsta').setScale(0.2).setInteractive();

        var texto = this.add.text(this.game.renderer.width * 0.5, this.game.renderer.height * 0.15, "Desarrollado por:", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var texto2 = this.add.text(this.game.renderer.width * 0.55, logoe.y, "Moirai", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var texto3 = this.add.text(this.game.renderer.width * 0.55, logoi.y, "Camlann", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        var atras = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.075, "Atras2", {

        }).setOrigin(0.5).setScale(0.6).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Inicio", {});
        });

        atras.on("pointerover", () => {
            atras.setTexture("Atras");
        });

        atras.on("pointerout", () => {
            atras.setTexture("Atras2");
        });

        logoi.on('pointerup', openLink);
        texto3.on('pointerup', openLink);
    }


}

function openLink() {
    var url = 'https://www.instagram.com/camlan_the_game/';

    var s = window.open(url, '_blank');

    if (s && s.focus) {
        s.focus();
    }
    else if (!s) {
        window.location.href = url;
    }
}