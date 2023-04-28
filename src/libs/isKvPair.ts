import getType from './getType'
import { $ObjectTypeNameBig } from './help/hpConsts'


/**
   * 判断数据是否为对象
   * @param data - 判断的值
   * @returns 真假值
   */
export default function isKvPair (data: any): boolean {
  return getType(data) === $ObjectTypeNameBig
}