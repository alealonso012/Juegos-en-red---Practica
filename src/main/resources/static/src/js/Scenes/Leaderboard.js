export class Leaderboard extends Phaser.Scene {

    constructor() {
        super({ key: 'Leaderboard' });
    }
    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('Atras', "/resources/img/atras.png");
        this.load.image('Atras2', "/resources/img/atras2.png");
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        //this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, ).setOrigin(0);

        var leaderboardtitle = this.add.text(this.game.renderer.width * 0.5, this.game.renderer.height * 0.1, "LEADERBOARD", {
            fontStyle: 'bold',
            fontSize: "68px",
            fill: "#e8d59e"
        }).setOrigin(0.5);
        this.user = "";
        this.punt = "";

        function leerUser(a) {
            var temp;
            $.ajax({
                url: "./leaderboard",
                async: false
            }).done(function (data) {
                data.sort((a, b) => (a.ganadas > b.ganadas) ? -1 : 1)
                console.log(data.length)
                console.log(a)
                for (var i = 0; i < data.length; i++) {
                    a = a + data[i].nickname + "\n-------------------------------------------\n"
                }
                console.log(a);
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
                console.log(a);
                for (var i = 0; i < data.length; i++) {
                    a = a + data[i].ganadas + "\n\n"
                }
                console.log(a);
                temp = a;
            });
            return temp;
        }
        this.user = leerUser(this.user);

        this.punt = leerPunt(this.punt);

        console.log(this.punt)
        console.log(this.user);
        this.usuarios = this.add.text(this.game.renderer.width * 0.5, this.game.renderer.height * 0.18, this.user, {
            fontStyle: 'bold',
            fontSize: "25px",
            fill: "#e8d59e"
        }).setOrigin(0.5, 0);
        this.puntuaciones = this.add.text(this.game.renderer.width * 0.65, this.game.renderer.height * 0.18, this.punt, {
            fontStyle: 'bold',
            fontSize: "25px",
            fill: "#e8d59e"
        }).setOrigin(1, 0);

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

    }
    update() {
        //this.usuarios.setText(this.user);
    }
}