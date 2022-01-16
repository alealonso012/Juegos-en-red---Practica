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
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);
        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        //this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, ).setOrigin(0);

        this.formulario = this.add.dom(this.game.renderer.width * 0.25, this.game.renderer.height * 0.5).createFromCache('nameform').setAlpha(0.0);

        this.formulario.setData('registered', false);

        var text = this.add.text(this.game.renderer.width * 0.25, this.game.renderer.height * 0.69, 'Introduzca usuario y contraseña', { color: 'white', fontFamily: 'Arial', fontSize: '32px ' }).setOrigin(0.5);;
        var text2 = this.add.text(this.game.renderer.width * 0.25, this.game.renderer.height * 0.73, 'Ese nombre de usuario ya existe', { color: 'red', fontFamily: 'Arial', fontSize: '32px ' }).setOrigin(0.5).setVisible(false);

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

        var registerText = this.add.text(this.game.renderer.width * 0.25, this.game.renderer.height * 0.2, "REGISTRARSE", {
            fontStyle: 'bold',
            fontSize: "68px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        // var usuario = this.add.text(this.game.renderer.width * 0.15, this.game.renderer.height * 0.4, "Usuario: ", {
        //     fontStyle: 'bold',
        //     fontSize: "55px",
        //     fill: "#e8d59e"
        // }).setOrigin(0.5);

        // var passw = this.add.text(this.game.renderer.width * 0.15, this.game.renderer.height * 0.6, "Contraseña: ", {
        //     fontStyle: 'bold',
        //     fontSize: "55px",
        //     fill: "#e8d59e"
        // }).setOrigin(0.5);

        // var borde1 = this.add.image(this.game.renderer.width * 0.40, usuario.y, "borde").setScale(1.6, 1);
        // var borde2 = this.add.image(borde1.x, passw.y, "borde").setScale(1.6, 1);



        var atras = this.add.text(this.game.renderer.width * 0.07, this.game.renderer.height * 0.05, "Atrás", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Logear");
        });
    }

    update(){
        if (this.formulario.getData('registered')) {
            this.scene.start("Inicio", {});
            console.log("saaik")
        }
    }
}