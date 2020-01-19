const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpack = require("webpack")
function zero (num) {
	num = Number(num) || 0
	return num < 10 ? `0${num}` : num
}

function convertTime (date) { 
	return {
		year        : zero(date.getFullYear()),
		month       : zero(date.getMonth()+1),
		day         : zero(date.getDate()),
		hour        : zero(date.getHours()),
		minute      : zero(date.getMinutes()),
		second      : zero(date.getSeconds()),
		milliSecond : zero(date.getMilliseconds())
	}
}

function TransNowTime () {
	const t = convertTime(new Date)
	return `${t.year}-${t.month}-${t.day} ${t.hour}:${t.minute}:${t.second}`
}

module.exports = {
	mode: 'production',
	entry: {
		['bestime']: './src/index.js'
	},
	output: {
		filename: `[name].min.js`,
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
			// new webpack.BannerPlugin('Bestime'), // 添加注释会被变成LF文件格式
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
	}
}