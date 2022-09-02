import getType from './getType'
import { $stringTypeNameBig, $numberTypeNameBig } from './help/hpConsts'


export default function trim (str: any, pos?: 1 | -1 | '*'): string {
  var tp = getType(str)
  
  if(tp === $numberTypeNameBig) {
    str = String(str)
    tp = $stringTypeNameBig
  }

  if(tp === $stringTypeNameBig) {
    switch (pos) {
      case 1: return str.replace(/^[\s\uFEFF\xA0]+/, ''); // 左侧
      case -1: return str.replace(/[\s\uFEFF\xA0]+$/, ''); // 右侧
      case '*': return str.replace(/[\s\uFEFF\xA0]+/g, ''); // 所有空格
      default: return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') // 两侧
    }
  } else {
    return ''
  }
}