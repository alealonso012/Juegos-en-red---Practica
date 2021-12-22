export class Registear extends Phaser.Scene {

    constructor() {
        super({ key: 'Registear' });
    }
    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0,0,this.game.renderer.width, this.game.renderer.height,0x000000, 0.6).setOrigin(0);
        //this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, ).setOrigin(0);

        var loginText = this.add.text(this.game.renderer.width * 0.25, this.game.renderer.height * 0.2, "LOGIN", {
            fontStyle: 'bold',
            fontSize: "68px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var usuario = this.add.text(this.game.renderer.width * 0.15, this.game.renderer.height * 0.4, "Usuario: ", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var passw = this.add.text(this.game.renderer.width * 0.15, this.game.renderer.height * 0.6, "Contraseña: ", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var borde1 = this.add.image(this.game.renderer.width*0.40, usuario.y, "borde").setScale(1.6,1);
        var borde2 = this.add.image(borde1.x, passw.y, "borde").setScale(1.6 ,1);

        var atras = this.add.text(this.game.renderer.width * 0.07, this.game.renderer.height * 0.05, "Atrás", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Logear");
        });

    }
}