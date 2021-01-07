
import FORMAT_TIME_BY_MAP from './FORMAT_TIME_BY_MAP'
import { _UNDEFINED, ONE_DAY_TIME_STAMP, ONE_HOUR_TIME_STAMP, ONE_MINUTE_TIME_STAMP, ONE_SECOND_TIME_STAMP } from './basic/constant'


/**
 * 格式化时间差
 * @param {String} fmt 格式化
 * @param {Number} msec 毫秒, 小于0的将视为0处理
 * 
 * @return {String}
 */

export default function TimeLast (fmt, msec) {  
  msec = Math.max(msec, 0)
  
  var day = Math.floor(msec/ONE_DAY_TIME_STAMP); msec = msec % ONE_DAY_TIME_STAMP;
  var hour = Math.floor(msec/ONE_HOUR_TIME_STAMP); msec = msec % ONE_HOUR_TIME_STAMP;
  var minute = Math.floor(msec/ONE_MINUTE_TIME_STAMP); msec = msec % ONE_MINUTE_TIME_STAMP;
  var second = Math.floor(msec/ONE_SECOND_TIME_STAMP); msec = msec % ONE_SECOND_TIME_STAMP;
  
  return FORMAT_TIME_BY_MAP(fmt, _UNDEFINED, _UNDEFINED, day, hour, minute, second, msec, _UNDEFINED, true)
}


















