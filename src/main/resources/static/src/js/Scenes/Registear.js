export class Registear extends Phaser.Scene {

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

        var loginText = this.add.text(this.game.renderer.width * 0.25, this.game.renderer.height * 0.2, "REGISTER", {
            fontStyle: 'bold',
            fontSize: "68px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var usuario = this.add.text(this.game.renderer.width * 0.15, this.game.renderer.height * 0.4, "Usuario: ", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var passw = this.add.text(this.game.renderer.width * 0.15, this.game.renderer.height * 0.6, "Contraseña: ", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5);

        var borde1 = this.add.image(this.game.renderer.width * 0.40, usuario.y, "borde").setScale(1.6, 1);
        var borde2 = this.add.image(borde1.x, passw.y, "borde").setScale(1.6, 1);

        var atras = this.add.text(this.game.renderer.width * 0.07, this.game.renderer.height * 0.05, "Atrás", {
            fontStyle: 'bold',
            fontSize: "55px",
            fill: "#e8d59e"
        }).setOrigin(0.5).setInteractive();

        atras.on("pointerdown", () => {
            this.scene.start("Logear");
        });

        //TECLADO--------------------------------
        this.name = '';
        this.playerText = this.add.text(560, 310, this.name).setTint(0xff0000);

        

        this.input.keyboard.on('keyup', function (event) {

            if (event.keyCode === 65)
            {
                console.log("A")
                console.log(event.keyCode)
                this.name = this.name.concat("a");
            }

            //_____________________________________________________________________________________________________________

            if (event.keyCode === 37)
            {
                //  left
                if (cursor.x > 0)
                {
                    cursor.x--;
                    block.x -= 52;
                }
            }
            else if (event.keyCode === 39)
            {
                //  right
                if (cursor.x < 9)
                {
                    cursor.x++;
                    block.x += 52;
                }
            }
            else if (event.keyCode === 38)
            {
                //  up
                if (cursor.y > 0)
                {
                    cursor.y--;
                    block.y -= 64;
                }
            }
            else if (event.keyCode === 40)
            {
                //  down
                if (cursor.y < 2)
                {
                    cursor.y++;
                    block.y += 64;
                }
            }
            else if (event.keyCode === 13 || event.keyCode === 32)
            {
                //  Enter or Space
                if (cursor.x === 9 && cursor.y === 2 && name.length > 0)
                {
                    //  Submit
                }
                else if (cursor.x === 8 && cursor.y === 2 && name.length > 0)
                {
                    //  Rub
                    name = name.substr(0, name.length - 1);
    
                    playerText.text = name;
                }
                else if (name.length < 3)
                {
                    //  Add
                    name = name.concat(chars[cursor.y][cursor.x]);
    
                    playerText.text = name;
                }
            }
    
        });

    }
}