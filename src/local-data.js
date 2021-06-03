var localData = {
	set: function (key, object) {
		if (cc.sys.isNative) {
			cc.sys.localStorage.setItem(key, JSON.stringify(object));
		} else {
			localStorage.setItem(key, JSON.stringify(object));
		}
	},

	get: function (key) {
		if (cc.sys.isNative) {
			if (
				cc.sys.localStorage.getItem(key) == null ||
				cc.sys.localStorage.getItem(key) == '' ||
				cc.sys.localStorage.getItem(key) == undefined
			) {
				return '';
			} else {
				return JSON.parse(cc.sys.localStorage.getItem(key));
			}
		} else {
			if (
				localStorage.getItem(key) == null ||
				localStorage.getItem(key) == '' ||
				localStorage.getItem(key) == undefined
			) {
				return '';
			} else {
				return JSON.parse(localStorage.getItem(key));
			}
		}
	},

	remove: function (key) {
		if (cc.sys.isNative) {
			cc.sys.localStorage.removeItem(key);
		} else {
			localStorage.removeItem(key);
		}
	}
};
