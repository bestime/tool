import _Number from './_Number'
import setConfig from './setConfig'
import getConfig from './getConfig'
import unbind from './unbind'
import bind from './bind'
import removeClass from './removeClass'
import addClass from './addClass'
import _Object from './_Object'

var NAME = 'jcy-pc-scroll'

export default function pcScroll (opt) {
  var id = _Number(getConfig(NAME)) + 1
  setConfig(NAME, id)
  id = NAME + id
  opt = _Object(opt)
  var el = opt.el
  var scrollBarFade = opt.scrollBarFade === false ? false : true
  
  var timer, y0=0, maxBarTop=0, barHeight, barTop=0, oViewHeight=0, scrollHeight=0, isPressing, isIn;
  addClass(el, NAME)
  var oScroll = document.createElement('div')
  var oScrollBar = document.createElement('div')

  oScroll.className = NAME + '-main'
  oScrollBar.className = NAME + '-bar-wrapper'
  oScrollBar.innerHTML = '<b class="'+ NAME +'-bar-inner"></b>'

  oScroll.appendChild(opt.oContent)
  el.appendChild(oScroll)
  el.appendChild(oScrollBar)
  var oInnerBar = oScrollBar.getElementsByTagName('b')[0]
  
  function update () {
    oViewHeight = oScroll.offsetHeight
    scrollHeight = oScroll.scrollHeight
    if(oViewHeight<scrollHeight) {
      barHeight = oViewHeight / scrollHeight * oViewHeight
      oInnerBar.style.height = barHeight + 'px'
      maxBarTop = oViewHeight - barHeight
      barTop = oScroll.scrollTop / scrollHeight * oViewHeight
      oInnerBar.style.top = barTop  + 'px'
      addClass(el, 'show')
    } else {
      removeClass(el, 'show')
    }
  }
  oInnerBar.onmousedown = function (ev) {
    ev = ev || window.event
    y0 = ev.clientY -  barTop
    isPressing = true
    clearTimeout(timer)
    bind(document, id, 'mousemove', function (ev) {
      ev = ev || window.event
      barTop =  ev.clientY - y0
      if(barTop < 0) {
        barTop = 0
      } else if(barTop > maxBarTop) {
        barTop = maxBarTop
      }
      oScroll.scrollTop = barTop / oViewHeight * scrollHeight
    })
    bind(document, id, 'mouseup', clearEvent)
  }

  oScroll.onscroll = function () {
    update()
  }

  el.onmouseenter = function () {
    clearTimeout(timer)
    isIn = true
    update()
    if(scrollBarFade) {
      addClass(el, 'in')
    }
  }

  el.onmouseleave = function () {
    isIn = false
    if(!isPressing) {
      hideScrollBar()
    }
  }

  if (scrollBarFade) {
    addClass(el, 'fade')
  } else {
    update()
  }

  function clearEvent () {
    if(!isIn) {
      hideScrollBar()
    }
    isPressing = false
    unbind(document, id, 'mouseup')
    unbind(document, id, 'mousemove')
  }

  function hideScrollBar(){
    timer = setTimeout(function () {
      removeClass(el, 'in')
    }, 400)
  }
}