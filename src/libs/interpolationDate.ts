import forEach from "./forEach"
import trim from "./trim"

interface IDataTwoDiItem<T> {
  label: string
  data: T[]
}

interface IConfig {
  timeFieldName: string,
  timeFormatter: (timestamp: number) => string
}


/**
 * 补全所有列表中不存在的日期
 * @param dataTwoDi 
 * @param config 
 * @returns 
 */
export default function interpolationDate<T> (dataTwoDi: Array<IDataTwoDiItem<T>>, config: IConfig) {
  
  const timeStampList: number[] = []
  const timeStrList: string[]  =[]
  forEach(dataTwoDi, function (record) {
    forEach(record.data, function (item: any) {
      const dateTime = trim(item[config.timeFieldName]).replace(/-/g, '/')
      const timestamp = new Date(dateTime).getTime()
      if(!timeStampList.includes(timestamp)) {
        timeStampList.push(timestamp)
      }

      item.$timestamp = timestamp
    })
  })

  // 先排序
  timeStampList.sort(function (a, b) {
    return a - b
  })

  // 先排序
  forEach(dataTwoDi, function (record) {
    record.data.sort(function (a: any, b: any) {
      return a.$timestamp - b.$timestamp
    })
  })

  // 再插值
  forEach(timeStampList, function (_, tidx) {
    const tf = config.timeFormatter(_)
    timeStrList.push(tf)
    forEach(dataTwoDi, function (record) {
      // const len = record.data.length
      const tItem = record.data.find(function (c: any) {
        return c.$timestamp === _
      })
      if(tItem) {
        // @ts-ignore
        tItem[config.timeFieldName] = tf
      } else {
        const newItem: any = {}
        newItem[config.timeFieldName] = tf
        record.data.splice(tidx, 0, newItem)
      }
    })
  })

  // console.log("时间列表", timeStampList, dataTwoDi)

  return {
    timeList: timeStrList,
    data: dataTwoDi
  }
}