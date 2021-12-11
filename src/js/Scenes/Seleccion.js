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
    }

    create() {
        this.add.image(400, 300, "selectscreen").setScale(0.45);
        var rect1 = this.add.rectangle(3, 267, 210, 330, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        var rect2 = this.add.rectangle(97.5, 267, 210, 330, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        var rect3 = this.add.rectangle(422, 267, 210, 330, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        var rect4 = this.add.rectangle(512.5, 267, 210, 330, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();

        var listo = this.add.rectangle(125.1, 458, 300, 110, 0xffffff, 1).setOrigin(0).setScale(0.45).setInteractive();
        var listo2 = this.add.rectangle(539.1, 458, 300, 110, 0xffffff, 1).setOrigin(0).setScale(0.45).setInteractive();
        
        var hoverImg = this.add.image(3, 267, "borde").setVisible(false).setScale(0.45).setOrigin(0);
        var hover2Img = this.add.image(3, 267, "borde").setVisible(false).setScale(0.45).setOrigin(0);
        var ListoImg = this.add.image(3, 267, "borde").setVisible(false).setScale(0.45).setOrigin(0);

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