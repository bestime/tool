
import _Number from './_Number'
import _Object from './_Object'
import convertTime from './convertTime'
import { ONE_SECOND_TIME_STAMP, ONE_DAY_TIME_STAMP, ONE_HOUR_TIME_STAMP, ONE_MINUTE_TIME_STAMP } from './const'

/**
 * 格式化时间为最近时间
 * @param {Number} millisecond 毫秒 
 * @param {Object} opt 毫秒
 *    @option {Boolean} show_second 结果是否显示秒
 *    @option {Boolean} show_millsecond 结果是否显示毫秒
 *    @option {Number} nowStamp 当前时间戳 毫秒
 * @return {String}
 */
export default function timeFormatToRecent (millisecond, opt) {
  opt = _Object(opt)
  millisecond = _Number(millisecond)
  var nowStamp = _Number(opt.nowStamp) || +new Date
  var oldTime = convertTime(new Date(millisecond))
  var nowTime = convertTime(new Date(nowStamp))
  // 今日过了多少秒
  var nowDayPass = nowTime.hour * ONE_HOUR_TIME_STAMP + nowTime.minute * ONE_MINUTE_TIME_STAMP + nowTime.second * ONE_SECOND_TIME_STAMP + _Number(nowTime.milliSecond);
  var last = nowStamp - millisecond
  var chaDay = last - nowDayPass

  var res = ''
  var day = Math.floor(last/ONE_DAY_TIME_STAMP); last = last % ONE_DAY_TIME_STAMP;
  var hour = Math.floor(last/ONE_HOUR_TIME_STAMP); last = last % ONE_HOUR_TIME_STAMP;
  var minute = Math.floor(last/ONE_MINUTE_TIME_STAMP); last = last % ONE_MINUTE_TIME_STAMP;
  var second = Math.floor(last/ONE_SECOND_TIME_STAMP); last = last % ONE_SECOND_TIME_STAMP;

  if(second<1) res = '刚刚'
  if(second) res = second + '秒前'
  if(minute) res = minute + '分前'
  if(hour) res = hour + '小时前'
  
  if(chaDay>0) {
    if(chaDay <= ONE_DAY_TIME_STAMP) {
      res = '昨天 ' + substrTime()
    } else if(chaDay <= ONE_DAY_TIME_STAMP * 2) {
      res = '前天 ' + substrTime()
    } else {
      res = `${oldTime.year===nowTime.year ? '' : oldTime.year + '-'}` + `${oldTime.month}-${oldTime.day} ${substrTime()}`
    }
  }

  function substrTime () {
    let str = `${oldTime.hour}:${oldTime.minute}`
    if(opt['show_second']) str += `:${oldTime.second}`  
    if(opt['show_millsecond']) str += `:${oldTime.milliSecond}`  
    return str
  }

  return res
}






/*




timeFormatToRecent(+new Date(+new Date()-1000*10))
timeFormatToRecent(+new Date('2019-09-24 13:20:22'))
timeFormatToRecent(+new Date('2019-09-24 11:30:22'))
timeFormatToRecent(+new Date('2019-09-24 00:00:00'))
timeFormatToRecent(+new Date('2019-09-23 23:59:58'))
timeFormatToRecent(+new Date('2019-09-23 00:00:00'))
timeFormatToRecent(+new Date('2019-09-22 00:00:00'))
timeFormatToRecent(+new Date('2019-09-22 15:47:25'))
timeFormatToRecent(+new Date('2019-09-21 05:23:58'))
timeFormatToRecent(+new Date('2018-03-16 05:23:58'))



*/