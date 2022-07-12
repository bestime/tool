
import { STRING_FALSE, STRING_TRUE } from '../constant'

import isString from '../isString';

/**
 * 解析字符串
 * 1、布尔值转换
 * 2、数字转换为字符串
 * 3、尝试解析json数据
 * 
 * @param {String} data
 * 
 * @return {*}
 */
export default function FN_FORMAT_STRING_VALUE (data: string): any {  
  let res: any = data;

  
  if(data == null) {
    res = undefined
  } else if(STRING_FALSE === data) {
    res = false
  } else if(STRING_TRUE === data) {
    res = true
  } else if(isString(data)) {
    if (/^\d+$/.test(data)) {
      res = String(data);
    }
  } else {
    try { res = JSON.parse(data) } catch (e) {}
  }

  return res
}