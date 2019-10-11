
const addClass = require('./addClass.js')
const removeClass = require('./removeClass.js')
const forEach = require('./forEach.js')

/**
 * 仅给数组中当前索引的对象添加class  其余对象移除class
 * toggleClass 改名为 onlyOneAddClass
 * @param {Array<Element>} arr 对象合集的数组
 * @param {Number} index 当前对象的下标
 * @param {String} className 需要切换的class  
 */

function onlyOneAddClass (arr, index, className) {
	forEach(arr, function (item, a) {
		if(a === index) {
			addClass(item, className);
		} else {
			removeClass(item, className);
		}
	})
}

module.exports = onlyOneAddClass