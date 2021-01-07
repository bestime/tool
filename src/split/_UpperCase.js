import _String from './_String'

/**
 * 字符串转大写
 * 
 * @param {String} targetString 
 * @param {Number} [index] 需要转大写的索引，不填则全部大写
 * @return {String}
 */
export default function _UpperCase (targetString, index) {
  targetString = _String(targetString)
  if(index == null) {
    targetString = targetString.replace(/./g, function (item) {
      return item.toUpperCase()
    })
  } else {
    targetString = targetString.replace(new RegExp('(^.{'+ index +'})(.)(.*)'), function (_, $1, $2, $3) {
      return $1 + $2.toUpperCase() + $3
    })
  }
  return targetString
}

