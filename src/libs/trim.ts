import getType from './getType'
import { $stringTypeNameBig, $numberTypeNameBig, $regSpaceStr } from './help/hpConsts'
const baseReg = `[${$regSpaceStr}]+`

/**
   * 移除空字符串
   * @param data - 需要处理的数据
   * @param pos - 移除位置。默认：两侧，1：左侧，-1右侧，* 所有
   * @returns 字符串
   */
export default function trim (data: any, pos?: 1 | -1 | '*'): string {
  var tp = getType(data)
  
  if(tp === $numberTypeNameBig) {
    data = String(data)
    tp = $stringTypeNameBig
  }

  
  let regStr = '';
  

  if(tp === $stringTypeNameBig) {
    switch (pos) {
      case 1:  // 左侧
        regStr = '^' + baseReg
        break;
      case -1: // 右侧
        regStr = baseReg + '$'
        break;
      case '*': // 所有空格
        regStr = baseReg
        break;
      default: // 两侧
        regStr = `^${baseReg}|${baseReg}$`
        break;
    }
    return data.replace(new RegExp(regStr, 'g'), '')
  } else {
    return ''
  }
}