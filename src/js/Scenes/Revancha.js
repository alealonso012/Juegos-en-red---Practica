export class Revancha extends Phaser.Scene {

    constructor() {
        super({ key: 'Revancha' });
    }

    init(data){
        this.Derecha = data.derecha;
        console.log(this.Derecha);
    }

    preload(){
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
    }

    
    create() {
        this.add.image(-110, 0, "titulo_fondo").setOrigin(0).setScale(0.6);
        if(this.Derecha)
        {
            var textoGanador = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.25, "Ha ganado PLAYER2", {
                fontStyle: "bold",
                fontSize: "40px",
                fill: "#332e2e"
            }).setOrigin(0.5);
        }else{
            var textoGanador = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.25, "Ha ganado PLAYER1", {
                fontStyle: "bold",
                fontSize: "40px",
                fill: "#332e2e"
            }).setOrigin(0.5);
        }
        var textoRevancha = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.45, "¿Revancha?", {
            fontStyle: "bold",
            fontSize: "40px",
            fill: "#332e2e"
        }).setOrigin(0.5);

        var textoSi = this.add.text(this.game.renderer.width*0.4, this.game.renderer.height * 0.6, "Sí", {
            fontStyle: "bold",
            fontSize: "30px",
            fill: "#332e2e"
        }).setOrigin(0.5).setInteractive();
        var textoNo = this.add.text(this.game.renderer.width *0.6, this.game.renderer.height * 0.6, "No", {
            fontStyle: "bold",
            fontSize: "30px",
            fill: "#332e2e"
        }).setOrigin(0.5).setInteractive();

        textoSi.on("pointerdown", ()=>{
            this.scene.start("Seleccion");
        })

        textoNo.on("pointerdown", ()=>{
            this.scene.start("Inicio");
        })
    }
}