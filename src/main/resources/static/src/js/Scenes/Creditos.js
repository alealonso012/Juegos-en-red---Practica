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

        this.load.bitmapFont(
            'Alagard',
            './src/fonts/Alagard.png',
            './src/fonts/Alagard.xml'
        );
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        var logoe = this.add.image(this.game.renderer.width * 0.4, this.game.renderer.height * 0.4, 'logoequipo');
        var logoi = this.add.image(this.game.renderer.width * 0.4, this.game.renderer.height * 0.7, 'logoinsta').setScale(0.2).setInteractive();

        var texto = this.add.bitmapText(this.game.renderer.width * 0.5, this.game.renderer.height * 0.15, "Alagard", "Desarrollado por:")
            .setOrigin(0.5).setTint(0xe8d59e).setScale(1.1);

        var texto2 = this.add.bitmapText(this.game.renderer.width * 0.58, logoe.y, "Alagard", "Moirai")
            .setOrigin(0.5).setTint(0xe8d59e).setScale(1.3);

        var texto3 = this.add.bitmapText(this.game.renderer.width * 0.58, logoi.y, "Alagard", "Camlann")
            .setOrigin(0.5).setTint(0xe8d59e).setScale(1.3).setInteractive();

        var atras = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.075, "Atras2")
            .setOrigin(0.5).setScale(0.6).setInteractive();

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