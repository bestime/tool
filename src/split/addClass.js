

const unique = require('./unique')
const hasClass = require('./hasClass')
const getType = require('./getType')

/**
 * 添加class
 * @param {object} element # dom元素 
 * @param {String || Array} addClassName # 需要增加的className。可接受单个字符串或数组 
 */
module.exports = function (el, addClassName) {
  if(getType(addClassName)=='Array') {
    var arr = unique(addClassName, true)
    for(var a=0, len = arr.length; a<len; a++) {
      addOne(arr[a]);
    }
  }else {
    addOne(addClassName);
  }
  
  function addOne(oneClassName) {
    if(!hasClass(el, oneClassName)) {
      el.className += (el.className ? (' ' + oneClassName) : oneClassName);
    }
  }
}