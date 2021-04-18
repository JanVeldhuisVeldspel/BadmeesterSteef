import global from './global';

class pause extends global
{
    constructor(config)
    {
        super('pause',config);
        this.menu = [
            {scene:"play",text:"CONTINUE PLAYING"},
            {scene:"menu",text:"EXIT TO MAIN MENU"},
        ];
    }

    create()
    {
        super.create();
        this.add.rectangle(this.config.width/2, this.config.height/2+8, 230,110).setFillStyle(0x000000).setOrigin(.5).setDepth(10);
        this.CreateMenu(this.menu, (menuItem) => this.SetupMenuEvents(menuItem));
    }

    SetupMenuEvents(menuItem)
    {
        const menuText = menuItem.menuText;
        menuText.setInteractive();
        menuText.on("pointerover",() =>{
            menuText.setTint(0xff4444);
        })
        menuText.on("pointerout",() =>{
            menuText.setTint(0xffffff);
        })
        menuText.on("pointerup",() =>{
            if(menuItem.scene && menuItem.text === "CONTINUE PLAYING")
            {
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            }
            else
            {
                this.scene.stop("play");
                this.scene.start("menu");
            }
        })
    }

}
export default pause;