import defaultValue from './defaultValue';
import isArray from './isArray';

/*

var treeData = [
  {
    "id": 1,
    "parentId": -1,
    "name": "menu-1",
    "children": [
      {
        "id": 2,
        "parentId": 1,
        "name": "menu-1-1",
        "children": [
          {
            "id": 3,
            "parentId": 2,
            "name": "menu-1 item-1"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "parentId": -1,
    "name": "menu-2",
    "children": [
      {
        "id": 5,
        "parentId": 4,
        "name": "menu-2 item-1"
      }
    ]
  }
]
*/

/**
 * 将树形结构转为一维数组
 * @param data - 树
 * @param childKey - 子项字段。默认 children
 * @returns 浅克隆的数组
 */
export default function flatTree(data: any[], childKey?: string) {
  const result = [];
  childKey = defaultValue(childKey, 'children');
  (function once(list) {
    if (isArray(list)) {
      let item: any;
      for (let index = 0; index < list.length; index++) {
        item = list[index];
        result.push(item);
        once(item[childKey]);
      }
    }
  })(data);

  return result;
}
