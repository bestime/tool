import cloneEasy from "./cloneEasy"
import getTreeDepth from "./getTreeDepth"
import isNull from "./isNull"

function getColSpan (item:IUseHeaderItem, startIndex: number, endIndex: number) {
  if(!isNull(item.colSpan)) return item.colSpan
  if(!item.children || item.children.length <=1) return 1
  const diff = endIndex - startIndex
  return diff === 0 ? diff : diff + 1
}

interface IXLSXTableHeaderItem {
  [key: string]: any
  colSpan?: number
  children?: IXLSXTableHeaderItem[]
}


type IUseHeaderItem = IXLSXTableHeaderItem & {
  colStart: number,
  colEnd: number
}

interface ICreateHeaderItem {
  title: string,
  field: string,
  colStart: number
  colEnd: number
  rowSpan?: number
  colSpan: number
}

interface IFeildMap {
  title: string,
  field: string
}

const defaultConfig: IFeildMap = {
  title: 'title',
  field: 'field'
}

export default function parseTreeToTableHeader (header: IXLSXTableHeaderItem[], config?: IFeildMap) {
  const useConfig = isNull(config) ? defaultConfig : config
  const headerList: IUseHeaderItem[] = cloneEasy<any>(header)
  const headerDepth = getTreeDepth(header)
  
  function deepGetColEnd (colEnd: number, children?: IUseHeaderItem[]) {
    if(children) {
      colEnd += children.length - 1
      children.forEach(function (cd) {
        colEnd = deepGetColEnd(colEnd, cd.children as IUseHeaderItem[])
      })
      return colEnd
    } else {
      return colEnd
    }
  }

  function createHeaderRowData (rowDip: number, parentRow?: ICreateHeaderItem[]) {
    const res: ICreateHeaderItem[] = []
    ;(function deepChildrenFloor(cDip: number, lastHeaderList: IUseHeaderItem[], prefixIndex: number) {
      for(let a=0;a<lastHeaderList.length;a++) {
        const cdl = lastHeaderList[a].children
        if(cDip === rowDip) {
          let lastIndex = prefixIndex
          lastHeaderList.forEach(function (item) {
            const colStart = lastIndex
            lastIndex = deepGetColEnd(lastIndex, item.children as IUseHeaderItem[])
            const colEnd = lastIndex
            lastIndex++
            
            for(let a=0;a<=colEnd-colStart;a++) {
              const startIdx = a+colStart
              const endIdx = a === 0 ? colEnd : startIdx
              res[startIdx] = {
                title: item[useConfig.title],
                field: item[useConfig.field],
                colStart: startIdx,
                colEnd: endIdx,
                colSpan: getColSpan(item, startIdx, endIdx)
              }
            }
          })
        } else if(cdl && cDip<rowDip) {
          const start = parentRow?.[a+prefixIndex]?.colStart ?? 0
          deepChildrenFloor(cDip + 1, cdl as any[], start)
        }
      }
    })(1, headerList, 0);
    return res
  }

  const headerRows:Array<Array<ICreateHeaderItem | undefined>> = []

  ;(function deepCreateHeaderRow (depth: number, parent?: ICreateHeaderItem[]) {
    if(depth <= headerDepth) {
      const item = createHeaderRowData(depth, parent)
      headerRows.push(item)
      deepCreateHeaderRow(depth + 1, item)
    }
  })(1);

  ;(function setHeaderRowSpan() {
    function countEmptyRowCell (rowIndex: number, colIndex: number) {
      let count = 0
      for(rowIndex;rowIndex<headerRows.length;rowIndex++) {
        if(headerRows?.[rowIndex]?.[colIndex]) break;
        count++
      }
      return count
    }
    headerRows.forEach(function (rowList, rowIindex) {
      rowList.forEach(function (item, colIndex) {
        if(item) {
          item.rowSpan = countEmptyRowCell(rowIindex+1, colIndex) + 1
        }
      })
    })
  })();

  function getColumnFields () {
    const fields: string[] = []
    for(let a = headerRows.length-1;a>=0;a--) {
      headerRows[a].forEach(function (item, colIndex) {
        if(item && item.field && isNull(fields[colIndex])) {
          fields[colIndex] = item.field
        }
      })
    }
    return fields
  }

  const fileList = getColumnFields()

  return {
    columns: fileList,
    data: headerRows,
  }
}