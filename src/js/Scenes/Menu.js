export class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu' });
    }

    create(){
        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "Selección de modo", {
            fontSize: "40px",
            fill: "#ffffff"
        }).setOrigin(0.5);

        var texto2 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, "Online", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);
        var texto3 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Local", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5).setInteractive();

        texto3.on("pointerdown", ()=>{
            this.scene.start("Escenario1");
        })
    }   

}