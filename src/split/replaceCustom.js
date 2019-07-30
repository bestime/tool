/**
 * 将字符串中 [start, end] 中间的替换成自定义符号
 * @param {Sting} str 需要替换的字符串
 * @param {Number} start 开始位置 【从1开始】
 * @param {Number} end 结束位置 【从1开始】
 * @param {String} flag 自定义字符
 */

function replaceCustom (str, start, end, flag) {
	var regStr = '(.{0,'+ (start-1) +'})(.{0,'+ (end-start+1) +'})(.{1,})';
	return str.toString().replace(new RegExp(regStr, 'g'), function (a, b, c, d) {
		return b + c.replace(/./g, flag) + d
	})
}

module.exports = replaceCustom