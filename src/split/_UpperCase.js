
var _Number = require('./_Number')

/**
 * 字符串转大写
 * @param {String} str 
 * @param {Number} index 不填则全部大写
 */
function _UpperCase (str, index) {
  let res;
  str = typeof str === 'undefined' ? '' : String(str)
  if(typeof index === 'undefined') {
    res = str.replace(/./g, function (item) {
      return item.toUpperCase()
    })
  } else {
    index = _Number(index)
    res = str.replace(new RegExp(`(^.{${index}})(.)(.*)`), function (g, $1, $2, $3) {
      return $1 + $2.toUpperCase() + $3
    })
  }
  return res
}

module.exports = _UpperCase
