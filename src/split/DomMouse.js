
const getRelativePos = require('./getRelativePos')
const bind = require('./bind')
const unbind = require('./unbind')
const createUUID = require('./createUUID')
const _Function = require('./_Function')


function DomMouse (opt) {
  var el = opt.el
  var pos, isEnter;
  var id = createUUID()
  el.onmouseover = function (ev) {
    if(isEnter) return;
    _Function(opt.onMouseEnter)()
    pos = getRelativePos(el)
    isEnter = true
    bind(document, id, 'mousemove', function (ev) {
      if(
        ev.clientX > pos.x &&
        ev.clientX < pos.x + el.offsetWidth &&
        ev.clientY > pos.y &&
        ev.clientY < pos.y + el.offsetHeight
      ) {
        //console.log('在里面')
      } else {
        isEnter = false
        _Function(opt.onMouseLeave)()
        unbind(document, id, 'mousemove')
      }
    })
  }
}

module.exports = DomMouse