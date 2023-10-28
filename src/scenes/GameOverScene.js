import Phaser from "phaser";
export default class GameOverScene extends Phaser.Scene{
    constructor(){
        super("game-over-scene");
    }

    init(data){
        this.score = data.score;
    }

    preload(){
        this.load.image("background", "images/background.jpg");
        this.load.image("replay", "images/replay.png");
    }

    create(){
        const gameWidth = this.scale.width * 0.5;
        const gameHeight = this.scale.height * 0.5;
        this.add.image(gameWidth, gameHeight, "background");
        
        this.replay = this.add
        .image(400, 200, "replay")
        .setInteractive();

        this.replay.once(
            "pointerup",
            () => {
                this.scene.start("fish-dive-scene");
            },
            this
        );
        this.add.text(80, 300, "Score: ", {fontSize: "60px", color: "#000"});
        this.add.text(300, 300, this.score, {fontSize: "60px", color: "#000"});
    }
}