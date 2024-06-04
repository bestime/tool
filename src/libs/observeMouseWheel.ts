
type Direction = 1 | -1

/**
 * 
 * @param el DOM元素
 * @param callback 滚动回调
 * @param isPrevent 是否阻止原生滚动，仅用来获取滚动方向
 * @returns 
 */
export default function (el: HTMLElement, callback:(direction: Direction) => void, isPrevent: boolean) {
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

  el.addEventListener('mousewheel', wheel)
  el.addEventListener('DOMMouseScroll', wheel)

	function wheel (ev: any) {
		let mouseDirection: Direction

		if (ev.wheelDelta) {
			mouseDirection = ev.wheelDelta > 0 ? 1 : -1;
		} else {
			mouseDirection = ev.detail < 0 ? 1 : -1;
		}
		
		callback(mouseDirection)
        
		if(isPrevent) {
			if (ev.preventDefault) {
				ev.preventDefault()
			}
			return false;
		}
	}
  
  function dispose () {
    el.removeEventListener('mousewheel', wheel)
    el.removeEventListener('DOMMouseScroll', wheel)
  }

  return {
    dispose
  }
}