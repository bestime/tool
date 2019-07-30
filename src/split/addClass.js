

const unique = require('./unique')
const hasClass = require('./hasClass')
const each = require('./each')
const getType = require('./getType')

/**
 * 添加class
 * @param {object} element # dom元素 
 * @param {String || Array} addClassName # 需要增加的className。可接受单个字符串或数组 
 */
module.exports = function (el, addClassName) {
  if(getType(addClassName)=='Array') {
    each((unique(addClassName)), function (_item) {
      addOne(_item);
    });
  }else {
    addOne(addClassName);
  }
  
  function addOne(oneClassName) {
    if(!hasClass(el, oneClassName)) {
      el.className += (el.className ? (' ' + oneClassName) : oneClassName);
    }
  }
}