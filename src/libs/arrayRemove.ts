type THander<T> = (item: T, index: number) => boolean  

/**
 * 移除数组中的数据（直接改变原数组）
 * @param data - 原始数据
 * @param handler - 迭代函数
 */
export default function arrayRemove<T> (data: T[], handler: THander<T>) {
  for(let index = 0; index<data.length; index++) {
    if(handler(data[index], index)) {
      data.splice(index--, 1)
    }
  }
}