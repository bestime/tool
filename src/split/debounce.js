const isFunction = require('./isFunction')
const _Number = require('./_Number')

function debounce (handle, delay, isFirstWork) {
  if(!isFunction(handle)) return;
  delay = _Number(delay)
  isFirstWork = isFirstWork === false ? false : true
  var timer, ts;
  var times = 0;
  
  return function () {    
    var self = this
    var arg = arguments
    clearTimeout(ts)
    clearTimeout(timer)
    if(isFirstWork && !times) {
      doOne()
    } else {
      timer = setTimeout(function () {
        doOne()
      }, delay)
    }

    function doOne () {
      times++
      if(isFirstWork) {
        ts = setTimeout(function () {
          times = 0; // 保证下一次的第一次可以执行
        }, delay)
      }
      handle.apply(self, arg)
    }
  }
}

function debounce2 (handle, delay) {
  if(!isFunction(handle)) return;
  delay = _Number(delay)

  let lock, timer;
  return function () {
    var self = this
    var arg = arguments

    clearTimeout(timer)
    timer = setTimeout(function(){
      lock = false
    }, delay)
    
    if(!lock) {
      lock = true;      
      handle.apply(self, arg)
    }
  }
}


module.exports = debounce