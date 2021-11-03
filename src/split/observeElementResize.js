
/**
 * 检测DOM元素尺寸变化（定时器方式，后续优化，先用着）
 * @param {Element} el 监听的DOM
 * @param {Function} callback<isWidthChange, isHeightChange> 有时后可能只需要监听宽、高中的一个
 * @param {Number} [speed = 200]定时器多久检测一次
 */
function observeElementResize (el, callback, speed) {
  speed = speed || 200
  var timerName = '_ober_timer'
  var currentWidth = el.offsetWidth
  var currentHeight = el.offsetHeight
  var oldWidth = currentWidth
  var oldHeight = currentHeight

  var isWidthChange = false
  var isHeightChange = false

  el[timerName] = setInterval(function () {
    currentWidth = el.offsetWidth
    currentHeight = el.offsetHeight

    isWidthChange = currentWidth !== oldWidth
    isHeightChange = currentHeight !== oldHeight

    if(isWidthChange) {
      oldWidth = currentWidth
    }

    if(isHeightChange) {
      oldHeight = currentHeight
    }

    if(isWidthChange || isHeightChange) {
      callback(isWidthChange, isHeightChange)
    }
  }, speed)

  return {
    dispose: function () {
      clearInterval(el[timerName])
    }
  }
}

export default observeElementResize