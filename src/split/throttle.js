
const isFunction = require('./isFunction')
const _Number = require('./_Number')
const isObject = require('./isObject')

/**
 * 节流函数，有节奏性的执行
 * 可配置【第一次】和【最后一次】都执行
 * @param {Function} handle 处理主函数 
 * @param {Number} delay 延时
 * @param {Boolean} isFirstWork 第一次是否触发
 * @param {Boolean} isLastWork 最后一次是否执行：相当于结合了 debounce
 * @param {Function} onFast 操作频率过快的回调函数 
 */

function throttle (opt) {
  if(isObject(opt) && isFunction(opt.handle)) {
    var handle = opt.handle
    var delay = _Number(opt.delay)
    var isFirstWork = opt.isFirstWork === true
    var isLastWork = opt.isLastWork === true
    var last = +new Date(), needWait = 0, timer3;
    
    return function () {
      var now = +new Date()
      if((isFirstWork) || now - last > delay) {
        // 此时可执行
        isFirstWork = false
        last = now
        handle.apply(this, arguments)
      } else {
        // 频率过快
        needWait = delay + last - now
        if(needWait > 0 && isFunction(opt.onFast)){
          opt.onFast.apply(this, [needWait])
        }
      }

      // 最后停了之后是否执行，有些情况是需要最后一次执行的
      // debounce 不能满足需求，所以加了这个接口
      if (isLastWork) {
        clearTimeout(timer3)
        timer3 = setTimeout(function () {
          handle.apply(this, arguments)
        }, delay)
      }
    }
  }
}






module.exports = throttle