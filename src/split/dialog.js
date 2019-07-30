
const PlugName = 'bestime-dialog'
const getData  = require('./getData')
const drag  = require('./drag')
const unbind  = require('./unbind')
const bind  = require('./bind')
const isFunction  = require('./isFunction')
const getType  = require('./getType')
const removeElement  = require('./removeElement')
const removeClass  = require('./removeClass')
const getByClass  = require('./getByClass')
const addClass  = require('./addClass')
const _Number  = require('./_Number')
const _Function  = require('./_Function')
const _String  = require('./_String')
const _Object  = require('./_Object')


/**
 * 
 * title
 * msg
 * maxWidth // 最大宽度
 * startClose
 * closed
 * onShow
 */

function dialog (opt) {  
  opt = _Object(opt)
  opt.title = _String(opt.title) || '提示' // 标题
  opt.msg = _String(opt.msg) // 显示的内容
  opt.startClose = opt.startClose || null // 关闭前回调
  opt.closed = _Function(opt.closed) // 关闭完成回调
  opt.onShow = _Function(opt.onShow) // 显示完成回调

  
  const jcy = getData(); // 统一数据存放中心
  jcy.dialog_id = _Number(jcy.dialog_id) + 1;
  var useId = PlugName + '-' + jcy.dialog_id; // 弹窗ID  

  var closeing = false; // 关闭中，禁止多次点击
  var timer_show = null; // 显示的timer
  var timer_autoClose = null // 自动关闭的timer
  var oldWrappers = getByClass('dialog-vbt')
  var oWrapper = document.createElement('div')
  var gpName = oldWrappers.length ? ` group dialog-${oldWrappers.length}` : ''
  var maxWidth = opt.maxWidth ? `max-width:${opt.maxWidth};` : null;
  oWrapper.className = 'dialog-vbt' + gpName
  oWrapper.id = useId
  oWrapper.innerHTML = `
    <div class="dialog-bg"></div>
    <div class="dialog-content" style="${maxWidth}">
      <div class="dialog-title">
        <span>${opt.title}</span>
        <b class="duration"></b>
      </div>
      <div class="dialog-msg-box">${_String(opt.msg) || '默认信息'}</div>
      <div class="dialog-btn-box">
      <div class="dialog-btn cancel">取消</div>
        <div class="dialog-btn confirm">确定</div>
      </div>
    </div>
  `;
  document.body.appendChild(oWrapper)
  setTimeout(function () {
    listenKeyBoard()
    addClass(oWrapper, 'active')
    doAutoClose()
    if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      drag({
        oHandle: getByClass('dialog-title', oWrapper)[0],
        oWrapper: getByClass('dialog-content', oWrapper)[0]
      })
    }      
    timer_show = setTimeout(function () {
      opt.onShow()
    }, 200 + 16)
  }, 16);

  var oMsgBox = getByClass('dialog-msg-box', oWrapper)[0]
  var oDuration = getByClass('duration', oWrapper)[0]

  // getByClass('dialog-bg', oWrapper)[0].onclick = checkToClose
  getByClass('confirm', oWrapper)[0].onclick = function () {
    checkToClose('confirm')
  }
  getByClass('cancel', oWrapper)[0].onclick = function () {
    checkToClose('cancel')
  }

  // 监听按键
  function listenKeyBoard () {
    bind(document, useId, 'keydown', function (e) {
      var ev = e || window.event        
      if(ev.keyCode ==27) {
        checkToClose()
      }
    })
  }

  // 移除按键监听
  function removeKeyBoard () {
    unbind(document, useId, 'keydown')
  }

  // 计算自动关闭
  function doAutoClose () {
    if(getType(opt.autoClose)=='Number') {
      var duration = opt.autoClose < 2000 ? 2000 : opt.autoClose; // 最小值2000
      oDuration.innerHTML = '(' + Math.ceil(duration/1000) + 's)';
      timer_autoClose = setInterval(function () {
        if(duration<=0) {
          checkToClose()
          clearInterval(timer_autoClose)
        } else {
          duration -= 1000
          oDuration.innerHTML = '(' + Math.ceil(duration/1000) + 's)';
        }
      }, 1000)
    }
  }

  // 关闭主函数
  function checkToClose (hideType) {
    if(closeing) return;
    clearTimeout(timer_show)
    closeing = true
    hideType = _String(hideType) || 'default'
    if(hideType=='confirm' && isFunction(opt.startClose)) {
      opt.startClose(function (isClose, checkedMsg) {
        if(isClose!==false) {
          removeDialog(hideType)
        } else {
          oMsgBox.innerHTML = checkedMsg
          closeing = false
        }
      }, hideType)
    } else {
      removeDialog(hideType)
    }
  }

  // 执行关闭
  function removeDialog (hideType) {
    removeKeyBoard()
    removeClass(oWrapper, 'active')
    setTimeout(function () {
      clearInterval(timer_autoClose)
      removeElement(oWrapper)
      opt.closed(hideType)
      closeing = false
      oWrapper = null;
    }, 200 + 16)
  }
}


module.exports = dialog