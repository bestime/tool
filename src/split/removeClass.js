/**
 * 移除class
 * @param {object} element # dom元素 
 * @param {String || Array} cl # 需要移除的className。可接受单个字符串或数组 
 */


const trim = require('./trim')
const forEach = require('./forEach')
const unique = require('./unique')
const hasClass = require('./hasClass')
const getType = require('./getType')

function removeClass (element, cl) {
  if(getType(cl)=='Array') {
    forEach((unique(cl)), function (_item) {
      removeOne(_item)
    });
  }else {
    removeOne(cl);
  }
  
  function removeOne(cl) {
    if (hasClass(element, cl)){
      var reg = new RegExp('(\\s|^)' + cl + '(\\s|$)', 'g');
      element.className = trim(element.className.replace(reg, ' '));
    }  
  }        
}

module.exports = removeClass