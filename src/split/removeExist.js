/**
 * 从原始数组中，去除已经存在的数据
 * @param {Array} originList 原始数组（注：会被改变）
 * @param {Array} existList 需要删除的数据
 * @param {Function:Boolean} handle 回调函数，用于对比数据，返回值为Boolean类型
*/
export default function removeExist (originList, existList, handle) {
  let bool, oItem, cItem;
  for (let index = 0; index < originList.length; index++) {
    oItem = originList[index]
    for(let cidx = 0; cidx < existList.length; cidx++) {
      cItem = existList[cidx]
      bool = handle ? handle(oItem, cItem) : oItem === cItem
      if(bool) {
        originList.splice(index--, 1)
        break;
      }
    }
  }
}