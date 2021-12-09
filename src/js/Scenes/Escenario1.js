export class Escenario1 extends Phaser.Scene {


    telon;
    telonAbierto;
    telonDerecha;


    constructor() {
        super("Escenario1");

    }

    preload() {
        console.log("En preload");
        this.load.image("tiles", "/resources/img/terrain_atlas.png");
        this.load.tilemapTiledJSON("mapa", "/resources/img/Suelo.json");

    }

    create() {
        console.log("En create");

        const map = this.make.tilemap({ key: "mapa", tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage("tiles1", "tiles");
        const layer = map.createLayer("toplayer", tileset, 0, 0);

        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Cambiar de escena", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5).setInteractive();

        texto.on("pointerdown", () => {
            console.log(this.telonAbierto);
            this.cerrarTelonIzq();
            console.log(this.telon.body.x);
        })

        this.telon = this.add.rectangle(0, 0, 800, 600, 0xff0000).setOrigin(0);
        this.physics.add.existing(this.telon);
        this.telon.body.setAllowGravity(false);

        this.telon.setData('abierto', 'false');
        this.telon.setData('derecha', 'false');
        

    }

    update() {

        console.log(this.telon.body.x);
        //console.log("En update");
        this.gestionarTelon();
        //if(this.telonCerrado) 

    }

    gestionarTelon() {
        if (!(this.telon.getData('abierto')) && this.telon.body.velocity.x == 0) {
            console.log("Entra1");
            this.telonAbrir(this.telon.getData('derecha'));
        } else if (!(this.telon.getData('abierto')) && this.telon.body.velocity.x != 0) {
            console.log("Entra2");
           this.telonComprobarAbierto(this.telon.getData('derecha'));
        } else if ((this.telon.getData('abierto')) && this.telon.body.velocity.x != 0) {
            console.log("Entra3");
            this.telonComprobarCerrado(this.telon.getData('derecha'));
        }
    }

    telonAbrir(Derecha) {
        if (Derecha) {
            this.telon.body.setVelocityX(4000);
        }
        else {
            this.telon.body.setVelocityX(-4000);
        }
    }

    telonComprobarAbierto(Derecha) {
        if (Derecha) {
            if (this.telon.body.x > 800) {
                this.telon.body.setVelocityX(0);
                this.telon.toogleData('abierto');
                console.log("EA");
            }
        }
        else {
            if (this.telon.body.x < -800) {
                this.telon.body.setVelocityX(0);
                this.telon.toogleData('abierto');
                console.log("EAI");
            }
        }
    }

    cerrarTelonDcha() {
        this.telon.setPosition(-800);
        this.telon.body.setVelocityX(4000);
        this.telonDerecha = true;
    }

    cerrarTelonIzq() {
        this.telon.setPosition(800);
        this.telon.body.setVelocityX(-4000);
        this.telonDerecha = false;
    }

    telonComprobarCerrado(Derecha)
    {
        if (!Derecha) {
            if (this.telon.getTopRight().x > 800) {
                this.telon.body.setVelocityX(0);
                this.scene.start("Escenario2");
            }
        }
        else {
            if (this.telon.getTopLeft().x < 0) {
                this.telon.body.setVelocityX(0);
                this.scene.start("Escenario2");
            }
        }
    }

    cerrarTelon() {
        if (this.telon.body.x < 0) {
            this.telon.body.velocity.x = 4000;
            this.telonMoviendoseDcha = true;
        }
        else if (this.telon.body.x > 0) {
            this.telon.body.velocity.x = -4000;
            this.telonMoviendoseIzq = true;
        }
    }

}

