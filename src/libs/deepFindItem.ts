import isNull from "./isNull";

/**
 * 深度查找数组中的匹配项（找到一项就不再继续查找）
 * @param {array} list 需要查找的数组
 * @param {function} handle 回调函数
 * @param {string} [childrenKey=children] 子集的键
*/
export default function deepFindItem (list: any[], handle: (data: any) => void, childrenKey?: string): any {
  childrenKey = isNull(childrenKey) ? 'children' : childrenKey
  var res: any, isFind: any;

  ;(function doOnce(children) {
    if(!children) return;
    for(var a = 0; a < children.length; a++) {
      isFind = handle(children[a])
      if(isFind) {
        res = children[a]
        break;
      } else {
        doOnce(children[a][childrenKey as any])
      }
      if(isFind) {
        break;
      }
    }
  })(list);

  


  return res
}