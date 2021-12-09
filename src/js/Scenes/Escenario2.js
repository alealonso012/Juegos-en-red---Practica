export class Escenario2 extends Phaser.Scene {

    telon;
    telonAbierto;
    telonDerecha;


    constructor() {
        super("Escenario2");

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

        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Escena cambiada", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setRandomPosition().setInteractive();

        texto.on("pointerdown", () => {
            this.cerrarTelonIzq();
            console.log(this.telon.body.x);
        })

        this.telon = this.add.rectangle(0, 0, 800, 600, 0x000000).setOrigin(0);
        this.physics.add.existing(this.telon);
        this.telon.body.setAllowGravity(false);

        this.telon.setData('abierto', false);
        this.telon.setData('derecha', false);
        

    }

    update() {
        //console.log("En update");
        console.log(this.telon.body.x);
        
        this.gestionarTelon();
    }

    gestionarTelon() {
        if (!(this.telon.getData('abierto')) && this.telon.body.velocity.x == 0) {
            this.telonAbrir(this.telon.getData('derecha'));
        } else if (!(this.telon.getData('abierto')) && this.telon.body.velocity.x != 0) {
           this.telonComprobarAbierto(this.telon.getData('derecha'));
        } else if ((this.telon.getData('abierto')) && this.telon.body.velocity.x != 0) {
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
                this.telon.toggleData('abierto');
            }
        }
        else {
            if (this.telon.body.x < -800) {
                this.telon.body.setVelocityX(0);
                this.telon.toggleData('abierto');
            }
        }
    }

    cerrarTelonDcha() {
        this.telon.setX(-800);
        this.telon.body.setVelocityX(4000);
        this.telon.setData('derecha', true);
    }

    cerrarTelonIzq() {
        this.telon.setX(800);
        this.telon.body.setVelocityX(-4000);
        this.telon.setData('derecha', false);
    }

    telonComprobarCerrado(Derecha)
    {
        if (Derecha) {
            if (this.telon.body.x > 0) {
                this.telon.body.setVelocityX(0);
                this.scene.start("Escenario2");
            }
        }
        else {
            if (this.telon.body.x < 0) {
                this.telon.body.setVelocityX(0);
                this.scene.start("Escenario2");
            }
        }
    }
}

