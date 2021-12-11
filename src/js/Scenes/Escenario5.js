export class Escenario5 extends Phaser.Scene {

    constructor() {
        super({ key: 'Escenario5' });
    }

    preload() {
        this.load.image("tiles", "/resources/img/Plataformas.png");
        this.load.tilemapTiledJSON("mapa", "/resources/img/Escenario5.json");
    }

    create() {
        const map = this.make.tilemap({ key: "mapa", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("Plataformas", "tiles");
        const layer = map.createLayer("toplayout", tileset, 0, 0);

        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Escena cambiada", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);
    }
}