import getType from './getType'
import { TYPE_STRING } from './const'

/**
 * 移除字符串空格
 * 
 * @param {String} str
 * @param {Number|String} [pos] => 1左侧；-1 右侧； (undefined|null) 两侧； (*|0) 所有
 * 
 * @return {String} 如果str不是数字或者字符串，则返回空字符串
 */

export default function trim (str, pos) {
  var TYPE = getType(str)
  
  if(TYPE === 'Number') {
    str = String(str)
    TYPE = TYPE_STRING
  }

  if(TYPE === TYPE_STRING) {
    switch (pos) {
      case 1: return str.replace(/^[\s\uFEFF\xA0]+/, ''); // 左侧
      case -1: return str.replace(/[\s\uFEFF\xA0]+$/, ''); // 右侧
      case 0:
      case '*': return str.replace(/[\s\uFEFF\xA0]+/g, ''); // 所有空格
      default: return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') // 两侧
    }
  } else {
    return ''
  }
}