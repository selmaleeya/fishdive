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
        this.speed = 80;
        this.cursors = undefined;
        this.fish = undefined;
        this.fishSpeed = 50;
        this.bombSpeed = 20;
        this.scoreLabel = undefined;
        this.lifeLabel = undefined;
    }

    preload(){
        this.load.image("background", "images/background.jpg");
        this.load.image("diver", "images/diver.png");
        this.load.image("bomb", "images/bomb.png");
        this.load.image("net", "images/net.png");
        this.load.image("fish", "images/fish.png");
    }

    create(){
        const gameWidth = this.scale.width * 0.5;
        const gameHeight = this.scale.height * 0.5;
        this.add.image(gameWidth, gameHeight, "background");

        this.diver = this.createDiver(50, 100, "diver", {
            width: 220,
            height: 100,
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.fishes = this.physics.add.group({
            classType: FallingFishes,
            maxSize: 15,
            runChildUpdate: true,
        });
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnFish,
            callbackScope: this,
            loop: true,
        });

        this.bombs = this.physics.add.group({
            classType: FallingFishes,
            maxSize: 5,
            runChildUpdate: true,
        });
        this.time.addEvent({
            delay: 4000,
            callback: this.spawnBomb,
            callbackScope: this,
            loop: true,
        });

        this.physics.add.overlap(
            this.diver,
            this.fishes,
            this.hitFish,
            undefined,
            this
        );

        this.scoreLabel = this.createScoreLabel(16, 16, 0);

        this.lifeLabel = this.createLifeLabel(16, 32, 3);

        this.physics.add.overlap(
            this.diver,
            this.bombs,
            this.decreaseLife,
            null,
            this
        );
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

    spawnFish(){
        const config = {
            speed: this.fishSpeed,
        };
        const fish = this.fishes.get(0, 0, "fish", config);
        const fishWidth = fish.displayWidth;
        const positionY = Phaser.Math.Between(
            fishWidth,
            this.scale.width - fishWidth
        );
        if(fish){
            fish.spawn(positionY);
        }
    }

    spawnBomb(){
        const config = {
            speed: this.bombSpeed,
        };
        const bomb = this.bombs.get(0, 0, "bomb", config);
        const bombWidth = bomb.displayWidth;
        const positionY = Phaser.Math.Between(
            bombWidth,
            this.scale.width - bombWidth
        );
        if(bomb){
            bomb.spawn(positionY);
        }
    }

    hitFish(diver, fish){
        fish.die();
        this.scoreLabel.add(1);
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

    decreaseLife(diver, bomb){
        bomb.die();
        this.lifeLabel.subtract(1);
        if (this.lifeLabel.getLife() == 2) {
            diver.setTint(0xff0000);
        } else if (this.lifeLabel.getLife() == 1) {
            diver.setTint(0xff0000).setAlpha(0.2);
        } else if (this.lifeLabel.getLife() == 0) {
            this.scene.start("game-over-scene", {
                score: this.scoreLabel.getScore(),
            });
        }
    }
}