import getType from './getType'
import { TYPE_ARRAY, TYPE_OBJECT, TYPE_STRING } from './basic/constant'
import { ENCODE_URI_COMPONENT } from './basic/browser'
import isFunction from './isFunction'
// import isObject from './isObject'


/**
 * 原生js实现对象序列化为字符串, 用于URL查询字符串或AJAX请求
 */
export default function param (data) {
  var res = [];
  // 当value不为数组或者JSON时，就可创建一条数据
  function addOne (key, value) {
    if(key!=null && key !=='') {
      value = isFunction(value) ? value() : value;
      value = value == null ? '' : value
      res[res.length] = ENCODE_URI_COMPONENT(key) + '=' + ENCODE_URI_COMPONENT(value)
    }
  }
  
  buildOnce('', data)
  function buildOnce (prefix, item) {
    var index, objKey;
    if(prefix) {
      switch (getType(item)) {
        case TYPE_ARRAY:
          for(index=0; index<item.length; index++) {
            // 如果数组项为object包括数组，需要创建一个索引
            buildOnce(prefix + '['+ (typeof item[index] === 'object' && item[index] ? index : '') +']', item[index])
          }
          break;
        case TYPE_OBJECT:
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
        case TYPE_STRING:
        case TYPE_OBJECT:
          for(objKey in item) {
            buildOnce(objKey, item[objKey])
          }
          break;
        case TYPE_ARRAY:
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
