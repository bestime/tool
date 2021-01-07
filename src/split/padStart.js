import PAD_STRING from './PAD_STRING'

/**
 * 字符串自定义向前补齐长度
 * @param {String} padTarget 需要补齐的字符串
 * @param {Number} targetLength <正整数> 预期字符串长度
 * @param {String} padString 用于填补的字符串
 * 
 * @return {String}
 */
export default function padStart (padTarget, targetLength, padString) {
  return PAD_STRING(padTarget, targetLength, padString, -1)
}