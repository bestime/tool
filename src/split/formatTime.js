var _String = require('./_String')
var zero = require('./zero')
var getType = require('./getType')
var trim = require('./trim')
var str03 = '000'

/**
 * 日期格式化
 * @param {?String} fmt 格式化模板样式 默认 YYYY-MM-DD HH:mm:ss
 * @param {?Date|Number|String} date 格式化的日期，不传则表示当前日期。 【标准日期、时间戳（秒/毫秒）、格式化后的字符串】
 * @return {String} 格式化后的时间
 */
function formatTime (fmt, date) {
  var hour, date, _Map, regStr = ''; 
  if(getType(date) !== 'Date') {
    if(date) {
      date = trim(date)
      if(/^\d+$/.test(date)) {
        if(date.length == 10) {
          date = Number(date + str03)
        } else if(date.length == 13) {
          date = Number(date)
        }
      }
      date = new Date(date)
    } else {
      date = new Date()
    }
    
    if(date != 'Invalid Date') {
      hour = date.getHours()
      _Map = {
        'Y': date.getFullYear(), // 年
        'M': date.getMonth() + 1, // 月
        'D': date.getDate(), // 日
        'H': hour, // 时
        'h': hour > 12 ? hour - 12 : hour, // 时 12小时制
        'm': date.getMinutes(), // 月
        's': date.getSeconds(), // 秒
        'S': date.getMilliseconds(), // 毫秒
        't': getTT(hour) // 时段
      }

      for(var key in _Map) {
        regStr += (regStr ? '|' : '') + '('+ key +'+)'
      }
    }
  }

  var res = (fmt ? _String(fmt) : 'YYYY-MM-DD HH:mm:ss').replace(new RegExp(regStr, 'g'), function (mark) {
    return !_Map ? 'NaN' : substr(_Map[mark[0]], mark)
  })

  return res
}

function substr (value, mark) {
  if(!/t/.test(mark)) {
    value = zero(value, mark)
  }
  return /Y/.test(mark) ? value.substr(-mark.length) : value
}

function getTT (hour) {
  var prefix = '' 
  if(hour < 6) {
    prefix = '凌晨'
  } else if(hour < 12) {
    prefix = '上午'
  } else if (hour < 18) {
    prefix = '下午'
  } else {
    prefix = '晚上'
  }
  return prefix
}

module.exports = formatTime
