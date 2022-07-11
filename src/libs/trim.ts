import getType from './getType'
import { TYPE_STRING, TYPE_NUMBER } from './constant'


export default function trim (str: any, pos: 1 | -1 | 0 | '*') {
  var TYPE = getType(str)
  
  if(TYPE === TYPE_NUMBER) {
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