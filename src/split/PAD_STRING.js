import _String from './_String'
import repeatString from './repeatString'

/**
 * 字符串自定义向(后/前)补齐长度
 * @param {String} padTarget 需要补齐的字符串
 * @param {Number} targetLength <正整数> 预期字符串长度
 * @param {String} padString 用于填补的字符串
 * @param {Number} [direction=1] 方向。1向后，-1向前
 * 
 * @return {String}
 */
export default function PAD_STRING (padTarget, targetLength, padString, direction) {
  padTarget = _String(padTarget)
  targetLength = targetLength >> 0;
  if(padTarget.length > targetLength) {
    return padTarget;
  } else {
    targetLength = targetLength - padTarget.length;
    if(padString.length < targetLength) {
      padString += repeatString(padString, targetLength / padString.length)
    }
    if(direction===-1) {
      return padString.slice(0, targetLength) + padTarget;
    } else {
      return padTarget + padString.slice(0, targetLength);
    }
  }
}