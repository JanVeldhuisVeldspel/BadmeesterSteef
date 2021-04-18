import Phaser from 'phaser';
import preloader from './scenes/preloader';
import splash from './scenes/splash';
import play from './scenes/play';
import menu from './scenes/menu';
import about from './scenes/about';
import pause from './scenes/pause';
import win from './scenes/win';

const width = 540;
const height = 960;

const sharedConfig = {
  width: width,
  height: height,
}

const scenes = [preloader, splash, play, menu, about, pause, win];
const createScene = scene => new scene(sharedConfig);
const initScenes = () => scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...sharedConfig,
  pixelArt:true,
  scale: {
    width: width,
    height: height,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    }
  },
  scene: initScenes()
  // scene: {
  //   preload,
  //   create,
  //   update
  // }
};

new Phaser.Game(config);