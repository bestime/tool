const SET_STRING_VALUE = require('./SET_STRING_VALUE')

/**
 * 设置本地存储
 * 
 * @param {String} key 
 * @param {*} val 
 */

function setStorage (key, val) {
  localStorage.setItem(key, SET_STRING_VALUE(val))
}

module.exports = setStorage