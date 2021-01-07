import { _UNDEFINED } from './basic/constant'

/**
 * 轮询函数
 * @param {Object} options
 * @return {Object<{run,stop}>}
 */

export default function createLoop (options) {
  var wait = options.wait || 1000
  var outtime = options.outtime || 0
  var timekeeper = options.timekeeper
  var frequency = options.frequency || 1000
  var handle = options.handle
  
  var timer, timerout,self, count=0, start=0, diff = 0, aidx, arg, inlay;
  

  function next () {
    clearTimeout(timer)
    if(count>0) {
      timer = setTimeout(callMain, wait)
    }
  }

  function stop () {
    clearTimeout(timer)
    clearInterval(timerout)
    inlay = arg = aidx = self = _UNDEFINED;
    count = 0
  }

  function checkOutTime () {
    if(!start && outtime > 0) {
      start = start || +new Date()
      updateInfoOnce()
      timerout = setInterval(updateInfoOnce, frequency)
    }
  }

  function updateInfoOnce () {
    diff = Math.max(outtime - (+new Date() - start), 0)
    if(diff<=0) {
      stop()
    }
    timekeeper && timekeeper.call(self, diff)
  }

  function callMain () {
    if(count>0) {
      main.apply(self, arg)
    }
  }  

  function main () {
    self = this
    arg = []
    for(aidx = 0; aidx<arguments.length; aidx++) {
      arg.push(arguments[aidx])
    }
    
    count++
    checkOutTime()
    inlay = [next, stop, count].concat(arg)
    handle.apply(self, inlay)
  }

  return {
    run: main,
    stop: stop
  }
}






/*



const demo = createLoop({
  // 每次轮询的回调函数
  handle: function (next, stop, count, data1, data2, data3) {
    console.log('第('+count+')次轮询', this)
    if(count<10) {
      next()
    } else {
      stop()
    }
  },
  // 多久执行一次 【默认1000】
  wait: 1000, 

  // 超时时间 【默认0】。为0则frequency、timekeeper无效
  outtime: 5000, 

  // 剩余时间更新频率 默认【1000】
  frequency: 1000, 

  // 剩余时间更新回调
  timekeeper: function (lastTime) {
    console.log('剩余', lastTime, '毫秒')
  }
})



demo.run.call('context') // 运行
demo.stop.call('context') // 停止



*/