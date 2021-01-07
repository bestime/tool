
/**
 * 节流函数
 * 注：vue在methods中使用，不用处理this，vue自身已经处理过
 * @param {Function} hander
 * @param {?Number} [wait=100]
 * @param {?Object} [options = { leading: false, trailing: true }]  leading：第一次立即执行；trailing：最后一次延迟wait后执行
 * 
 * @return {Function} 改变this指向自行bind、call、apply。
 */
function createThrottle (handler, wait, options) {
  wait = wait || 100
  var startTime = 0, nowTime, self, timer01, arg, timer02, count = 0;
  options = options || {}

  var leading = options.leading === true // wait 前调用
  var trailing = options.trailing === true // wait 后调用

  // 重置，为下一次操做周期做准备
  function resetLoop () {
    startTime = 0
    count = 0
  }

  // 检测最后一次
  function checkLast () {
    if(trailing && (count > 1 || !leading)) {
      main()
      timer02 = setTimeout(resetLoop, wait)
    } else {
      resetLoop()
    }
  }

  function main () {
    startTime = +new Date()
    handler.apply(self, arg)
  }

  return function () {
    count++
    arg = arguments
    self = this
    nowTime = +new Date()
    clearTimeout(timer01)
    clearTimeout(timer02)    
    if(startTime===0) {
      if(leading) {
        main()
      } else {
        startTime = nowTime
      }
    } else if(nowTime - startTime >= wait) {
      main()
    }
    timer01 = setTimeout(checkLast, wait)
  }
}

module.exports = createThrottle



/*


document.getElementById('demo').onclick = ns.createThrottle(function (a, b) {
  console.log('防抖信息', this.toString(), a,b)
}, 1000, { leading: false, trailing: true }).bind('我是context', 1, 2)




*/