export class Controles extends Phaser.Scene {

    constructor() {
        super({ key: 'Controles' });
    }
    preload(){
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('controles', "/resources/img/controles.png");
    }

    create() {
        this.add.image(-110, 0, "titulo_fondo").setOrigin(0).setScale(0.6);
        this.add.rectangle(0,0,800,600,0x000000,0.23).setOrigin(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height* 0.5, "controles");

        // var texto4 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Pantalla completa", {
        //     fontSize: "30px",
        //     fill: "#ffffff"
        // }).setOrigin(0.5);

        var texto5 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height* 0.9, "Atrás", {
            fontStyle: 'bold',
            fontSize: "37px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        texto5.on("pointerdown", ()=>{
            this.scene.start("Opciones");
        })
    }
}