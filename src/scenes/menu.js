import global from './global';

class menu extends global
{
    constructor(config)
    {
        super('menu',config);
        this.menu = [
            {scene:"play",text:"START GAME"},
            {scene:"about",text:"ABOUT"},
            {scene:null,text:"EXIT"},
            {scene:null,text:"RESET HIGH SCORE"},
        ]
    }

    create()
    {
        this.game.sound.stopAll();
        super.create();
        this.createBackGround();
        this.add.image(this.config.width/2,200,'logo').setOrigin(.5);
        this.CreateMenu(this.menu, (menuItem) => this.SetupMenuEvents(menuItem));
    }
    createBackGround()
    {
        this.bg = this.add.sprite(this.config.width/2, this.config.height/2, "background");
        this.bg.anims.play("bg");
    }
    SetupMenuEvents(menuItem)
    {
        const menuText = menuItem.menuText;
        menuText.setInteractive();
        menuText.on("pointerover",() =>{
            menuText.setTint(0xf2b100);
        })
        menuText.on("pointerout",() =>{
            menuText.setTint(0xffffff);
        })
        menuText.on("pointerup",() =>{
            if(menuItem.text === "START GAME")
            {
                this.scene.start(menuItem.scene,{restart:'yes'}); 
            }
            else if(menuItem.text === "ABOUT")
            {
                this.scene.start(menuItem.scene); 
            }
            if(menuItem.text === "EXIT")
            {
                this.game.destroy(true);
            }
            else if(menuItem.text === "RESET HIGH SCORE")
            {
                localStorage.removeItem("highScore");
            }
            else if(menuItem.text === "MUTE SOUNDS")
            {
                this.can
            }
        })
    }

}
export default menu;