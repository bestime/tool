import isNull from "./isNull";

/**
   * 查询树接口中的某一项
   * @param list - 原始数组
   * @param handle - 遍历的回调函数
   * @param children - 子项字段
   * @returns 结果
   */
export default function deepFindItem<T> (list: T[], handle: (data: T) => void, children?: string): T | undefined {
  const childrenKey = isNull(children) ? 'children' : children!
  var res: any, isFind: any;

  ;(function doOnce(children) {
    if(!children) return;
    for(var a = 0; a < children.length; a++) {
      isFind = handle(children[a])
      if(isFind) {
        res = children[a]
        break;
      } else {
        // @ts-ignore
        doOnce(children[a][childrenKey])
      }
      if(isFind) {
        break;
      }
    }
  })(list);

  


  return res
}