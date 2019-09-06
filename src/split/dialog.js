const _String  = require('./_String')
const removeClass  = require('./removeClass')
const _Number  = require('./_Number')
const getByClass  = require('./getByClass')
const addClass  = require('./addClass')
const removeElement  = require('./removeElement')
const _Function  = require('./_Function')
const getWindowSize  = require('./getWindowSize')
const isFunction  = require('./isFunction')
const setJcy  = require('./setJcy')
const getJcy  = require('./getJcy')
const mouseWheel  = require('./mouseWheel')
const isSupportStyle  = require('./isSupportStyle')
const getType  = require('./getType')
const InnerBus  = require('../InnerBus')


/**
 * 
 * title
 * msg
 * startClose
 * closed
 * onShow
 */

function dialog (opt) {
  if(getType(opt)!=='Object') {
    opt = {
      msg: _String(opt)
    }
  }
  var NAME = 'dialog-id'
  var id = _Number(getJcy(NAME)) + 1,
      ibus,
      timer,
      myBus = InnerBus(),
      canTransition = isSupportStyle('Transition');
  setJcy(NAME, id)


  var oFather = opt.oFather || document.body
  var msg = _String(opt.msg) || '这个人很懒，什么都没说！'
  var zIndexBase = _Number(opt.zIndexBase) || 999999999
  var title = _String(opt.title) || '提示'
  var startClose = opt.startClose
  var closed = _Function(opt.closed)
  var onShow = _Function(opt.onShow)

  var el = document.createElement('div')
  el.className = 'dialog-wrapper-19'
  el.setAttribute('data-id', id);
  el.innerHTML = `
    <div class="dig-bg"></div>
    <div class="dig-content">
      <div class="dig-top">
        <p>${title}</p>
      </div>
      <div class="dig-msg-box">${msg}</div>
      <div class="dig-btn-box">
        <a class="close-btn">关闭</a>
        <a class="confirm">确定</a>
      </div>
    </div>
  `
  oFather.appendChild(el)
  addClass(oFather, 'dig-hide-scroll')
  var oBg = getByClass('dig-bg', el)[0]
  var oContent = getByClass('dig-content', el)[0]
  var oMsg = getByClass('dig-msg-box', el)[0]
  var oClose = getByClass('close-btn', el)[0]
  var oConfirm = getByClass('confirm', el)[0]
  var positionCss = oFather === document.body ? 'fixed' : 'absolute'


  mouseWheel(oContent, null, true)
  mouseWheel(oBg, null, true)

  oClose && (oClose.onclick = function () {
    doClose()
  });
  
  oConfirm && (oConfirm.onclick = function () {
    checkToClose('confirm')
  })

  if (oBg) {
    oBg.style['z-index'] = zIndexBase + id
    oBg.style['position'] = positionCss
  }

  function checkToClose (type) {
    if(isFunction(startClose)) {
      startClose(function (isClose, checkedMsg) {
        if(isClose===true) {
          doClose(type)
        } else {
          oMsg.innerHTML = checkedMsg
        }
      })
    } else {
      doClose(type)
    }
  }

  function doClose (type) {
    clearTimeout(timer)
    var num = _Number(getJcy(NAME))
    setJcy(NAME, num - 1)
    myBus.clear(ibus)
    if (canTransition) {
      addClass(el, 'start-close')
      removeClass(el, 'show')
      timer = setTimeout(removeDialog, 300)
    } else {
      removeDialog()
    }

    function removeDialog () {
      clearTimeout(timer)
      removeElement(el)
      closed(type)
      if(num === 1) {
        removeClass(oFather, 'dig-hide-scroll')
      }
    }
  }

  // 监听ESC按键
  ibus = myBus.on('ESC', function () {
    doClose()
  })

  function getSize () {
    if(oFather === document.body) {
      return getWindowSize()
    } else {
      return {
        width: oFather.offsetWidth,
        height: oFather.offsetHeight
      }
    }
  }

  oMsg.style['max-height'] = getSize().height - 200 + 'px'
  setTimeout(function () {
    oContent.style['width'] = oContent.offsetWidth + 'px'
    oContent.style['max-width'] = 'none'
    oContent.style['z-index'] = zIndexBase + id + 1
    oContent.style['margin-left'] = -oContent.offsetWidth / 2 + 'px'
    oContent.style['margin-top'] = -oContent.offsetHeight / 2 + 'px'
    oContent.style['position'] = positionCss
    setTimeout(function () {
      addClass(el, 'show')
      oBg.style['visibility'] = 'visible'
      oContent.style['visibility'] = 'visible'
      onShow()
    }, 30)
  }, 30)
}


module.exports = dialog