import { crearUser } from '../client.js'
import { leerUser } from '../client.js'
import { loginUser } from '../client.js'

export class Logear extends Phaser.Scene {
    user = undefined;
    logeado = false;
    formulario;

    constructor() {
        super({ key: 'Logear' });
    }

    init() {
        this.user = undefined;
        this.logeado = false;
    }

    preload() {
        this.load.image('titulo_fondo', "/resources/img/Fondo.png");
        this.load.html('nameform', '/src/assets/loginform.html');
    }

    create() {
        this.add.image(0, 0, "titulo_fondo").setOrigin(0);

        this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, 0.6).setOrigin(0);
        //this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000, ).setOrigin(0);

        this.formulario = this.add.dom(this.game.renderer.width * 0.25, this.game.renderer.height * 0.5).createFromCache('nameform').setAlpha(0.0);
        this.formulario.setData('loged', false);

        var text = this.add.text(this.game.renderer.width * 0.25, this.game.renderer.height * 0.69,
            'Introduzca usuario y contraseña', { color: 'white', fontFamily: 'Arial', fontSize: '32px ' }).setOrigin(0.5);

        var text2 = this.add.text(this.game.renderer.width * 0.25, this.game.renderer.height * 0.73,
            'Usuario o contraseña incorrectos', { color: 'red', fontFamily: 'Arial', fontSize: '32px ' }).setOrigin(0.5).setVisible(false);

        this.formulario.addListener('click');

        this.formulario.on('click', function (event) {

            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '') {
                    if (loginUser({ nickname: inputUsername.value, password: inputPassword.value })) {
                        this.removeListener('click');
                        this.setData('loged', true);
                        this.setData('user', inputUsername.value);
                        
                    }else{
                        text2.setVisible(true);
                        this.scene.tweens.add({ targets: text2, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                    }
                    //  Turn off the click events


                    //  Tween the login form out
                    //this.scene.tweens.add({ targets: formulario.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    // this.scene.tweens.add({
                    //     targets: formulario, alpha: 0.0, duration: 500, ease: 'Power3'
                    // });

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

        var loginText = this.add.text(this.game.renderer.width * 0.25, this.game.renderer.height * 0.2, "ENTRAR", {
            fontStyle: 'bold',
            fontSize: "68px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var register = this.add.text(this.game.renderer.width * 0.85, this.game.renderer.height * 0.5, "¿REGISTRARSE?", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        var atras = this.add.text(this.game.renderer.width * 0.07, this.game.renderer.height * 0.05, "Atrás", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        atras.on("pointerdown", () => {
            console.log(this.user);
            this.scene.start("Inicio", { nickname: this.user, logeado: this.logeado });
        });

        register.on("pointerdown", () => {
            this.scene.start("Registear");
        });

    }

    update() {
        if (this.formulario.getData('loged')) {
            this.user = this.formulario.getData('user');
            this.logeado = this.formulario.getData('loged');
            console.log(this.user);
            this.scene.start("Inicio", { nickname: this.user, logeado: this.logeado });
        }
    }

}

