
/**
 * 数组赋值，不改变原数组地址
 * @param originArr 
 * @param data 
 */
export default function arrayContentReplace<T> (originArr: T[], data: T[]) {
  
  for(let index = 0; index < data.length; index++) {
    originArr[index] = data[index]
  }
  originArr.length = data.length
}