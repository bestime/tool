var getById = require('./getById')
var getRelativePos = require('./getRelativePos')
var addClass = require('./addClass')
var removeClass = require('./removeClass')
var trim = require('./trim')
var getByClass = require('./getByClass')
var getWindowSize = require('./getWindowSize')
var isFunction = require('./isFunction')

var MouseTip = (function () {
  document.write('<div id="bt-mouse-tip"><i class="before"></i><i class="after"></i><div class="btmt-content"></div></div>')
  var oWrapper,
      pos,
      centerX,
      e_timer,
      show_timer,
      x,
      y,
      width,
      winSize,
      timer_01,
      timer_02,
      timer03,
      yFlag = 'top',
      oBefore,
      oAfter,
      agSize; // 三角尺寸
  return function (opt) {
    var el = opt.el, render = isFunction(opt.render) ? opt.render : false
    oWrapper = oWrapper || getById('bt-mouse-tip')
    oText = getByClass('btmt-content', oWrapper)[0]
    oAfter = getByClass('after', oWrapper)[0]
    oBefore = getByClass('before', oWrapper)[0]
    
    el.onmouseenter = function () {
      clearTimeout(timer_01)
      winSize = getWindowSize()
      oWrapper.className = render ? 'custom' : ''

      timer_01 = setTimeout(function () {
        oWrapper.style.cssText = ''
        oText.innerHTML = render ? render() : trim(el.innerHTML)
        clearTimeout(timer_02)
        timer_02 = setTimeout(function () {
          clearTimeout(show_timer)
          width = oWrapper.offsetWidth
          if(width > winSize.width - 20) {
            width = winSize.width- 20
          }
          oWrapper.style.width = width + 'px'
          show_timer = setTimeout(function () {
            clearTimeout(e_timer)
            e_timer = setTimeout(function () {
              pos = getRelativePos(el)
              centerX = pos.x + el.offsetWidth / 2
              x = centerX -oWrapper.offsetWidth / 2
              y = pos.y - oWrapper.offsetHeight - 5
              if(y < 0) {
                y = pos.y + el.offsetHeight + 5
                yFlag = 'bottom'
              } else {
                yFlag = 'top'
              }

              if(x + oWrapper.offsetWidth > winSize.width) {
                x = winSize.width - oWrapper.offsetWidth
                xFlag = 'right'
              }

              if(x < 0) {
                x = 10
                xFlag = 'left'
              }
              oWrapper.style.left = x + 'px'
              oWrapper.style.top = y + 'px'
              clearTimeout(timer03)
              timer03 = setTimeout(function (){
                agSize = typeof opt.agSize === 'number' ? opt.triangleSize : 6
                if(yFlag=='top') {
                  oBefore.style.left = pos.x - x + el.offsetWidth / 2 - agSize +'px'
                } else {
                  oAfter.style.left = pos.x - x + el.offsetWidth / 2 - agSize +'px'
                }
                addClass(oWrapper, ['active', yFlag])
              }, 30)
            }, 30)
          }, 30)
        }, 30)
      }, 150)
    } 

    el.onmouseleave = function () {
      clearTimeout(timer03)
      clearTimeout(timer_01)
      clearTimeout(timer_02)
      clearTimeout(show_timer)
      clearTimeout(e_timer)
      removeClass(oWrapper, 'active')
    }
  };
}) ();

module.exports = MouseTip