import { $FunctionTypeNameBig } from "./help/hpConsts";

const smallFunName = $FunctionTypeNameBig.toLowerCase()
/**
   * 判断数据是否为函数
   * @param data - 判断的值
   * @returns 真假值
   */
export default function isFunction (data: any): data is Function {
  return typeof data === smallFunName
}