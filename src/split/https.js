//

var trim = require('./trim')

function https (url) {
	url = trim(String(url))
	if(!url) return null;
	var res = null;
	var https = 'https'
	var pre = url.substring(0, 5);
	var next = url.slice(5)
	if(pre==https || url.match(/^file/) || url.match(/^content:/)) {
		res = url
	}else	if(pre.match(/http/)) {
		pre = https + ':';
		res = pre + next
	}else {
		res = https + '://' + url
	}
	return res;
}

module.exports = https