export class Inicio extends Phaser.Scene {

    user = undefined;
    logeado = false;

    constructor() {
        super("Inicio");
    }

    init(data) {
        console.log(this);
        if (this.data.get('logeado') == undefined) {
            this.data.set('logeado', false);
            this.data.set('user', undefined);
        }
        console.log(this.data);
        console.log(data);
        if (data.logeado != undefined) {
            this.data.set('logeado', data.logeado);
            console.log("Logeado: " + this.data.get('logeado'));
        }

        if (data.nickname != undefined) {
            this.data.set('user', data.nickname);
            console.log("User definido en inicio");
        }

        console.log("Usuario: " + this.data.get('user'));
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
        if (this.music1 == undefined) {
            this.music1 = this.sound.add('musica', { volume: 0.2 });
        }
        if (!this.music1.isPlaying) {
            this.sound.stopAll();
            this.music1.play({ loop: true });
        }

        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.image(this.game.renderer.width * 0.3, this.game.renderer.height * 0.3, "logo").setScale(0.47);
        var playButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.525, "jugar").setScale(0.24);
        var optionButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.62, "opciones").setScale(0.24);

        this.add.rectangle(0, this.game.renderer.height - 70, this.game.renderer.width, 70, 0x30212c).setOrigin(0);

        var creditosButton = this.add.text(this.game.renderer.width * 0.08, this.game.renderer.height * 0.9656, "Créditos", {
            fontStyle: 'bold',
            fontSize: "50px",
            fill: "#c49c5f"
        }).setOrigin(0.5).setInteractive();

        if (this.data.get('logeado')) {
            var loginButton = this.add.text(this.game.renderer.width * 0.98, this.game.renderer.height * 0.9656, this.data.get("user"), {
                fontStyle: 'bold',
                fontSize: "50px",
                fill: "#c49c5f"
            }).setOrigin(1, 0.5).setInteractive();
        }
        else {
            var loginButton = this.add.text(this.game.renderer.width * 0.98, this.game.renderer.height * 0.9656, "Iniciar sesión", {
                fontStyle: 'bold',
                fontSize: "50px",
                fill: "#c49c5f"
            }).setOrigin(1, 0.5).setInteractive();
        }

        var leaderButton = this.add.text(this.game.renderer.width * 0.5, this.game.renderer.height * 0.9656, "Leaderboard", {
            fontStyle: 'bold',
            fontSize: "50px",
            fill: "#c49c5f"
        }).setOrigin(0.5).setInteractive();

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

        creditosButton.on("pointerdown", () => {
            console.log("Creditos");
            this.scene.start("Creditos");
        })

        creditosButton.on("pointerover", () => {
            creditosButton.setTint(0x888888);
        })

        creditosButton.on("pointerout", () => {
            creditosButton.clearTint();
        })

        loginButton.on("pointerdown", () => {
            console.log("Login");
            if (!loginButton.scene.data.get('logeado')) this.scene.start("Logear");
            else {
                this.data.set('logeado', false);
                this.data.set('user', false);
                loginButton.setText("Iniciar sesión");
                console.log("Logeado: " + this.data.get('logeado'));
                console.log("Usuario: " + this.data.get('user'));
                console.log(this.data);
            }
        })

        loginButton.on("pointerover", () => {
            loginButton.setTint(0x888888);
            if (this.data.get("logeado")) loginButton.setText("Cerrar sesión");
        })

        loginButton.on("pointerout", () => {
            loginButton.clearTint();
            if (this.data.get("logeado")) loginButton.setText(this.data.get("user"));
        })

        leaderButton.on("pointerdown", () => {
            console.log("Leaderboard");
            this.scene.start("EscO3");
        })

        leaderButton.on("pointerover", () => {
            leaderButton.setTint(0x888888);
        })

        leaderButton.on("pointerout", () => {
            leaderButton.clearTint();
        })
    }

    update() {

    }
}