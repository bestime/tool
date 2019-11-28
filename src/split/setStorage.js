/**
 * 设置本地存储
 * 
 * @param {String} key 
 * @param {*} val 
 */

function setStorage (key, val) {
  // 如果不是字符串，就转为字符串
  if(typeof val !== 'string') {
    val = JSON.stringify(val)
  }
  localStorage.setItem(key, val)
}

module.exports = setStorage