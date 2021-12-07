class Escena1 extends Phaser.Scene {

    constructor ()
    {
        super(); Phaser.Scene.call(this, { key: "Escena1"})
    }

    preload(){
        this.load.image('titulo_fondo', "/resources/img/title_bg.jpg");
        this.load.image('opciones', "/resources/img/options_button.png");
        this.load.image('jugar', "/resources/img/play_button.png");
        this.load.image('logo', "/resources/img/logo.png");
    }

    create(){
        this.add.image(0,0, "titulo_fondo").setOrigin(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");
        var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "jugar");
        var optionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "opciones");

        playButton.setInteractive();
        optionButton.setInteractive();

        playButton.on("pointerover", ()=>{
            console.log("hover");
        })

        playButton.on("pointerdown", ()=>{
            console.log("Jugando");
            this.scene.start("Escena2");
        })

        optionButton.on("pointerdown", ()=>{
            console.log("Opcioneando");
            this.scene.start("Escena4");
        })
    }
}

class Escena2 extends Phaser.Scene {

    constructor ()
    {
        super(); Phaser.Scene.call(this, { key: "Escena2"})
    }

    preload(){
        this.load.image('titulo_fondo', "/resources/img/title_bg.jpg");
        this.load.image('opciones', "/resources/img/options_button.png");
        this.load.image('jugar', "/resources/img/play_button.png");
        this.load.image('logo', "/resources/img/logo.png");
    }

    create(){
        var texto = this.add.text(game.renderer.width / 2, game.renderer.height * 0.20, "Selección de modo", {
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
            this.scene.start("Escena3");
        })
    }

}

class Escena3 extends Phaser.Scene {
    constructor ()
    {
        super(); Phaser.Scene.call(this, { key: "Escena3"})
    }

    preload(){
        this.load.image('titulo_fondo', "/resources/img/title_bg.jpg");
        this.load.image('opciones', "/resources/img/options_button.png");
        this.load.image('jugar', "/resources/img/play_button.png");
        this.load.image('logo', "/resources/img/logo.png");
    }

    create(){
        var texto = this.add.text(game.renderer.width / 2, game.renderer.height / 2, "Selección de personaje y arma", {
            fontSize: "40px",
            fill: "#ffffff"
        }).setOrigin(0.5);
    }
}

class Escena4 extends Phaser.Scene {
    constructor ()
    {
        super(); Phaser.Scene.call(this, { key: "Escena4"})
    }

    preload(){
        this.load.image('titulo_fondo', "/resources/img/title_bg.jpg");
        this.load.image('opciones', "/resources/img/options_button.png");
        this.load.image('jugar', "/resources/img/play_button.png");
        this.load.image('logo', "/resources/img/logo.png");
    }

    create(){
        var texto = this.add.text(game.renderer.width / 2, game.renderer.height * 0.20, "Opciones", {
            fontSize: "40px",
            fill: "#ffffff"
        }).setOrigin(0.5);

        var texto2 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, "Volumen", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);
        var texto3 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Controles", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);

        texto3 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, "Pantalla completa", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);
    }
}