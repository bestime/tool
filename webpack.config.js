const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const fs = require('fs')
const webpack = require("webpack")
const package = require('./package.json')
const formatTime = require('./src/split/formatTime')
const _Number = require('./src/split/_Number')
const fixed = require('./src/split/fixed')



const isDebug = true; // 调试模式不改变版本号

// 获取下一个版本号
function getNextVersion (version) {
	var res;
	if(isDebug) {
		res = 'beta';
	} else {
		version = String(version);
		var big = version.replace(/\..*/, '');// 取前面的大版本
		var small = version.replace(/.*?\./, '')// 取后面的小版本
		small = fixed(1)(_Number(small) + 0.1)
		res = big + '.' + small;
	}
	console.log('最新版本：', res);
	return res
}

var nextVersion = getNextVersion(package.version);


const TOOL_NAME = `bestime@${nextVersion}.min.js`;

module.exports = {
	mode: 'production',
	entry: {
		['bestime']: './src/index.js'
	},
	output: {
		filename: `[name]/[name]@${nextVersion}.min.js`,
		path: path.resolve(__dirname, 'js'),
		library: 'ns',
		libraryTarget: 'var'
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
        uglifyOptions: {         
          ie8: true,
					ecma: 5,
					warnings: false,
					compress: true,
					output: {
						beautify: false,
						comments: false
					}
				}
			}),
			// 添加注释会被变成LF文件格式
			new webpack.BannerPlugin([
				`javascript 常用工具库：${TOOL_NAME}`,
				'',
				'@QQ 1174295440',
				'@author Jiang Yang (Bestime)',
				`@update ${formatTime('YYYY-MM-DD HH:mm:ss', new Date())}`,
				'@see https://github.com/bestime/tool',
			].join('\n')), 
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	plugins: [
		function() {
      // 修改package.json中的版本号
      this.plugin('done', function() {
				if(!isDebug) {
					const pkgPath = path.join(__dirname, './package.json');
					let pkg = fs.readFileSync(pkgPath);
					pkg = JSON.parse(pkg);
					pkg.version = nextVersion;
					fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
				}
      });
    },

    new webpack.DefinePlugin({
      'process.env.MY_VERSION': JSON.stringify(require('./package.json').version)
      // 项目中使用 process.env.MY_VERSION 输出
    })
	]
}

