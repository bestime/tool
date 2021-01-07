import _Number from './_Number'
import Tween from './Tween'
import _Function from './_Function'
import { WINDOW } from './basic/browser'
/**
 * 
 * @param {Dom} el 需要滚动到底部的目标节点
 * @param {Function} callback 滚动完成的回调
 */
export default function scrollToBottom (el, callback, fx, dutation) {
  dutation = _Number(dutation) || 700
  fx = fx || Tween.Quart.easeInOut
  callback = _Function(callback)
  var to, now;
  if(!el) {
    el = document.body
    to = el.scrollHeight
    now = document.documentElement.scrollTop || document.body.scrollTop
  } else {
    to = el.scrollHeight - el.offsetHeight
    now = el.scrollTop
  }
  
  return Tween.getAnimate(now, to - now, fx, dutation, function (val, isStop) {
    if(el===document.body) {
      WINDOW.scrollTo(0, val);
    } else {
      el.scrollTop = val
    }
    if(isStop) {
      callback()
    }
  })
}