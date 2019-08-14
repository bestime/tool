const _Function = require('./_Function')


/**
 * 
 * @param {Dom} el 需要滚动到底部的目标节点
 * @param {Function} callback 滚动完成的回调
 */
function scrollToBottom (el, callback, isAnimate) {
  if (el) {
    callback = _Function(callback)
    var to = el.scrollHeight - el.offsetHeight, step = 10, timer, now = el.scrollTop;
    if(to > 0) {
      if (isAnimate !== false) {
        timer = setInterval(function () {
          now += step
          if(now > to) {
            now = to
            clearInterval(timer)
            callback()
          }
          el.scrollTop = now
        }, 20)
      } else {
        el.scrollTop = to
        callback()
      }
    } else {
      callback()
    }
  }
}

module.exports = scrollToBottom