function defaultValue (data, value) {
  return data == null ? value : data
}

/**
 * 防抖函数
 * 注：vue在methods中使用，不用处理this，vue自身已经处理过
 * @param {Function} hander
 * @param {?Number} [wait=100]
 * @param {?Object} [options = { leading: false, trailing: true }]
 * 
 * @return {Function} 改变this指向自行bind、call、apply。
 */
export default function createDebounce (hander, wait, options) {
  wait = wait || 100
  options = options || {}
  var timer_leading,
      self,
      arg,
      lock,
      timer_trailing,
      leading = defaultValue(options.leading, false), // wait 前调用
      trailing = defaultValue(options.trailing, true); // wait 后调用

  function waitLock () {
    clearTimeout(timer_leading)
    timer_leading = setTimeout(doLock, wait)
  }

  function doLock () {
    lock = false
  }

  function trailFunction () {
    lock = true
    waitLock()
    hander.apply(self, arg)
  }
  
  return function () {
    self = this
    arg = arguments
    if(leading) {
      if(!lock) {
        lock = true
        hander.apply(self, arg)
      }
      waitLock()
    } 
    
    if (trailing) {
      clearTimeout(timer_trailing)
      timer_trailing = setTimeout(trailFunction, wait)
    }
  }
}