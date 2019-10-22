/**
 * 生成随机数
 * @param  {Number} min 最小数
 * @param  {Number} max 最大数
 * @return {Boolean} isInt 默认true，是否返回整肃
 */

function getRandom (min, max, isInt) {
  isInt = isInt === false ? 0 : 1
  min = Math.random() * ( max - min + isInt) + min; // 节省一个变量
  return isInt ? Math.floor(min) : min
}

module.exports = getRandom