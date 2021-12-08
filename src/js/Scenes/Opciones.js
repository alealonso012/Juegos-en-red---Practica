export class Opciones extends Phaser.Scene {

    constructor() {
        super({ key: 'Opciones' });
    }

    create() {
        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.15, "Opciones", {
            fontSize: "40px",
            fill: "#ffffff"
        }).setOrigin(0.5);

        var texto2 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 - 100, "Volumen", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);
        var texto3 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, "Controles", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);

        var texto4 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Pantalla completa", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);

        var texto5 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, "Salir", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5).setInteractive();

        texto5.on("pointerdown", ()=>{
            this.scene.start("Inicio");
        })
    }
}