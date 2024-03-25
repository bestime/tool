import cloneEasy from "./cloneEasy";
import type { TKvPair, TValueOf } from "./help/type-declare";

/**
 * 键值对的map实现方法
 * @param data - 元数据
 * @param handler - 自定义处理函数
 * @returns 
 */
export default function mapKvPair<T extends TKvPair, U> (data: T, handler: (data: TValueOf<T>, key: string) => U) {  
  const result: Record<keyof TKvPair, U> = {}
  for(let key in data) {
    result[key] = handler(cloneEasy(data[key]), key)
  }
  return result
}