const FN_FORMAT_STRING_VALUE = require('./FN_FORMAT_STRING_VALUE')

/**
 * 获取本地存储
 * 
 * @param {String} key 
 * @return {Object|Array|String}
 */

function getStorage (key) {
  return FN_FORMAT_STRING_VALUE(localStorage.getItem(key))
}

module.exports = getStorage