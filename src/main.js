import Phaser from "phaser";

import FishDiveScene from "./scenes/FishDiveScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  physics: {
    default: "arcade",
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [FishDiveScene],
};

export default new Phaser.Game(config);
