import cloneEasy from './cloneEasy'
import forEachTree from './forEachTree'
import type { TKvPair } from './help/type-declare'
import isArray from './isArray'

type TreeItem<T extends TKvPair> = T & {
  children?: TreeItem<T>[]
}

type TreeFilterHandler<T extends TKvPair> = (item: TreeItem<T>) => boolean


export default function treeFilter<T extends TKvPair> (treeList: TreeItem<T>[], handler: TreeFilterHandler<T>) {
  function innerHander<T extends TKvPair> (data: TreeItem<T>[], result: TreeItem<T>[]) {
    for(let a = 0; a<data.length;a++) {
      const item = data[a]
      const hasChoosed = handler(item)
      if(hasChoosed) {
        const newItem: any = {}
        for(let key in item) {
          if(key === 'children') continue;
          // @ts-ignore
          newItem[key] = item[key]
        }
        if(isArray(item.children)) {
          newItem.children = []
          innerHander(item.children!, newItem.children)
        }
        result.push(newItem)
      }
    }
  }
  const result: TreeItem<T>[] = []
  innerHander(treeList, result)
  forEachTree(result, function (item) {
    if(item.children && item.children.length === 0) {
      delete item.children
    }
  })
  return result
}