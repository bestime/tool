import { WINDOW } from './basic/browser'
import { REQUEST_ANIMATION_VENDORS } from './basic/constant'



var cancelAnimation = WINDOW.cancelAnimationFrame
for(var x = 0; x < REQUEST_ANIMATION_VENDORS.length && !cancelAnimation; ++x) {
  cancelAnimation = WINDOW[REQUEST_ANIMATION_VENDORS[x] + 'CancelAnimationFrame'] || WINDOW[REQUEST_ANIMATION_VENDORS[x] + 'CancelRequestAnimationFrame'];
}
if(!cancelAnimation) {
  cancelAnimation = function(timerId) {
    clearTimeout(timerId);
  }
}

/**
 * window.cancelAnimationFrame兼容
 */
export default function polyfillCancelAnimationFrame (callback){
  return cancelAnimation(callback)
}