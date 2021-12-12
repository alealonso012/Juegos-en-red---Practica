export class Escenario5 extends Phaser.Scene {

    constructor() {
        super({ key: 'Escenario5' });
    }

    preload() {
        this.load.image('FondoIG', "/resources/img/FondoIngame.png");
        this.load.image("tiles", "/resources/img/Plataformas.png");
        this.load.tilemapTiledJSON("mapa5", "/resources/img/Escenario4.json");
    }

    create() {
        this.add.image(0, 0, "FondoIG").setOrigin(0).setScale(3.2);
        const map = this.make.tilemap({ key: "mapa5", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("Plataformas", "tiles");
        const layer = map.createLayer("Capa de patrones 1", tileset, 0, 0);

        var texto = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Escena cambiada", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5);
    }
}