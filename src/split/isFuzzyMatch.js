const _String = require('./_String')
const split = require('./split')

/**
 * 模糊搜索，例如 a4 可匹配 a3645
 * @param {String} searchString 输入的值，如果为空，则表示无筛选条件，直接返回true
 * @param {String} targetString 源数据的值
 * @param {String} [regFlags=''] 与 RegExp 第二个参数相同，指定是否全局、区分大小写等
 * @return {Boolean}
 */
function isFuzzyMatch (searchString, targetString, regFlags) {
  targetString = _String(targetString)
  searchString = _String(searchString)
  let res = true;
  if(searchString) {
    let regStr = split(searchString, '').join('.*')
    let reg = new RegExp(regStr, _String(regFlags))
    res = reg.test(targetString)
  }
  return res;
}

module.exports = isFuzzyMatch