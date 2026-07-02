import formatTime from "./formatTime"
import get from "./get"
import { $undefinedValue } from "./help/hpConsts"
import isNull from "./isNull"
import isNumber from "./isNumber"
import padStart from "./padStart"


const oneDay = 1000 * 60 * 60 * 24
const oneWeek = oneDay * 7

type TWeekNum = 1 | 2 | 3 | 4 | 5 | 6 | 7

function parseWeek (year: number, month: number, day: number, firstColWeek: TWeekNum) {  
  const t = new Date(year, month, day)
  let week = t.getDay()
  if(week === 0) {
    week = 7
  }

  const yearStart = new Date(t.getFullYear()).getTime()
  let diffPrev = week-firstColWeek
  if(diffPrev<0) {
    diffPrev+=7
  }
  const startTime = Math.max(t.getTime() - oneDay * diffPrev, yearStart)
  const endTime = startTime + oneDay * 6

  // console.log("开始", firstColWeek, `${year}/${month+1}/${day}`,week, formatTime(startTime),diffPrev)
  


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
  return `${padStart(y, 4, '0')}/${padStart(month, 2, '0')}/${padStart(day, 2, '0')}`
}

function getYearWeeks (current: Date, firstColWeek: TWeekNum, cut?: boolean) {
  const list: {
    start: string,
    end: string
  }[] = []
  const week = parseWeek(current.getFullYear(), current.getMonth(), current.getDate(), firstColWeek)
  const maxTimeStamp = new Date(week.year+'/12/31 00:00:00').getTime()
  const startOfYearStamp = new Date(current.getFullYear(), 0, 1).getTime()
  

  let endStamp = week.endStamp

  while (endStamp>=startOfYearStamp) {
    let rS = endStamp-oneWeek+oneDay
    let rE = endStamp
    if(cut) {
      rS = Math.max(rS, startOfYearStamp)
      rE = Math.min(rE, maxTimeStamp)
    }
    
    list.push({
      start: formatWeekTime(rS),
      end: formatWeekTime(rE)
    })    
    endStamp -= oneWeek
    // console.log("week", week, formatTime(startOfYearStamp), formatTime(endStamp))
  }

  const length = list.length

  
  return list.map(function (item, index) {
    const weekSort = length - index
    return {
      key: `${current.getFullYear()}_${weekSort}`,
      week: weekSort,
      label: `第${weekSort}周`,
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
 * @param count 需要几周，如果此年不足数量，则向往年取时间，不填则仅后去当年数据
 * @param config 额外配置
 * @param config.beginWeek 从星期几开始。可选范围为（1-7）默认 1
 * @param config.cut 是否切断上年尾，下年首。默认 true
 * @returns 周列表
 */
export default function getWeeks (endTime: string, count?: number, config?: {
  beginWeek?: TWeekNum
  cut?: boolean
}) {
  const firstColWeek = get(config, 1, $undefinedValue, 'beginWeek')
  const cut = get(config, true, $undefinedValue, 'cut')
  const eD = new Date(endTime)  
  let weekList = getYearWeeks(eD, firstColWeek, cut)
  const needCrop = !isNull(count)
  while(needCrop && weekList.length<count) {
    const begin = new Date(weekList[0].to).getTime() - oneDay*6
    // console.log("weekList", formatTime(begin), weekList)
    const moreList = getYearWeeks(new Date(begin), firstColWeek, cut)
    weekList = moreList.concat(weekList)
  }
  if(needCrop) {
    return weekList.slice(weekList.length-count)
  } else {
    return weekList
  }
}