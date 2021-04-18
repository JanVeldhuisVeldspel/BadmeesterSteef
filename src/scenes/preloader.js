import Phaser from 'phaser';

class preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader');
    }

    preload()
    {
        //LOAD SPLASH LOGO
        this.load.image('splash','assets/veldspel.jpg');

        //LOAD LOGO
        this.load.image('logo','assets/logo.png');

        //LOAD BACKGROUND
        this.load.spritesheet("background","assets/bg.jpg",{frameWidth:540,frameHeight:960});

        //LOAD PLAYER
        this.load.spritesheet("player","assets/player.png",{frameWidth:150,frameHeight:102});

        //LOAD BEER
        this.load.spritesheet("bier","assets/bier.png",{frameWidth:60,frameHeight:65});

        //LOAD FISH
        this.load.spritesheet("vis1","assets/vis.png",{frameWidth:99,frameHeight:100});

        //LOAD HEALTHBAR
        this.load.spritesheet("healthbar","assets/healthbar.png",{frameWidth:493,frameHeight:49});

        //LOAD AUDIO BUTTON
        // FONT
        this.load.bitmapFont('font','assets/fonts/fontje.png', 'assets/fonts/fontje.fnt');

        //AUDIO
        this.load.audio('bgmusic', 'assets/audio/music.mp3');
        this.load.audio('die','assets/audio/die.mp3');
        this.load.audio('win','assets/audio/win.mp3');
    }

    create()
    {
       //CREATE PLAYER ANIMATIONS
        this.anims.create({
            key:'player-idle',
            frames: this.anims.generateFrameNumbers('player',{ frames: [0] }),
            frameRate:15,
            repeat:-1,
        });
        this.anims.create({
            key:'player-swimming',
            frames: this.anims.generateFrameNumbers('player',{ frames: [1,2,3,4] }),
            frameRate:15,
            repeat:1,
        });
        
        this.anims.create({
            key:'bg',
            frames: this.anims.generateFrameNumbers("background",{frames:[0,1,2,3]}),
            frameRate:15,
            repeat:-1
        });

        //CREATE BEER ANIMATION
        this.anims.create({
            key:'beer-dobber',
            frames: this.anims.generateFrameNumbers("bier",{frames:[0,1,2,3]}),
            frameRate:12,
            repeat:-1
        });

        //CREATE FISH ANIMATION
        this.anims.create({
            key:'vis1-dobber',
            frames: this.anims.generateFrameNumbers("vis1",{frames:[0,1,2,3]}),
            frameRate:9,
            repeat:-1
        });

        this.scene.start("menu");
    }
}
export default preloader;