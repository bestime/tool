/**
 * 从json中提取需要的字段数据
 * @param {Object} json 原始数据
 * @param {Array} keys 字段列表
 * @return Object
*/
export default function filterJsonKeys (json, keys) {
  var res = {};
  for(var key, index = 0; index < keys.length; index++) {
    key = keys[index]
    res[key] = json[key]
  }
  return res
}