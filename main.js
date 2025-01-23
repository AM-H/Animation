const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();



ASSET_MANAGER.queueDownload(`./sprites/Run.png`);
ASSET_MANAGER.queueDownload('./sprites/Attack_2.png');
ASSET_MANAGER.queueDownload('./sprites/Idle.png');


ASSET_MANAGER.queueDownload('./sprites/IdleE.png');
ASSET_MANAGER.queueDownload('./sprites/Hurt.png');
ASSET_MANAGER.queueDownload('./sprites/Dead.png');


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	//gameEngine.init(ctx);
	gameEngine.addEntity(new AG(gameEngine));
	gameEngine.addEntity(new Enemy(gameEngine));
	gameEngine.init(ctx);

	gameEngine.start();
});
