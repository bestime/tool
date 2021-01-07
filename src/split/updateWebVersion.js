import parseQuery from './parseQuery'
import updateQuery from './updateQuery'
import { WINDOW } from './basic/browser'

/**
 * 网页自动刷新 url，用于版本缓存导致新代码不生效
 * 
 * @param {?:String} key 刷新时url修改或添加的【随机参数名】
 * @param {?:String} checkValue 判断依据，可以传入时间
 * 
 */
export default function updateWebVersion (key, checkValue) {
  if(key && checkValue) {
    var old = parseQuery()[key]
    if(!old || old !== checkValue) {
      var newUrl = updateQuery(key, checkValue)
      if(WINDOW.location.href !== newUrl) {
        WINDOW.location.href = newUrl
      }
    }
  }
}