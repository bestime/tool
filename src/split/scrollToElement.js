import Tween from './Tween'
import isFunction from './isFunction'
import _Number from './_Number'
import getRelativePos from './getRelativePos'
import { WINDOW } from './basic/browser'

/**
 * @param {Element} dom [必填]
 * @param {Element} [oFather] 默认直接父级。不是body => 不要使用static定位；是body => 中间父级不要使用任何定位
 * @param {Function} [callback] 执行完毕回调函数
 * @param {Tween} [fx] 缓动函数
 * @param {Number} [duration] 持续时间
 * @param {Number} [fix=0] 微调，小于0上偏移，大于0向下偏移
 * 
 * @return {Object} iScroll 实例化对象：iScroll.stop()可以停止滚动
 */
export default function scrollToElement (dom, oFather, callback, fx, duration, fix) {
  fx = fx || Tween.Quart.easeInOut
  duration = _Number(duration) || 700
  oFather = oFather || dom.parentNode
  var now = oFather.scrollTop
  var to = dom.offsetTop + _Number(fix)

  if(oFather === document.body) {
    now = document.documentElement.scrollTop || document.body.scrollTop;
  } else {
    now = getRelativePos(oFather).y
  }
  
  return Tween.getAnimate(now, to - now, fx, duration, function (val, isStop) {
    if(oFather === document.body) {
      WINDOW.scrollTo(0, val);
    } else {
      oFather.scrollTop = val
    }

    if(isStop && isFunction(callback)) {
      callback()
    }
  })
}