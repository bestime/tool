import cloneEasy from "./cloneEasy"
import type { TKvPair } from "./help/type-declare"
import isEmpty from "./isEmpty"
import trim from "./trim"
type ISpanTableItem<T extends TKvPair> = T & {
  $rowSpan: Record<string, number>
  $colSpan: Record<number, number>
}

function sameRowCellCount (startIndex: number, key: string, value: any,data: any[]) {
  let count = 1
  startIndex++
  for(startIndex; startIndex<data.length; startIndex++) {
    if(data[startIndex][key] !== value) {
      break;
    } else {
      count++
    }
  }

  return count
}

function findPrevRowSpanNum (data: any[], currentIndex: number, fieldName: string) {
  let count = 0
  for(currentIndex;currentIndex>=0;currentIndex--) {
    count = data[currentIndex].$rowSpan[fieldName]
    if(count>0) {
      break;
    }
  }
  // if(fieldName === 'grade') {
  //   console.log("count", fieldName, count)
  // }
  
  return count
}


function sameColSellCount (startIndex: number, value: any,data: any, keys: string[]) {
  let count = 1
  startIndex++
  for(startIndex;startIndex<keys.length;startIndex++) {
    const targetKey = keys[startIndex]
    const targetValue = trim(data[targetKey], '*')
    if(targetValue === value || isEmpty(targetValue)) {
      count++
    } else {
      break;
    }
  }
  return count
}

/**
 * 合并单元格。不改变原数组
 * @param data - 一维数组
 * @param fields - 合并的字段
 * @returns 合并后的数据。会在每一项中添加两个字段 "$rowSpan" "$colSpan"
 */

export default function spanTable<T extends TKvPair> (data: T[], fields: string[]): ISpanTableItem<T>[] {
  const result:ISpanTableItem<T>[] = cloneEasy(data) as ISpanTableItem<T>[]
  const rowCount: Record<string, number> = {}


  function rowSpanOneCol (fieldName: string, prevFieldName?: string) {    
    let prevSum = 0
    result.forEach(function (item, index) {
      item.$rowSpan = item.$rowSpan ?? {}
      
      const value = item[fieldName]
      rowCount[fieldName] = rowCount[fieldName] ?? 0    
      if(rowCount[fieldName]>1) {
        item.$rowSpan[fieldName] = 0
        rowCount[fieldName]--
      } else {
        let count = sameRowCellCount(index, fieldName, value, result)
        if(prevFieldName !== void 0) {          
          const prevTotal = findPrevRowSpanNum(result, index, prevFieldName)
          
          if(prevSum > 0) {
            if((prevSum + count) >= prevTotal) {
              count = prevTotal - prevSum
              prevSum = 0
            } else {
              prevSum += count
            }
          } else {
            // 寻找前一列最近合并非0值
            if(count < prevTotal) {
              prevSum = count
            } else {
              count = prevTotal
            }
          }
        }
        rowCount[fieldName] = count
        item.$rowSpan[fieldName] = rowCount[fieldName]
      } 
    })
  }

  fields.forEach(function (fieldName, idx) {
    rowSpanOneCol(fieldName, fields[idx-1])
  })

  // 处理横向合并
  result.forEach(function (row) {    
    row.$colSpan = {}
    let colCount = 0
    fields.forEach(function (fieldName, idx) {
      const colValue = row[fieldName]
      if(colCount>1) {
        row.$colSpan[idx] = 0
        colCount--        
      } else {
        colCount = sameColSellCount(idx, colValue, row, fields)
        row.$colSpan[idx] = colCount
      }
    })
  })

  return result
}