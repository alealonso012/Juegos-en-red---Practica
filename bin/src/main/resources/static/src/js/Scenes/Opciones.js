export class Opciones extends Phaser.Scene {

    constructor() {
        super({ key: 'Opciones' });
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('opciones', "/resources/img/opciones.png");
        this.load.image('fIzquierda', "/resources/img/flechaVolumenIzquierda.png");
        this.load.image('fDerecha', "/resources/img/flechaVolumenDerecha.png");
    }

    create() {
        var Inicio = this.scene.get('Inicio');
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        var opc = this.add.image(this.game.renderer.width * 0.35,this.game.renderer.height * 0.2,'opciones').setScale(0.35);
        // var texto = this.add.text(this.game.renderer.width * 0.35, this.game.renderer.height * 0.2, "Opciones", {
        //     fontStyle: 'bold',
        //     fontSize: "70px",
        //     fill: "#332e2e"
        // }).setOrigin(0.5);

        var texto2 = this.add.text(this.game.renderer.width * 0.33, this.game.renderer.height * 0.51, "Volumen", {
            fontStyle: 'bold',
            fontSize: "63px",
            fill: "#332e2e"
        }).setOrigin(0.5);

        var fvi = this.add.image(texto2.x + 208, texto2.y, 'fIzquierda').setScale(0.12).setInteractive();
        fvi.on("pointerdown", () => {
            if(Inicio.music1.volume > 0.1){
                Inicio.music1.setVolume(Inicio.music1.volume-0.1);
            }
        })

        var fvd = this.add.image(texto2.x + 250, texto2.y, 'fDerecha').setScale(0.12).setInteractive();
        fvd.on("pointerdown", () => {
            if(Inicio.music1.volume < 1){
                Inicio.music1.setVolume(Inicio.music1.volume + 0.1);
            }
        })

        var texto3 = this.add.text(this.game.renderer.width * 0.35, this.game.renderer.height * 0.37, "Controles", {
            fontStyle: 'bold',
            fontSize: "63px",
            fill: "#332e2e"
        }).setOrigin(0.5).setInteractive();
        texto3.on("pointerdown", () => {
            this.scene.start("Controles");
        })

        // var texto4 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Pantalla completa", {
        //     fontSize: "30px",
        //     fill: "#ffffff"
        // }).setOrigin(0.5);

        var texto5 = this.add.text(this.game.renderer.width * 0.07, this.game.renderer.height * 0.05, "Atrás", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        texto5.on("pointerdown", () => {
            this.scene.start("Inicio");
        })
    }
}