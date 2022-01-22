import { victoria } from '../client.js';

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
    }


    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        var textoGanador = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.2, "Alagard", "Ha ganado: ")
            .setOrigin(0.5).setScale(1).setTint(0xe8d59e).setInteractive();

        if (!this.Derecha) {
            this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.35, "Alagard", "JUGADOR 1").
                setOrigin(0.5).setScale(2.2).setTint(0xaf0080);
                if (this.scene.get('Inicio').data.get('logeado')) victoria(this.scene.get('Inicio').data.get('user'));

        } else {
            this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.35, "Alagard", "JUGADOR 2").
                setOrigin(0.5).setScale(2.2).setTint(0x00ff00);
        }

        if (this.scene.get('Inicio').data.get('logeado')&& !this.Derecha) {
            var usuarioGanador = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.5, "Alagard", this.scene.get('Inicio').data.get('user')).
                setOrigin(0.5).setScale(1.2).setTint(0xe8d59e).setInteractive();
        }

        var textoRevancha = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.65, "Alagard", " Revancha?")
            .setOrigin(0.5).setScale(1.5).setTint(0xe8d59e).setInteractive();

        this.add.bitmapText(this.game.renderer.width * 0.353, this.game.renderer.height * 0.65, "Alagard", "?") //Abrir interrogacion
            .setOrigin(0.5).setScale(1.5).setTint(0xe8d59e).setRotation(Phaser.Math.PI2 / 2);

        var textoSi = this.add.bitmapText(this.game.renderer.width * 0.4, this.game.renderer.height * 0.8, "Alagard", "Si")
            .setOrigin(0.5).setScale(1.3).setTint(0xe8d59e).setInteractive();

        var textoNo = this.add.bitmapText(this.game.renderer.width * 0.6, this.game.renderer.height * 0.8, "Alagard", "No")
            .setOrigin(0.5).setScale(1.3).setTint(0xe8d59e).setInteractive();

        textoSi.on("pointerdown", () => {
            this.scene.start("Seleccion");
        })

        textoNo.on("pointerdown", () => {
            this.scene.start("Inicio", {});
        })
    }
}