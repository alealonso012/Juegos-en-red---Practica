export class Escenario1 extends Phaser.Scene {

    constructor() {
        super({ key: 'Escenario1' });
    }

    preload() {
        this.load.image("tiles", "/resources/img/Plataformas.png");
        this.load.tilemapTiledJSON("mapa1", "/resources/img/Escenario5.json");
    }

    create() {
        const map = this.make.tilemap({ key: "mapa1", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("Plataformas", "tiles");
        const layer = map.createLayer("Capa de patrones 1", tileset, 0, 0);

        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Escena cambiada", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);
    }
}