import isNull from "./isNull";

/**
 * 给数字添加正负号
 * @param data - 原始数字
 * @returns 正负数字字符串
 */
export default function signNumber (data: number | undefined) {
  if(isNull(data)) return '';
  let flag = ''
  if(data>0) {
    flag = '+'
  }else if(data<0) {
    flag = '-'
  }

  return `${flag}${data}`
}