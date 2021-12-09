export class Escenario2 extends Phaser.Scene {

    constructor() {
        super({ key: 'Escenario2' });
    }

    preload() {
        this.load.image("tiles", "/resources/img/terrain_atlas.png");
        this.load.tilemapTiledJSON("mapa", "/resources/img/Suelo.json");
    }

    create() {
        const map = this.make.tilemap({ key: "mapa", tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage("tiles1", "tiles");
        const layer = map.createLayer("toplayer", tileset, 0, 0);

        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Escena cambiada", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);
    }
}