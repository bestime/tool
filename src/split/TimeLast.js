
const FORMAT_TIME_BY_MAP = require('./FORMAT_TIME_BY_MAP')
const UNF = undefined


const oneDay = 1000 * 60 * 60 * 24
const oneHour = 1000 * 60 * 60
const oneMinute = 1000 * 60
const oneSecond = 1000

/**
 * 格式化时间差
 * @param {String} fmt 格式化
 * @param {Number} msec 毫秒, 小于0的将视为0处理
 * 
 * @return {String}
 */

function TimeLast (fmt, msec) {  
  msec = Math.max(msec, 0)
  
  var day = Math.floor(msec/oneDay); msec = msec % oneDay;
  var hour = Math.floor(msec/oneHour); msec = msec % oneHour;
  var minute = Math.floor(msec/oneMinute); msec = msec % oneMinute;
  var second = Math.floor(msec/oneSecond); msec = msec % oneSecond;
  
  return FORMAT_TIME_BY_MAP(fmt, UNF, UNF, day, hour, minute, second, msec, UNF, true)
}























module.exports = TimeLast