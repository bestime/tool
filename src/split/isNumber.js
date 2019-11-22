


/**
 * 
 * @param {String} str 
 * @param {*} sign 正负数 ['*', '-', '+']
 * @param {String} integer 是否为整数 ['*', 'int']
 */

const _Number = require('./_Number')
const trim = require('./trim')

function isNumber (str, sign, integer) {
  str = trim(str)
  if(/[^+-.\d]/.test(str)) return false
  var zhengfu = '(-|\\+)?' // 正负
  var xiaoshu = integer==='int' ? '(\.0+)?' : '(\.[0-9]+)?' // 是否整数
  if(sign==='-') {
    zhengfu = '-'
  }else if(sign==='+') {
    zhengfu = '\\+?'
  }
  var reg = '^' + zhengfu + '[0-9]+' + xiaoshu + '$'
  
  var bol = new RegExp(reg, 'g').test(str)
  const number = _Number(str)
  
  let res = bol  
  switch(sign) {
    case '+': res = bol && number > 0; break;
    case '-': res = bol && number < 0; break;
  }
  return res
}

module.exports = isNumber