import global from './global';

class splash extends global
{
    constructor(config)
    {
        super('splash',config);
    }

    create()
    {
        this.splash = this.add.image(this.config.width/2, this.config.height/2, 'splash').setOrigin(.5);
        this.cameras.main.once('camerafadeincomplete', function (camera)
        {
            camera.fadeOut(2000);
        });
        this.cameras.main.fadeIn(1000);
        
        this.time.addEvent({
            delay:3500,
            callback: () => {
                this.scene.start('menu');
            },
            loop:false
        })
    }
}
export default splash;