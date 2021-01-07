import getType from './getType'
import { TYPE_FUNCTION, TYPE_DATE, TYPE_BOOLEAN, TYPE_NUMBER, TYPE_OBJECT, TYPE_ARRAY, TYPE_STRING } from './const'

/**
 * 判断一个数据是否为空
 * @param {All} data 需要处理的数据
 * @return {Boolean}
 */
export default function isEmpty (data) {
	var res = true
	switch(getType(data)) {
		case TYPE_FUNCTION:
		case TYPE_DATE:
		case TYPE_BOOLEAN:
		case TYPE_NUMBER:
			res = false
			break;
		case TYPE_OBJECT:
			for(var key in data) {
				res = false
			}
			break;
		case TYPE_ARRAY:
			res = data.length ? false : true
			break;
		case TYPE_STRING:
			res = data==='' ? true : false
			break;
		default: res = !data
	}
	return res
}





/** 
 

var abcd = {}
console.log(isEmpty({})) //true
console.log(isEmpty([])) //true
console.log(isEmpty('')) //true
console.log(isEmpty(abcd.b)) //true
console.log(isEmpty(null)) //true
console.log(isEmpty(undefined)) //true

console.log(isEmpty(false)) //false
console.log(isEmpty(true)) //false
console.log(isEmpty(0)) //false


 */
