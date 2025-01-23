class AG {
    constructor(game) {
        this.game = game;
        this.runAnimation = new Animator(ASSET_MANAGER.getAsset(`./sprites/Run.png`), 30, 0, 127, 129, 8, 0.23);
        this.attackAnimation = new Animator(ASSET_MANAGER.getAsset(`./sprites/Attack_2.png`), 0, 0, 127, 129, 4, 0.23);
        this.idleAnimation = new Animator(ASSET_MANAGER.getAsset(`./sprites/Idle.png`), 0, 0, 127, 129, 7, 0.33); // Add idle animation
        this.state = "running"; // Can be "running", "attacking", or "idle"
        this.lastX = 0;
        this.reset();
    }

    reset() {
        this.x = 0;
        this.y = 200;
        this.speed = 250;
        this.state = "running";
        this.timer = 0;
        this.lastX = 0; 
    }

    update() {
        this.timer += this.game.clockTick;
        
        // Reset every 5 seconds
        if (this.timer >= 6) {
            this.reset();
            const enemy = this.game.entities.find(entity => entity instanceof Enemy);
            if (enemy) {
                enemy.reset();
            }
            return;
        }

        const targetX = 450;
        if (this.state === "running" && this.x < targetX) {
            this.x += this.speed * this.game.clockTick;
            if (this.x >= targetX) {
                this.state = "attacking";
                const enemy = this.game.entities.find(entity => entity instanceof Enemy);
                if (enemy) {
                    enemy.takeDamage();
                    // Switch to idle after 2 seconds of attacking
                    setTimeout(() => {
                        this.state = "idle";
                        enemy.startDeathAnimation();
                    }, 2000);
                }
            }
        }
    }

    draw(ctx) {
        switch(this.state) {
            case "running":
                this.runAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
            case "attacking":
                this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
            case "idle":
                this.idleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                break;
        }
    }
}