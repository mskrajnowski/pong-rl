define(['phaser', 'reinforce'], (Phaser, RL) => {
    class Ball extends Phaser.Sprite {
        constructor(game, x, y) {
            super(game, x, y, 'ball');

            this.anchor.setTo(0.5, 0.5);
            
            game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.body.bounce.setTo(1, 1);
            this.body.velocity.set(500, 500);
        }

        update() {

        }
    }

    class Paddle extends Phaser.Sprite {
        constructor(game, x, y) {
            super(game, x, y, 'paddle');

            this.anchor.setTo(0.5, 0.5);

            game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.body.immovable = true;
        }

        update() {

        }
    }

    class LoadingState extends Phaser.State {
        preload() {
            this.game.load.image('ball', 'assets/ball.png');
            this.game.load.image('paddle', 'assets/paddle.png');
        }

        create() {
            this.game.state.start('playing');
        }
    }

    class PlayingState extends Phaser.State {
        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.ball = new Ball(
                this.game,
                this.game.world.centerX,
                this.game.world.centerY
            );

            this.leftPaddle = new Paddle(
                this.game,
                50,
                this.game.world.centerY
            )

            this.rightPaddle = new Paddle(
                this.game,
                this.game.world.width - 50,
                this.game.world.centerY
            )

            this.game.add.existing(this.ball);
            this.game.add.existing(this.leftPaddle);
            this.game.add.existing(this.rightPaddle);
        }

        update() {
            this.game.physics.arcade.collide(this.leftPaddle, this.ball);
            this.game.physics.arcade.collide(this.rightPaddle, this.ball);
        }
    }

    const game = new Phaser.Game({
        width: 1280,
        height: 720,
    });

    game.state.add('loading', new LoadingState());
    game.state.add('playing', new PlayingState());
    game.state.start('loading');
});
