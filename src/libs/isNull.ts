import { $undefinedValue } from "./help/hpConsts";
type TNull = undefined | null | ''
/**
 * 判断数据是否为空
 * @param data 待判断数据。null、undefined、空字符串 都将视为空
 * @param whiteList 特殊需求。默认将 [‘-’] 也视为空数据
 * @returns 
 */
export default function isNull (data: any, whiteList?: string[]): data is TNull{
  whiteList = whiteList || ['-']
  return data === null || data === $undefinedValue || whiteList.includes(data)
}