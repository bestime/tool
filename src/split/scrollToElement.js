const Tween = require('./Tween')
const _Function = require('./_Function')
const _Number = require('./_Number')

/**
 * @param {Element} dom [必填]
 * @param {Element} oFather [可选]
 * @param {Function} callback [可选] 执行完毕回调函数
 * @param {Function} fx [可选] 缓动函数
 * @param {Number} duration [可选] 持续时间
 */
function scrollToElement (dom, oFather, callback, fx, duration) {
  fx = fx || Tween.Quart.easeInOut
  duration = _Number(duration) || 700
  oFather = oFather || dom.parentNode
  var now = oFather.scrollTop, to = dom.offsetTop;
  if(oFather===document.body) {
    now = document.documentElement.scrollTop || document.body.scrollTop;
  }

  return Tween.getAnimate(now, to - now, fx, duration, function (val, isStop) {
    if(oFather === document.body) {
      window.scrollTo(0, val);
    } else {
      oFather.scrollTop = val
    }
    isStop && _Function(callback)()
  })
}

module.exports = scrollToElement