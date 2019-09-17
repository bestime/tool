const _Function = require('./_Function')
const Tween = require('./Tween')
const _Number = require('./_Number')


/**
 * 
 * @param {Dom} el 需要滚动到底部的目标节点
 * @param {Function} callback 滚动完成的回调
 */
function scrollToBottom (el, callback, fx, dutation) {
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
      window.scrollTo(0, val);
    } else {
      el.scrollTop = val
    }
    if(isStop) {
      callback()
    }
  })
}

module.exports = scrollToBottom