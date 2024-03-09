import getType from './getType';
import { $ArrayTypeNameBig, $ObjectTypeNameBig, $stringTypeNameBig } from './help/hpConsts';
import { $encodeURI } from './help/hpConsts';
import type { TKvPair } from './help/type-declare';
import isFunction from './isFunction';
/**
 * 对象序列化为字符串, 用于URL查询字符串或AJAX请求
 * @param data - 需要转化的数据
 * @returns 转换后的字符串
 */
export default function param(data: TKvPair): string {
  var res: any = [];
  // 当value不为数组或者JSON时，就可创建一条数据
  function addOne(key: string, value: any) {
    if (key != null && key !== '') {
      value = isFunction(value) ? value() : value;
      value = value == null ? '' : value;
      res[res.length] = $encodeURI(key) + '=' + $encodeURI(value);
    }
  }

  buildOnce('', data);
  function buildOnce(prefix: string, item: any) {
    var index, objKey;
    if (prefix) {
      switch (getType(item)) {
        case $ArrayTypeNameBig:
          for (index = 0; index < item.length; index++) {
            // 如果数组项为object包括数组，需要创建一个索引
            buildOnce(
              prefix + '[' + (typeof item[index] === 'object' && item[index] ? index : '') + ']',
              item[index]
            );
          }
          break;
        case $ObjectTypeNameBig:
          for (objKey in item) {
            // 组装JSON的key为prefix
            buildOnce(prefix + '[' + objKey + ']', item[objKey]);
          }
          break;
        default:
          addOne(prefix, item);
      }
    } else {
      switch (getType(item)) {
        case $stringTypeNameBig:
        case $ObjectTypeNameBig:
          for (objKey in item) {
            buildOnce(objKey, item[objKey]);
          }
          break;
        case $ArrayTypeNameBig:
          for (index = 0; index < item.length; index++) {
            addOne(item[index].name, item[index].value);
          }
          break;
      }
    }
  }

  // console.log(res)

  return res.join('&');
}
