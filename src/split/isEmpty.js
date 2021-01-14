import getType from './getType'
import { TYPE_BOOLEAN, TYPE_NUMBER, TYPE_OBJECT, TYPE_ARRAY } from './basic/constant'

/**
 * 判断一个数据是否为空
 * @param {All} data 需要处理的数据
 * @return {Boolean}
 */
export default function isEmpty (data) {
  let isBare = true;
  switch (getType(data)) {
    case TYPE_OBJECT:
      for(let key in data) {
        isBare = false
        break;
      }
      break;
    case TYPE_ARRAY:
      isBare = data.length < 1
      break;
    case TYPE_NUMBER:
    case TYPE_BOOLEAN:
      isBare = false
      break;
    default:
      isBare = !data
  }
  return isBare
}

/** 
 

console.log(isEmpty({}) )// => true
console.log(isEmpty([]))// => true
console.log(isEmpty(''))// => true
console.log(isEmpty(undefined))// => true
console.log(isEmpty(null))// => true
console.log(isEmpty({a: 1}) )// => false
console.log(isEmpty({b: {}}))// => false
console.log(isEmpty([1]))// => false
console.log(isEmpty(0))// => false
console.log(isEmpty(false))// => false
console.log(isEmpty('字符串'))// => false
console.log(isEmpty(1))// => false
console.log(isEmpty('1'))// => false
console.log(isEmpty('true'))// => false
console.log(isEmpty(true))// => false
console.log(isEmpty(function a () {}))// => false
console.log(isEmpty(new Date))// => false

 */
