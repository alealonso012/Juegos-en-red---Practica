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
        this.select1 = false;
        this.select2 = false;
        this.ready1 = false;
        this.ready2 = false;

        var listo = this.add.rectangle(125.1, 458, 300, 110, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();
        var listo2 = this.add.rectangle(539.1, 458, 300, 110, 0xffffff, 0).setOrigin(0).setScale(0.45).setInteractive();

        var hover1Img = this.add.image(3, 267, "borde").setVisible(false).setScale(0.45).setOrigin(0);
        var hover2Img = this.add.image(3, 267, "borde").setVisible(false).setScale(0.45).setOrigin(0);

        var RecuadroIzq = this.add.image(125, 455, "borde2").setVisible(false).setScale(0.43).setOrigin(0);
        var RecuadroDcha = this.add.image(540, 455, "borde2").setVisible(false).setScale(0.43).setOrigin(0);
        this.add.image(8, 430, "listo1").setScale(0.15).setOrigin(0);
        this.add.image(422, 430, "listo1").setScale(0.15).setOrigin(0);
        var ListoImg = this.add.image(8, 430, "listo2").setVisible(false).setScale(0.15).setOrigin(0);
        var Listo2Img = this.add.image(422, 430, "listo2").setVisible(false).setScale(0.15).setOrigin(0);


        rect1.on("pointerover", () => {
            if (!this.select1) {
                hover1Img.setVisible(true);
                hover1Img.setX(rect1.x);
            }
        })
        rect1.on("pointerout", () => {
            if (!this.select1) hover1Img.setVisible(false);
        })
        rect1.on("pointerdown", () => {
            hover1Img.setX(rect1.x);
            this.select1 = true;
        })

        rect2.on("pointerover", () => {
            if (!this.select1) {
                hover1Img.setVisible(true);
                hover1Img.setX(rect2.x);
            }
        })
        rect2.on("pointerout", () => {
            if (!this.select1) hover1Img.setVisible(false);
        })
        rect2.on("pointerdown", () => {
            hover1Img.setX(rect2.x);
            this.select1 = true;
        })

        rect3.on("pointerover", () => {
            if (!this.select2) {
                hover2Img.setVisible(true);
                hover2Img.setX(rect3.x);
            }
        })
        rect3.on("pointerout", () => {
            if (!this.select2) hover2Img.setVisible(false);
        })
        rect3.on("pointerdown", () => {
            hover2Img.setX(rect3.x);
            this.select2 = true;
        })

        rect4.on("pointerover", () => {
            if (!this.select2) {
                hover2Img.setVisible(true);
                hover2Img.setX(rect4.x);
            }

        })
        rect4.on("pointerout", () => {
            if (!this.select2) hover2Img.setVisible(false);
        })
        rect4.on("pointerdown", () => {
            hover2Img.setX(rect4.x);
            this.select2 = true;
        })

        listo.on("pointerdown", () => {
            if (this.select1) {
                RecuadroIzq.setVisible(true);
                ListoImg.setVisible(true);
                this.ready1 = true;
            }
        })

        listo2.on("pointerdown", () => {
            if (this.select2) {
                RecuadroDcha.setVisible(true);
                Listo2Img.setVisible(true);
                this.ready2 = true;
            }
        })
    }

    update()
    {
        if(this.ready1&&this.ready2)this.scene.start("Escenario3", {derecha: true});
    }

}