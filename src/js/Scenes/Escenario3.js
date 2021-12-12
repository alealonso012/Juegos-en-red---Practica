export class Escenario3 extends Phaser.Scene {


    telon;
    telonAbierto;
    telonDerecha;


    constructor() {
        super("Escenario3");

    }

    preload() {
        console.log("En preload");
        this.load.image('FondoIG', "/resources/img/FondoIngame.png");
        this.load.image("tiles", "/resources/img/Plataformas.png");
        this.load.tilemapTiledJSON("mapa3", "/resources/img/Escenario1.json");
    }

    create() {
        console.log("En create");

        this.add.image(0, 0, "FondoIG").setOrigin(0).setScale(3.2);
        const map = this.make.tilemap({ key: "mapa3", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("Plataformas", "tiles");
        const layer = map.createLayer("toplayout", tileset, 0, 0);

        this.physics.add.collider(map, null);

        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Cambiar de escena", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5).setInteractive();

        texto.on("pointerdown", () => {
            this.cerrarTelonDcha();
        })

        this.telon = this.add.rectangle(0, 0, 800, 600, 0x000000).setOrigin(0);
        this.physics.add.existing(this.telon);
        this.telon.body.setAllowGravity(false);

        this.telon.setData('abierto', false);
        this.telon.setData('derecha', true);
    }

    update() {
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

