import type { TKvPair, TValueOf } from "./help/type-declare";

/**
 * 数组find方法的键值对版本
 * @param data 
 * @param handler 
 * @returns 
 */
export default function findKvPair<T extends TKvPair>(data: T, handler: (data: TValueOf<T>, key: string) => boolean) {
  for(let key in data) {
    if(handler(data[key], key)) {
      return data[key]
    }
  }
}