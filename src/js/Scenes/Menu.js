export class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('online', "/resources/img/Online.png");
        this.load.image('local', "/resources/img/Local.png");
        this.load.spritesheet("flecha", "/resources/img/Flecha.png", {
            frameHeight: 16,
            frameWidth: 16
        });
    }

    create(){
        

        this.add.image(0, 0, "titulo_fondo").setOrigin(0);

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "Selección de modo", {
            fontSize: "40px",
            fill: "#ffffff"
        }).setOrigin(0.5);

        var localButton = this.add.image(260, 250, "local");
        var onlineButton = this.add.image(260, 330, "online");

        var hoverSprite = this.add.sprite(100,100,"flecha");
        hoverSprite.setScale(3);
        hoverSprite.setVisible(false);

        this.anims.create({
            key: "mover",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("flecha",{
                frames: [0,1,2,3,4,5,6,7]
            })
        })

        localButton.setInteractive();
        onlineButton.setInteractive();

        localButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = 150;
            hoverSprite.y = 240;
        })

        onlineButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = 150;
            hoverSprite.y = 320;
        })

        localButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        onlineButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        localButton.on("pointerdown", () => {
            console.log("Jugando");
            this.scene.start("Escenario1");
        })
    }   

}