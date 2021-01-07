const padStart = require('./padStart')

const pad_2_0 = function (num) {
	return padStart(num, 2, '0')
}
function convertTime (date) { 
	return {
		year: pad_2_0(date.getFullYear()),
		month: pad_2_0(date.getMonth() + 1),
		day: pad_2_0(date.getDate()),
		hour: pad_2_0(date.getHours()),
		minute: pad_2_0(date.getMinutes()),
		second: pad_2_0(date.getSeconds()),
		milliSecond: pad_2_0(date.getMilliseconds(), '000')
	}
}

module.exports = convertTime