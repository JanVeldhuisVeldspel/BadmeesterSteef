import Phaser from 'phaser';

class global extends Phaser.Scene
{
    constructor(key,config)
    {
        super(key);
        this.score = 0;
        this.config = config;
        this.fontSize = 32;
        this.lineHeight = 70;
        this.level = 1;
        this.isMobile = false;
        this.screenCenter = [config.width/2,config.height/2];
    }

    create()
    {
        if(this.config.canGoBack)
        {
            const backButton = this.add.image(this.config.width -10, this.config.height -10, "backButton").setOrigin(1).setScale(2).setInteractive();
            backButton.on("pointerdown", () => {
                this.scene.start("menu");
            })
        }
        //CREATE BACKGROUND MUSIC
        this.music = this.sound.add('bgmusic');
        this.audioAu = this.sound.add('au');
        this.audioDie = this.sound.add('die');
        this.audioWin = this.sound.add('win');
        this.audioScore = this.sound.add('score');
        this.audioLevelUp = this.sound.add('win');
        this.music.loop = true;
    }

    CreateMenu(menu, SetupMenuEvents)
    {
        let lastMenuPositionY = 20;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0],this.screenCenter[1]+lastMenuPositionY];
            menuItem.menuText = this.add.text(this.config.width/2,this.config.height/2+lastMenuPositionY, menuItem.text, {fontFamily: 'font1',fontSize:40,color:'#ffffff',align: "center"}).setStroke("#000000",4).setDepth(100).setOrigin(0.5,1);
            lastMenuPositionY += this.lineHeight;
            SetupMenuEvents(menuItem);
        });
    }

}
export default global;