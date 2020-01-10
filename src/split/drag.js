const removeClass = require('./removeClass')
const _Object = require('./_Object')
const bind = require('./bind')
const unbind = require('./unbind')
const addClass = require('./addClass')
const _Number = require('./_Number')
const getStyle = require('./getStyle')
const prevent = require('./prevent')
const getWindowSize = require('./getWindowSize')
const setConfig  = require('./setConfig')
const getConfig  = require('./getConfig')
const isFunction  = require('./isFunction')

/**
 * 拖拽
 * @param {Object} opt
 *    @param {Element} opt.oHandle 拖拽触发对象
 *    @param {Element} opt.oWrapper 拖拽相应容器
 *    @param {Element} opt.oFather 拖拽父级容器，默认body 
 *    @param {Function} opt.onChange 位置改变回调
 * @return {Object}
 *    @param {Function} updateFahter 更新父容器
 */


function drag (opt) {
  var name = 'drag-id'
  var id = _Number(getConfig(name)) + 1
  id = id < 500 ? 500 : id
  setConfig(name, id)
  opt = _Object(opt)
  var oWrapper = opt.oWrapper;
  if(!oWrapper) throw new Error('拖拽对象无效')
  var startX = _Number(opt.x),
      startY = _Number(opt.y),
      downX = 0,
      downY = 0;
  oWrapper.setAttribute('data-id', id)
  addClass(oWrapper, 'bt-drag')
  if(!opt.oFather) addClass(oWrapper, 'bt-drag-body')
  setZindex()
  setPos(startX, startY)
  opt.oHandle.onmousedown = function (e) {
    var ev = e || window.event
    prevent(e)
    startX = oWrapper.offsetLeft
    startY = oWrapper.offsetTop
    downX = ev.clientX
    downY = ev.clientY
    setZindex()
    bind(document, id, 'mousemove', function (e) {        
      var ev = e || window.event
      if(ev.buttons==1) {// 鼠标左键
        var winSize = getWindowSize()
        var setX = startX + ev.clientX - downX
        var setY = startY + ev.clientY - downY
        
        if(setX<=0) {
          setX = 0
        } else {
          var maxWidth = winSize.width - oWrapper.offsetWidth;
          if(opt.oFather) maxWidth = opt.oFather.offsetWidth - oWrapper.offsetWidth;
          if(setX > maxWidth) setX = maxWidth;
        }

        if(setY<=0) {
          setY = 0
        } else {
          var maxHeight = winSize.height - oWrapper.offsetHeight;
          if(opt.oFather) maxHeight = opt.oFather.offsetHeight - oWrapper.offsetHeight;
          if(setY > maxHeight) setY = maxHeight;
        }
        
        
        setPos(setX, setY, 'move')
        
      } else {
        clearEvent()
      }
    })
    bind(document, id, 'mouseup', clearEvent)
  }

  function setPos (x, y, type) {
    oWrapper.style.left = x + 'px'
    oWrapper.style.top = y + 'px'
    oWrapper.style.bottom = 'auto'
    oWrapper.style.right = 'auto'
    if(isFunction(opt.onChange)) {
      opt.onChange(x, y, type)
    }
  }

  opt.oHandle.onmouseup = clearEvent
  function clearEvent () {
    unbind(document, id, 'mouseup')
    unbind(document, id, 'mousemove')
  }

  function setZindex () {
    var zIndex = _Number(getStyle(oWrapper, 'z-index'))
    id = _Number(getConfig(name))
    if(zIndex < id) {
      zIndex = id + 1
      setConfig(name, zIndex)
      oWrapper.style.zIndex = zIndex
    }
  }

  return {
    setPos: setPos,
    updateFahter: function (newFather) {
      opt.oFather = newFather
      if(newFather) {
        removeClass(oWrapper, 'bt-drag-body')
      } else {
        addClass(oWrapper, 'bt-drag-body')
      }
    }
  }
}

module.exports = drag