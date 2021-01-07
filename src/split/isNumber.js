import trim from './trim'
import _Number from './_Number'

/**
 * 是否是数字，可以判断小数，正负数，整数。
 * 用户数据验证
 * 
 * @param {String} str 
 * @param {*} sign 正负数 ['*', '-', '+']
 * @param {String} integer 是否为整数 ['*', 'int']
 */

export default function isNumber (str, sign, integer) {
  str = trim(str) || '0'
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
    case '+': res = bol && number >= 0; break;
    case '-': res = bol && number < 0; break;
  }
  return res
}
