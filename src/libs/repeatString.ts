import _String from './_String'


/**
   * 循环复制字符串
   * @param data - 复制目标
   * @param count - 复制几次
   * @returns 结果
   */
export default function repeatString (target: string | number, count: number): string {
  var res = '';
  target = _String(target)
  if (target.length * count < 1 << 28) {
    for (;;) {
      if ((count & 1) == 1) {
        res += target;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      target += target;
    }
  }
  return res;
}