
var FORMAT_TIME_BY_MAP = require('./FORMAT_TIME_BY_MAP')
var UNF = undefined
/**
 * 格式化时间差
 */

function TimeLast (fmt, msec) {
  var res = ''
  var oneDay = 1000 * 60 * 60 * 24
  var oneHour = 1000 * 60 * 60
  var oneMinute = 1000 * 60
  var oneSecond = 1000

  var day = Math.floor(msec/oneDay); msec = msec % oneDay;
  var hour = Math.floor(msec/oneHour); msec = msec % oneHour;
  var minute = Math.floor(msec/oneMinute); msec = msec % oneMinute;
  var second = Math.floor(msec/oneSecond); msec = msec % oneSecond;

  if(second) res = `${second}秒`
  if(minute) res = `${minute}分` + res
  if(hour) res = `${hour}小时` + res
  if(day) res = `${day}天` + res


  
  return FORMAT_TIME_BY_MAP(fmt, UNF, UNF, day, hour, minute, second, msec, UNF, true)
}

module.exports = TimeLast