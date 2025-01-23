class Enemy {
    constructor(game) {
        this.game = game;
        this.idleAnimation = new Animator(
            ASSET_MANAGER.getAsset(`./sprites/IdleE.png`), 
            0, 0, 128, 128, 7, 0.23
        );
        this.hurtAnimation = new Animator(
            ASSET_MANAGER.getAsset(`./sprites/Hurt.png`), 
            0, 0, 128, 128, 3, 0.23
        );
        this.deathAnimation = new Animator(
            ASSET_MANAGER.getAsset(`./sprites/Dead.png`), 
            0, 0, 128, 128, 5, 1
        );
        this.state = "idle"; 
        this.reset();
    }

    reset() {
        this.x = 600;
        this.y = 200;
        this.state = "idle";
    }

    takeDamage() {
        this.state = "hurt";
    }

    startDeathAnimation() {
        this.state = "dying";
    }
    update(){

    }

    draw(ctx) {
        switch(this.state) {
            case "idle":
                this.idleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
            case "hurt":
                this.hurtAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
            case "dying":
                this.deathAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
        }
    }
}