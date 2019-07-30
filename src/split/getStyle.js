/**
 * 获取样式
 * @param {Object} el dom元素
 * @param {String} styleName 样式名
 * @param {Boolean} inlineStyle 是否获取元素行内样式，文本的方式，不是实际的
 */
function getStyle (el, styleName, inlineStyle) {
  if(el.style[styleName] && inlineStyle){
    return el.style[styleName];
  }else if(el.currentStyle){
    return el.currentStyle[styleName];
  }else if(document.defaultView && document.defaultView.getComputedStyle){
    styleName = styleName.replace(/([A-Z])/g,'-$1').toLowerCase();
    var s = document.defaultView.getComputedStyle(el, '');
    return s && s.getPropertyValue(styleName)
  }else{
    return null
  }
}

module.exports = getStyle