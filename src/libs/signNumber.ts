import _Number from "./_Number";
import isNull from "./isNull";
import isNumber from "./isNumber";

/**
 * 给数字添加正负号
 * @param data - 原始数字
 * @returns 正负数字字符串
 */
export default function signNumber (data: number | string | undefined) {
  if(isNull(data)) return '';
  const num = isNumber(data) ? data : _Number(data)
  let flag = ''
  if(num>0) {
    flag = '+'
  }

  return `${flag}${data}`
}