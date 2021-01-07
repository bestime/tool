var isFunction = require('./isFunction')
var _Number = require('./_Number')


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
 * @param {Number} [duration=null] 超时时间，默认不超时，超时后自动停止
 * @param {Number} [countDownFrequency=null] 倒计时频率
 * @return {Function(handle, overTimeHandle)}
 */

function FN_loop (interval, duration, countDownFrequency) {
  var count = 0,
      startTime = 0,
      handle,
      timer,
      downTimer,
      context,
      overTimeHandle,
      diff = 0,
      pass = 0;  
  countDownFrequency = _Number(countDownFrequency)
  function doStop () {
    startTime = 0
    count = 0
    clearTimeout(timer)
    clearInterval(downTimer)
  }

  function updateLastTime (callback) {
    pass = +new Date - startTime
    diff = duration - pass // 剩余时间
    if(duration && diff<=0 ) {
      doStop()
      overTimeHandle && overTimeHandle.call(context)
    } else {
      callback && callback()
    }
  }

  function doStart () {
    updateLastTime(function () {
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
    });
  }

  
  /**
   * @param {Function(next, stop, count)} callback 主处理函数处理时机回调
   * @param {Function} durationCallback 超时回调
   * @param {Function(diff)} countDownCallback 倒计时回调
   */
  return function (callback, durationCallback, countDownCallback) {
    context = this
    if(!isFunction(callback)) {
      doStop()
    } else if(!startTime) {
      startTime = +new Date
      handle = callback
      overTimeHandle = durationCallback
      doStart()
      if(isFunction(countDownCallback) && countDownFrequency > 0) {
        countDownFrequency = countDownFrequency < 20 ? 20 : countDownFrequency
        updateLastTime();
        countDownCallback(diff)
        if(diff > 0) {
          downTimer = setInterval(function () {
            updateLastTime();
            countDownCallback(diff)
          }, countDownFrequency);
        }
      }
    }
  }
}

module.exports = FN_loop



