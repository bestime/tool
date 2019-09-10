const Tween = require('./Tween')
const _Function = require('./_Function')
const _Number = require('./_Number')

function scrollToElement (dom, oFather, callback, fx, dutation) {
  fx = fx || Tween.Cubic.easeOut 
  dutation = _Number(dutation) || 200
  oFather = oFather || dom.parentNode
  var now = oFather.scrollTop, to = dom.offsetTop;
  if(oFather===document.body) {
    now = document.documentElement.scrollTop || document.body.scrollTop;
  }

  return Tween.getAnimate(now, to - now, fx, dutation, function (val, isStop) {
    if(oFather===document.body) {
      window.scrollTo(0, val);
    } else {
      oFather.scrollTop = val
    }

    if(isStop) {
      _Function(callback)()
    }
  })
}

module.exports = scrollToElement