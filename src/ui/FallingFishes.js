import Phaser from "phaser";

export default class FallingFishes extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, config){
        super(scene, x, y);
        this.scene = scene;
        this.speed = config.speed;
    }

    spawn(y){
        const positionX = Phaser.Math.Between(-50, -70);
        this.setPosition(y, positionX);
        this.setActive(true);
        this.setVisible(true);
    }

    update(time){
        this.setVelocityX(this.speed);
        const gameHeight = this.scene.scale.height;
    }
}