import global from './global';

const updateLevels = [3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60];

class play extends global
{
    constructor(config)
    {
        super('play',config);
        this.scoreText = "";
        this.isPaused = false;
        //PLAYER SETTINGS
        this.playerSpeed = 200;
        this.playerLife = 4;
        this.stroming = .25;
        this.playerCanMove = true;
        this.playerIsDead = false;
        this.musicIsPlaying = false;
        this.canPlayAudio = true;
        this.leftButPressed = false;
        this.rightButPressed = false;
        this.upButPressed = false;
        this.downButPressed = false;
        this.spawndelay = 500;
        this.fishSpeedAddition = 10;
        this.timer = 0;
        this.highScore = localStorage.getItem("highScore");
    }

    create(d)
    {
        if(d.restart === 'yes')
        {
            this.score = 0;
            this.level = 1;
            this.musicIsPlaying = false;
        }
        super.create();
        this.createBackGround();
        this.CreatePlayer();

        this.beers = this.physics.add.group();
        this.enemies = this.physics.add.group();

        this.CreateFish();

        this.CreateHud();
        this.CreateColliders();
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.playerCanMove = true;

        if(!this.musicIsPlaying && this.canPlayAudio)
        {
            this.musicIsPlaying = true;
            this.music.play();
        }

        this.isDesktop = this.sys.game.device.os.desktop;
        if(!this.isDesktop)
        {
            // LEFT
            this.leftButton = this.add.rectangle(0, 250, this.config.width/2.5,this.config.height-450).setFillStyle(0xffffff).setOrigin(0).setDepth(10).setAlpha(.001).setDepth(10).setInteractive();
            this.leftButton.on("pointerdown",() =>{
                this.leftButPressed = true;
                this.rightButPressed = false;
                this.upButPressed = false;
                this.downButPressed = true;
            })
            this.leftButton.on("pointerup",() =>{
                this.leftButPressed = false;
                this.rightButPressed = false;
                this.upButPressed = false;
                this.downButPressed = false;
            })
            // RIGHT
            this.rightButton = this.add.rectangle(this.config.width-this.config.width/2.5, 250, this.config.width/2.5,this.config.height-200).setFillStyle(0xffffff).setOrigin(0).setDepth(10).setAlpha(.001).setDepth(10).setInteractive();
            this.rightButton.on("pointerdown",() =>{
                this.rightButPressed = true;
                this.leftButPressed = false;
                this.upButPressed = false;
                this.downButPressed = true;
            })
            this.rightButton.on("pointerup",() =>{
                this.leftButPressed = false;
                this.rightButPressed = false;
                this.upButPressed = false;
                this.downButPressed = false;                
            })
            // UP
            this.upButton = this.add.rectangle(0, 0, this.config.width,250).setFillStyle(0xffffff).setOrigin(0).setDepth(10).setAlpha(.001).setDepth(10).setInteractive();
            this.upButton.on("pointerdown",() =>{
                this.upButPressed = true;
                this.leftButPressed = false;
                this.rightButPressed = false;
                this.downButPressed = false;
            })
            this.upButton.on("pointerup",() =>{
                this.upButPressed = false;
                this.leftButPressed = false;
                this.rightButPressed = false;
                this.downButPressed = false;
            })
            // DOWN
            this.downButton = this.add.rectangle(0, this.config.height-200, this.config.width,200).setFillStyle(0xffffff).setOrigin(0).setDepth(10).setAlpha(.001).setDepth(10).setInteractive();

            this.downButton.on("pointerdown",() =>{
                this.downButPressed = true;
                this.upButPressed = false;
                this.leftButPressed = false;
                this.rightButPressed = false;
            })
            this.downButton.on("pointerup",() =>{
                this.leftButPressed = false;
                this.rightButPressed = false;
                this.upButPressed = false;
                this.downButPressed = false;
            })
        }

    }

    // Update scene
    // Default fps = 60
    update()
    {
        if(this.player.y > 175 && this.playerCanMove)
        {
            this.player.y+=-this.stroming;
        }
        // MOVE PLAYER
        if(this.playerCanMove)
        {
            if( this.cursorKeys.left.isDown || this.leftButPressed)
            {
                this.LeftButtonDown();
            }
            else if( this.cursorKeys.right.isDown || this.rightButPressed)
            {
                this.RightButtonDown();
            }
            else if( this.cursorKeys.down.isDown || this.downButPressed)
            {
                this.DownButtonDown();
            }
            else if( this.cursorKeys.up.isDown || this.upButPressed)
            {
                this.UpButtonDown();
            }
            else
            {
                this.player.body.setVelocity(0);
                this.player.setAngle(0);
                this.player.anims.play('player-idle',false);
            }
        }
        else
        {
            if(!this.playerIsDead)
            {
                this.player.anims.play('player-idle',false);
            }
            this.player.body.setVelocity(0);
        }
        
        if(this.playerCanMove)
        {
            this.timer += 1;
            while (this.timer > this.spawndelay) {
                this.SpawnObject();
                this.timer = 0;
            }
            this.CheckOutOfBoundsObjects();
        }
    }
    // CUSTOM FUNCTIONS
    LeftButtonDown()
    {
        // PLAYER
        this.player.setFlipX(true);
        this.player.setAngle(-9.5);
        // this.player.body.setVelocityY(0);
        if(this.player.x > 94)
        {
            this.player.body.setVelocityX(-this.playerSpeed);
        }
        this.player.anims.play('player-swimming', true);
    }
    RightButtonDown()
    {
        // PLAYER
        this.player.setFlipX(false);
        this.player.setAngle(9.5);
        // this.player.body.setVelocityY(0);
        if(this.player.x < this.config.width-94)
        {
            this.player.body.setVelocityX(this.playerSpeed);
        }
        this.player.anims.play('player-swimming',true);
    }
    UpButtonDown()
    {
        // PLAYER
        // this.player.body.setVelocityX(0);
        this.player.setAngle(0);
        if(this.player.y > 250)
        {
            this.player.body.setVelocityY(-this.playerSpeed*2);
        }
        this.player.anims.play('player-swimming',true);
    }
    DownButtonDown()
    {
        this.player.setAngle(0);
        if(this.player.y < this.config.height-100)
        {
            this.player.body.setVelocityY(this.playerSpeed/1.5);
        }
        this.player.anims.play('player-swimming',true);
    }

    ListenToEvents()
    {
        if(this.pauseEvent){return;}
        this.pauseEvent = this.events.on("resume", () => {
            if(this.canPlayAudio)
            {
                this.music.resume();
            }
            this.initialTime = 3;
            this.countDownText = this.add.bitmapText(...this.screenCenter, 'font', "GET READY",18).setDepth(100).setOrigin(0.5);
            this.timedEvents = this.time.addEvent({
                delay:1000,
                callback:this.CountDown,
                callbackScope:this,
                loop:true
            })
        })
    }

    CountDown()
    {
        this.initialTime--;
        if(this.initialTime <=0)
        {
            this.isPaused = false;
            this.playerCanMove = true;
            this.countDownText.setText("");
            this.physics.resume();
            this.timedEvents.remove();
        }
    }

    createBackGround()
    {
        this.bg = this.add.sprite(this.config.width/2, this.config.height/2, "background");
        this.bg.anims.play("bg");
    }
    
    CreatePlayer()
    {
        this.player = this.physics.add.sprite(this.config.width/2, this.config.height/2, 'player');
        this.player.setScale(1);
        this.player.setDepth(1);
        this.player.body.setDrag(1000);
        this.player.anims.play('player-idle');
        this.player.anims.play('player-swimming', true);
        this.player.setOrigin(0.5);
    }

    SpawnObject()
    {
        let chance = Math.floor(Math.random()*10);
        if(chance === 1)
        {
            this.CreateBeer();
        }
        else
        {
            this.CreateFish();
        }
    }

    CreateBeer()
    {
        this.beer = this.physics.add.sprite(Math.floor(Math.random()*(this.config.width-140)+10),this.config.height+65,'beer');
        this.beer.anims.play('beer-dobber');
        this.beer.setOrigin(0.5);
        this.beer.body.setSize(50,55);
        this.beers.add(this.beer);
    }

    CreateFish()
    {
        let fSize = Math.random()+1;
        let speed = Math.floor(Math.random()*5)+this.fishSpeedAddition;
        if(fSize > 1.5)
        {
            fSize = 1.5;
        }
        this.fish = this.physics.add.sprite(Math.floor(Math.random()*(this.config.width-150)+15),this.config.height+100,'vis1');
        this.fish.anims.play('vis1-dobber');
        this.fish.body.setSize(70, 90);
        this.fish.setOffset(14,0);
        this.fish.setOrigin(0.5);
        this.fish.speed = speed;
        this.fish.setScale(fSize);
        this.enemies.add(this.fish);
    }

    UpdateHealthBar(health)
    {
        this.hb.setFrame(health);
    }

    CreateHud()
    {
        this.hb = this.add.sprite(0, 80, "healthbar").setOrigin(0,.5).setDepth(1000);
        this.UpdateHealthBar(this.playerLife);
        this.add.rectangle(0, 0, this.config.width,40).setFillStyle(0xf2b100).setOrigin(0).setDepth(10).setAlpha(.75);
        this.CreateScore();
        // this.isPaused = false;
        // this.pauseButton = this.add.bitmapText(this.config.width-56, 1, 'font', 'PAUSE',18).setDepth(100).setInteractive();
        // this.pauseButton.on("pointerover",() =>{
        //     this.pauseButton.setTint(0xff4444);
        // })
        // this.pauseButton.on("pointerout",() =>{
        //     this.pauseButton.setTint(0xffffff);
        // })
        // this.pauseButton.on("pointerdown",() =>{
        //     this.music.pause();
        //     this.playerCanMove = false;
        //     this.isPaused = true;
        //     this.physics.pause();
        //     this.scene.pause();
        //     this.scene.launch("pause");
        // })
        // this.muteButton = this.add.sprite(480,300,'audioButton',0).setFrame([0]).setOrigin(.5).setDepth(1000).setInteractive();
        
        // this.muteButton.on("pointerdown",() =>{
        //     if(this.canPlayAudio)
        //     {
        //         this.canPlayAudio = false;
        //         this.game.sound.stopAll();
        //         this.muteButton.setFrame(1);
        //     }
        //     else
        //     {
        //         this.canPlayAudio = true;
        //         this.music.play();
        //         this.muteButton.setFrame(0);
        //     }
        // })

        // this.isDesktop = this.sys.game.device.os.desktop;
        // if(!this.isDesktop)
        // {
        //     // LEFT
        //     this.leftButton = this.add.sprite(30,110,'arrowButtons',0).setFrame([0]).setOrigin(.5).setDepth(1000).setInteractive();  
        //     this.leftButton.on("pointerdown",() =>{
        //         this.leftButPressed = true;
        //         this.rightButPressed = false;
        //         this.upButPressed = false;
        //         this.downButPressed = false;
        //     })
        //     this.leftButton.on("pointerup",() =>{
        //         this.leftButPressed = false;
        //         this.rightButPressed = false;
        //         this.upButPressed = false;
        //         this.downButPressed = false;
        //         this.player.setAngle(0);
        //     })
        //     // RIGHT
        //     this.rightButton = this.add.sprite(30,220,'arrowButtons',0).setFrame([2]).setOrigin(.5).setDepth(1000).setInteractive();
        //     this.rightButton.on("pointerdown",() =>{
        //         this.rightButPressed = true;
        //         this.leftButPressed = false;
        //         this.upButPressed = false;
        //         this.downButPressed = false;
        //     })
        //     this.rightButton.on("pointerup",() =>{
        //         this.leftButPressed = false;
        //         this.rightButPressed = false;
        //         this.upButPressed = false;
        //         this.downButPressed = false;
        //         this.player.setAngle(0);             
        //     })
        //     // UP
        //     this.upButton = this.add.sprite(this.config.width-30,110,'arrowButtons',0).setFrame([1]).setOrigin(.5).setDepth(1000).setInteractive();  
        //     this.upButton.on("pointerdown",() =>{
        //         this.upButPressed = true;
        //         this.leftButPressed = false;
        //         this.rightButPressed = false;
        //         this.downButPressed = false;
        //         this.player.setAngle(0);
        //     })
        //     this.upButton.on("pointerup",() =>{
        //         this.upButPressed = false;
        //         this.leftButPressed = false;
        //         this.rightButPressed = false;
        //         this.downButPressed = false;
        //     })
        //     // DOWN
        //     this.downButton = this.add.sprite(this.config.width-30,220,'arrowButtons',0).setFrame([3]).setOrigin(.5).setDepth(1000).setInteractive();  
        //     this.downButton.on("pointerdown",() =>{
        //         this.downButPressed = true;
        //         this.upButPressed = false;
        //         this.leftButPressed = false;
        //         this.rightButPressed = false;
        //         this.player.setAngle(0);
        //     })
        //     this.downButton.on("pointerup",() =>{
        //         this.leftButPressed = false;
        //         this.rightButPressed = false;
        //         this.upButPressed = false;
        //         this.downButPressed = false;
        //     })
        // }
    }

    CheckOutOfBoundsObjects()
    {
        this.beers.getChildren().forEach(b => {
            b.y += -this.stroming*5;
            if(b.y < -65)
            {
                b.destroy();
            }
        })
        this.enemies.getChildren().forEach(e => {
            e.y += -this.stroming*e.speed;
            if(e.y < -105)
            {
                this.IncreaseScore();
                this.SetHighScore();
                e.destroy();
            }
        })
    }

    CreateColliders()
    {
        // this.physics.add.collider(this.player,this.can, this.GetCan, null, this);
        // this.physics.add.collider(this.player,this.beers, this.GetBeer, null, this);
        this.physics.add.overlap(this.player, this.beers, this.GetBeer, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.GetHurt, null, this);
    }

    CreateScore()
    {
        this.highScore = localStorage.getItem("highScore");
        this.scoreText = this.add.text(6, 4, `Score: ${this.score}`, {fontFamily: 'font1',fontSize:28,color:'#333333'}).setDepth(100);
        this.highScoreText = this.add.text(this.config.width/2,5, `High score: ${this.highScore || 0}`, {fontFamily: 'font1',fontSize:24,color:'#555555'}).setDepth(100).setOrigin(.5,0);
    }

    IncreaseScore()
    {
        this.score ++;
        if(updateLevels.indexOf(this.score) != -1)
        {
            if(this.spawndelay > 0)
            {
                this.spawndelay -= 15;
            }
            this.fishSpeedAddition +=.05;
            this.stroming +=.15;
        }
        this.scoreText.setText(`Score: ${this.score}`);
        if (this.score > this.highScore)
        {
            this.highScore = this.score;
            console.log(this.highScore);
            this.highScoreText.setText(`High Score: ${this.highScore}`);
        }
    }

    SetHighScore()
    {
        const highScoreText = localStorage.getItem("highScore");
        const highScore = highScoreText && parseInt(highScoreText,10);

        if(!highScore || this.score > highScore)
        {
            localStorage.setItem("highScore", this.score);
            this.highScoreText.setText(`High score: ${this.highScore}`);
        }
    }
    
    GetBeer(player, beer)
    {
        // this.physics.pause();
        this.player.setTint(0xf2b100);
        // if(this.canPlayAudio)
        // {
        //     this.audioWin.play();
        // }
        beer.destroy();
        if(this.playerLife < 4)
        {
            this.playerLife ++;
            this.UpdateHealthBar(this.playerLife);
        }
        else
        {
            this.playerLife = 4;
        }
        // this.IncreaseScore();
        // this.SetHighScore();
        this.time.addEvent({
            delay:400,
            callback: () => {
                this.player.setTint(0xffffff);
            },
            loop:false
        })
    }

    GetHurt(player,enemie)
    {
        // this.physics.pause();
        this.player.setTint(0xff0000);
        // if(this.canPlayAudio)
        // {
        //     this.audioWin.play();
        // }
        enemie.destroy();
        if(this.playerLife > 1)
        {
            this.playerLife --;
            this.UpdateHealthBar(this.playerLife);
            this.time.addEvent({
                delay:400,
                callback: () => {
                    this.player.setTint(0xffffff);
                },
                loop:false
            })
        }
        else
        {
            this.playerCanMove = false;
            this.physics.pause();
            this.playerLife = 0;
            this.upButPressed = false;
            this.leftButPressed = false;
            this.rightButPressed = false;
            this.downButPressed = false;
            if(this.canPlayAudio)
            {
                this.audioDie.play();
            }
            this.UpdateHealthBar(this.playerLife);
            this.PopUp("GAME OVER");
            this.time.addEvent({
                delay:4000,
                callback: () => {
                    this.playerLife = 4;
                    this.stroming = .25;
                    this.spawndelay = 500;
                    this.fishSpeedAddition = 10;
                    this.score = 0;
                    this.scoreText.setText(`Score: ${this.score}`);
                    this.scene.start('play',{restart:false});
                },
                loop:false
            })
        }
    }

    PopUp(msg)
    {
        this.popupText = this.add.text(...this.screenCenter, msg, {fontFamily: 'font1',fontSize:32,color:'#ffffff',align: "center"}).setStroke("#000000",4).setDepth(100).setOrigin(0.5,1);

        this.timedEvents = this.time.addEvent({
            delay:4000,
            callback:() => {
                this.popupText.destroy();
            },
            callbackScope:this,
            loop:false
        })
    }
}

export default play;