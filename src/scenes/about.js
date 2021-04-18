import global from './global';

class about extends global
{
    constructor(config)
    {
        super('about',config);
        this.aboutText = "BADMEESTER STEEF IS\nNO ORDINARY MAN,\nSWIMMING AGAINST THE STREAM\nAGAINST ALL ODDS.\n\nDON'T BUMP INTO ANY FISH!";
    }

    create()
    {
        this.createBackGround();
        this.add.image(this.config.width/2,200,'logo').setOrigin(.5);
        this.about = this.add.text(this.config.width/2,this.config.height/2+200, this.aboutText, {fontFamily: 'font1',fontSize:32,color:'#ffffff',align: "center"}).setStroke("#000000",4).setDepth(100).setOrigin(0.5,1);

        this.about.setInteractive();
        this.about.on("pointerover",() =>{
            this.about.setTint(0xf2b100);
        })
        this.about.on("pointerout",() =>{
            this.about.setTint(0xffffff);
        })
        this.about.on("pointerup",() =>{
            this.scene.start('menu');
        })
    }
    createBackGround()
    {
        this.bg = this.add.sprite(this.config.width/2, this.config.height/2, "background");
        this.bg.anims.play("bg");
    }
}
export default about;