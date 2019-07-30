/**
 * 获取数据类型
 * @param {*} data 
 */
function getType (data) {
  return Object.prototype.toString.call(data).split(' ')[1].slice(0, -1)
}


module.exports = getType

