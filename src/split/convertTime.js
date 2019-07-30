const zero = require('./zero')


function convertTime (date) { 
	return {
		year         : zero(date.getFullYear()),
		month        : zero(date.getMonth() + 1),
		day          : zero(date.getDate()),
		hour        : zero(date.getHours()),
		minute      : zero(date.getMinutes()),
		second      : zero(date.getSeconds()),
		milliSecond : zero(date.getMilliseconds())
	}
}

module.exports = convertTime