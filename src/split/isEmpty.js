const getType = require('./getType')

/**
 * 判断一个数据是否为空
 * @param {All} data 需要处理的数据
 * @return {Boolean}
 */
function isEmpty (data) {
	var res = true
	switch(getType(data)) {
		case 'Function':
		case 'Date':
		case 'Boolean':
		case 'Number':
			res = false
			break;
		case 'Object':
			for(var key in data) {
				res = false
			}
			break;
		case 'Array':
			res = data.length ? false : true
			break;
		case 'String':
			res = data=='' ? true : false
			break;
		default: res = !data
	}
	return res
}

module.exports = isEmpty





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
