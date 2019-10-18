const _Number = require('./_Number')

/**
 * 格式化时间差
 */

function reduceTime (start, end) {
  var res = ''
  var last = _Number(end) - _Number(start)
  var oneDay = 1000 * 60 * 60 * 24
  var oneHour = 1000 * 60 * 60
  var oneMinute = 1000 * 60
  var oneSecond = 1000

  var day = Math.floor(last/oneDay); last = last % oneDay;
  var hour = Math.floor(last/oneHour); last = last % oneHour;
  var minute = Math.floor(last/oneMinute); last = last % oneMinute;
  var second = Math.floor(last/oneSecond); last = last % oneSecond;

  if(second) res = `${second}秒`
  if(minute) res = `${minute}分` + res
  if(hour) res = `${hour}小时` + res
  if(day) res = `${day}天` + res
  
  return res
}

module.exports = reduceTime