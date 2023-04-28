/**
   * 在给定索引范围内，增减当前索引，如果超出范围，则按当前方向重新循环取值。
   * @param maxIndex - 最大索引
   * @param currentIndex - 当前索引
   * @param increase - 调整多少索引，可为负数
   * @returns 改变后的索引
   */
export default function changeIndex(maxIndex: number, currentIndex: number, increase: number): number;
