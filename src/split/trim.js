/**
 * 移除首尾空格
 * @param {*} str
 * @param {?:Number} pos => 1左侧, -1 右侧, undefined 两侧
 */
function trim (str, pos) {
  str = str == null ? '' : String(str)
  switch (pos) {
    case 1: return str.replace(/^[\s\uFEFF\xA0]+/, ''); // 左侧
    case -1: return str.replace(/[\s\uFEFF\xA0]+$/, ''); // 右侧
    default: return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') // 两侧
  }
}

module.exports = trim