const isFunction = require('./isFunction')
const _Number = require('./_Number')

function debounce (opt) {
  if(!isFunction(opt.handle)) return;
  var delay = _Number(opt.delay)
  var handle = opt.handle
  var isFirstWork = opt.isFirstWork === false ? false : true
  var timer, ts, times = 0;
  return function () {    
    var self = this, arg = arguments;
    clearTimeout(ts)
    clearTimeout(timer)
    if(isFirstWork && !times) {
      doOne()
    } else {
      timer = setTimeout(doOne, delay)
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

module.exports = debounce