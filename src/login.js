var LoginLayer = cc.Layer.extend({
    btnLoginForm: null,
    btnLoginFacebook: null,
    btnLoginGoole: null,

    ctor: function () {
        Config.log("LoginLayer.ctor", 1);

        // Super init first
        this._super();

        // ask the window size
        var size = cc.winSize;
        var self = this;

        // add background image
        var spBackground = new cc.Sprite(res.img_login_bg);
        spBackground.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(spBackground);
        
        // add background form
        var spForm = new cc.Sprite(res.img_login_form);
        spForm.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        spForm = Config.scale(spForm);
        this.addChild(spForm);
        
        // add logo
        var spLogo = new cc.Sprite(res.img_logo);
        spLogo.attr({
            x: size.width / 2,
            y: size.height - 224
        });
        spLogo = Config.scale(spLogo);
        this.addChild(spLogo);

        // add email input
        var spInputEmail = new cc.Sprite(res.img_login_input);
        spInputEmail.attr({
            x: size.width / 2 + 50,
            y: size.height / 2 + 74
        });
        spInputEmail = Config.scale(spInputEmail);
        this.addChild(spInputEmail);
        
        // add password input
        var spInputPassword = new cc.Sprite(res.img_login_input);
        spInputPassword.attr({
            x: size.width / 2 + 50,
            y: size.height / 2 + 10
        });
        spInputPassword = Config.scale(spInputPassword);
        this.addChild(spInputPassword);
        
        // add forgot password 
        var spForgotPassword = new cc.Sprite(res.img_btn_forgot);
        spForgotPassword.attr({
            x: size.width / 2 + 114,
            y: size.height / 2 - 40
        });
        spForgotPassword = Config.scale(spForgotPassword);
        this.addChild(spForgotPassword);
        
        // add button login
        var spButtonLogin = new cc.Sprite(res.img_btn_login);
        spButtonLogin.attr({
            x: size.width / 2 - 80,
            y: size.height / 2 - 100
        });
        spButtonLogin = Config.scale(spButtonLogin);
        this.addChild(spButtonLogin);
        
        // add button register
        var spButtonRegister = new cc.Sprite(res.img_btn_register);
        spButtonRegister.attr({
            x: size.width / 2 + 90,
            y: size.height / 2 - 100
        });
        spButtonRegister = Config.scale(spButtonRegister);
        this.addChild(spButtonRegister);
        
        // add button facebook
        var spButtonFacebook = new cc.Sprite(res.img_btn_facebook);
        spButtonFacebook.attr({
            x: size.width / 2,
            y: size.height / 3 - 20
        });
        spButtonFacebook = Config.scale(spButtonFacebook);
        this.addChild(spButtonFacebook);
        
        // add button google
        var spButtonGoogle = new cc.Sprite(res.img_btn_google);
        spButtonGoogle.attr({
            x: size.width / 2,
            y: size.height / 3 - 86
        });
        spButtonGoogle = Config.scale(spButtonGoogle);
        this.addChild(spButtonGoogle);


    }
});

var LoginScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new LoginLayer();
        Config.mainLayer = layer;

        this.addChild(layer);
    }
});