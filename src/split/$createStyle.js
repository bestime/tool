const fillHtml = require('./fillHtml')
const _String = require('./_String')
const trim = require('./trim')
let id = 0

/**
 * 创建 <style/> 标签
 * @param {String} className [可选]为创建的标签添加一个类名
 * @return {Object}
 *   concat {Function} 追加样式
 *   update {Function} 更新样式
 */
function $createStyle(className) {
  id++
  className = trim(className)
  if(!className || /^[0-9]/.test(className)) {
    className = 'bt-style-' + id
  }
  
  var temp, computedCssStr = '', CSS_BOX = document.createElement('style');
  CSS_BOX.className = className;
  document.getElementsByTagName("head")[0].appendChild(CSS_BOX);

  return {
    /**
     * 追加样式
     * @param {String} str css字符串 
     */
    concat: function(str) {
      computedCssStr += _String(str)
      fillHtml(CSS_BOX, computedCssStr)
    },

    /**
     * 修改样式，自动匹配样式名和值
     * @param {String} str css字符串 
     */
    update: function (str) {
      temp = computedCssStr
      _String(str).replace(/(.*?)({.*?})/g, function (item, newKey, newValue) {
        newKey = trim(newKey)
        computedCssStr = computedCssStr.replace(new RegExp('('+ newKey +'\\s*?)({.*?})', 'g'), newKey + trim(newValue))
      })
      temp !== computedCssStr && fillHtml(CSS_BOX, computedCssStr)
    }
  }
}

module.exports = $createStyle