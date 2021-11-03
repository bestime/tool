import _Object from './_Object'
import isFunction from './isFunction'

/**
 * 监听DOM滚动事件
 * 回调滚动到顶部、滚动到底部的事件
 * 
 * @param {Element} el dom元素

 */
export default function domScrolling (el, onBottom, onTop, ahead) {
  ahead = ahead || 0
  var doing = false
  el.addEventListener('scroll', onscroll)
  var prePos = 0, currentPost = 0;
  function onscroll () {
    // console.log(doing,el.scrollHeight - el.offsetHeight, el.scrollTop)
    if(!doing) {
      currentPost = el.scrollTop
      
      if(isFunction(onTop) && currentPost<=ahead && currentPost<prePos) {
        
        doing = true
        onTop(function () {
          doing = false;
        })
      }else if(isFunction(onBottom) && currentPost >= el.scrollHeight - el.offsetHeight-ahead && currentPost>prePos) {
        
        doing = true;
        onBottom(function () {
          doing = false
        })
      } else {
        
        doing = false
      }
      prePos = el.scrollTop
    }
  }

  function dispose () {
    doing = false
    el.removeEventListener('scroll', onscroll)
  }

  return {
    dispose: dispose
  }
}