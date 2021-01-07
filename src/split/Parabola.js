import { DOCUMENT_CREATE_IMAGE } from './basic/browser'

import _Object from './_Object'
import _Function from './_Function'
import getRelativePos from './getRelativePos'
import removeElement from './removeElement'

/**
 * 抛物线
 */
export default function Parabola (opt) {
  opt = _Object(opt)
  const oFrom = opt.from
  const oTo = opt.to
  var src = opt.src
  const duration = 500

  const p1 = getRelativePos(oFrom)
  const p2 = getRelativePos(oTo)
  
  
  if(!src) {
    var oMove = DOCUMENT_CREATE_DIV()
    oMove.style.cssText = `width:20px;height:20px;background:red;border-radius:50%;`
    document.body.appendChild(oMove)
    ready()
  } else {
    var oMove = DOCUMENT_CREATE_IMAGE()
    oMove.style.cssText = `width:20px;height:20px;background:red;border-radius:50%;`  
    oMove.src = src    
    oMove.onload = ready
    document.body.appendChild(oMove)
  }

  function ready () {
    oMove.style.cssText += `position:absolute;left:${p1.x}px;top:${p1.y}px;margin:0;border:none;z-index:9990;padding:0;vertical-align:middle;transition: left ${duration/1000}s ease-in, top ${duration/1000}s ease-out`;
    setTimeout(function () {
      oMove.style.left = `${p2.x}px`
      oMove.style.top = `${p2.y}px`
      oMove.style.transform = 'scale(0.7)'
      oMove.style.opacity = 0.5;
      setTimeout(function () {
        removeElement(oMove)
        _Function(opt.onEnd)()
      }, duration)
    }, 30)
  }
}
