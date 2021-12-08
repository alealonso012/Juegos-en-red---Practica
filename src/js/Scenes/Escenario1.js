export class Escenario1 extends Phaser.Scene {

    constructor() {
        super({ key: 'Escenario1' });
    }

    preload() {
        this.load.image("tiles", "/resources/img/terrain_atlas.png");
        this.load.tilemapTiledJSON("mapa", "/resources/img/Suelo.json");
    }

    create() {
        const map = this.make.tilemap({ key: "mapa", tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage("tiles1", "tiles");
        const layer = map.createLayer("toplayer", tileset, 0, 0);

        var texto3 = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Cambiar de escena", {
            fontSize: "30px",
            fill: "#ffffff"
        }).setOrigin(0.5).setInteractive();

        texto3.on("pointerdown", () => {
            this.scene.start("Escenario2");
        })
    }
}