var _String = require('./_String')
const _Number = require('./_Number')
const trim = require('./trim')
var zero = require('./zero')


function FORMAT_TIME_BY_MAP (fmt, Y, M, D, hour, m, s, S, T, clean) {
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

  // console.log('_Map', _Map)

  for(var key in _Map) {
    regStr += (regStr ? '|' : '') + '('+ key +'+)'
  }

  var res = (fmt ? _String(fmt) : 'YYYY-MM-DD HH:mm:ss').replace(new RegExp(regStr, 'g'), function (mark) {
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
    value = zero(value, mark)
  }
  return /Y/.test(mark) ? value.substr(-mark.length) : value
}


module.exports = FORMAT_TIME_BY_MAP