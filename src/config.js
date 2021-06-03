var Config = {
	mainLayer: null,
	profile: {},
	scaleX: null,
	screenName: 'LoppyLayer',
	setting: {
		onMusic: false,
		onSound: true,
		onNotification: true
	},
	isLogin: function () {
		this.log('Config.isLogin', 1);

		if (!this.loadLogin()) return false;
		if (typeof (Config.setting["VERSION"]) == 'undefined') return false;

		if (
			!this.loginInfo ||
			!this.loginInfo.token ||
			this.loginInfo.token == '' ||
			!this.profile ||
			this.profile.token != Config.loginInfo.token
		) {
			return false;
		}

		return true;
	},
	log: function (value, debugMode) {
		if (debugMode && debugMode == 1) {
			cc.log('========== JS Debug ==========');
		} else {
			cc.log('=========== JS Log ===========');
		}
		if (cc.sys.isNative) {
			try {
				value =
					typeof value == 'object' ? JSON.stringify(value) : value;
			} catch (err) {
				cc.log(err.message);
			}
		}
		cc.log(value);
	},
	saveLogin: function (info) {
		Config.log('Config.saveLogin', 1);

		var token = info.token || null;
		var device = info.device || null;
		var userId = info.id || null;
		var userName = info.username || null;
		var userLocation = info.position || null;
		var fbToken = info.fbToken || null;
		var loginInfo = {
			token: token,
			device: device,
			userId: userId,
			userName: userName,
			userLocation: userLocation,
			fbToken: fbToken
		};

		Config.loginInfo = loginInfo;

		Config.log('Config.saveLogin => LOGIN_INFO saved', 1);
		localData.set('LOGIN_INFO', loginInfo);
	},
	scale: function (node, zoomIn) {
		Config.log('Config.scale => START', 1);

		var wScale = cc.winSize.width * cc.view.getScaleX();
		var hScale = cc.winSize.height * cc.view.getScaleY();
		var zoom = 0;

		if (typeof zoomIn != 'undefined' && Config.isZoom()) {
			var wScale = cc.winSize.width * cc.view.getScaleX();
			var wNode = node.width;

			zoom =
				(Math.abs(wScale - wNode - 200) * cc.view.getScaleX()) /
				cc.winSize.width;
			node.scaleY = node.scaleY - zoom;
		}

		node.scaleX = Config.scaleX - zoom;

		return node;
	}
};
