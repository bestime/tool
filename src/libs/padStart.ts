import PAD_STRING from './help/hpPadString'


/**
   * 向前填充字符串
   * @param data - 原始目标
   * @param len - 需要填充的总长度
   * @param target - 填充的字符串
   * @returns 结果
   */
export default function padStart (data: string | number, len: number, target: string) {
  return PAD_STRING(data, len, target, -1)
}