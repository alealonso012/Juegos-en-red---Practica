import { victoria } from '../client.js';

//TEXTOS
var tSi = "Si";
var tNo = "No";
var tRevancha = "Revancha?";
var tSalir = "Volver al menu principal";
var tGanador = "Ha ganado";
var tJugador = "JUGADOR";

export class Revancha extends Phaser.Scene {

    constructor() {
        super({ key: 'Revancha' });
    }

    init(data) {
        this.Derecha = data.derecha;
        console.log(this.Derecha);
        // if(this.scene.get('Inicio').logeado){

        // }
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.bitmapFont(
            'Alagard',
            './src/fonts/Alagard.png',
            './src/fonts/Alagard.xml'
        );

        if (this.scene.get("Inicio").data.get("ingles")) {
            tSi = "Yes";
            tNo = "No";
            tRevancha = "Rematch?";
            tSalir = "Return to main menu";
            tGanador = "The winner is";
            tJugador = "PLAYER";
        }
        else {
            tSi = "Si";
            tNo = "No";
            tRevancha = "Revancha?";
            tSalir = "Volver al menu principal";
            tGanador = "Ha ganado";
            tJugador = "JUGADOR";
        }
    }


    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        var textoGanador = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.2, "Alagard", tGanador)
            .setOrigin(0.5).setScale(1).setTint(0xe8d59e).setInteractive();

        if (!this.Derecha) {
            this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.35, "Alagard", "JUGADOR 1").
                setOrigin(0.5).setScale(2.2).setTint(0xaf0080);
            if (this.scene.get('Inicio').data.get('logeado')) victoria(this.scene.get('Inicio').data.get('user'));

        } else {
            this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.35, "Alagard", "JUGADOR 2").
                setOrigin(0.5).setScale(2.2).setTint(0x00ff00);
        }

        if (this.scene.get('Inicio').data.get('logeado') && !this.Derecha) {
            var usuarioGanador = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.5, "Alagard", this.scene.get('Inicio').data.get('user')).
                setOrigin(0.5).setScale(1.2).setTint(0xe8d59e).setInteractive();
        }

        this.textoRevancha = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.66, "Alagard", tRevancha)
            .setOrigin(0.5).setScale(1.5).setTint(0xe8d59e);

        if (!this.scene.get("Inicio").data.get("ingles"))

            this.inte = this.add.bitmapText(this.game.renderer.width * 0.353, this.game.renderer.height * 0.65, "Alagard", "?") //Abrir interrogacion
                .setOrigin(0.5).setScale(1.5).setTint(0xe8d59e).setRotation(Phaser.Math.PI2 / 2);

        this.textoSalir = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.9, "Alagard", tSalir)
            .setOrigin(0.5).setTint(0xe8d59e).setVisible(false).setScale(0.95);

        this.textoSi = this.add.bitmapText(this.game.renderer.width * 0.3, this.game.renderer.height * 0.8, "Alagard", tSi)
            .setOrigin(0.5).setScale(1.3).setTint(0xe8d59e).setInteractive();

        this.textoNo = this.add.bitmapText(this.game.renderer.width * 0.7, this.game.renderer.height * 0.8, "Alagard", tNo)
            .setOrigin(0.5).setScale(1.3).setTint(0xe8d59e).setInteractive();

        this.textoSi.on("pointerdown", () => {
            this.scene.start("Seleccion");
        })

        this.textoNo.on("pointerdown", () => {
            this.scene.start("Inicio", {});
        })
    }
}