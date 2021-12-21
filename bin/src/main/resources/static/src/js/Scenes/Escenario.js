//Las estancias son 0-Baja , 1-Media, 2-Alto
var def1 = true // Defensa pasiva del jugador 1
var def2 = true // Defensa pasiva del jugador 2
var stance1 = 1; // Estancia del jugador 1.
var stance2 = 1; // Estancia del jugador 2.
var position = 0; //Determina hacia donde debería mirar cada jugador. 0 es lo normal, 1 al revés
var parry1 = false; //Está jugador 1 haciendo parry
var parry2 = false; //Está jugador 2 haciendo parry
var jumping1 = false; //Jugador 1 saltando 
var jumping2 = false; //Jugador 2 saltando
var crouch1 = false; //Jugador 1 agachado 
var crouch2 = false; //Jugador 2 agachado 
var p1Stop = false; //No permite al jugador1 atacar.
var p2Stop = false; //No permite al jugador2 atacar.
var wait = 0;

import { StateMachine } from './statemachine/StateMachine.js'

import { State } from './statemachine/StateMachine.js'

//FIN GLOBALES PJ
export class Escenario extends Phaser.Scene {
    Derecha;
    leftScene;
    rightScene;
    platJson;

    constructor(key, lScene, rScene, pJson) {
        super(key);
        this.leftScene = lScene;
        this.rightScene = rScene;
        this.platJson = pJson;
        this.scene = this.scene;
    }

    init(data) {
        this.Derecha = data.derecha;
        console.log(this.Derecha);
    }

    preload() {

        this.load.audio('ping', '/resources/audio/metalping.ogg');
        console.log("En preload");
        this.load.image('Fondo', "/resources/img/FondoIngame.png");
        this.load.image("tiles", "/resources/img/Plataformas.png");
        this.load.tilemapTiledJSON(this.platJson, this.platJson);
        //INICIO COSAS PERSONAJE
        this.load.spritesheet('run',
            'src/js/Scenes/pj/RunMid.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('idle',
            'src/js/Scenes/pj/IdleMid.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('heavy',
            'src/js/Scenes/pj/HeavyHigh.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('jump',
            'src/js/Scenes/pj/Jump1.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('light',
            'src/js/Scenes/pj/LightMid.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('bDash',
            'src/js/Scenes/pj/BackDash1.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('fDash',
            'src/js/Scenes/pj/ForwardDash1.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('crouch',
            'src/js/Scenes/pj/Agachado1.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('parry',
            'src/js/Scenes/pj/Parry.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('dead',
            'src/js/Scenes/pj/Dead.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('heavyL',
            'src/js/Scenes/pj/HeavyLow.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('heavyM',
            'src/js/Scenes/pj/HeavyMid.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('idleH',
            'src/js/Scenes/pj/IdleHigh.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('idleL',
            'src/js/Scenes/pj/IdleLow.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('lightH',
            'src/js/Scenes/pj/LightHigh.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('lightL',
            'src/js/Scenes/pj/LightLow.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('runL',
            'src/js/Scenes/pj/RunLow.png',
            { frameWidth: 500, frameHeight: 600 })
        this.load.spritesheet('runH',
            'src/js/Scenes/pj/RunHigh.png',
            { frameWidth: 500, frameHeight: 600 })
        //FIN COSAS PERSONAJE
    }

    create() {
        this.ping = this.sound.add('ping', { volume: 1 });
        console.log(this.scene.key);

        this.add.image(0, 0, "Fondo").setOrigin(0).setScale(8);
        const map = this.make.tilemap({ key: this.platJson, tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("Plataformas", "tiles");
        const layer = map.createLayer("toplayout", tileset, 0, 0).setScale(1);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.telon = this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000).setOrigin(0);

        this.physics.add.existing(this.telon);
        this.telon.body.setAllowGravity(false);

        this.telon.setData('derecha', this.Derecha);
        this.telon.setData('abierto', false);
        this.telon.depth = 10;



        //this.events.on('shutdown', this.shutdown, this);

        //INICIO COSAS PERSONAJE
        //LHITBOX1
        this.lHitbox = this.add.rectangle(0, 0, 45, 16, 0xffffff, 0)
        this.physics.add.existing(this.lHitbox)
        this.lHitbox.body.allowGravity = false
        this.lHitbox.body.enable = false
        //LHITBOX1

        //H HITBOX1
        this.hHitbox = this.add.rectangle(0, 0, 65, 45, 0xffffff, 0)
        this.physics.add.existing(this.hHitbox)
        this.hHitbox.body.allowGravity = false
        this.hHitbox.body.enable = false
        //H HITBOX1

        //LHITBOX2
        this.lHitbox2 = this.add.rectangle(0, 0, 45, 16, 0xffffff, 0)
        this.physics.add.existing(this.lHitbox2)
        this.lHitbox2.body.allowGravity = false
        this.lHitbox2.body.enable = false
        //LHITBOX2

        //H HITBOX2
        this.hHitbox2 = this.add.rectangle(0, 0, 65, 45, 0xffffff, 0)
        this.physics.add.existing(this.hHitbox2)
        this.hHitbox2.body.allowGravity = false
        this.hHitbox2.body.enable = false
        //H HITBOX2

        //PLAYER1
        this.player = this.physics.add.sprite(75, 300, 'idle');
        this.player.setTint(0xd11dc5);
        this.player.setScale(0.4);
        this.player.flipX = false;
        this.player.setBodySize(100, 160);
        this.player.setOffset(175, 175);
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        //PLAYER1

        //PLAYER2
        this.player2 = this.physics.add.sprite(725, 300, 'idle');
        this.player2.setTint(0xd00a8f0);
        this.player2.setScale(0.4);
        this.player2.flipX = true;
        this.player2.setBodySize(100, 160);
        this.player2.setOffset(225, 175);
        this.player2.setBounce(0);
        this.player2.setCollideWorldBounds(true);
        //PLAYER2

        //ANIMACIONES

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'rightL',
            frames: this.anims.generateFrameNumbers('runL', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'rightH',
            frames: this.anims.generateFrameNumbers('runH', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('run', { start: 3, end: 0 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'leftL',
            frames: this.anims.generateFrameNumbers('runL', { start: 3, end: 0 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'leftH',
            frames: this.anims.generateFrameNumbers('runH', { start: 3, end: 0 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'idleL',
            frames: this.anims.generateFrameNumbers('idleL', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'idleH',
            frames: this.anims.generateFrameNumbers('idleH', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 0 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'light',
            frames: this.anims.generateFrameNumbers('light', { start: 0, end: 1 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'lightL',
            frames: this.anims.generateFrameNumbers('lightL', { start: 0, end: 1 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'lightH',
            frames: this.anims.generateFrameNumbers('lightH', { start: 0, end: 1 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'heavy',
            frames: this.anims.generateFrameNumbers('heavy', { start: 0, end: 2 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'heavyL',
            frames: this.anims.generateFrameNumbers('heavyL', { start: 0, end: 2 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'heavyM',
            frames: this.anims.generateFrameNumbers('heavyM', { start: 0, end: 2 }),
            frameRate: 7,
        });
        this.anims.create({
            key: 'fDash',
            frames: this.anims.generateFrameNumbers('fDash', { start: 0, end: 0 }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'bDash',
            frames: this.anims.generateFrameNumbers('bDash', { start: 0, end: 0 }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'crouch',
            frames: this.anims.generateFrameNumbers('crouch', { start: 0, end: 0 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'parry',
            frames: this.anims.generateFrameNumbers('parry', { start: 0, end: 3 }),
            frameRate: 8,
        });
        this.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers('dead', { start: 0, end: 1 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'parried',
            frames: this.anims.generateFrameNumbers('dead', { start: 0, end: 0 }),
            frameRate: 1,
        });
        //ANIMACIONES


        //Declaración de teclas J1
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.nKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.kKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.jKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.vKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        //Declaración de teclas J1

        //Declaración de teclas J2
        this.n0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.n6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX);
        this.n1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
        this.n2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);
        this.n4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);
        this.n5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE);
        //Declaración de teclas J2

        //COLLIDERS
        //this.physics.add.collider(this.player, platforms);
        //this.physics.add.collider(player2, platforms);

        this.physics.add.overlap(this.lHitbox, this.player2, p2LHit, undefined, this);
        this.physics.add.overlap(this.hHitbox, this.player2, p2HHit, undefined, this);

        this.physics.add.overlap(this.lHitbox2, this.player, p1LHit, undefined, this);
        this.physics.add.overlap(this.hHitbox2, this.player, p1HHit, undefined, this);
        //COLLIDERS


        ///////////////////////STATE MACHINE////////////////////////
        this.stateMachine = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            light: new LightState(),
            heavy: new HeavyState(),
            rDash: new RDashState(),
            lDash: new LDashState(),
            parry: new ParryState(),
            crouch: new CrouchState(),
            jump: new JumpState(),
            wait: new WaitState(),
            dead: new DeadState(),

        }, [this, this.player])

        this.stateMachine2 = new StateMachine('idle', {
            idle: new IdleState2(),
            move: new MoveState2(),
            light: new LightState2(),
            heavy: new HeavyState2(),
            rDash: new RDashState2(),
            lDash: new LDashState2(),
            parry: new ParryState2(),
            crouch: new CrouchState2(),
            jump: new JumpState2(),
            wait: new WaitState2(),
            dead: new DeadState2(),

        }, [this, this.player2])
        //FIN COSAS PERSONAJE
        this.physics.add.collider(this.player2, layer);
        this.physics.add.collider(this.player, layer);

        this.player.body.setMaxVelocityY(1100);
        this.player2.body.setMaxVelocityY(1100);

        layer.setCollisionBetween(340, 664);

        this.textP1 = this.add.text(this.player.x, this.player.y, "P1", {
            fontStyle: 'bold',
            fontSize: "35px",
            fill: "#ffffff"
        }).setOrigin(0.5);

        this.textP2 = this.add.text(this.player2.x, this.player2.y, "P2", {
            fontStyle: 'bold',
            fontSize: "35px",
            fill: "#ffffff"
        }).setOrigin(0.5);
    }

    update() {
        this.gestionarTelon();

        //Cosas personaje
        if (this.player.x < this.player2.x) {
            this.player.flipX = false
            this.player2.flipX = true
            position = 1
            this.player.setOffset(175, 175);
            this.player2.setOffset(225, 175);
            this.textP1.setPosition(this.player.x-9, this.player.y - 70);
            this.textP2.setPosition(this.player2.x+9, this.player2.y - 70);

        } else {
            this.player.flipX = true
            this.player2.flipX = false
            position = 2
            this.player.setOffset(225, 175);
            this.player2.setOffset(175, 175);
            this.textP1.setPosition(this.player.x+9, this.player.y - 70);
            this.textP2.setPosition(this.player2.x-9, this.player2.y - 70);
        }

            //Muerte por caida
        if (this.player.y > this.game.renderer.height*0.95) {
            this.stateMachine.transition('dead')
        }
        if (this.player2.y > this.game.renderer.height*0.95) {
            this.stateMachine2.transition('dead')
        }

        this.stateMachine.step();
        this.stateMachine2.step();
        //fin cosas personaje
    }

    gestionarTelon() {
        if (!(this.telon.getData('abierto')) && this.telon.body.velocity.x == 0) {
            this.telonAbrir(this.telon.getData('derecha'));
        } else if (!(this.telon.getData('abierto')) && this.telon.body.velocity.x != 0) {
            this.telonComprobarAbierto(this.telon.getData('derecha'));
        } else if ((this.telon.getData('abierto')) && this.telon.body.velocity.x != 0) {
            this.telonComprobarCerrado(this.telon.getData('derecha'));
        }
    }

    telonAbrir(Derecha) {
        if (Derecha) {
            this.telon.body.setVelocityX(4000);
        }
        else {
            this.telon.body.setVelocityX(-4000);
        }
    }

    telonComprobarAbierto(Derecha) {
        if (Derecha) {
            if (this.telon.body.x > this.game.renderer.width) {
                this.telon.body.setVelocityX(0);
                this.telon.toggleData('abierto');
            }
        }
        else {
            if (this.telon.body.x < -this.game.renderer.width) {
                this.telon.body.setVelocityX(0);
                this.telon.toggleData('abierto');
            }
        }
    }

    cerrarTelonDcha() {
        if (this.telon.body.velocity.x == 0) {
            this.telon.setX(-this.game.renderer.width);
            this.telon.body.setVelocityX(4000);
            this.telon.setData('derecha', true);
        }
    }
    cerrarTelonIzq() {
        if (this.telon.body.velocity.x == 0) {
            this.telon.setX(this.game.renderer.width);
            this.telon.body.setVelocityX(-4000);
            this.telon.setData('derecha', false);
        }
    }

    telonComprobarCerrado(Derecha) {
        if (Derecha) {
            if (this.telon.body.x > 0) {
                this.telon.body.setVelocityX(0);
                this.telon.toggleData('abierto');
                this.scene.start(this.leftScene, { derecha: true });
            }
        }
        else {
            if (this.telon.body.x < 0) {
                this.telon.body.setVelocityX(0);
                this.telon.toggleData('abierto');
                this.scene.start(this.rightScene, { derecha: false });
            }
        }
    }



}
//CLASES PERSONAJE
class IdleState extends State {
    enter(scene, player) {
        if (stance1 == 0) {
            player.anims.play('idleL');
        } else if (stance1 == 1) {
            player.anims.play('idle');
        } else if (stance1 == 2) {
            player.anims.play('idleH');
        }
    }
    execute(scene, player) {
        //const { left, right, up, down, space } = scene.keys;
        const mJustDown = Phaser.Input.Keyboard.JustDown(scene.mKey);
        const nJustDown = Phaser.Input.Keyboard.JustDown(scene.nKey);
        const vJustDown = Phaser.Input.Keyboard.JustDown(scene.vKey);
        if (mJustDown) {
            changeStance1(1) //Subir guardia
            if (stance1 == 0) {
                player.anims.play('idleL');
            } else if (stance1 == 1) {
                player.anims.play('idle');
            } else if (stance1 == 2) {
                player.anims.play('idleH');
            }
        }
        if (nJustDown) {
            changeStance1(0) //Bajar guardia
            if (stance1 == 0) {
                player.anims.play('idleL');
            } else if (stance1 == 1) {
                player.anims.play('idle');
            } else if (stance1 == 2) {
                player.anims.play('idleH');
            }
        }

        if (vJustDown) {
            this.stateMachine.transition('parry');
            return;
        }
        if (p1Stop == false) {
            if (scene.kKey.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.jKey.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (player.body.blocked.down) {
            player.setVelocityX(0);
            jumping1 = false;
            if (scene.sKey.isDown) {
                this.stateMachine.transition('crouch')
                return;
            }
            if (scene.aKey.isDown || scene.dKey.isDown || scene.wKey.isDown) {
                if (scene.aKey.isDown && scene.space.isDown) {
                    this.stateMachine.transition('lDash')
                    return;
                }
                if (scene.dKey.isDown && scene.space.isDown) {
                    this.stateMachine.transition('rDash')
                    return;
                }
                this.stateMachine.transition('move');
                return;
            }
        }
    }
}
class MoveState extends State {
    enter(scene, player) {

        if (scene.dKey.isDown) {
            if (stance1 == 0) {
                player.anims.play('rightL');
            } else if (stance1 == 1) {
                player.anims.play('right');
            } else if (stance1 == 2) {
                player.anims.play('rightH');
            }
        } else if (scene.aKey.isDown) {
            if (stance1 == 0) {
                player.anims.play('leftL');
            } else if (stance1 == 1) {
                player.anims.play('left');
            } else if (stance1 == 2) {
                player.anims.play('leftH');
            }
        }
    }
    execute(scene, player) {
        const mJustDown = Phaser.Input.Keyboard.JustDown(scene.mKey);
        const nJustDown = Phaser.Input.Keyboard.JustDown(scene.nKey);
        const vJustDown = Phaser.Input.Keyboard.JustDown(scene.vKey);
        if (mJustDown) {
            changeStance1(1) //Subir guardia
            if (stance1 == 0) {
                player.anims.play('leftL');
            } else if (stance1 == 1) {
                player.anims.play('left');
            } else if (stance1 == 2) {
                player.anims.play('leftH');
            }
        }
        if (nJustDown) {
            changeStance1(0) //Bajar guardia
            if (stance1 == 0) {
                player.anims.play('leftL');
            } else if (stance1 == 1) {
                player.anims.play('left');
            } else if (stance1 == 2) {
                player.anims.play('leftH');
            }
        }

        if (vJustDown) {
            this.stateMachine.transition('parry');
            return;
        }
        if (scene.aKey.isDown && scene.space.isDown) {
            this.stateMachine.transition('lDash')
            return;
        }
        if (scene.dKey.isDown && scene.space.isDown) {
            this.stateMachine.transition('rDash')
            return;
        }
        if (scene.sKey.isDown) {
            this.stateMachine.transition('crouch')
            return;
        }
        if (p1Stop == false) {
            if (scene.kKey.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.jKey.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (scene.wKey.isDown && player.body.blocked.down) {
            this.stateMachine.transition('jump');
            return;
        }
        if (!(scene.aKey.isDown || scene.dKey.isDown || scene.wKey.isDown)) {
            this.stateMachine.transition('idle');
            return;
        }
        if (scene.dKey.isDown) {
            player.setVelocityX(250);
            return;
        } else if (scene.aKey.isDown) {
            player.setVelocityX(-250);
            return;
        }
    }
}
class LightState extends State {
    enter(scene, player) {
        def1 = false;
        if (stance1 == 0) {
            player.anims.play('lightL');
        } else if (stance1 == 1) {
            player.anims.play('light');
        } else if (stance1 == 2) {
            player.anims.play('lightH');
        }
    }
    execute(scene, player) {
        if (player.anims.currentFrame.index < 2) {
            return
        } else {
            if (position == 1) {
                scene.lHitbox.x = player.x + (player.width * 0.06)
            } else {
                scene.lHitbox.x = player.x - (player.width * 0.06)
            }
            scene.lHitbox.y = player.y - (player.height * 0.04)
            scene.lHitbox.body.enable = true
            if (player.body.blocked.down) {
                player.setVelocityX(0);
            }
            player.once('animationcomplete', () => {
                def1 = true;
                if (player.anims.currentAnim.key == "light" || player.anims.currentAnim.key == "lightL" || player.anims.currentAnim.key == "lightH") {
                    this.stateMachine.transition('idle');
                    scene.lHitbox.body.enable = false
                }
            });
        }

    }
}
class HeavyState extends State {
    enter(scene, player) {
        def1 = false;
        if (stance1 == 0) {
            player.anims.play('heavyL');
        } else if (stance1 == 1) {
            player.anims.play('heavyM');
        } else if (stance1 == 2) {
            player.anims.play('heavy');
        }
    }
    execute(scene, player) {

        if (player.anims.currentFrame.index < 2) {
            return
        } else {
            if (position == 1) {
                scene.hHitbox.x = player.x + (player.width * 0.06)
            } else {
                scene.hHitbox.x = player.x - (player.width * 0.06)
            }
            scene.hHitbox.y = player.y - (player.height * 0.08)
            scene.hHitbox.body.enable = true
            if (player.body.blocked.down) {
                player.setVelocityX(0);
            }
            player.once('animationcomplete', () => {
                def1 = true
                if (player.anims.currentAnim.key == "heavy" || player.anims.currentAnim.key == "heavyM" || player.anims.currentAnim.key == "heavyL") {
                    this.stateMachine.transition('idle');
                    scene.hHitbox.body.enable = false
                }
            });
        }


    }
}
class RDashState extends State {
    execute(scene, player) {
        def1 = false
        player.setVelocityX(700);
        if (p1Stop == false) {
            if (scene.kKey.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.jKey.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (position > 0) {
            player.anims.play(`fDash`, true);
        } else {
            player.anims.play(`bDash`, true);
        }
        if (scene.sKey.isDown) {
            def1 = true
            this.stateMachine.transition('crouch')
            return;
        }
        player.once('animationcomplete', () => {
            def1 = true
            this.stateMachine.transition('idle');
        });
    }
}
class LDashState extends State {
    execute(scene, player) {
        def1 = false
        player.setVelocityX(-700);
        if (p1Stop == false) {
            if (scene.kKey.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.jKey.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (position > 0) {
            player.anims.play(`bDash`, true);
        } else {
            player.anims.play(`fDash`, true);
        }
        if (scene.sKey.isDown) {
            def1 = true
            this.stateMachine.transition('crouch')
            return;
        }
        player.once('animationcomplete', () => {
            def1 = true
            this.stateMachine.transition('idle');
        });
    }
}
class ParryState extends State {
    enter(scene, player) {
        player.anims.play(`parry`, true);
        parry1 = true
        def1 = true
    }

    execute(scene, player) {
        if (player.anims.currentFrame.index > 3) {
            parry1 = false
            def1 = false;
        }
        if (player.body.blocked.down) {
            player.setVelocityX(0);
        }
        player.once('animationcomplete', () => {
            scene.time.delayedCall(500, () => {
                def1 = true;
                this.stateMachine.transition('idle');
            })
        })
    }
}
class CrouchState extends State {
    execute(scene, player) {
        changeStance1(2)
        crouch1 = true;
        player.setVelocityX(0);
        if (p1Stop == false) {
            if (scene.kKey.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.jKey.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (!(scene.sKey.isDown)) {
            crouch1 = false;
            this.stateMachine.transition('idle');
            return;
        } else {
            player.setVelocityX(0);

            player.anims.play('crouch', true);
        }

    }
}
class JumpState extends State {
    execute(scene, player) {
        def1 = false
        jumping1 = true
        //changeStance1(2)
        if (p1Stop == false) {
            if (scene.kKey.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.jKey.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (scene.wKey.isDown && player.body.blocked.down) {
            player.setVelocityY(-1200);
        }
        player.anims.play(`jump`, true);
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle');
        });
    }
}
class WaitState extends State {
    enter(scene, player) {
        player.anims.play('parried');
        scene.time.delayedCall(wait, () => {
            p1Stop = false;
            console.log("PARRY->IDLE")
            this.stateMachine.transition('move');
            def1 = true;
            return;
        })
    }
    execute(scene, player) {
        const vJustDown = Phaser.Input.Keyboard.JustDown(scene.vKey);
        if (vJustDown) {
            def1 = true;
            this.stateMachine.transition('parry');
        }
    }
}
class DeadState extends State {
    enter(scene, player) {
        player.anims.play('dead')
        scene.time.delayedCall(500, () => {
            scene.cerrarTelonDcha();
        })
    }
    execute(scene, player) {

    }
}
function p2LHit(box, player) {
    ///Handle esto

    if ((crouch2 == true && stance1 == 2) || (jumping2 == true && stance1 == 0)) { //Si se ataca a un enemigo agachado con un ataque alto o aun enemigo saltando con un ataque bajo, no tiene efecto
        return;
    }
    if (parry2 == true) {
        wait = 1500;
        def1 = false
        this.lHitbox.body.enable = false
        console.log("2 PARRIES")
        this.stateMachine.transition('wait');
        return;
    }
    if (def2 == false || stance1 != stance2) {
        box.body.enable = false
        console.log("2 LHIT")
        this.stateMachine2.transition('dead');
        return;
    } else if (stance1 == stance2) {
        def1 = true
        this.ping.play();
        this.lHitbox.body.enable = false
        p1Stop = true
        this.hHitbox.body.enable = false
        console.log("2 BLOCKS")
        this.stateMachine.transition('idle');
        this.time.delayedCall(500, () => {
            p1Stop = false
        })
    }

}
function p2HHit(box, player) {
    ///Handle esto
    if ((crouch2 == true && stance1 == 2) || (jumping2 == true && stance1 == 0)) { //Si se ataca a un enemigo agachado con un ataque alto o aun enemigo saltando con un ataque bajo, no tiene efecto
        return;
    }
    if (parry2 == true) {
        wait = 1500;
        def1 = false
        this.hHitbox.body.enable = false
        this.stateMachine.transition('wait');
        console.log("2 PARRIES")
        return;
    }
    if (def2 == false || stance1 != stance2) {
        console.log("2 HHIT")
        this.stateMachine2.transition('dead');
        this.hHitbox.body.enable = false
        return;
    }
    if (stance1 == stance2) {
        def1 = true
        this.ping.play();
        p1Stop = true
        this.hHitbox.body.enable = false
        console.log("1 BLOCKS")
        this.stateMachine.transition('idle');
        this.time.delayedCall(500, () => {
            p1Stop = false
        })
        return;
    }
}

function changeStance1(option) {
    ///Pues eso
    if (option == 0) { //Bajar guardia
        stance1--
        if (stance1 == -1) {
            stance1 = 2;
        }
    } else if (option == 1) { //subir guardia
        stance1++
        if (stance1 == 3) {
            stance1 = 0;
        }
    } else if (option == 2) { //agachado
        stance1 = 0;
    } else if (option == 3) { //saltando
        stance1 = 2;
    }

}


///STATE MACHINE DEL JUGADOR 2, IMPLEMENTACIÓN, HELP ME


class IdleState2 extends State {
    enter(scene, player) {
        if (stance2 == 0) {
            player.anims.play('idleL');
        } else if (stance2 == 1) {
            player.anims.play('idle');
        } else if (stance2 == 2) {
            player.anims.play('idleH');
        }
    }
    execute(scene, player) {

        def2 = true
        //const { left, right, up, down, space } = scene.keys;
        const n1JustDown = Phaser.Input.Keyboard.JustDown(scene.n1);
        const n2JustDown = Phaser.Input.Keyboard.JustDown(scene.n2);
        const n6JustDown = Phaser.Input.Keyboard.JustDown(scene.n6);
        if (n2JustDown) {
            changeStance2(1) //Subir guardia
            if (stance2 == 0) {
                player.anims.play('idleL');
            } else if (stance2 == 1) {
                player.anims.play('idle');
            } else if (stance2 == 2) {
                player.anims.play('idleH');
            }
        }
        if (n1JustDown) {
            changeStance2(0) //Bajar guardia
            if (stance2 == 0) {
                player.anims.play('idleL');
            } else if (stance2 == 1) {
                player.anims.play('idle');
            } else if (stance2 == 2) {
                player.anims.play('idleH');
            }
        }
        if (n6JustDown) {
            this.stateMachine.transition('parry');
            return;
        }
        if (p2Stop == false) {
            if (scene.n4.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.n5.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (player.body.blocked.down) {
            player.setVelocityX(0);
            jumping2 = false;
            if (scene.downKey.isDown) {
                this.stateMachine.transition('crouch')
            }
            if (scene.leftKey.isDown || scene.rightKey.isDown || scene.upKey.isDown) {
                if (scene.upKey.isDown) {
                    this.stateMachine.transition('jump');
                    return;
                }
                if (scene.leftKey.isDown && scene.n0.isDown) {
                    this.stateMachine.transition('lDash')
                }
                if (scene.rightKey.isDown && scene.n0.isDown) {
                    this.stateMachine.transition('rDash')
                }
                this.stateMachine.transition('move');
                return;
            }
        }
    }
}
class MoveState2 extends State {
    enter(scene, player) {
        if (scene.rightKey.isDown) {
            if (stance2 == 0) {
                player.anims.play('rightL');
            } else if (stance2 == 1) {
                player.anims.play('right');
            } else if (stance2 == 2) {
                player.anims.play('rightH');
            }
        } else if (scene.leftKey.isDown) {
            if (stance2 == 0) {
                player.anims.play('leftL');
            } else if (stance2 == 1) {
                player.anims.play('left');
            } else if (stance2 == 2) {
                player.anims.play('leftH');
            }
        }
    }
    execute(scene, player) {
        def2 = true
        const n1JustDown = Phaser.Input.Keyboard.JustDown(scene.n1);
        const n2JustDown = Phaser.Input.Keyboard.JustDown(scene.n2);
        const n6JustDown = Phaser.Input.Keyboard.JustDown(scene.n6);
        if (n2JustDown) {
            changeStance2(1) //Subir guardia
            if (stance2 == 0) {
                player.anims.play('rightL');
            } else if (stance2 == 1) {
                player.anims.play('right');
            } else if (stance2 == 2) {
                player.anims.play('rightH');
            }
            // } else if (scene.aKey.isDown) {
            //     if (stance2 == 0) {
            //         player.anims.play('leftL');
            //     } else if (stance2 == 1) {
            //         player.anims.play('left');
            //     } else if (stance2 == 2) {
            //         player.anims.play('leftH');
            //     }
        }
        if (n1JustDown) {
            changeStance2(0) //Bajar guardia
            if (stance2 == 0) {
                player.anims.play('rightL');
            } else if (stance2 == 1) {
                player.anims.play('right');
            } else if (stance2 == 2) {
                player.anims.play('rightH');
            }
            // } else if (scene.aKey.isDown) {
            //     if (stance2 == 0) {
            //         player.anims.play('leftL');
            //     } else if (stance2 == 1) {
            //         player.anims.play('left');
            //     } else if (stance2 == 2) {
            //         player.anims.play('leftH');
            //     }
        }
        if (n6JustDown) {
            this.stateMachine.transition('parry');
            return;
        }
        if (scene.leftKey.isDown && scene.n0.isDown) {
            this.stateMachine.transition('lDash')
            return;
        }
        if (scene.rightKey.isDown && scene.n0.isDown) {
            this.stateMachine.transition('rDash')
            return;
        }
        if (scene.downKey.isDown) {
            this.stateMachine.transition('crouch')
            return;
        }
        if (p2Stop == false) {
            if (scene.n4.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.n5.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (scene.upKey.isDown) {
            this.stateMachine.transition('jump');
            return;
        }
        if (!(scene.leftKey.isDown || scene.rightKey.isDown || scene.upKey.isDown)) {
            this.stateMachine.transition('idle');
            return;
        }
        if (scene.rightKey.isDown) {
            player.setVelocityX(250);
            return;
        } else if (scene.leftKey.isDown) {
            player.setVelocityX(-250);
            return;
        }
    }
}
class LightState2 extends State {
    enter(scene, player) {
        def2 = false
        if (stance2 == 0) {
            player.anims.play('lightL');
        } else if (stance2 == 1) {
            player.anims.play('light');
        } else if (stance2 == 2) {
            player.anims.play('lightH');
        }
    }
    execute(scene, player) {
        if (player.anims.currentFrame.index < 2) {
            return
        } else {
            def2 = false
            if (position == 1) {
                scene.lHitbox2.x = player.x - (player.width * 0.06)
            } else {
                scene.lHitbox2.x = player.x + (player.width * 0.06)
            }
            scene.lHitbox2.y = player.y - (player.height * 0.04)
            scene.lHitbox2.body.enable = true
            if (player.body.blocked.down) {
                player.setVelocityX(0);
            }
            player.once('animationcomplete', () => {
                def2 = true
                if (player.anims.currentAnim.key == "light" || player.anims.currentAnim.key == "lightL" || player.anims.currentAnim.key == "lightH") {
                    this.stateMachine.transition('idle');
                    scene.lHitbox2.body.enable = false
                }
            });
        }

    }
}
class HeavyState2 extends State {
    enter(scene, player) {
        def2 = false
        if (stance2 == 0) {
            player.anims.play('heavyL');
        } else if (stance2 == 1) {
            player.anims.play('heavyM');
        } else if (stance2 == 2) {
            player.anims.play('heavy');
        }
    }
    execute(scene, player) {
        def2 = false
        if (player.anims.currentFrame.index < 2) {
            return
        } else {
            if (position == 1) {
                scene.hHitbox2.x = player.x - (player.width * 0.06)
            } else {
                scene.hHitbox2.x = player.x + (player.width * 0.06)
            }
            scene.hHitbox2.y = player.y - (player.height * 0.08)
            scene.hHitbox2.body.enable = true
            if (player.body.blocked.down) {
                player.setVelocityX(0);
            }
            player.once('animationcomplete', () => {
                def2 = true
                if (player.anims.currentAnim.key == "heavy" || player.anims.currentAnim.key == "heavyM" || player.anims.currentAnim.key == "heavyL") {
                    this.stateMachine.transition('idle');
                    scene.hHitbox2.body.enable = false
                }
            });
        }


    }
}
class RDashState2 extends State {
    execute(scene, player) {
        def2 = false
        player.setVelocityX(700);
        if (p2Stop == false) {
            if (scene.n4.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.n5.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (position = 0) {
            player.anims.play(`fDash`, true);
        } else {
            player.anims.play(`bDash`, true);
        }
        if (scene.downKey.isDown) {
            def2 = true
            this.stateMachine.transition('crouch')
            return;
        }
        player.once('animationcomplete', () => {
            def2 = true
            this.stateMachine.transition('idle');
        });
    }
}
class LDashState2 extends State {
    execute(scene, player) {
        def2 = false
        player.setVelocityX(-700);
        if (p2Stop == false) {
            if (scene.n4.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.n5.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (position = 0) {
            player.anims.play(`bDash`, true);
        } else {
            player.anims.play(`fDash`, true);
        }
        if (scene.downKey.isDown) {
            def2 = true
            this.stateMachine.transition('crouch')
            return;
        }
        player.once('animationcomplete', () => {
            def2 = true
            this.stateMachine.transition('idle');
        });
    }
}
class ParryState2 extends State {
    enter(scene, player) {
        parry2 = true
        player.anims.play(`parry`, true);
        def2 = true
    }
    execute(scene, player) {
        if (player.anims.currentFrame.index > 3) {
            parry2 = false
            def2 = false;
        }
        if (player.body.blocked.down) {
            player.setVelocityX(0);
        }
        player.once('animationcomplete', () => {
            scene.time.delayedCall(500, () => {
                this.stateMachine.transition('idle');
                def2 = false;
            })
        })
    }
}
class CrouchState2 extends State {
    execute(scene, player) {
        changeStance2(2)
        crouch2 = true;
        player.setVelocityX(0);
        if (p2Stop == false) {
            if (scene.n4.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.n5.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (!(scene.downKey.isDown)) {
            crouch2 = false;
            this.stateMachine.transition('idle');
            return;
        } else {
            player.setVelocityX(0);

            player.anims.play('crouch', true);
        }

    }
}
class JumpState2 extends State {
    execute(scene, player) {
        def2 = false
        jumping2 = true
        //changeStance2(2)
        if (p2Stop == false) {
            if (scene.n4.isDown) {
                this.stateMachine.transition('light');
                return;
            }
            if (scene.n5.isDown) {
                this.stateMachine.transition('heavy');
                return;
            }
        }
        if (scene.upKey.isDown && player.body.blocked.down) {
            player.setVelocityY(-1200);
        }
        player.anims.play(`jump`, true);
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle');
        });
    }
}
class WaitState2 extends State {
    enter(scene, player) {
        player.anims.play('parried');
        scene.time.delayedCall(wait, () => {
            p2Stop = false;
            this.stateMachine.transition('idle');
            def2 = true;
            return;
        })
    }
    execute(scene, player) {
        const n6JustDown = Phaser.Input.Keyboard.JustDown(scene.n6);
        if (n6JustDown) {
            def2 = true
            this.stateMachine.transition('parry');
        }
    }
}
class DeadState2 extends State {
    enter(scene, player) {
        player.anims.play('dead');
        scene.time.delayedCall(500, () => {
            console.log("CAMBIO DE ESCENA")
            scene.cerrarTelonIzq();
        })
    }
    execute(scene, player) {

    }
}
function p1LHit(box, player) {
    ///Handle esto

    if ((crouch1 == true && stance2 == 2) || (jumping1 == true && stance2 == 0)) { //Si se ataca a un enemigo agachado con un ataque alto o aun enemigo saltando con un ataque bajo, no tiene efecto
        return;
    }

    if (parry1 == true) {
        console.log("1 PARRIES")
        wait = 1500;
        def2 = false
        this.lHitbox2.body.enable = false
        this.stateMachine2.transition('wait');
        return;
    }
    if (def1 == false || stance1 != stance2) {
        console.log("1 LHIT")
        this.stateMachine.transition('dead');
        this.lHitbox2.body.enable = false
        return;
    } else {
        this.ping.play();
        this.lHitbox2.body.enable = false
        p2Stop = true
        console.log("1 BLOCKS")
        this.stateMachine2.transition('idle');
        this.time.delayedCall(500, () => {
            p2Stop = false
        })
    }

}
function p1HHit(box, player) {
    ///Handle esto

    if ((crouch1 == true && stance2 == 2) || (jumping1 == true && stance2 == 0)) { //Si se ataca a un enemigo agachado con un ataque alto o aun enemigo saltando con un ataque bajo, no tiene efecto
        return;
    }

    if (parry1 == true) {
        wait = 1500;
        def2 = false
        this.hHitbox2.body.enable = false
        this.stateMachine2.transition('wait');
        console.log("1 PARRIES")
        return;
    }
    if (def1 == false || stance1 != stance2) {
        console.log("1 LHIT")
        this.stateMachine.transition('dead')
        this.hHitbox2.body.enable = false
        return;
    } else {
        this.ping.play();
        this.hHitbox2.body.enable = false
        p2Stop = true
        console.log("1 BLOCKS")
        this.stateMachine2.transition('idle');
        this.time.delayedCall(500, () => {
            p2Stop = false
        })
        return;
    }
}

function changeStance2(option) {
    ///Pues eso
    if (option == 0) { //Bajar guardia
        stance2--
        if (stance2 == -1) {
            stance2 = 2;
        }
    } else if (option == 1) { //subir guardia
        stance2++
        if (stance2 == 3) {
            stance2 = 0;
        }
    } else if (option == 2) { //agachado
        stance2 = 0;
    } else if (option == 3) { //saltando
        stance2 = 2;
    }

}

//fin clasespersonaje