const isFunction = require('./isFunction')
const _Object = require('./_Object')

/**
 * 监听DOM滚动事件
 * 回调滚动到顶部、滚动到底部的事件
 * 
 * @param {Element} el dom元素
 * @param {Object} opt 配置
 */
function onDomRoll (el, opt) {
  opt = _Object(opt)
  var doing = false
  el.onscroll = function () {
    if(!doing) {
      if(isFunction(opt.onTop) && el.scrollTop<=0) {
        doing = true
        opt.onTop(function () {
          doing = false;
        })
      }else if(isFunction(opt.onBottom) && el.scrollTop >= el.scrollHeight - el.offsetHeight) {
        doing = true;
        opt.onBottom(function () {
          doing = false
        })
      } else {
        doing = false
      }
    }
  }
}

module.exports = onDomRoll