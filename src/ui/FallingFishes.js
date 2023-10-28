import Phaser from "phaser";

export default class FallingFishes extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, config){
        super(scene, x, y, texture);
        this.scene = scene;
        this.speed = config.speed;
    }

    spawn(y){
        const positionX = Phaser.Math.Between(300, 500);
        this.setPosition(y, positionX);
        this.setActive(true);
        this.setVisible(true);
    }

    die(){
        this.destroy();
    }

    update(time){
        this.setVelocityX(this.speed);
        const gameHeight = this.scene.scale.height;
        if (this.y > gameHeight + 5) {
            this.die();
        }
    }
}