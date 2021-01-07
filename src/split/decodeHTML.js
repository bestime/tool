import { CODEMAP } from './const'
import _String from './_String'
import isEmpty from './isEmpty'

export default function decodeHTML () {
  return _String(str).replace(/&\w+;|&#(\d+);/g, function (m1, m2) {
		var one = ''
		if (!isEmpty(m2)) {
			one = String.fromCharCode((m2 == 160) ? 32: m2)
		} else {
			one = codeMap[m1]
		}
		return one
	})
}




