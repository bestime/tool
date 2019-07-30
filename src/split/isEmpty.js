const getType = require('./getType')

/**
 * 判断一个数据是否为空
 * @param {All} data 需要处理的数据
 * @return {Boolean}
 */
function isEmpty (data) {
	switch(getType(data)) {
		case 'Object':
			for(var key in data) return false
			return true
		case 'Array': return !data.length
		case 'Boolean': return false
		case 'Number': return false
		case 'String': return data=='undefined' || data=='' ? true : false
		default: return !data
	}
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
