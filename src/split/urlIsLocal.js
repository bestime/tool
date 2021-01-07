
import isArray from './isArray'
import isIncluded from './isIncluded'
import { WINDOW } from './basic/browser'

/**
 * 判断浏览器地址是本地环境和开发环境
 * @param {String} [host = window.location.host] 
 * @param {Array} [localList] 精确匹配host，包含则表示本地环境
 * @return {Boolean}
 */

export default function urlIsLocal (host, localList) {
  host = host || WINDOW.location.host
  var res = false;
  if(isArray(localList) && localList.length > 0) {
    res = isIncluded(host, localList);
  } else {
    res = !host || /^(\d+\.){3}\d+:\d+$/.test(host);
  }
  return res;
}