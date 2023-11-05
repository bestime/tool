import getType from './getType';
import { $ArrayTypeNameBig } from './help/hpConsts';

/**
 * 判断数据是否为数组
 * @param arg - 判断的值
 * @returns 真假值
 */
export default function isArray(arg: any): arg is any[] {
  return getType(arg) === $ArrayTypeNameBig;
}
