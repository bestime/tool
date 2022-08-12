import FN_FORMAT_STRING_VALUE from './help/FN_FORMAT_STRING_VALUE'

/**
 * 获取本地存储
 * 
 * @param {String} key 
 * @return {Object|Array|String}
 */

export default function getStorage (key: string) {
  return FN_FORMAT_STRING_VALUE(localStorage.getItem(key))
}