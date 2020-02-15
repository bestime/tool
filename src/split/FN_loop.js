
/*
例子

// 实例化
const demo = FN_loop(500, 7000)

// 执行
demo.call('context', function (next, stop, count) {}, function () {})

// 停止
demo.call('context') 


*/


/**
 * 轮询升级版
 * @param {Number} interval 执行频率，在执行next回调之后才计时
 * @param {?Number} duration 超时时间，默认不超时，超时后自动停止
 * @return {Function(handle, overTimeHandle)}
 */

function FN_loop (interval, duration) {
  var count = 0, startTime = 0, handle, timer, context,overTimeHandle;  

  function doStop () {
    startTime = 0
    count = 0
    clearTimeout(timer)
  }

  function doStart () {
    if(duration && (+new Date - startTime > duration)) {
      doStop()
      overTimeHandle && overTimeHandle.call(context)
    } else {
      handle.call(
        // 改变上下文，其实回调方式没什么用了
        context,

        // 继续执行
        function () {
          clearTimeout(timer)
          timer = setTimeout(doStart, interval)
        },

        // 停止执行
        doStop,

        // 次数
        ++count
      )
    }    
  }

  
  return function (callback, durationCallback) {
    context = this
    if(!callback) {
      doStop()
    } else if(!startTime) {
      
      startTime = +new Date
      handle = callback
      overTimeHandle = durationCallback
      doStart()
    }
  }
}

module.exports = FN_loop



