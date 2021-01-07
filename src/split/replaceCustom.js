
import isObject from './isObject'
import _String from './_String'
import _Number from './_Number'

/*
replaceCustom({
	// 处理的字符串个数
	value: 'abcdefg.exe',
	
	// 前面保留的字符串
	start: 5,
	
	// 结束保留的字符串个数
	end: 0,

	// 无论多少个匹配字符串，都替换这个值
	mark: '***',

	// 每一个字匹配的符串都替换这个值
	singleMark: '*', 
})

*/

export default function replaceCustom (opt) {
  var res = '';
  if(isObject(opt)) {
    res = _String(opt.value)
    opt.start = _Number(opt.start)
    opt.end = _Number(opt.end)
    opt.mark = opt.mark || '***'
		var regStr = '^(.{0,'+ opt.start +'})?(.{0,}?)';
		if(opt.end > 0) {
			regStr += '(.{0,'+ opt.end +'})'
		}
    res = res.replace(new RegExp(regStr + '$'), function (a, $1, $2, $3) {
			if($2!=='') {
				if(opt.singleMark) {
					$2 = $2.replace(/./g, opt.singleMark)
				} else {
					$2 = opt.mark
				}
			}
			if(opt.end <= 0) {
				$3 = ''
			}
      return $1 + $2 + $3
    })
  }
  return res;
}