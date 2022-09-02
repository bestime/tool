
import { $falseString, $trueString } from './hpConsts'

import isString from '../isString';
import hpJsonParse from './hpJsonParse';

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
export default function hpTryToParseStringToBasicType (data: string): any {  
  let res: any = data;

  
  if(data == null) {
    res = undefined
  } else if($falseString === data) {
    res = false
  } else if($trueString === data) {
    res = true
  } else if(isString(data) && /^\d+$/.test(data)) {
    res = String(data);
  } else {
    res = hpJsonParse(hpJsonParse)
  }

  return res
}