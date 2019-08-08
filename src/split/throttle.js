
const isFunction = require('./isFunction')
const _Number = require('./_Number')
const _Function = require('./_Function')
const _Object = require('./_Object')

/**
 * 
 * 
 * @param {Function} handle 处理主函数 
 * @param {Number} delay 延时
 * @param {Boolean} isFirstWork 第一次是否触发，默认true 
 */

function throttle (opt) {
  opt = _Object(opt)
  if(!isFunction(opt.handle)) return;
  var handle = opt.handle
  var delay = opt.delay
  var isFirstWork = opt.isFirstWork
  var onFast = _Function(opt.onFast)
  
  delay = _Number(delay)
  isFirstWork = isFirstWork === false ? false : true
  var last = +new Date()
  var needWait = 0
  return function () {
    var now = +new Date()    
    if((isFirstWork) || now - last > delay) {
      isFirstWork = false
      last = now
      handle.apply(this, arguments)
    } else {
      needWait = delay + last - now
      if(needWait > 0){
        onFast(needWait)
      }
    }
  }
}



module.exports = throttle