import { WINDOW } from './basic/browser'
import { REQUEST_ANIMATION_VENDORS } from './basic/constant'



var requestAnimation = WINDOW.requestAnimationFrame;  
for(var x = 0; x < REQUEST_ANIMATION_VENDORS.length && !requestAnimation; ++x) {
  requestAnimation = WINDOW[REQUEST_ANIMATION_VENDORS[x] + 'RequestAnimationFrame'];
}
if(!requestAnimation) {
  requestAnimation = function(callback) {
    return setTimeout(callback, 16.7);
  };
}  

/**
 * window.requestAnimationFrame兼容
 */
export default function polyfillRequestAnimationFrame (callback) {
  return requestAnimation(callback)
}