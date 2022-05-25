

/**
 * mapData 原生some仅支持数组，这个是扩展方法，支持键值对Map数据
 * @param {Object} mapData
 * @param {Function} handle
 * 
 * @return {Boolean}
 */
export default function someMap (mapData, handle) {
  var res = false;
  for(var key in mapData) {
    if(handle(mapData[key], key, mapData) === true) {
      res = true
      break;
    }
  }
  
  return res
}