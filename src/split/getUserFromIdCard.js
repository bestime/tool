const trim = require('./trim')
const zero = require('./zero')

function getUserFromIdCard(id) {
	id = trim(id)
	var year = id.substr(6, 4)
	var month = id.substr(10, 2)
	var day = id.substr(12, 2)
	return month <= 12 && month >= 1 && day >= 1 && day <= 31 ? {
		year: zero(year),
		month: zero(month),
		day: zero(day),
		sex: id[16] % 2 ? 'man' : 'female'
	} : false
}

module.exports = getUserFromIdCard;