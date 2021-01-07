import forEach from './forEach'
import removeClass from './removeClass'
import addClass from './addClass'

/**
 * 仅给数组中当前索引的对象添加class  其余对象移除class
 * toggleClass 改名为 onlyOneAddClass
 * @param {Array<Element>} arr 对象合集的数组
 * @param {Number} index 当前对象的下标
 * @param {String} className 需要切换的class  
 */

export default function onlyOneAddClass (arr, index, className) {
	forEach(arr, function (item, a) {
		if(a === index) {
			addClass(item, className);
		} else {
			removeClass(item, className);
		}
	})
}