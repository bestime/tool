const getWindowSize = require('./getWindowSize')
const bind = require('./bind')
const unbind = require('./unbind')
const throttle = require('./throttle')
const setConfig  = require('./setConfig')
const getConfig  = require('./getConfig')
const _Number  = require('./_Number')
const _Object  = require('./_Object')


/**
 * 
 * @param {Dom} el 跟随容器
 * @param {Object} opt 配置
 */
function ContainerFollowMouse (el, opt) {
  var NAME = 'ctfw'
  var num = _Number(getConfig(NAME)) + 1
  setConfig(NAME, num)
  opt = _Object(opt)
  var id = NAME + num,
      x = 0,
      y = 0,
      winSize,
      timer,
      show,
      offsetHorizontal = _Number(opt.offsetHorizontal),
      offsetVertical = _Number(opt.offsetVertical);
  el.style.opacity = '0';
  var handleMove = throttle({
    handle: function (ev) {
      winSize = getWindowSize()
      x = ev.clientX + offsetHorizontal
      y = ev.clientY + offsetVertical

      if (x + el.offsetWidth > winSize.width) {
        x = x - el.offsetWidth - offsetHorizontal * 2
      }
  
      if (y + el.offsetHeight > winSize.height) {
        y = y - el.offsetHeight - offsetVertical * 2
      }
  
      if(x < 0) {
        x = 0
      }
  
      if(y < 0) {
        y = 0
      }
  
      el.style.left = x + 'px'
      el.style.top = y + 'px'
      el.style.opacity = '1'
      show = true
    },
    delay: 30
  })

  
  bind(document, id, 'mousemove', function (ev) {
    if(!show) {
      el.style.display = 'block'
      clearTimeout(timer)
      timer = setTimeout(function () {
        handleMove(ev)
      }, 25)
    } else {
      handleMove(ev)
    }
  })

  function remove () {
    show = false
    clearTimeout(timer)
    el.style.display = 'none'
    el.style.opacity = '0'
    unbind(document, id, 'mousemove')
  }
  
  return {
    remove: remove,
    isActive: function () {
      return show
    }
  }
}

module.exports = ContainerFollowMouse