import getType from './getType'
import { $ArrayTypeNameBig, $ObjectTypeNameBig, $stringTypeNameBig } from './help/hpConsts'
import { $encodeURIComponent } from './help/hpConsts'
import isFunction from './isFunction'



export default function param (data: {
  [key: string]: any
}): string {
  var res: any = [];
  // 当value不为数组或者JSON时，就可创建一条数据
  function addOne (key: string, value: any) {
    if(key!=null && key !=='') {
      value = isFunction(value) ? value() : value;
      value = value == null ? '' : value
      res[res.length] = $encodeURIComponent(key) + '=' + $encodeURIComponent(value)
    }
  }
  
  buildOnce('', data)
  function buildOnce (prefix: string, item: any) {
    var index, objKey;
    if(prefix) {
      switch (getType(item)) {
        case $ArrayTypeNameBig:
          for(index=0; index<item.length; index++) {
            // 如果数组项为object包括数组，需要创建一个索引
            buildOnce(prefix + '['+ (typeof item[index] === 'object' && item[index] ? index : '') +']', item[index])
          }
          break;
        case $ObjectTypeNameBig:
          for(objKey in item) {
            // 组装JSON的key为prefix
            buildOnce(prefix + '[' + objKey + ']', item[objKey])
          }
          break;
        default:
          addOne(prefix, item)
      }
    } else {
      switch (getType(item)) {
        case $stringTypeNameBig:
        case $ObjectTypeNameBig:
          for(objKey in item) {
            buildOnce(objKey, item[objKey])
          }
          break;
        case $ArrayTypeNameBig:
          for(index=0; index<item.length; index++) {
            addOne(item[index].name, item[index].value)
          }
          break;
      }
    }
  }

  // console.log(res)
  
  return res.join('&')
};
