import { DOCUMENT_CREATE_IMAGE } from './basic/browser'

/**
 * 获取图片原始尺寸
 * @param {String} src 图片链接
 * @param {Function} callback(json) 回调函数
 */

export default function getImgSize (src, callback) {
	var oImg = DOCUMENT_CREATE_IMAGE();
	// onload 写在在 img.src 赋值前，保证兼容性
	oImg.onload = function () {
		callback({
			src: src,
			width: oImg.width,
			height: oImg.height
		})
	};
	oImg.onerror = function () {
		callback({
			src: src,
			width: 0,
			height: 0
		})
	}
	oImg.src = src
}
