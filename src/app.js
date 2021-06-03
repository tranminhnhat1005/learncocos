var LoadingGameLayer = cc.Layer.extend({
	ctor: function () {
		Config.log('LoadingGameLayer.ctor', 1);

		// Super init first
		this._super();

		Config.screenName = 'LoadingGameLayer';

		var size = cc.winSize;

		var spBackground = new cc.Sprite(res.img_loppy_bg);
		spBackground.attr({
			x: size.width / 2,
			y: size.height / 2
		});
		this.addChild(spBackground);

		var spProgressText = new cc.Sprite(res.img_progress_txt);
		spProgressText.attr({
			x: size.width / 2,
			y: size.height / 4
		});
		spProgressText = Config.scale(spProgressText);
		this.addChild(spProgressText);

		var spProgressBg = new cc.Sprite(res.img_progress_bg);
		spProgressBg.attr({
			x: size.width / 2,
			y: size.height / 4
		});
		spProgressBg = Config.scale(spProgressBg);
		this.addChild(spProgressBg);

		var spProgressBar = new cc.Sprite(res.img_progress_bar);
		spProgressBar.attr({
			x: size.width / 2,
			y: size.height / 4
		});
		spProgressBar = Config.scale(spProgressBar);
		this.addChild(spProgressBar);

		return true;
	},

	loadSetting: function (result, self) {
		Config.log('LoadingGameLayer.loadSetting', 1);

		if (result) {
			for (var i in result) {
				var set = result[i];
				Config.setting[set.name] = set.value;
			}
		}
	},

	loadProfileCallback: function (result, self) {
		Config.log('LoadingGameLayer.loadProfileCallback', 1);

		if (result) {
			Config.profile = result;

			if (
				!isEmpty(Config.profile.setting) &&
				typeof Config.profile.setting === 'object'
			) {
				for (var key in Config.profile.setting) {
					var val = Config.profile.setting[key];
					Config.setting[key] = val;
				}
			}

			Config.saveLogin(result);

			cc.director.runScene(new LoppyScene());
		}
	},

	errorBack: function (result, self) {
		Config.log('LoadingGameLayer.errorBack', 1);

		cc.director.runScene(new LoginScene());
	}
});

var LudoScene = cc.Scene.extend({
	onEnter: function () {
		this._super();

		var layer = new LoadingGameLayer();
		Config.mainLayer = layer;

		this.addChild(layer);
	}
});
