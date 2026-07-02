import arrayGroupColumn from "./arrayGroupColumn"
import formatTime from "./formatTime"
import get from "./get"
import last from "./last"
import padStart from "./padStart"

interface IMonthDay {
  date: string,
  week: number
  timestamp: number
  targetMonth: boolean,
}

function getWeek (dateStr: string) {
  return new Date(dateStr).getDay() || 7
}

const oneDay = 1000 * 60 * 60 * 24

function getTimeStamp (date: string) {
  return new Date(date).getTime()
}

function getTimeDate (data: number) {
  return formatTime(data).replace(/\s.*/, '')
}

/**
 * 获取一份日历数据。日和周请根据数据自行格式化。
 * @param year 年
 * @param month 月（1-12）
 * @param beginWeek 第一列为星期几，范围为（1-7）
 * @param removeEmptyRow 是否移除没有当月的行
 * @returns 
 */
export default function calendar (year: number, month: number, beginWeek?: number, removeEmptyRow?: boolean) {
  const t = new Date(year, month, 0)
  const total = t.getDate()

  const result: IMonthDay[] = []
  const firstColWeek = get(beginWeek, 1 as number)
  

  for(let day = 1; day <= total; day++) {
    const date = `${year}/${padStart(month, 2, '0')}/${padStart(day, 2, '0')}`
    result.push({
      date,
      week: getWeek(date),
      timestamp: getTimeStamp(date),
      targetMonth: true
    })
  }

  const beginDay = result[0]!
  const lastDay = last(result)!
  
  // 向前补
  let prefNum = firstColWeek === 7 ? beginDay.week : beginDay.week - firstColWeek
  
  if(prefNum === 7) {
    prefNum = 0
  } else if(prefNum<0) {
    prefNum = 7+prefNum
  }
  for(let prefIdx=1; prefIdx <= prefNum; prefIdx++) {
    const timestamp = beginDay.timestamp - oneDay * prefIdx
    const date = getTimeDate(timestamp)
    result.unshift({
      date,
      week: getWeek(date),
      timestamp,
      targetMonth: false
    })
  }

  // 向后补，需要6行
  const nextNum = 42 - result.length
  for(let nextIdx = 1; nextIdx <=nextNum; nextIdx++) {
    const timestamp = lastDay.timestamp + oneDay * nextIdx
    const date = getTimeDate(timestamp)
    result.push({
      date,
      week: getWeek(date),
      timestamp,
      targetMonth: false
    })
  }
  
  const grid = arrayGroupColumn(result, 7)

  return removeEmptyRow ? grid.filter(function(item){
    return item.some(function (c) {
      return c.targetMonth
    })
  }): grid
}