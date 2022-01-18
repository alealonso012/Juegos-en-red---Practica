import { victoria } from '../client.js';

export class Revancha extends Phaser.Scene {

    constructor() {
        super({ key: 'Revancha' });
    }

    init(data){
        this.Derecha = data.derecha;
        console.log(this.Derecha);
        // if(this.scene.get('Inicio').logeado){

        // }
    }

    preload(){
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('player1', "/resources/img/Player1.png");
        this.load.image('player2', "/resources/img/Player2.png");
    }

    
    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0,0,this.game.renderer.width, this.game.renderer.height,0x000000,0.6).setOrigin(0);
        var textoGanador = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.1, "Ha ganado ", {
                fontStyle: "bold",
                fontSize: "65px",
                fill: "#e8d59e"
            }).setOrigin(0.5);
        if(!this.Derecha)
        {
            this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, "player1").setScale(0.5);
            if(this.scene.get('Inicio').data.get('logeado'))victoria(this.scene.get('Inicio').data.get('user'));
            
        }else{
            this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.4, "player2").setScale(0.5); 
        }

        if(this.scene.get('Inicio').data.get('logeado')){
            var usuarioGanador = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.25, this.scene.get('Inicio').data.get('user'), {
                fontStyle: "bold",
                fontSize: "75px",
                fill: "#e8d59e"
            }).setOrigin(0.5);
            console.log("Mensaje ganador")
        }
        
        var textoRevancha = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.6, "¿Revancha?", {
            fontStyle: "bold",
            fontSize: "50px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var textoSi = this.add.text(this.game.renderer.width*0.4, this.game.renderer.height * 0.7, "Sí", {
            fontStyle: "bold",
            fontSize: "50px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();
        var textoNo = this.add.text(this.game.renderer.width *0.6, this.game.renderer.height * 0.7, "No", {
            fontStyle: "bold",
            fontSize: "50px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        textoSi.on("pointerdown", ()=>{
            this.scene.start("Seleccion");
        })

        textoNo.on("pointerdown", ()=>{
            this.scene.start("Inicio", {});
        })
    }
}