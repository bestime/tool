const isEmpty = require('./isEmpty')

var html = {
  encode: function (str) {
		return str.toString().replace(/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g, function (g) {
			var chart = g.charCodeAt(0)
			var res = '&#'
			chart = (chart == 0x20) ? 0xA0 : chart
			res += chart + ';'
			return res
		})
	},
	decode: function (str) {		
		var codeMap = {
			"&lt;" : "<", 
			"&gt;" : ">", 
			"&amp;" : "&", 
			"&nbsp;": " ", 
			"&quot;": "\"", 
			"&copy;": "©"
		}
		return str.toString().replace(/&\w+;|&#(\d+);/g, function (m1, m2) {
			var one = ''
			if(!isEmpty(m2)) {
				one = String.fromCharCode((m2 == 160) ? 32: m2)
			}else {
				one = codeMap[m1]
			}
			return one
		})		
	}
}

module.exports = html



