import _String from './_String'
import { prevZero2 } from './basic/fragment'



/**
 * 获取身份证信息
 * @param {String} id 身份证号
 * @return {Object|Null}
 */
export default function getUserFromIdCard(id) {
	id = _String(id)
	var year = id.substr(6, 4)
	var month = id.substr(10, 2)
	var day = id.substr(12, 2)
	return month <= 12 && month >= 1 && day >= 1 && day <= 31 ? {
		year: prevZero2(year),
		month: prevZero2(month),
		day: prevZero2(day),
		sex: id[16] % 2 // 1表示男，0表示女
	} : null
}