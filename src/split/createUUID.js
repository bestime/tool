
const letterMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const _Number = require('./_Number')
const getRandom = require('./getRandom')

/**
 * 生成随机ID
 * @param {Number} [len = 24] 生成的字符串长度，最大24
 * 
 * @return {String}
 */
function createUUID (len) {
  len = _Number(len)
  let multiplicand = ''
  for (let a=0; a<13; a++) multiplicand += getRandom(1,9)
  multiplicand = _Number(multiplicand)
  const stamp = +new Date()
  const num =  stamp * getRandom(1, String(stamp).length) + multiplicand
  const letterRandom = letterMap[getRandom(0, letterMap.length-1)] // 第一位字母
  let res = (letterRandom + multiplicand.toString(32) + num).toLowerCase()
  res = len ? res.substr(0, len) : res
  return res
}

module.exports = createUUID