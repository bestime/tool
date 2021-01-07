const Tween = require('./Tween')
const isFunction = require('./isFunction')
const _Number = require('./_Number')

/**
 * 
 * @param {Element} [el=document.body] 返回顶部的容器
 * @param {Function} [callback=null]执行完毕回调函数
 * @param {Function} [fx=Tween.Quart.easeInOut] 缓动函数
 * @param {Number} [duration=700] 持续时间
 */
function backTop (el, callback, fx, duration) {
	fx = fx || Tween.Quart.easeInOut
  duration = _Number(duration) || 700
	var now = 0
	if(el) {
		now = el.scrollTop;
	}else {
		el = document.body
		now = document.documentElement.scrollTop || document.body.scrollTop;
	}

	return Tween.getAnimate(now, -now, fx, duration, function (val, isStop) {
    if(el === document.body) {
      window.scrollTo(0, val);
    } else {
      el.scrollTop = val
		}
		if(isStop) {
			if(isFunction(callback)) {
				callback()
			}
		}
  })
}

module.exports = backTop