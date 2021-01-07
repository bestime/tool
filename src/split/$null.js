/**
 * 处理数据，将 undefined,null,空字符串 转为 undefined
 * @param {*} data
 * @return {*}
 */

function $null (data) {
  if(data === '' || data == null) {
    data = undefined
  }
  return data
}

module.exports = $null