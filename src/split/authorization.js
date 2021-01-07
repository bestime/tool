var NAME = 'AUTH-IMG'
var _Object = require('./_Object')
var _Number = require('./_Number')
var dialog = require('./dialog')
var _Function = require('./_Function')
var FN_loop = require('./FN_loop')
var getConfig = require('./getConfig')
var setConfig = require('./setConfig')





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
  var oCount;
  var sleep = _Number(opt.sleep) || 5000
  var onOnce = _Function(opt.onOnce)
  var duration = _Number(opt.duration) || 20000
  var id = _Number(getConfig(NAME)) + 1
  setConfig(id)
  id = NAME + id
  var LPF = FN_loop(sleep, duration, 1000);
  
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
  });

  LPF(function (next, stop, times) {
    onOnce(next, function () {
      stop()
      clearAll()
      try { oDialog.close() } catch (e) {}
      _Function(opt.success)()
    }, times)
  }, null, function (last) {
    last = Math.ceil(last / 1000);
    oCount = oCount || document.getElementById(id)
    oCount.innerHTML = last > 0 ? '<span>扫码倒计时：</span><span>('+ last +'s)</span>' : '已过期'
  });

  function clearAll () {
    try { LPF() } catch (e) {}
  }
}


module.exports = authorization











/*



ns.authorization({
  // [非必填] 标题
  title: '扫码授权', 
  // 二维码地址
  src: 'http://192.168.0.224:6662/app/view/static/images/alipay-sj.jpg', 
  // [非必填] 二维码有效期，默认 20000
  duration: 1000 * 10, 
  // [非必填] 轮询频率，默认 5000
  sleep: 2000,
  
  // 每一次轮询的回调，在这里处理成功或者失败结果
  onOnce: function (next, stop, times) {
    console.log('执行次数：', times)
    if(times == 3) {
      stop() // 授权成功，停止轮询
    } else {
      next() // 未授权，继续轮询
    }
  },
  success: function () {
    // 这个回调其实没啥用
    console.log('授权成功')
  }
})


*/