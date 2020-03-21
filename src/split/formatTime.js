

var getType = require('./getType')
var trim = require('./trim')
var FORMAT_TIME_BY_MAP = require('./FORMAT_TIME_BY_MAP')
var _Number = require('./_Number')




/**
 * 日期格式化
 * @param {?String} fmt 格式化模板样式 默认 YYYY-MM-DD HH:mm:ss
 * @param {?Date|Number|String} date 格式化的日期，不传则表示当前日期。 【标准日期、时间戳（秒/毫秒）、格式化后的字符串】
 * @return {String} 格式化后的时间
 */
function formatTime (fmt, date) {
  var hour, date;
  var  Y, M, D, h, m, s, S, t;
  if(getType(date) !== 'Date') {
    if(date) {
      date = trim(date)
      if(/^\d+$/.test(date)) {
        if(date.length == 10) {
          date = _Number(date + '000')
        } else if(date.length == 13) {
          date = _Number(date)
        }
      }
      date = new Date(date)
    } else {
      date = new Date()
    }
    
    if(date != 'Invalid Date') {
      hour = date.getHours()
      Y = date.getFullYear(), // 年
      M = date.getMonth() + 1, // 月
      D = date.getDate(), // 日
      h = hour > 12 ? hour - 12 : hour, // 时 12小时制
      m = date.getMinutes(), // 月
      s = date.getSeconds(), // 秒
      S = date.getMilliseconds(), // 毫秒
      t = getTT(hour) // 时段

      
    }
  }

  return FORMAT_TIME_BY_MAP(fmt, Y, M, D, h, m, s, S, t)
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
