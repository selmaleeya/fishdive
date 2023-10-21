import Phaser from "phaser";
import ScoreLabel from "../ui/ScoreLabel";
import LifeLabel from "../ui/LifeLabel";
import FallingFishes from "../ui/FallingFishes";

export default class FishDiveScene extends Phaser.Scene{
    constructor(){
        super("fish-dive-scene");
    }

    init(){
        this.catch = false;
        this.diver = undefined;
        this.speed = 60;
        this.cursors = undefined;
        this.fishes = undefined;
        this.fishesSpeed = 50;
        this.scoreLabel = undefined;
        this.lifeLabel = undefined;
    }

    preload(){
        this.load.image("background", "images/background.jpg");
        this.load.image("diver", "images/diver.png");
        this.load.image("bomb", "images/bomb.png");
        this.load.image("net", "images/net.png");
        this.load.spritesheet("fishes", "images/fishes.png", {
            frameWidth: 100,
            frameHeight: 100,
        });
    }

    create(){
        const gameWidth = this.scale.width * 0.5;
        const gameHeight = this.scale.height * 0.5;
        this.add.image(gameWidth, gameHeight, "background");

        this.diver = this.createDiver(50, 100, "diver", {
            width: 160,
            height: 75,
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.fishes = this.physics.add.group({
            classType: FallingFishes,
            maxSize: 10,
            runChildUpdate: true,
        });

        this.scoreLabel = this.createScoreLabel(16, 16, 0);

        this.lifeLabel = this.createLifeLabel(16, 32, 3);
    }

    update(time){
        this.moveDiver(this.diver, time);
    }

    createDiver(x, y, textureKey, size) {
        const diver = this.physics.add.image(x, y, textureKey);
        diver.setCollideWorldBounds(true);
        
        if (size && size.width && size.height) {
          diver.displayWidth = size.width;
          diver.displayHeight = size.height;
        }
    
        return diver;
    }

    moveDiver(diver, time){
        if (this.cursors.left.isDown) {
            this.diver.setVelocityX(this.speed * -1);
            this.diver.setFlipX(true);
          } else if (this.cursors.right.isDown) {
            this.diver.setVelocityX(this.speed);
            this.diver.setFlipX(false);
          } else if (this.cursors.up.isDown) {
            this.diver.setVelocityY(this.speed * -1);
            this.diver.setFlipY(false);
          } else if (this.cursors.down.isDown) {
            this.diver.setVelocityY(this.speed);
            this.diver.setFlipY(false);
          } else {
            this.diver.setVelocityY(0);
            this.diver.setVelocityX(0);
          }
    }

    spawnFishes(){
        const config = {
            speed: this.fishesSpeed,
        };
        const fishes = this.fishes.get(0, 0, "fishes", config);
        const fishesWidth = fishes.displayWidth;
        const positionY = Phaser.Math.Between(
            fishesWidth,
            this.scale.width - fishesWidth
        );
        if(fishes){
            fishes.spawn(positionY);
        }
    }

    catchFishes(net, fishes){

    }

    createScoreLabel(x, y, score){
        const style = { fontSize: "16px", fill: "#000" };
        const label = new ScoreLabel(this, x, y, score, style).setDepth(1);
        this.add.existing(label);
        return label;
    }

    createLifeLabel(x, y, life){
        const style = { fontSize: "16px", fill: "#000" };
        const label = new LifeLabel(this, x, y, life, style).setDepth(1);
        this.add.existing(label);
        return label;
    }

    decreaseLife(diver, fishes){

    }
}