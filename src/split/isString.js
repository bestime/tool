import { TYPE_STRING_LOWER } from './basic/constant'

/**
 * 判断一个数据是否为字符串
 * @param {String} data
 * @return {Boolean}
 */
export default function isString (data) {
  return typeof data === TYPE_STRING_LOWER
}


