export class Inicio extends Phaser.Scene {

    //music1;

    constructor() {
        super("Inicio");
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('opciones', "/resources/img/Opciones.png");
        this.load.image('jugar', "/resources/img/Jugar.png");
        this.load.image('logo', "/resources/img/logo.png");
        this.load.audio('musica', '/resources/music/Menus.mp3');
        this.load.spritesheet("flecha", "/resources/img/Flecha.png", {
            frameHeight: 150,
            frameWidth: 150
        });
    }

    create() {
        this.gestionColliders();
        if (this.music1 == undefined) {
            this.music1 = this.sound.add('musica', { volume: 0.2 });
            this.sound.stopAll();
            this.music1.play({ loop: true });
        }
        if (this.scene.get("Seleccion").music1 != undefined) {
            this.sound.stopAll();
            this.music1.play({ loop: true });
        }

        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.image(this.game.renderer.width * 0.3, this.game.renderer.height * 0.3, "logo").setScale(0.47);
        var playButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.525, "jugar").setScale(0.24);
        var optionButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.62, "opciones").setScale(0.24);

        var hoverSprite = this.add.sprite(100, 100, "flecha");
        hoverSprite.setScale(0.85);
        hoverSprite.setVisible(false);

        this.anims.create({
            key: "mover",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("flecha", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        playButton.setInteractive();
        optionButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = playButton.x - 180;
            hoverSprite.y = playButton.y;
        })

        optionButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("mover");
            hoverSprite.x = optionButton.x - 250;
            hoverSprite.y = optionButton.y;
        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        optionButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerdown", () => {
            console.log("Jugando");
            this.scene.start("Menu");
        })

        optionButton.on("pointerdown", () => {
            console.log("Opcioneando");
            this.scene.start("Opciones");
        })
    }

    gestionColliders() {
        //Esc1
        var esc1 = this.scene.get('Esc1');
        esc1.suelo1 = esc1.add.rectangle(0, 512, 640, 100, 0xffffff, 0).setOrigin(0);
        esc1.suelo2 = esc1.add.rectangle(800 - 16 * 5, 512, 16 * 5, 100, 0xffffff, 0).setOrigin(0);
        esc1.physics.add.existing(esc1.suelo1);
        esc1.physics.add.existing(esc1.suelo2);
        esc1.suelo1.body.setImmovable(true);
        esc1.suelo2.body.setImmovable(true);
        esc1.suelo1.body.allowGravity = false;
        esc1.suelo2.body.allowGravity = false;

        esc1.physics.add.collider(esc1.player, esc1.suelo1)
        esc1.physics.add.collider(esc1.player2, esc1.suelo1)
        esc1.physics.add.collider(esc1.player, esc1.suelo2)
        esc1.physics.add.collider(esc1.player2, esc1.suelo2)
        //Esc1 FIN

        //Esc2
        var esc2 = this.scene.get('Esc2');
        esc2.suelo1 = esc2.add.rectangle(0, 512, 800, 100, 0xffffff, 0.0).setOrigin(0)
        esc2.physics.add.existing(esc2.suelo1)
        esc2.suelo1.body.setImmovable(true)
        esc2.suelo1.body.allowGravity = false

        esc2.suelo2 = esc2.add.rectangle(96, 384, 144, 32, 0xffffff, 0.0).setOrigin(0)
        esc2.physics.add.existing(esc2.suelo2)
        esc2.suelo2.body.setImmovable(true)
        esc2.suelo2.body.allowGravity = false

        esc2.suelo3 = esc2.add.rectangle((800 - (144 * 2)), 368, 160, 32, 0xffffff, 0.0).setOrigin(0)
        esc2.physics.add.existing(esc2.suelo3)
        esc2.suelo3.body.setImmovable(true)
        esc2.suelo3.body.allowGravity = false

        esc2.pared = esc2.add.rectangle((800 - 160), 512 - 144, 32, 144, 0xffffff, 0.0).setOrigin(0)
        esc2.physics.add.existing(esc2.pared)
        esc2.pared.body.setImmovable(true)
        esc2.pared.body.allowGravity = false

        esc2.physics.add.collider(esc2.player, esc2.suelo1)
        esc2.physics.add.collider(esc2.player2, esc2.suelo1)
        esc2.physics.add.collider(esc2.player, esc2.suelo2)
        esc2.physics.add.collider(esc2.player2, esc2.suelo2)
        esc2.physics.add.collider(esc2.player, esc2.suelo3)
        esc2.physics.add.collider(esc2.player2, esc2.suelo3)
        esc2.physics.add.collider(esc2.player, esc2.pared)
        esc2.physics.add.collider(esc2.player2, esc2.pared)
        //Esc2 FIN

        //Esc3
        var esc3 = this.scene.get('Esc3');
        esc3.suelo1 = esc3.add.rectangle(0, 512, 800, 100, 0xffffff, 0.0).setOrigin(0)
        esc3.physics.add.existing(esc3.suelo1)
        esc3.suelo1.body.setImmovable(true)
        esc3.suelo1.body.allowGravity = false

        esc3.suelo2 = esc3.add.rectangle(112, 352, 112, 16, 0xffffff, 0.0).setOrigin(0)
        esc3.physics.add.existing(esc3.suelo2)
        esc3.suelo2.body.setImmovable(true)
        esc3.suelo2.body.allowGravity = false

        esc3.suelo3 = esc3.add.rectangle((800 - 224), 352, 112, 16, 0xffffff, 0.0).setOrigin(0)
        esc3.physics.add.existing(esc3.suelo3)
        esc3.suelo3.body.setImmovable(true)
        esc3.suelo3.body.allowGravity = false

        esc3.suelo4 = esc3.add.rectangle(400, 424, 160, 16, 0xffffff, 0.0)
        esc3.physics.add.existing(esc3.suelo4)
        esc3.suelo4.body.setImmovable(true)
        esc3.suelo4.body.allowGravity = false

        // esc3.physics.add.collider(esc3.player, esc3.suelo1)
        // esc3.physics.add.collider(esc3.player2, esc3.suelo1)
        // esc3.physics.add.collider(esc3.player, esc3.suelo2)
        // esc3.physics.add.collider(esc3.player2, esc3.suelo2)
        // esc3.physics.add.collider(esc3.player, esc3.suelo3)
        // esc3.physics.add.collider(esc3.player2, esc3.suelo3)
        // esc3.physics.add.collider(esc3.player, esc3.suelo4)
        // esc3.physics.add.collider(esc3.player2, esc3.suelo4)
        // esc3.physics.add.collider(esc3.player, esc3.suelo5)
        // esc3.physics.add.collider(esc3.player2, esc3.suelo5)

        //Esc3 FIN


    }

    update() {

    }
}