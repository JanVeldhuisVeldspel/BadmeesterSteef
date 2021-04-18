import global from './global';

class win extends global
{
    constructor(config)
    {
        super('win',config);
        this.winText = "YOU DID IT!\n THE ZOMBIE APOCALYPSE IS OVER. \n YOU SURVIVED... \n\n...NOW IT IS TIME TO REBUILD.";
        this.menu = [
            {scene:"menu",text:"BACK TO MENU"},
            {scene:null,text:"VELDSPEL.NL"},
        ]
    }

    create()
    {
        this.add.image(this.config.width/2,75,'logo').setOrigin(.5);
        this.win = this.add.bitmapText(this.config.width/2, this.config.height/2+12, 'font', this.winText, 18).setOrigin(.5).setCenterAlign();
        this.backBut = this.add.bitmapText(this.config.width/2, 250, 'font', this.menu[0].text, 18).setOrigin(.5).setCenterAlign().setInteractive();
        this.veldspelBut = this.add.bitmapText(this.config.width/2, 280, 'font', this.menu[1].text, 18).setOrigin(.5).setCenterAlign().setInteractive();

        this.backBut.on("pointerover",() =>{
            this.backBut.setTint(0xff4444);
        })
        this.backBut.on("pointerout",() =>{
            this.backBut.setTint(0xffffff);
        })
        this.backBut.on("pointerup",() =>{
            this.scene.start('menu');
        })

        this.veldspelBut.on("pointerover",() =>{
            this.veldspelBut.setTint(0xff4444);
        })
        this.veldspelBut.on("pointerout",() =>{
            this.veldspelBut.setTint(0xffffff);
        })
        this.veldspelBut.on("pointerup",() =>{
            window.location.href = 'https://www.veldspel.nl#zombiefoodrun';
        })
    }
}
export default win;