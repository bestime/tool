

/**
 * 判断是否是电话
 * @param {*} str 
 */

const trim = require('./trim')

function isPhone (str) {
  return /^1[0-9]{10}$/.test(trim(str))
}

module.exports = isPhone