/**
 * 循环
 * 结束循环 -> 在each中return true
 */


const _Function = require('./_Function')
 

function each (arr, callback) {
	// 如果callback返回true就结束循环
	for(var index = 0; index < arr.length; index++) {
		var res = _Function(callback)(arr[index], index)
		if(res==='break') {
			break;
		} else if(res==='continue') {
			continue;
		} else if(res===true) {
			return false
		}
	}
}

module.exports = each

