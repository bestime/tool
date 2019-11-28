/**
 * 获取本地存储
 * 
 * @param {String} key 
 */

function getStorage (key) {
  var res = localStorage.getItem(key)
  try { res = JSON.parse(res) } catch (e) { }
  return res
}

module.exports = getStorage