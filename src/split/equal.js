import isFunction from './isFunction'
import isEqualArray from './isEqualArray'
import getType from './getType'
import { TYPE_ARRAY } from './basic/constant'

/**
 * 比较所传入的参数是否相同（用于数组比较）
 * 最后一个参数如果是Function，则表示一个差异对比函数 Boolean: HANDLE(a, b)
 * @return {Boolean}
 */
export default function equal () {
  if(arguments.length < 1) return false;
  var ARG = arguments;
  var res = false
  var FIRST = ARG[0]
  var TYPE = getType(FIRST)
  var HANDLE = ARG[ARG.length - 1]
  var count = 1;
  
  if(!isFunction(HANDLE)) {
    HANDLE = false
  }

  var needNumber = HANDLE ? arguments.length - 1 : arguments.length;

  
  switch(TYPE) {
    case TYPE_ARRAY:
      for(var a = 1; a < ARG.length; a++) {
        isEqualArray(FIRST, ARG[a], HANDLE) && count++
      }
      break;
    default:
      for(var a = 1; a < ARG.length; a++) {
        if(HANDLE && HANDLE(FIRST, ARG[a])) {
          count++
        } else if(FIRST === ARG[a]) {
          count++
        }
      }
  }

  res = needNumber === count

  return res
}