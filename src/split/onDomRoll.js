


const isFunction = require('./isFunction')
const isObject = require('./isObject')

function onDomRoll (el, opt) {
  if(!isObject(opt)) return;  
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