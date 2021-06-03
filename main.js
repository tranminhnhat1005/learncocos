cc.game.onStart = function () {
	if (!cc.sys.isNative && document.getElementById('cocosLoading')) {
		//remove loading if exist
		document.body.removeChild(document.getElementById('cocosLoading'));
	}
	//pass true to enable retina display, on Android disabled by default to improve performance
	cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS);
	//adjust viewport meta
	cc.view.adjustViewPort(true);

	//setup the resolution policy and design resolution size
	cc.view.setDesignResolutionSize(1440, 1024, cc.ResolutionPolicy.EXACT_FIT);
	// FIXED_HEIGHT, FIXED_WIDTH, SHOW_ALL, EXACT_FIT, NO_BORDER
	
    // The game will be resized when browser size change
	cc.view.resizeWithBrowserSize(true);
    
	//setup config variables
	Config.scaleX = cc.view.getScaleY()/cc.view.getScaleX();
    Config.scaleY = cc.view.getScaleX()/cc.view.getScaleY();

	//load resources
	cc.LoaderScene.preload(
		g_resources,
		function () {
			cc.director.runScene(new LoginScene()); //run the GameScene
		},
		this
	);
};
cc.game.run();
