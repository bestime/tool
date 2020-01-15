var _String = require('./_String')
var zero = require('./zero')
var getType = require('./getType')
var trim = require('./trim')


/**
 * 日期格式化
 * @param {?String} fmt 格式化模板样式 默认 YYYY-MM-DD HH:mm:ss
 * @param {?Date|Number|String} date 格式化的日期，不传则表示当前日期。 【标准日期、时间戳（秒/毫秒）、格式化后的字符串】
 * @return {String} 格式化后的时间
 */
function Time (fmt, date) {
  var year, month, day, hour, minute, second, milliSecond, error, date;
  if (!fmt) {
    fmt = 'YYYY-MM-DD HH:mm:ss'
  } else {
    fmt = _String(fmt)
  }  
  if(getType(date) !== 'Date') {
    if(date) {
      date = trim(date)
      if(/^\d+$/.test(date)) {
        if(date.length == 10) {
          date = Number(date + '000')
        } else if(date.length == 13) {
          date = Number(date)
        }
      }
      date = new Date(date)
    } else {
      date = new Date()
    }

    if(date == 'Invalid Date') {
      error = 'NaN'; // 日期格式不正确
    } else {
      year = String(date.getFullYear())
      month = String(date.getMonth() + 1)
      day = String(date.getDate())
      hour = String(date.getHours())
      minute = String(date.getMinutes())
      second = String(date.getSeconds())
      milliSecond = String(date.getMilliseconds())
    }
  }

  
  var res = fmt.replace(/\b[a-zA-z]+\b/g, function (mark) {
    switch (mark) {
      case 'YY': mark = error || year.substr(-2); break; // 【年份】两位
      case 'YYYY': mark = error || year; break; // 【年份】四位
      case 'M': mark = error || month; break; // 【月份】个位
      case 'MM': mark = error || zero(month); break; // 【月份】 两位
      case 'D': mark = error || day; break; // 【日】个位
      case 'DD': mark = error || zero(day); break; // 【日】两位
      case 'h': mark = error || fomatHour12(hour); break;// 【时】个位，12 小时制
      case 'hh': mark = error || fomatHour12(hour, 1); break;//【时】两位，12 小时制
      case 'H': mark = error || hour; break; // 【时】个位 24小时制
      case 'HH': mark = error || zero(hour); break; //【时】 两位 24小时制
      case 'm': mark = error || minute; break;// 【分】个位
      case 'mm': mark = error || zero(minute); break;// 【分】 两位
      case 's': mark = error || second; break;// 【秒】 个位
      case 'ss': mark = error || zero(second); break;//【秒】 两位
      case 'SSS': mark = error || zero(milliSecond, '000'); break;// 三位秒
    }
    return mark
  })
  return res;
}

function fomatHour12 (hour, double) {
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
  hour = hour > 12 ? hour - 12 : hour
  return prefix + ' ' + (double ? zero(hour) : hour)
}

module.exports = Time
