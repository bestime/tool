import isArray from "./isArray"
import isNull from "./isNull"
import type { TKvPair } from "./help/type-declare"
import mapTree from "./mapTree"


interface IInputHeaderItem {
  field: string
  title: string
  children: IInputHeaderItem[],
}

interface IParsedHeaderInfoItem extends IInputHeaderItem{
  count: number
  children: IParsedHeaderInfoItem[]
}

interface IParsedHeaderDataItem extends Omit<IParsedHeaderInfoItem, 'children'>{
  colStart: number,
  colEnd: number
  colSpan: number
  rowSpan: number
}




function countCol (item: TKvPair) {
  let total = 0
  if(isArray(item.children)) {
    item.children.forEach(function (cd: any) {
      total += countCol(cd)
    })
  } else {
    total = 1
  }

  return total
}



function deepParseInfo(list: IInputHeaderItem[]) {
  const pList: IParsedHeaderInfoItem[] = mapTree(list, 'children', function (c) {
    return {
      field: c.field,
      title: c.title,
      count: countCol(c)
    }
  })
  return pList
}

function createHeaderRowData (list: IParsedHeaderInfoItem[], result: Array<Array<IParsedHeaderDataItem|undefined>>, rowIndex: number, colEnd: number) {
  if(!result[rowIndex]) {
    result[rowIndex] = []
  }
  colEnd = colEnd -1
  list.forEach(function (item) {
    let colStart = colEnd + 1
    colEnd = colStart + item.count - 1
    const colSpan = colEnd - colStart + 1
    
    const parent:IParsedHeaderDataItem = {
      colStart,
      colEnd,
      colSpan,
      count: item.count,
      field: item.field,
      title: item.title,
      rowSpan: 1
    }
    
    result[rowIndex][colStart]= parent

    // 补充空值
    for(let a=1;a<item.count;a++) {
      result[rowIndex][colStart+a] = void 0
    }
    if(isArray(item.children) && item.children.length > 0) {
      createHeaderRowData(item.children, result, rowIndex+1, colStart)
    }
  })

  // 补充空值
  result.forEach(function (row) {
    for(let a = 0; a<result[0].length; a++) {
      if(!row[a]) {
        row[a] = void 0
      }
    }
  })
   
  return result
}

function getColumnFields (data: Array<Array<IParsedHeaderDataItem|undefined>>) {
  const fields: string[] = []
  
  for(let a = data.length-1;a>=0;a--) {
    data[a].forEach(function (item, colIndex) {
      if(item && item.field && isNull(fields[colIndex])) {
        fields[colIndex] = item.field
      }
    })
  }
  return fields
}

function setRowSpan (data: Array<Array<IParsedHeaderDataItem|undefined>>) {
  function countEmptyRowCell (rowIndex: number, colIndex: number) {
    let count = 0
    for(rowIndex;rowIndex<data.length;rowIndex++) {
      if(data?.[rowIndex]?.[colIndex]) break;
      count++
    }
    return count
  }
  data.forEach(function (rowList, rowIindex) {
    rowList.forEach(function (item, colIndex) {
      if(item) {
        item.rowSpan = countEmptyRowCell(rowIindex+1, colIndex) + 1
      }
    })
  })
}

/**
 * 将树形数据转换为二维数组，并包含合并行列信息
 * @param header 树形列表
 * @returns 
 */
export default function parseTreeToTableHeader (header: IInputHeaderItem[]) {
  
  // 计算每个表头向右有几个子集
  const pHeaderList = deepParseInfo(header)

  // 组装为二位数组
  const headerList = createHeaderRowData(pHeaderList, [], 0, 0)
  // 设置纵向合并
  setRowSpan(headerList)

  return {
    columns: getColumnFields(headerList),
    data: headerList,
  }
}