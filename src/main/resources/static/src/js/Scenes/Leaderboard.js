export class Leaderboard extends Phaser.Scene {

    constructor() {
        super({ key: 'Leaderboard' });
    }
    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
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
        //this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, ).setOrigin(0);

        var leaderboardtitle = this.add.bitmapText(this.game.renderer.width * 0.5, this.game.renderer.height * 0.1, "Alagard", "RANKING")
            .setOrigin(0.5).setTint(0xe8d59e).setScale(1.1);

        this.user = "";
        this.punt = "";

        function leerUser(a) {
            var temp;
            $.ajax({
                url: "./leaderboard",
                async: false
            }).done(function (data) {
                data.sort((a, b) => (a.ganadas > b.ganadas) ? -1 : 1);
                for (var i = 0; i < data.length && i < 10; i++) {
                    if(i<9)
                    a = a + data[i].nickname + "\n------------------------------------\n";
                    else
                    a = a + data[i].nickname;
                }
                temp = a;
            });
            return temp;
        }
        function leerPunt(a) {
            var temp;
            $.ajax({
                url: "./leaderboard",
                async: false
            }).done(function (data) {
                data.sort((a, b) => (a.ganadas > b.ganadas) ? -1 : 1);
                for (var i = 0; i < data.length && i <10; i++) {
                    a = a + data[i].ganadas + "\n\n";
                }
                temp = a;
            });
            return temp;
        }

        this.user = leerUser(this.user);
        this.punt = leerPunt(this.punt);

        this.usuarios = this.add.bitmapText(this.game.renderer.width * 0.5, this.game.renderer.height * 0.18, "Alagard", this.user)
        .setOrigin(0.5, 0).setTint(0xe8d59e).setScale(0.6).setLeftAlign();

        this.puntuaciones = this.add.bitmapText(this.game.renderer.width * 0.65, this.game.renderer.height * 0.18, "Alagard", this.punt)
        .setOrigin(1, 0).setTint(0xe8d59e).setScale(0.6).setRightAlign();

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

    }
    update() {
        //this.usuarios.setText(this.user);
    }
}