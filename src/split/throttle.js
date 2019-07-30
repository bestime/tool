
const isFunction = require('./isFunction')
const _Number = require('./_Number')

/**
 * 
 * 
 * @param {Function} handle 处理主函数 
 * @param {Number} delay 延时
 * @param {Boolean} isFirstWork 第一次是否触发，默认true 
 */

function throttle (handle, delay, isFirstWork) {  
  if(!isFunction(handle)) return;
  delay = _Number(delay)
  isFirstWork = isFirstWork === false ? false : true
  var last = +new Date()
  return function () {
    var now = +new Date()    
    if((isFirstWork) || now -last > delay) {
      isFirstWork = false
      last = now
      handle.apply(this, arguments)
    }
  }
}



module.exports = throttle