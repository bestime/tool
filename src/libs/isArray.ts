import getType from './getType';
import { $ArrayTypeNameBig } from './help/hpConsts';

/**
 * 判断数据是否为数组
 * @param data - 判断的值
 * @returns 真假值
 */
export default function isArray(data: any): boolean {
  return getType(data) === $ArrayTypeNameBig;
}
