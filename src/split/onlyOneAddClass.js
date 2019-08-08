
const addClass = require('./addClass.js')
const removeClass = require('./removeClass.js')

/**
 * 仅给数组中当前索引的对象添加class  其余对象移除class
 * toggleClass 改名为 onlyOneAddClass
 * @param arr          对象合集的数组
 * @param index        当前对象的下标
 * @param className    需要切换的class  
 */
function onlyOneAddClass (arr, index, className) {
	for(let a = 0, len = arr.length; a < len; a++) {
		if(a === index) {
			addClass(el, className);
		} else {
			removeClass(el, className);
		}
	}
}

module.exports = onlyOneAddClass