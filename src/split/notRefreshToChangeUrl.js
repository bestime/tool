
import isObject from './isObject'
import isEmpty from './isEmpty'
import updateQuery from './updateQuery'
import _Function from './_Function'
import { HISTORY } from './const'
/**
 * 改变url但不刷新页面
 * 如果改变前的url和改变后的url相同，则不做任何处理
 * 例子见文件底部注释
 * 
 * @param {Object} [query] 键值对，对应url上面的 键=值。如果不传则去掉所有参数
 */
export default function notRefreshToChangeUrl (query) {  
  if(isFunction(HISTORY.replaceState)) {
    var url = window.location.href;
    var newUrl = url;
    if(isObject(query) && !isEmpty(query)) {
      for(var key in query) {
        newUrl = updateQuery(key, query[key], newUrl)
      }
    } else {
      newUrl = newUrl.replace(/\?.*/, '');
    }

    // console.log('以前', url)
    // console.log('现在', newUrl)

    if(url !== newUrl) {
      var title = document.title
      HISTORY.replaceState({
        url: newUrl,
        title: title
      }, title, newUrl)
    }
  }
}


/*


notRefreshToChangeUrl({
  name: '',
  t: '',
  age: ''
})

*/