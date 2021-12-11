export class Seleccion extends Phaser.Scene {

    constructor() {
        super({ key: 'Seleccion' });
    }

    preload() {
        this.load.image('selectscreen', "/resources/img/SelectScreen.png");
        this.load.image('borde', "/resources/img/Characterborder.png");
        this.load.image('borde2', "/resources/img/Readyborder.png");
        this.load.image('listo1', "/resources/img/Listo.png");
        this.load.image('listo2', "/resources/img/Listo2.png");
        this.load.image('player1', "/resources/img/Player1.png");
        this.load.image('player2', "/resources/img/Player2.png");
    }

    create() {
        this.add.image(400, 300, "selectscreen").setScale(0.45);
        this.add.image(200, 85, "player1").setScale(0.15);
        this.add.image(610, 85, "player2").setScale(0.15);
        var rect1 = this.add.rectangle(3, 267, 210, 330, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        var rect2 = this.add.rectangle(97.5, 267, 210, 330, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        var rect3 = this.add.rectangle(417, 267, 210, 330, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        var rect4 = this.add.rectangle(511, 267, 210, 330, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();

        var listo = this.add.rectangle(125.1, 458, 300, 110, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        var listo2 = this.add.rectangle(539.1, 458, 300, 110, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        
        var hoverImg = this.add.image(3, 267, "borde").setVisible(false).setScale(0.45).setOrigin(0);
        var hover2Img = this.add.image(125, 455, "borde2").setVisible(false).setScale(0.43).setOrigin(0);
        var hover3Img = this.add.image(540, 455, "borde2").setVisible(false).setScale(0.43).setOrigin(0);
        this.add.image(8, 430, "listo1").setScale(0.15).setOrigin(0);
        this.add.image(422, 430, "listo1").setScale(0.15).setOrigin(0);
        var ListoImg = this.add.image(8, 430, "listo2").setVisible(false).setScale(0.15).setOrigin(0);
        var Listo2Img = this.add.image(422, 430, "listo2").setVisible(false).setScale(0.15).setOrigin(0);
        

        rect1.on("pointerover", () => {
            hoverImg.setVisible(true);
            hoverImg.setX(rect1.x);
        })
        rect1.on("pointerout", () => {
            hoverImg.setVisible(false);
        })

        rect2.on("pointerover", () => {
            hoverImg.setVisible(true);
            hoverImg.setX(rect2.x);
        })
        rect2.on("pointerout", () => {
            hoverImg.setVisible(false);
        })

        rect3.on("pointerover", () => {
            hoverImg.setVisible(true);
            hoverImg.setX(rect3.x);

        })
        rect3.on("pointerout", () => {
            hoverImg.setVisible(false);
        })

        rect4.on("pointerover", () => {
            hoverImg.setVisible(true);
            hoverImg.setX(rect4.x);

        })
        rect4.on("pointerout", () => {
            hoverImg.setVisible(false);
        })

        listo.on("pointerover", () => {
            hover2Img.setVisible(true);
            ListoImg.setVisible(true);
        })
        listo.on("pointerout", () => {
            hover2Img.setVisible(false);
            ListoImg.setVisible(false);
        })

        listo2.on("pointerover", () => {
            hover3Img.setVisible(true);
            Listo2Img.setVisible(true);
        })
        listo2.on("pointerout", () => {
            hover3Img.setVisible(false);
            Listo2Img.setVisible(false);
        })

        // localButton.setInteractive();
        // onlineButton.setInteractive();

        // localButton.on("pointerover", () => {
        //     hoverImg.setVisible(true);
        //     hoverImg.play("mover");
        //     hoverImg.x = 150;
        //     hoverImg.y = 270;
        // })

        // onlineButton.on("pointerover", () => {
        //     hoverImg.setVisible(true);
        //     hoverImg.play("mover");
        //     hoverImg.x = 150;
        //     hoverImg.y = 350;
        // })

        // localButton.on("pointerout", () => {
        //     hoverImg.setVisible(false);
        // })

        // onlineButton.on("pointerout", () => {
        //     hoverImg.setVisible(false);
        // })

        // localButton.on("pointerdown", () => {
        //     console.log("Jugando");
        //     this.scene.start("Escenario1");
        // })
    }

}