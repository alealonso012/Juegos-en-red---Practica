export class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('online', "/resources/img/Online.png");
        this.load.image('local', "/resources/img/Local.png");
        this.load.image('Atras', "/resources/img/atras.png");
        this.load.image('Atras2', "/resources/img/atras2.png");
        this.load.spritesheet("flecha", "/resources/img/Flecha.png", {
            frameHeight: 16,
            frameWidth: 16
        });

        this.load.bitmapFont(
            'Alagard',
            './src/fonts/Alagard.png',
            './src/fonts/Alagard.xml'
        );
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);

        var localButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.42, "local").setScale(0.24);
        var onlineButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.53, "online").setScale(0.24).setInteractive();
        if (this.scene.get("Inicio").data.get("ingles")) {
            this.add.bitmapText(this.game.renderer.width * 0.335, this.game.renderer.height * 0.24, "Alagard", "CHOOSE GAMEMODE")
            .setOrigin(0.5).setTint(0x332e2e).setScale(1.2);
        }else{
            this.add.bitmapText(this.game.renderer.width * 0.335, this.game.renderer.height * 0.24, "Alagard", "SELECCION DE MODO")
            .setOrigin(0.5).setTint(0x332e2e).setScale(1.2);
        }
        var hoverSprite = this.add.sprite(100, 100, "flecha");
        hoverSprite.setScale(0.8);
        hoverSprite.setVisible(false);

        this.anims.create({
            key: "mover",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("flecha", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        localButton.setInteractive();
        onlineButton.setInteractive();

        localButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = localButton.x - 180;
            hoverSprite.y = localButton.y;
        })

        onlineButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = onlineButton.x - 210;
            hoverSprite.y = onlineButton.y;
        })

        localButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        onlineButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        localButton.on("pointerdown", () => {
            console.log("Seleccionando");
            this.scene.start("Seleccion");
        })

        onlineButton.on("pointerdown", () => {
            console.log("Matchmakeando");
            this.scene.start("Matchmaking");
        })

        var atras = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.075, "Atras")
            .setOrigin(0.5).setScale(0.6).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Inicio", {});
        });

        atras.on("pointerover", () => {
            atras.setTexture("Atras2");
        });

        atras.on("pointerout", () => {
            atras.setTexture("Atras");
        });
    }

}