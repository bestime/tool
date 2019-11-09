
const fillHtml = require('./fillHtml')
const _String = require('./_String')
const trim = require('./trim')
const NAME = 'bt-style-'
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
  var isChange, computedCssStr = '', CSS_BOX = document.createElement('style');
  CSS_BOX.className = className || NAME + id;
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
      isChange = false
      _String(str).replace(/(.*?)({.*?})/g, function (g, newKey, newValue) {
        newKey = trim(newKey)
        newValue = trim(newValue)
        computedCssStr = computedCssStr.replace(new RegExp('('+ newKey +'\\s*?)({.*?})', 'g'), function () {
          isChange = true
          console.log('css-key：['+ newKey +']')
          return newKey + newValue
          
        })
      })
      isChange && fillHtml(CSS_BOX, computedCssStr)
    }
  }
}

module.exports = $createStyle