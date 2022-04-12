import clone from './clone'
import formatTime from './formatTime'
import trim from './trim'
import assign from './assign'

function arrToLabel (list) {
  list = clone(list)
  var prefix = list.splice(0, 3)
  return trim(prefix.join('') + ' ' + list.join(''))
}

function handleOne (startTime, endTime) {
  var refer = startTime.split[0]
  var modify = endTime.split[1]

  for(var a = 0; a<refer.length; a++) {
    if(refer[a] === modify[a]) {
      modify[a] = ''
    } else {
      break;
    }
  }
}

/**
 * 格式化时间轴
 * @param {Array} list时间列表
 * @param {object} format 格式化配置
 * @return {Array}
 */
export default function timeLine (list, format) {
  format = assign({
    year: 'YYYY年',
    month: 'MM月',
    day: 'DD日',
    hour: 'HH时',
    minute: 'mm分',
    second: 'ss秒',
    milliSecond: 'SSS毫秒',
  }, format)


  var result = [], item, date;
  for(var a = 0; a <list.length; a++) {
    date = new Date(list[a])

    var fmt = [
      formatTime(format.year, date),
      formatTime(format.month, date),
      formatTime(format.day, date),
      formatTime(format.hour, date),
      formatTime(format.minute, date),
      formatTime(format.second, date),
      formatTime(format.milliSecond, date),
    ]

    result.push({
      value: list[a],
      timestamp: +date,
      split: [
        fmt,
        clone(fmt)
      ]
    })    
  }

  result.sort(function (a, b) {
    return a.millisecond - b.millisecond
  })      

  for(var a = 1; a<result.length; a++) {
    handleOne(result[a-1], result[a])
  }

  for(var a = 0; a<result.length; a++) {
    item = result[a]
    item.label = arrToLabel(item.split[1])
    item.split = item.split[1]
  }

  return result;
}