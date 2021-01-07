import _String from './_String'
import padStart from './padStart'

const pad_2_0 = function (num) {
	return padStart(num, 2, '0')
}

/**
 * 获取身份证信息
 * @param {String} id 身份证号
 * @return {Object}
 */
export default function getUserFromIdCard(id) {
	id = _String(id)
	var year = id.substr(6, 4)
	var month = id.substr(10, 2)
	var day = id.substr(12, 2)
	return month <= 12 && month >= 1 && day >= 1 && day <= 31 ? {
		year: pad_2_0(year),
		month: pad_2_0(month),
		day: pad_2_0(day),
		sex: id[16] % 2 // 1表示男，0表示女
	} : null
}