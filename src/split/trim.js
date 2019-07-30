/**
 * 移除首尾空格
 * @param {*} str 
 */
function trim (str) {
  if(typeof str ==='undefined') return ''
  return String(str).replace(/(^\s*)|(\s*$)/g, '');
}

module.exports = trim