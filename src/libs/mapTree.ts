
import  type { TKvPair } from './help/type-declare'
import cloneEasy from "./cloneEasy";
import isNull from './isNull';


/**
 * 树形结构map新数据
 * @param data - 原始树
 * @param childKeyTo - 转换的孩子键
 * @param handle - 迭代方法。这里不用返回子节点
 * @param childKeyFrom - 原始数据的孩子键
 * @returns 转变后的新数据
 */
function main <T extends TKvPair, K extends TKvPair, C extends keyof T>(
  data: K[],
    childKeyTo: C,
    handle: (data: K) => Omit<T, C> | undefined,
    childKeyFrom?: keyof K
): T[] {
  childKeyFrom = childKeyFrom || 'children'
  const result: any[] = []
  ;(function handleOneList (list, newList) {
    for(let index = 0; index<list.length;index++) {
      const v = handle(list[index])
      if(!isNull(v)) {
        newList[index] = cloneEasy(v)
      }
      
      
      if(list[index][childKeyFrom]) {
        newList[index][childKeyTo] = []
        handleOneList(list[index][childKeyFrom], newList[index][childKeyTo])
      }
    }
  })(data, result);
  
  return result
}

export default main