

const fillHtml = require('./fillHtml')
const _Function = require('./_Function')
const _String = require('./_String')


/**
 * 插入静态<style></style>至文档
 * 如果存在相同ID，则不执行
 * 
 * @param {String} id 样式表ID 
 * @param {String} cssTXT 样式
 * @param {Function} callback 创建成功回调
 */
function createStyleElement (id, cssTXT, callback) {
  callback = _Function(callback)
  cssTXT = _String(cssTXT)
  if(document.getElementById(id)) {
    callback()
  } else {
    var el = document.createElement('style')
    el.id = id
    fillHtml(el, cssTXT)
    document.body.appendChild(el)
    setTimeout(callback, 30)
  }
}

module.exports = createStyleElement