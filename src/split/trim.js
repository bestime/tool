/**
 * 移除首尾空格
 * @param {*} str 
 */
function trim (str) {
  return typeof str ==='undefined' ? '' : String(str).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
}

module.exports = trim