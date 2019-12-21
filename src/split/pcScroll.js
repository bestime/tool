var _Object = require('./_Object')
var addClass = require('./addClass')
var getConfig = require('./getConfig')
var setConfig = require('./setConfig')
var _Number = require('./_Number')
var bind = require('./bind')
var unbind = require('./unbind')
var mouseWheel = require('./mouseWheel')
var removeClass = require('./removeClass')

function pcScroll (opt) {
  var id = _Number(getConfig(NAME)) + 1
  setConfig(NAME, id)
  NAME += id
  opt = _Object(opt)
  var NAME = 'pc-scroll'
  var timer, tot, y0;
  var canScroll = true; // 当内容超过容器后可以滚动
  var scrollBarFade = opt.scrollBarFade === true ? true : false
  var el = opt.el
  var oContent = opt.oContent
  var elClass = ['vbt-pc-scroll-wrapper', 'disabled']
  addClass(el, elClass)
  addClass(oContent, 'vbt-pc-scroll-content')
  var oScrollBarWrapper = document.createElement('div')
  oScrollBarWrapper.className = 'vbt-pc-scrollbar-outer'
  oScrollBarWrapper.innerHTML = '<div class="vbt-pc-scrollbar-inner"></div>'
  el.appendChild(oScrollBarWrapper)
  
  var isPress, oScrollInner;
  var diff = 0, percent = 0;
  var oldBarHeight = 0, newBarHeight = 0;
  // 滚动条最大移动距离
  var maxBarDis;
  // 移动容器
  var maxContentDis;
  if(scrollBarFade) {
    el.onmouseenter = function () {
      addClass(el, 'enter')
    }
    el.onmouseleave = function () {
      if(!isPress) {
        removeClass(el, 'enter')
      }
    }
  } else {
    addClass(el, 'enter')
  }
  
  tot = setTimeout(function () {
    oScrollInner = oScrollBarWrapper.getElementsByTagName('div')[0]
    oScrollInner.onmousedown = function (ev) {
      y0 = ev.clientY - diff
      isPress = true
      bind(document, NAME, 'mousemove', function (ev) {
        if(ev.buttons==1) {
          addClass(el, 'mouse-move')
          diff = ev.clientY - y0
          toMove()
        } else {
          clearEvent()
        }
      })
      bind(document, NAME, 'mouseup', clearEvent)
    }
  }, 30)
  
  mouseWheel(el, function (dir) {
    if(oContent.offsetHeight<=el.offsetHeight) return;
    if(!canScroll) return;
    maxBarDis = oScrollBarWrapper.offsetHeight - oScrollInner.offsetHeight
    var goBarDis =  120 / (oContent.offsetHeight - el.offsetHeight) * maxBarDis
    if(diff<0 || diff > maxBarDis) return;
    diff = diff - dir * goBarDis
    if(diff<0) {
      diff = 0
    } else if(diff >= maxBarDis) {
      diff = maxBarDis
    }
    toMove()
  })

  function clearEvent () {
    isPress = false
    removeClass(el, 'mouse-move')
    if(scrollBarFade) {
      removeClass(el, 'enter')
    }
    unbind(document, NAME, 'mouseup')
    unbind(document, NAME, 'mousemove')
  }

  timer = setInterval(function () {
    if(oContent.offsetHeight<=el.offsetHeight) {
      // 隐藏滚动条
      barHeight = 0
      canScroll = false
      addClass(el, 'disabled')
      oContent.style.top = '0px'
    } else {
      canScroll = true
      removeClass(el, 'disabled')
      // 显示滚动条
      newBarHeight = Math.ceil(el.offsetHeight / oContent.offsetHeight * 100)
      if(oldBarHeight!==newBarHeight) {
        oldBarHeight = newBarHeight
        oScrollInner.style.height = newBarHeight + '%'
      }
    }
  }, 200)

  // 移动滚动条
  function toMove () {
    maxBarDis = oScrollBarWrapper.offsetHeight - oScrollInner.offsetHeight
    if(diff<0) {
      diff = 0
    } else if(diff > maxBarDis) {
      diff = maxBarDis
    }
    percent = diff / maxBarDis
    oScrollInner.style.top = diff + 'px'
    moveContent()
  }
  
  function moveContent () {
    maxContentDis = oContent.offsetHeight - el.offsetHeight
    oContent.style.top = -maxContentDis * percent + 'px'
  }

  function destroy () {
    clearInterval(timer)
    clearTimeout(tot)
  }

  return {
    destroy: destroy
  }
}

module.exports = pcScroll