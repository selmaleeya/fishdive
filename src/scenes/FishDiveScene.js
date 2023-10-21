import Phaser from "phaser";

export default class FishDiveScene extends Phaser.Scene{
    constructor(){
        super("fish-diver-scene");
    }

    init(){
        this.nav_left = undefined;
        this.nav_right = undefined;
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

        //this.createButton();

        this.diver = this.createDiver();
    }

    update(time){

    }

    createButton(){
        
    }

    createDiver(){
        const diver = this.physics.add.image(50, 100, "diver");
        diver.setCollideWorldBounds(true);
    }

    moveDiver(diver, time){

    }

    spawnFishes(){

    }

    catchFishes(net, fishes){

    }

    createScoreLabel(x, y, score){
        const style = { fontSize: "32px", fill: "#000" };
        const label = new ScoreLabel(this, x, y, score, style).setDepth(1);
        this.add.existing(label);
        return label;
    }

    createLifeLabel(x, y, life){
        const style = { fontSize: "32px", fill: "#000" };
        const label = new LifeLabel(this, x, y, life, style).setDepth(1);
        this.add.existing(label);
        return label;
    }

    decreaseLife(diver, fishes){

    }
}