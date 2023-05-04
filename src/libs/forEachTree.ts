import  type { IKvPair } from './help/type-declare'

import isArray from './isArray';


/**
 * 树形结构迭代
 * @param data - 原始树
 * @param handle - 迭代方法。这里不用返回子节点
 * @param childKey - 子节点字段。默认值：children
 */

export default function forEachTree<T extends IKvPair>(
  data: T[],
  handle: (data: T) => void,
  childKey?: keyof T
): void{
  childKey = childKey || 'children';
  (function handleOneList(list) {
    for (let index = 0; index < list.length; index++) {
      handle(list[index]);
      if (isArray(list[index][childKey])) {
        handleOneList(list[index][childKey]);
      }
    }
  })(data);
};

