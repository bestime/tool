
import isLikeNumber from '../isLikeNumber';
import { $falseString, $trueString, $undefinedValue } from './hpConsts'
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
    res = $undefinedValue
  } else if($falseString === data) {
    res = false
  } else if($trueString === data) {
    res = true
  } else if (isLikeNumber(data)) {
    res = data
  } else {
    res = hpJsonParse(data, data)
  }

  return res
}