const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var pkg = require('./package.json');
var webpack = require('webpack')

function convertTime (date, isString, typeNumber) {	
	date = isString ? new Date(Number(date)) : date;	
	var result =  {
		year         : date.getFullYear(),
		month        : date.getMonth() + 1,
		day          : date.getDate(),
		hours        : date.getHours(),
		minutes      : date.getMinutes(),
		seconds      : date.getSeconds(),
		milliSeconds : date.getMilliseconds()
	}

	if(!typeNumber) {
		for(var key in result) {
			if(parseInt(result[key]) < 10) result[key] = '0' + result[key];
		}	
	}

	return result;
}

function _getNowTime () {
	const t = convertTime(new Date())
	return `${t.year}-${t.month}-${t.day} ${t.hours}:${t.minutes}:${t.seconds}`
}


function getBanner () {
	return `Bestime Tool ${_getNowTime()}`
}

module.exports = {
	//入口文件
	entry: {
		['bestime']: './src/index.js'
	},
	//出口文件
	output: {
		filename: `../js/[name].min.js`,
		path: path.resolve(__dirname, 'js')
	},
	//插件
	plugins: [
		new UglifyJSPlugin({
			uglifyOptions: {
				ie8: true,
				ecma: 5,
				warnings: false,
				mangle: true, // 混淆,默认true
				output: {
					beautify: false
				}
			}
		}),
		new webpack.BannerPlugin(getBanner()),
		new ExtractTextPlugin({
			filename: (getPath) => {
				return getPath(`js/[name]/[name]@${pkg.version}.css`).replace('css/js', 'css');
			},
			allChunks: true
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	}
}