import { defualtFormatter } from '@bestime/utils_base'



/**
   * @param key - 获取的键
   * @returns 保存的值
   */
export default function getStorage (key: string): string {
  const res = localStorage.getItem(key)
  return defualtFormatter('', res)
}