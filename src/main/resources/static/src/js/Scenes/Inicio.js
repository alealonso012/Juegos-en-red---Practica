//TEXTOS
var tJugar = "JUGAR";
var tOpciones = "OPCIONES";
var tCreditos = "CREDITOS";
var tLogin = "INICIAR SESION";
var tCerrar = "CERRAR SESION";

export class Inicio extends Phaser.Scene {

    user = undefined;
    logeado = false;

    constructor() {
        super("Inicio");
    }

    init(data) {

        if (this.data.get('logeado') == undefined) {
            this.data.set('logeado', false);
            this.data.set('user', undefined);
        }

        if (data.logeado != undefined) {
            this.data.set('logeado', data.logeado);
            console.log("Logeado: " + this.data.get('logeado'));
        }

        if (data.nickname != undefined) {
            this.data.set('user', data.nickname);
            console.log("User definido en inicio");
        }

        if(data.ingles == undefined){
            if (this.data.get("ingles") == undefined) this.data.set("ingles", true);
        console.log("Idioma en ingles: " + this.data.get("ingles"));
        }else{
            this.data.set("ingles", data.ingles);
        }

        console.log("Logeado: " + this.data.get('logeado'));
        console.log("Usuario: " + this.data.get('user'));
    }

    preload() {
        console.log(this.data.get("ingles"));
        if (this.data.get("ingles")) {
            tJugar = "PLAY";
            tOpciones = "OPTIONS";
            tCreditos = "CREDITS";
            tLogin = "LOG IN";
            tCerrar = "LOG OUT";
        } else {
            tJugar = "JUGAR";
            tOpciones = "OPCIONES";
            tCreditos = "CREDITOS";
            tLogin = "INICIAR SESION";
            tCerrar = "CERRAR SESION";
        }
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('logo', "/resources/img/logo.png");
        this.load.image('spain', "/resources/img/spain.png");
        this.load.image('uk', "/resources/img/uk.png");
        this.load.audio('musica', '/resources/music/Menus.mp3');
        this.load.bitmapFont(
            'Alagard',
            './src/fonts/Alagard.png',
            './src/fonts/Alagard.xml'
        );
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

        this.spain = this.add.image(this.game.renderer.width * 0.905, this.game.renderer.height * 0.05, "spain")
            .setScale(0.14).setInteractive().setOrigin(0.5);

        this.uk = this.add.image(this.game.renderer.width * 0.965, this.game.renderer.height * 0.05, "uk")
            .setScale(0.25).setInteractive().setOrigin(0.5);

        this.spain.on("pointerdown", () => {
            this.data.set("Ingles", false);
            this.scene.start("Inicio", {ingles: false});
            // this.scene.start("Inicio", { ingles: false });
        })

        this.uk.on("pointerdown", () => {
            // this.scene.start("Inicio", { ingles: true });
            this.data.set("Ingles", true);
            this.scene.start("Inicio", {ingles: true});
        })

        // var playButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.525, "jugar").setScale(0.24);
        // var optionButton = this.add.image(this.game.renderer.width * 0.325, this.game.renderer.height * 0.62, "opciones").setScale(0.24);

        var playButton = this.add.bitmapText(this.game.renderer.width * 0.325, this.game.renderer.height * 0.525, "Alagard", tJugar)
            .setOrigin(0.5).setScale(1.1).setTint(0x30212c).setInteractive();

        var optionButton = this.add.bitmapText(this.game.renderer.width * 0.325, this.game.renderer.height * 0.62, "Alagard", tOpciones)
            .setOrigin(0.5).setScale(1.1).setTint(0x30212c).setInteractive();

        this.add.rectangle(0, this.game.renderer.height - 70, this.game.renderer.width, 70, 0x30212c).setOrigin(0);

        var creditosButton = this.add.bitmapText(this.game.renderer.width * 0.08, this.game.renderer.height * 0.974, "Alagard", tCreditos)
            .setOrigin(0.5).setScale(0.8).setTint(0xc49c5f).setInteractive();

        var cerrarButton = this.add.bitmapText(this.game.renderer.width * 0.99, this.game.renderer.height * 0.974, "Alagard", tCerrar)
            .setRightAlign().setScale(0.8).setTint(0xc49c5f).setInteractive().setOrigin(1, 0.5).setAlpha(0);

        if (this.data.get('logeado')) {
            // var loginButton = this.add.bitmapText(this.game.renderer.width * 0.99, this.game.renderer.height * 0.974, "Alagard", this.data.get("user"))
            //     .setRightAlign().setScale(0.8).setTint(0xc49c5f).setInteractive().setOrigin(1, 0.5);
            var sesionButton = this.add.bitmapText(this.game.renderer.width * 0.99, this.game.renderer.height * 0.974, "Alagard", this.data.get("user"))
                .setRightAlign().setScale(0.8).setTint(0xc49c5f).setInteractive().setOrigin(1, 0.5);

            sesionButton.on("pointerdown", () => {
                sesionButton.setVisible(false);
                cerrarButton.setVisible(false);
                this.data.set('logeado', false);
                this.data.set('user', false);
                this.scene.start("Inicio", {});

            })

            sesionButton.on("pointerover", () => {
                sesionButton.setAlpha(0.000001);
                cerrarButton.setAlpha(1);
                // sesionButton.setVisible(false);
                // cerrarButton.setVisible(true);

            })

            sesionButton.on("pointerout", () => {
                sesionButton.setAlpha(1);
                cerrarButton.setAlpha(0.000001);
                // sesionButton.setVisible(true);
                // cerrarButton.setVisible(false);

            })
        }
        else {
            var loginButton = this.add.bitmapText(this.game.renderer.width * 0.99, this.game.renderer.height * 0.974, "Alagard", tLogin)
                .setRightAlign().setScale(0.8).setTint(0xc49c5f).setInteractive().setOrigin(1, 0.5);
            loginButton.on("pointerdown", () => {
                console.log("Login");
                // if (!loginButton.scene.data.get('logeado'))
                this.scene.start("Logear");
                // else {
                //     cerrarSesion.setVisible(false);
                //     loginButton.setVisible(true);
                //     this.data.set('logeado', false);
                //     this.data.set('user', false);
                //     loginButton.setText("INICIAR SESION");
                //     console.log("Logeado: " + this.data.get('logeado'));
                //     console.log("Usuario: " + this.data.get('user'));
                // }
            })

            loginButton.on("pointerover", () => {
                // if (this.data.get("logeado")) {
                //     loginButton.setVisible(false);
                // }
                // else
                loginButton.setTint(0x59462b);

            })

            loginButton.on("pointerout", () => {
                // if (this.data.get("logeado")) {
                //     cerrarSesion.setVisible(false);
                //     loginButton.setAlpha(1);
                //     loginButton.setText(this.data.get("user"));
                // }
                // else
                loginButton.setTint(0xc49c5f);

            })
        }



        var leaderButton = this.add.bitmapText(this.game.renderer.width * 0.5, this.game.renderer.height * 0.974, "Alagard", "RANKING")
            .setOrigin(0.5).setScale(0.8).setTint(0xc49c5f).setInteractive();

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
            creditosButton.setTint(0x59462b);
        })

        creditosButton.on("pointerout", () => {
            creditosButton.setTint(0xc49c5f);
        })

        leaderButton.on("pointerdown", () => {
            console.log("Ranking");
            this.scene.start("Leaderboard");
        })

        leaderButton.on("pointerover", () => {
            leaderButton.setTint(0x59462b);
        })

        leaderButton.on("pointerout", () => {
            leaderButton.setTint(0xc49c5f);
        })
    }

    update() {

    }
}