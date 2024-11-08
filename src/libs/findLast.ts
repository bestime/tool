
/**
 * 倒序查找数组
 * @param list 
 * @param handler 
 * @returns 
 */
export default function findLast<T> (list: T[], handler: (value: T, index: number, obj: T[]) => boolean):T | undefined {
  let find = false
  for(let a=list.length-1;a>=0;a--) {
    find = handler(list[a], a, list)
    if(find) {
      return list[a]
    }
  }
}
