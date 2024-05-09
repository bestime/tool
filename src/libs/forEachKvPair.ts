import cloneEasy from "./cloneEasy";
import type { TKvPair, TValueOf } from "./help/type-declare";

/**
 * 键值对的forEach实现方法
 * @param data - 元数据
 * @param handler - 自定义处理函数
 * @returns 
 */
export default function forEachKvPair<T extends TKvPair, U> (data: T, handler: (data: TValueOf<T>, key: string, index: number) => U) {  
  const result: Record<keyof TKvPair, U> = {}
  let index = -1
  for(let key in data) {
    index++
    result[key] = handler(data[key], key, index)
  }
  return result
}