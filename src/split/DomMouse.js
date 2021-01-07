
const getRelativePos = require('./getRelativePos')
const bind = require('./bind')
const unbind = require('./unbind')
const _Function = require('./_Function')
const setConfig  = require('./setConfig')
const getConfig  = require('./getConfig')
const _Number  = require('./_Number')


function DomMouse (opt) {
  var name = 'DomMouse-id'
  var el = opt.el,
      pos,
      isEnter,
      id = _Number(getConfig(name)) + 1;
  setConfig(name, id)
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
        // console.log('在里面')
      } else {
        isEnter = false
        _Function(opt.onMouseLeave)()
        unbind(document, id, 'mousemove')
      }
    })
  }
}

module.exports = DomMouse