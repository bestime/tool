/**
   * 查询树接口中的某一项
   * @param list - 原始数组
   * @param handle - 遍历的回调函数
   * @param children - 子项字段
   * @returns 结果
   */
export default function deepFindItem<T>(list: T[], handle: (data: T) => void, children?: string): T | undefined;
