
const PlugName = 'bestime-dialog'

const getData  = require('./getData')
const createStyleElement  = require('./createStyleElement')
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
const cssStr =  `
  .dialog-vbt{z-index:80000;position:fixed;left:0;right:0;bottom:0;top:0;    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: fixed;}
  .dialog-bg {z-index:1;background:rgba(0,0,0,0.5);position:absolute;left:0;right:0;top:0;bottom:0;opacity:0;}
  .dialog-bg, .dialog-content, .dialog-btn{transition: opacity 0.2s, transform 0.2s ease-out;}
  .dialog-content{z-index:2;position:relative;background:#fff;opacity:0;transform:translateY(-10%);;box-shadow:0 0 20px rgba(0,0,0,0.2);min-width:300px;max-width:80%;max-height:80%;display:inline-flex;flex-direction:column;}
  .dialog-vbt.active .dialog-bg{opacity:1;}
  .dialog-vbt.active .dialog-content{transform:translateY(0);opacity:1;border-radius:4px;overflow:hidden;}
  .dialog-title{font-size:16px;color:#000;border-bottom:#f2f2f2 solid 1px;padding:8px 10px;cursor:move;background:#fbfbfb;}
  .dialog-title *{display:inline-block;vertical-align:middle;}
  .dialog-msg-box{padding:10px;font-size:14px;color:#585858;overflow:auto;-webkit-overflow-scrolling:touch;word-break: break-all;line-height: 1.6;}
  .dialog-btn-box{padding:0 5px 10px 10px;text-align:right;font-size:0;}
  .dialog-btn{font-size:12px;display:inline-block;cursor:pointer;user-select:none;padding:5px 10px;border-radius:4px;margin-right:5px;}
  .dialog-btn.confirm{background:rgba(100,150,255,1);color:#fff;}
  .dialog-btn.confirm:hover{rgba(100,150,255,0.8);}
  .dialog-btn.confirm:active{box-shadow:0 0 0 2px rgba(100,150,255,0.2);}
  .dialog-btn.cancel{background:#e6e6e6;color:#8c8c8c;}
  .dialog-btn.cancel:active{background:#bbbbbb;}
  .dialog-vbt .duration{font-size:14px;color:#949494;font-weight:normal;}
  .dialog-vbt.group .dialog-bg{background:transparent;}    
`;

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

  createStyleElement(`${PlugName}-css`, cssStr, function () {
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
  })
}


module.exports = dialog