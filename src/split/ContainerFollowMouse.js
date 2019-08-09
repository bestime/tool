
const getWindowSize = require('./getWindowSize')
const bind = require('./bind')
const unbind = require('./unbind')
const createUUID = require('./createUUID')
const throttle = require('./throttle')

function ContainerFollowMouse (el) {
  var id = createUUID()
  var x = 0;
  var y = 0;
  var winSize, timer, show;
  
  el.style.opacity = '0'
  var handleMove = throttle({
    handle: function (ev) {
      winSize = getWindowSize()
      x = ev.clientX
      y = ev.clientY
      
      if (x + el.offsetWidth > winSize.width) {
        x = x - el.offsetWidth
      }
  
      if (y + el.offsetHeight > winSize.height) {
        y = y - el.offsetHeight
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
      }, 50)
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
    removeEvent: function () {
      unbind(document, id, 'mousemove')
    }
  }
}

module.exports = ContainerFollowMouse