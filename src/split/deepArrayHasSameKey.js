
/**
 * 递归判断数组中是否有重复的字段值
 * 
 * @param {Array} list 需要遍历的数组
 * @param {String} compareKey 需要对比的字段
 * @param {String} childrenKey 需要递归的子集
 * @param {Object} [_map={}] 【可不填】查找的缓存
 * @returns Object
 */

export default function deepArrayHasSameKey (list, compareKey, childrenKey, _map) {
  compareKey = compareKey || 'id'
  childrenKey = childrenKey || 'children'
  _map = _map || {}
  let res;

  for(let key in list) {
    const item = list[key]
    const value = item[compareKey]
    
    if(_map[value] != null) {
      res = item
      break;
    }
    _map[value] = true
    if(item[childrenKey]) {
      res = deepArrayHasSameKey(item[childrenKey], compareKey, childrenKey, _map)
      if(res) {
        break;
      }
    }
  }

  return res
}