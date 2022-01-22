import { registerUser } from '../client.js'
import { leerUser } from '../client.js'
import { crearUser } from '../client.js'

export class Registear extends Phaser.Scene {
    formulario;

    constructor() {
        super({ key: 'Registear' });
    }
    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.image('Atras', "/resources/img/atras.png");
        this.load.image('Atras2', "/resources/img/atras2.png");

        this.load.bitmapFont(
            'Alagard',
            './src/fonts/Alagard.png',
            './src/fonts/Alagard.xml'
        );
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        //this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, ).setOrigin(0);

        this.formulario = this.add.dom(this.game.renderer.width * 0.25, this.game.renderer.height * 0.5).createFromCache('nameform').setAlpha(0.0);

        this.formulario.setData('registered', false);

        var text = this.add.bitmapText(this.game.renderer.width * 0.25, this.game.renderer.height * 0.72, "Alagard",
            'Introduzca usuario y contrasena').setOrigin(0.5).setTint(0xe8d59e).setScale(0.65);

        var ese = this.add.bitmapText(text.x + 310, text.y - 20, "Alagard",
            '2').setOrigin(0.5).setTint(0xe8d59e).setScale(0.24, 0.38).setRotation(Phaser.Math.PI2 / 4);

        var text2 = this.add.bitmapText(this.game.renderer.width * 0.25, this.game.renderer.height * 0.78, "Alagard", 'Ese nombre de usuario ya existe')
            .setOrigin(0.5).setTint(0xff0000).setScale(0.65).setVisible(false);

        var text3 = this.add.bitmapText(this.game.renderer.width * 0.73, this.game.renderer.height * 0.45, "Alagard",
            'USUARIO CREADO').setOrigin(0.5).setTint(0xe8d59e).setScale(0.95).setVisible(false);

        this.formulario.addListener('click');

        this.formulario.on('click', function (event) {

            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '') {
                    //  Turn off the click events
                    if (registerUser({ nickname: inputUsername.value, password: inputPassword.value })) {
                        this.removeListener('click');
                        text3.setVisible(true);
                        this.scene.tweens.add({ targets: text3, alpha: 0.1, duration: 100, ease: 'Power3', yoyo: true });
                        this.setData('registered', true);
                    } else {
                        text2.setVisible(true);
                        this.scene.tweens.add({ targets: text2, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                    }

                    //  Tween the login form out
                    //this.scene.tweens.add({ targets: formulario.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    //  Populate the text with whatever they typed in as the username!
                    //text.setText('Welcome ' + inputUsername.value);
                }
                else {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                    this.scene.tweens.add({ targets: ese, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });

        this.tweens.add({
            targets: this.formulario,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 1.0,
            duration: 2000,
            ease: 'Power3'
        });

        var registerText = this.add.bitmapText(this.game.renderer.width * 0.25, this.game.renderer.height * 0.2, "Alagard", "REGISTRARSE")
            .setOrigin(0.5).setTint(0xe8d59e);

        var atras = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.075, "Atras2")
            .setOrigin(0.5).setScale(0.6).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Logear", {});
        });

        atras.on("pointerover", () => {
            atras.setTexture("Atras");
        });

        atras.on("pointerout", () => {
            atras.setTexture("Atras2");
        });
    }

    update() {
        if (this.formulario.getData('registered')) {
            this.time.delayedCall(2100, () => {
                this.scene.start("Inicio", {});
            });
        }
    }
}