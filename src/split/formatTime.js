
import getType from './getType'
import _Number from './_Number'
import FORMAT_TIME_BY_MAP from './FORMAT_TIME_BY_MAP'
import trim from './trim'
import isString from './isString'
import { TYPE_DATE } from './basic/constant'
import PAD_STRING from './PAD_STRING'



/**
 * 日期格式化
 * @param {?String} fmt 格式化模板样式 默认 YYYY-MM-DD HH:mm:ss
 * @param {Date|Number|String} date 格式化的日期。 【标准日期、时间戳（秒/毫秒）、格式化后的字符串】
 * @return {String} 格式化后的时间
 */
export default function formatTime (fmt, date) {
  if(!/\d/.test(date)) return;
  var hour, date;
  var  Y, M, D, m, s, S, t;

  // ios 不支持 2020-08-12 这种格式的日期
  if(isString(date)) {
    date = date.replace(/-/g, '/')
  }
  if(getType(date) !== TYPE_DATE) {
    date = trim(date)
    if(/^\d+$/.test(date)) {
      if(date.length) {
        date = PAD_STRING(date, 13, '0')
      } else {
        return ''
      }
      if(date) {
        date = new Date(_Number(date))
      } else {
        return ''
      }
    } else {
      date = new Date(trim(date))
    }
  }

  if(date != 'Invalid Date') {
    hour = date.getHours()
    Y = date.getFullYear(), // 年
    M = date.getMonth() + 1, // 月
    D = date.getDate(), // 日
    m = date.getMinutes(), // 月
    s = date.getSeconds(), // 秒
    S = date.getMilliseconds(), // 毫秒
    t = getTT(hour) // 时段
  } else {
    return ''
  }

  return FORMAT_TIME_BY_MAP(fmt, Y, M, D, hour, m, s, S, t)
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
