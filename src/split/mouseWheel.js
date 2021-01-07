import _Function from './_Function'
import bindEasy from './bindEasy'
import { WINDOW } from './basic/browser'

/**
 * 获取鼠标滚动方向。简洁优化版
 * @param {Obj}        el          需要滚动的对象。鼠标在对象上才执行
 * @param {Function}   callback    回调函数。滚轮滚动一次反回一个参数，-1：向下。1：向上
 * @param {Boolean}    isPrevent   是否阻止原生滚动，仅用来获取滚动方向
 */
export default function mouseWheel (el, callback, isPrevent) {
	if(!el) return;	
	/**
	 * ie/chrome : onmousewheel
	 *    event.wheelDelta
	 *       上：120
	 *       下：-120
	 * firefox : DOMMouseScroll 必须用addEventListener
	 *    event.detail
	 *       上：-3
	 *       下：3
	 * return false阻止的是  obj.on事件名称 = fn 所触发的默认行为
	 * addEventListener 绑定的事件需要通过 event 下面的 preventDefault();
	 */
	
	//el.onmousewheel = wheel;            
	//if (el.addEventListener) el.addEventListener('DOMMouseScroll', wheel, false);

  bindEasy(el, 'mousewheel', wheel)
	bindEasy(el, 'DOMMouseScroll', wheel)

	function wheel (ev) {
		var ev = ev || WINDOW.event
		var mouseDirection = 0

		if (ev.wheelDelta) {
			mouseDirection = ev.wheelDelta > 0 ? 1 : -1;
		} else {
			mouseDirection = ev.detail < 0 ? 1 : -1;
		}
		
		_Function(callback)(mouseDirection)
        
		if(isPrevent) {
			if (ev.preventDefault) {
				ev.preventDefault()
			}
			return false;
		}
	}
}