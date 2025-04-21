import formatTime from "./formatTime"
import isNull from "./isNull"
import isNumber from "./isNumber"
import padStart from "./padStart"


const oneDay = 1000 * 60 * 60 * 24
const oneWeek = oneDay * 7

function parseWeek (year: number, month: number, day: number) {  
  const t = new Date(year, month, day)
  let week = t.getDay()
  if(week === 0) {
    week = 7
  }

  const yearStart = new Date(t.getFullYear(), 0, 1).getTime()
  const startTime = Math.max(t.getTime() - oneDay * (week-1), yearStart)
  const endTime = t.getTime() + oneDay * (7-week)


  return {
    start: formatTime(startTime),
    now: formatTime(t.getTime()),
    end: formatTime(endTime),
    startStamp: startTime,
    endStamp: endTime,
    year: t.getFullYear(),
    month: t.getMonth() + 1,
    day: t.getDate(),
    week
  }
}


function formatWeekTime (stamp: number) {
  const t = new Date(stamp)
  const y = t.getFullYear()
  const month = t.getMonth() + 1
  const day = t.getDate()
  return `${padStart(y, 4, '0')}-${padStart(month, 2, '0')}-${padStart(day, 2, '0')}`
}

function getYearWeeks (current: Date) {
  const list: {
    start: string,
    end: string
  }[] = []
  const week = parseWeek(current.getFullYear(), current.getMonth(), current.getDate())
  const startOfYearStamp = new Date(current.getFullYear(), 0, 1).getTime()

  let endStamp = week.endStamp

  while (endStamp>startOfYearStamp) {
    list.push({
      start: formatWeekTime(Math.max(endStamp-oneWeek+oneDay, startOfYearStamp)),
      end: formatWeekTime(endStamp)
    })    
    endStamp -= oneWeek
  }

  const length = list.length

  return list.map(function (item, index) {
    return {
      week: length - index,
      label: `第${length - index}周`,
      from: item.start,
      to: item.end
    }
  }).reverse()
}

/**
 * 获取一个时间是当年第几周
 * @param endTime - 目标时间
 * @returns 第几周
 */
export function getWeekSort (endTime: string) {
  return getWeeks(endTime).length
}


/**
 * 获取截至指定时间的周列表
 * @param endTime 截止时间（起始时间为此年初）
 * @param count 需要几周，如果此年不足数量，则向往年取时间
 * @returns 周列表
 */
export default function getWeeks (endTime: string, count?: number) {
  const eD = new Date(endTime)  
  let weekList = getYearWeeks(eD)
  const needCrop = !isNull(count)
  while(needCrop && weekList.length<count) {
    const begin = new Date(weekList[0].from).getTime() - oneDay
    const moreList = getYearWeeks(new Date(begin))
    weekList = moreList.concat(weekList)
  }
  if(needCrop) {
    return weekList.slice(weekList.length-count)
  } else {
    return weekList
  }
}