/*



ns.authorization({
  // [非必填] 标题
  title: '扫码授权', 

  // 二维码地址
  src: '../images/test-qr.png', 

  // [非必填] 二维码有效期，默认 20000
  duration: 1000 * 60, 

  // [非必填] 轮询频率，默认 5000
  sleep: 2000,
  
  // 每一次轮询的回调，在这里处理成功或者失败结果
  onOnce: function (next, stop, times) {
    console.log('执行次数：', times)
    if(times == 10) {
      stop() // 授权成功，停止轮询
    } else {
      next() // 未授权，继续轮询
    }
  }
})


*/



var NAME = 'AUTH-IMG'
var _Object = require('./_Object')
var _Number = require('./_Number')
var dialog = require('./dialog')
var _Function = require('./_Function')
var FunctionLoop = require('./FunctionLoop')
var getConfig = require('./getConfig')
var setConfig = require('./setConfig')

function toSecond (num) {
  return Math.ceil(num / 1000)
}




/**
 * 二维码授权弹窗
 * @param {Object} opt 
 *  @param {?String} title 标题
 *  @param {String} src 二维码地址
 *  @param {?Number} duration 二维码有效期
 *  @param {?Number} sleep 轮询频率
 *  @param {?Function} onOnce 每一次轮询的回调，在这里处理成功或者失败结果
 */
function authorization (opt) {
  opt = _Object(opt)
  var sleep = _Number(opt.sleep) || 5000
  var onOnce = _Function(opt.onOnce)
  var duration = _Number(opt.duration) || 20000
  var id = _Number(getConfig(NAME)) + 1
  setConfig(id)
  id = NAME + id
  var timer, timer_c, start = +new Date, maxTime = duration, oCount;
  var oDialog = dialog({
    title: opt.title,
    confirmText: '关闭',
    msg: '\
      <div class="authorization-wrapper">\
        <img src="'+ opt.src +'"/>\
        <div class="count" id="'+ id +'">-</div>\
      </div>\
    ',
    closed: clearAll
  })
  

  var LPF = FunctionLoop({
    sleepTime: sleep,
    handle: function (next, stop, times) {
      onOnce(next, function () {
        stop()
        clearAll()
        try { oDialog.close() } catch (e) {}
        _Function(opt.success)()
      }, times)
    }
  })

  timer = setTimeout(LPF.start, sleep)
  setLastTime(toSecond(duration))
  timer_c = setInterval(function () {
    duration =  toSecond(maxTime - (+new Date - start))
    setLastTime(duration)
    if(duration<=0) {
      duration = 0
      clearAll()
    }
  }, 1000)

  function clearAll () {
    clearTimeout(timer)
    clearInterval(timer_c)
    try { LPF.stop() } catch (e) {}
  }

  function setLastTime (last) {
    oCount = oCount || document.getElementById(id)
    oCount.innerHTML = last>0 ? '<span>扫码倒计时：</span><span>('+ last +'s)</span>' : '已过期'    
  }
}


module.exports = authorization