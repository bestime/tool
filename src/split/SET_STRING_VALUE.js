
/**
 * 将非字符串的对象转为字符串
 * 用于存储cookie、localStorage等
 * 
 * @param {*} val 需要转换的数据
 * @return {String}
 */
function SET_STRING_VALUE (val) {
  if(typeof val !== 'string') {
    val = JSON.stringify(val)
  }
  return val
}

module.exports = SET_STRING_VALUE