export class Leaderboard extends Phaser.Scene {

    constructor() {
        super({ key: 'Leaderboard' });
    }
    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0,0,this.game.renderer.width, this.game.renderer.height,0x000000, 0.6).setOrigin(0);
        //this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, ).setOrigin(0);

        var loginText = this.add.text(this.game.renderer.width * 0.5, this.game.renderer.height * 0.1, "LEADERBOARD", {
            fontStyle: 'bold',
            fontSize: "68px",
            fill: "#e8d59e"
        }).setOrigin(0.5);
    }
}