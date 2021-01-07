const isFunction = require('./isFunction')

/**
 * 获取图片原始尺寸
 * @param {String} src 图片链接
 * @param {Function} callback(json) 回调函数
 */

function getImgSize (src, callback) {
	if(isFunction(callback)) {
		var oImg = document.createElement('img');
		
		// onload 写在在 img.src 赋值前，保证兼容性
		oImg.onload = function () {
			callback({
				src: src,
				width: oImg.width,
				height: oImg.height
			})
		};
		oImg.src = src
	}
}

module.exports = getImgSize