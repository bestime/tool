const _Number = require('./_Number')
const convertTime = require('./convertTime')
const _Object = require('./_Object')

/**
 * @param {Number} millisecond 毫秒 
 * @param {Object} opt 毫秒
 *    @option {Boolean} show_second 结果是否显示秒
 *    @option {Boolean} show_millsecond 结果是否显示毫秒
 * @return {String}
 */
function timeFormatToRecent (millisecond, opt) {
  opt = _Object(opt)
  var oneDay = 1000 * 60 * 60 * 24
  var oneHour = 1000 * 60 * 60
  var oneMinute = 1000 * 60
  var oneSecond = 1000
  millisecond = _Number(millisecond)

  var nowStamp = +new Date
  var oldTime = convertTime(new Date(millisecond))
  var nowTime = convertTime(new Date(nowStamp))
  // 今日过了多少秒
  var nowDayPass = nowTime.hour * oneHour + nowTime.minute * oneMinute + nowTime.second * oneSecond + _Number(nowTime.milliSecond);
  last = nowStamp - millisecond
  var chaDay = last - nowDayPass

  var res = ''
  var day = Math.floor(last/oneDay); last = last % oneDay;
  var hour = Math.floor(last/oneHour); last = last % oneHour;
  var minute = Math.floor(last/oneMinute); last = last % oneMinute;
  var second = Math.floor(last/oneSecond); last = last % oneSecond;

  if(second<1) res = '刚刚'
  if(second) res = `${second}秒前`
  if(minute) res = `${minute}分前`
  if(hour) res = `${hour}小时前`
  
  if(chaDay>0) {
    if(chaDay <= oneDay) {
      res = `昨天 ${substrTime()}`
    } else if(chaDay <= oneDay * 2) {
      res = `前天 ${substrTime()}`
    } else {
      res = `${oldTime.year===nowTime.year ? '' : oldTime.year + '-'}` + `${oldTime.month}-${oldTime.day} ${substrTime()}`
    }
  }

  function substrTime (s, ms) {
    let str = `${oldTime.hour}:${oldTime.minute}`
    if(opt['show_second']) str += `:${oldTime.second}`  
    if(opt['show_millsecond']) str += `:${oldTime.milliSecond}`  
    return str
  }
  console.log(`[${oldTime.year}-${oldTime.month}-${oldTime.day} ${oldTime.hour}:${oldTime.minute}:${oldTime.second}:${oldTime.milliSecond}] => ${res}`)

  return res
}

module.exports = timeFormatToRecent






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