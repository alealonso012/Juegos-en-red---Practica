export class Escenario3 extends Phaser.Scene {
    telon;

    constructor() {
        super("Escenario3");
    }

    init(data) {
        console.log("Paso por aqui");
        this.aux = data.derecha;
    }

    preload() {
        console.log("En preload");
        this.load.image("tiles", "/resources/img/Plataformas.png");
        this.load.tilemapTiledJSON("mapa3", "/resources/img/Escenario1.json");
    }

    create() {
        console.log("En create");

        const map = this.make.tilemap({ key: "mapa3", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("Plataformas", "tiles");
        const layer = map.createLayer("toplayout", tileset, 0, 0);

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.telon = this.add.rectangle(0, 0, 800, 600, 0x000000).setOrigin(0);

        this.physics.add.existing(this.telon);
        this.telon.body.setAllowGravity(false);

        this.telon.setData('derecha', this.aux);
        this.telon.setData('abierto', false);


        this.events.on('shutdown', this.shutdown, this);
    }

    shutdown() {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

    update() {
        //console.log(this.telon.body.x);
        console.log(this.telon.getData('derecha'));
        if (this.keyA.isDown) {
            this.cerrarTelonDcha();
        }

        if (this.keyD.isDown) {
            this.cerrarTelonIzq();
        }
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
        this.telon.setData('derecha', false);
    }

    cerrarTelonIzq() {
        this.telon.setX(800);
        this.telon.body.setVelocityX(-4000);
        this.telon.setData('derecha', true);
    }

    telonComprobarCerrado(Derecha) {
        if (Derecha) {
            console.log("Paso por acá");
            if (this.telon.body.x > 0) {
                this.telon.body.setVelocityX(0);
                this.scene.start("Escenario2", { derecha: true });
            }
        }
        else {
            console.log("Paso por acá2");
            if (this.telon.body.x < 0) {
                this.telon.body.setVelocityX(0);
                this.scene.start("Escenario4", { derecha: false });
            }
        }
    }
}

