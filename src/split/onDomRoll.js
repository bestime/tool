


const isFunction = require('./isFunction')
const _Object = require('./_Object')

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
        console.log(el.scrollHeight, el.scrollTop)
        doing = false
      }
    }
  }
}

module.exports = onDomRoll