import _String from './_String'
import _Number from './_Number'


/**
 * @param {String} value 需要处理的字符串
 * @param {Number} start 前面保留几位
 * @param {Number} [end=0] 后面保留几位
 * @param {String} [mark=null] 中间填充的字符串
 * @return {String} 处理后的字符串
 */
export default function replaceCustom (value, start, end, mark) {
  var res = _String(value)
  var regStr = '^(.{0,'+ _Number(start) +'})?(.{0,}?)';
	end = _Number(end)
	if(start<=0) {
		regStr = '^()(.{0,}?)';
	}
	if(end > 0) {
		regStr += '(.{0,'+ end +'})'
	}
	res = res.replace(new RegExp(regStr + '$'), function (_, $1, $2, $3) {
		if($2!=='') {
			$2 = mark
		}
		if(end <= 0) {
			$3 = ''
		}
		return $1 + $2 + $3
	})
  return res;
}