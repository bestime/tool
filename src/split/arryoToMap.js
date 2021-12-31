/**
 * 数组转映射对象
 * @param {String} field 数组中用于分组的字段（同名字段的值会被后面的覆盖）
 * @param {Array} list 用于转换的原数组
 * @return {Object} 映射数据
*/

export default function arryoToMap (field, list) {
  const cache = {}
  var item;
  for (var a = 0; a < list.length; a++) {
    item = list[a]
    cache[item[field]] = item
  }
  return cache
}
