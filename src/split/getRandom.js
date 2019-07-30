/**
 * 生成随机数
 * @param  {Number} min 最小数
 * @param  {Number} max 最大数
 * @return {Number}
 */
function getRandom (min, max) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;    
}

module.exports = getRandom