


/**
 * toFixed()优化版
 * 
 * @param {Number} fix 需要保留几位小数，默认为0
 * 
 * 示例：
 * 	fixed()(100) => 100
 * 	fixed(1)(100) => 100.0
 * 	fixed(2)(100) => 100.00
 *  
 */

const _Number = require('./_Number')
function fixed (fix) {
	fix = _Number(fix)
	fix = fix < 0 ? 0 : fix
	return function (num) {
		return _Number(num).toFixed(fix)
	}
}

module.exports = fixed

