import { CODEMAP } from './basic/constant'
import _String from './_String'

export default function encodeHTML () {
  return _String(str).replace(/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g, function (g) {
		var chart = g.charCodeAt(0)
		var res = '&#'
		chart = (chart == 0x20) ? 0xA0 : chart
		res += chart + ';'
		return res
	})
}




