import forEach from "./forEach"
import type { TKvPair } from "./help/type-declare"
import isArray from "./isArray"

type TreeItem<T extends TKvPair> = T & {
  children?: TreeItem<T>[]
}


function deepFunc<T extends TKvPair>(list: TreeItem<T>[], result: TreeItem<T>[]) {
  forEach(list, function (item) {
    if(isArray(item.children)) {
      deepFunc(item.children, result)
    } else {
      result.push(item)
    }
  })
}




/**
 * 获取树形结构的叶子节点
 * @param list - 树形结构数据
 * @returns 叶子节点组装的一维数组
 */
export default function treeLeafs<T extends TKvPair> (list: TreeItem<T>[]) {
  const result: TreeItem<T>[] = []
  deepFunc(list, result)
  return result
}