
const _Object = require('../_Object')
const _Function = require('../_Function')
const isNumber = require('../isNumber')
const numberMin = require('../numberMin')
const isObject = require('../isObject')
const _Number = require('../_Number')



/*


var func = ns.FunctionLoop({
  handle: function (next, stop, count, data) {
    console.log('轮询：', this, count, data)
    next()
  },
  sleepTime: 2000
})

func.start.call('自己', '数据')


 */ 

function FunctionLoop (opt) {
  opt = _Object(opt)
  let times = 0, timer, timer_out, self;

  // 停止
  function stop () {
    times = 0
    clearTimeout(timer)
    clearTimeout(timer_out)
  }

  // 开始
  function start (data) {
    self = this
    times++
    if(times===1) {
      var startTime = +new Date()
      var now = startTime
      // 检测超时
      if(isObject(opt.overTime)) {
        _Function(opt.overTime.every).call(self, opt.overTime.time)
        timer_out = setInterval(function () {
          now = +new Date()
          if( now- startTime > opt.overTime.time) {
            stop.call(self)
            _Function(opt.overTime.handle).call(self)
          } else {
            _Function(opt.overTime.every).call(self, opt.overTime.time - (now - startTime))
          }
        }, 1000)
      }
    }

    _Function(opt.handle).call(
      // this 指向
      self,

      // 【继续】 回调
      function (newData) {
        newData = typeof newData === 'undefined' ? data : newData
        clearTimeout(timer)
        timer = setTimeout(function () {
          times > 0 && start.call(self, newData)
        }, numberMin(opt.sleepTime, 20))
      },

      // 【停止】 回调
      function () {
        stop.call(self)
      },

      // 本次执行次数
      times,
      
      // 附带的数据
      data
    )
  }

  return {
    start,
    stop: stop,
    updateProps: function (newSetting) {
      if(isObject(newSetting)) {
        isObject(newSetting.overTime) && (opt.overTime=newSetting.overTime)
        isNumber(newSetting.sleepTime) && (opt.sleepTime=_Number(newSetting.sleepTime))
        start.call(this)
      }
    }
  }
}

module.exports = FunctionLoop