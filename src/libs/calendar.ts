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

type TBeginWeek = 'sunday' | 'monday'


function getTimeDate (data: number) {
  return formatTime(data).replace(/\s.*/, '')
}

/**
 * 获取一份日历数据。日和周请根据数据自行格式化。
 * @param year 年
 * @param month 月
 * @param beginWeek 第一列为周一还是周日 
 * @returns 
 */
export default function calendar (year: number, month: number, beginWeek?: TBeginWeek) {
  const t = new Date(year, month, 0)
  const total = t.getDate()

  const result: IMonthDay[] = []
  const firstColWeek = get(beginWeek, 'monday' as TBeginWeek)
  

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
  let prefNum = firstColWeek === 'sunday' ? beginDay.week : beginDay.week - 1
  if(prefNum === 7) {
    prefNum = 0
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
  

  return arrayGroupColumn(result, 7)
}