
import { TYPE_UNDEFINED_SMALL, TYPE_NULL_SMALL, STRING_FALSE, STRING_TRUE } from './basic/constant'

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
export default function FN_FORMAT_STRING_VALUE (data) {
  switch (typeof data) {
    case TYPE_UNDEFINED_SMALL:
    case TYPE_NULL_SMALL: break;
    default:
      if (/^\d+$/.test(data)) {
        data = String(data);
      } else if(data == STRING_FALSE) {
        data = false
      }else if(data == STRING_TRUE) {
        data = true
      } else {
        try { data = JSON.parse(data) } catch (e) {}
      }
  }
  return data
}