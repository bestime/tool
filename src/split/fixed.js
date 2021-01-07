const _Number = require('./_Number')

/**
 * 四舍五入, 保留几位小数
 * 
 * @param {Number} fix <正整数> 采用几位小数
 * 
 * 示例：
 * 	fixed()(100) => 100
 * 	fixed(1)(100) => 100.0
 * 	fixed(2)(100) => 100.00
 *  
 */
function fixed (fix) {
	fix = _Number(fix)
	fix = fix < 0 ? 0 : fix
	return function (num) {
		return _Number(num).toFixed(fix)
	}
}

module.exports = fixed