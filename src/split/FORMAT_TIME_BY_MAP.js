import padStart from './padStart'
import trim from './trim'
import _Number from './_Number'
import _String from './_String'


/**
 * 日期格式化
 * 
 * @param {String} fmt 格式化字符串规则
 * @param {Number} Y 年
 * @param {Number} M 月
 * @param {Number} D 天
 * @param {Number} hour 时(24小时制)
 * @param {Number} m 分
 * @param {Number} s 秒
 * @param {Number} S 毫秒
 * @param {String} T 汉化时段，仅当 fmt中有tt时才有效
 * @param {Boolean} [clean=false] 是否清空从开始到第一个有效值的无效内容 例如：00年00月20日
 * 
 * @return {String}
 */
export default function FORMAT_TIME_BY_MAP (fmt, Y, M, D, hour, m, s, S, T, clean) {
  fmt = fmt ? _String(fmt) : 'YYYY-MM-DD HH:mm:ss'
  var regStr = '', item, hasval;
  var _Map = {
    'Y': Y, // 年
    'M': M, // 月
    'D': D, // 日
    'H': hour, // 时
    'h': hour > 12 ? hour - 12 : hour, // 时 12小时制
    'm': m, // 月
    's': s, // 秒
    'S': S, // 毫秒
    't':T // 时段
  }

  for(var key in _Map) {
    regStr += (regStr ? '|' : '') + '('+ key +'+)'
  }

  var res = fmt.replace(new RegExp(regStr, 'g'), function (mark) {
    item = !_Map ? 'NaN' : substr(_Map[mark[0]], mark)
    
    if(clean) {
      if(_Number(item)) {
        hasval = true
      } else if(!hasval){
        item = '@'
      }
    }    
    return item
  })
  return clean ? trim(res.replace(/@[^\d]*/g, '')) : res
}

function substr (value, mark) {
  if(!/t/.test(mark)) {
    value = padStart(value, mark.length, '0')
  }
  return /Y/.test(mark) ? value.substr(-mark.length) : value
}