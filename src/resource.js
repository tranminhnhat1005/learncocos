var root = 'res/', loading = 'loading/', login = 'login/', loppy = 'loppy/';

var res = {
	img_btn_facebook: root + login + 'btn-facebook.png',
	img_btn_google	: root + login + 'btn-google.png',
	img_btn_login	: root + login + 'btn-login.png',
	img_btn_register: root + login + 'btn-register.png',
	img_btn_forgot  : root + login + 'btn-forgot-password.png',
	img_HelloWorld  : root + 'HelloWorld.png',
	img_logo  		: root + 'logo.png',
	img_login_bg    : root + login + 'background.png',
	img_login_form  : root + login + 'form.png',
	img_login_input : root + login + 'input.png',
	img_loppy_bg    : root + loppy + 'background.png',
	img_progress_bar: root + loading + 'progress-bar.png',
	img_progress_bg : root + loading + 'progress-background.png',
	img_progress_txt: root + loading + 'progress-text.png'
};

var g_resources = [];
for (var i in res) {
	g_resources.push(res[i]);
}
