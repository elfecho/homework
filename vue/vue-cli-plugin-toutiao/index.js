var fsExtra = require('fs-extra');

module.exports = api => {
	api.configureWebpack(webpackConfig => {
		webpackConfig.mode = 'develoment'
	})
	api.registerCommand('publish', args => {
		// 拷贝dist文件夹下的东西，到：
		// /Users/hongjue/Desktop/course/正课第十节--vue-cli/online
		// xxxx -> xxxx
		const webpackConfig = api.resolveWebpackConfig();
		// console.log('webpackConfig:', webpackConfig);
		const distDir = webpackConfig.output.path;
		fsExtra.copy(
			distDir,
			'F:\\zw\\homework\\vue\\online'
		);
		console.log('移动成功了!!!!!!!!!!!!!!!!')
		// 'F:\zw\homework\vue\online'

	});

};