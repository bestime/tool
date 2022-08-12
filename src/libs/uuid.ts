
import { LETTER_LIST } from './constant'


import _Number from './_Number'
import getRandom from './getRandom'

/**
 * 生成随机ID
 * @param {Number} [length = 24] 生成的字符串长度，最大24
 * 
 * @return {String}
 */
export default function uuid (length: number) {
  length = _Number(length)
  let multiplicand: string | number = ''
  for (let a=0; a<13; a++) multiplicand += getRandom(1,9)
  multiplicand = _Number(multiplicand)
  const stamp = +new Date()
  const num =  stamp * getRandom(1, String(stamp).length) + multiplicand
  const letterRandom = LETTER_LIST[getRandom(0, LETTER_LIST.length)] // 第一位字母
  let res = (letterRandom + multiplicand.toString(32) + num)
  res = length ? res.substring(0, length) : res
  return res
}