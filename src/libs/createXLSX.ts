import { cloneEasy, isNull } from "@bestime/utils_base"


interface ITreeItem {
  [key: string]: any
  children?: ITreeItem[]
}
/**
 * 计算树形结构深度
 */
function getTreeDepth (data: ITreeItem[], count?: number) {
  count = isNull(count) ? 1 : count
  for(let a=0;a<data.length;a++) {
    const item = data[a]
    if(!isNull(item.children)) {
      const c = getTreeDepth(item.children, count+1)
      count = Math.max(count, c)
    }
  }
  return count
}

function getColSpan (item:IUseHeaderItem, startIndex: number, endIndex: number) {
  if(!isNull(item.colSpan)) return item.colSpan
  if(!item.children || item.children.length <=1) return 1
  const diff = endIndex - startIndex
  return diff === 0 ? diff : diff + 1
}

interface IXLSXTableHeaderItem {
  title: string,
  field: string,
  align?: 'center' | 'left' | 'right',
  colSpan?: number
  children?: IXLSXTableHeaderItem[]
}
interface IXLSXTableBodyItem {
  field: string,
  value: string | number
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

export default async function createXLSX (options: {
  pluginUrl: string,
  header: IXLSXTableHeaderItem[],
  body: IXLSXTableBodyItem[]
  
}) {
  const headerList: IUseHeaderItem[] = cloneEasy<any>(options.header)
  const oTable = document.createElement('table')

  const headerDepth = getTreeDepth(options.header)


  

 
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
                title: item.title,
                field: item.field,
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

  const headerHtml:Array<Array<ICreateHeaderItem | undefined>> = []

  ;(function deepCreateHeaderRow (depth: number, parent?: ICreateHeaderItem[]) {
    if(depth <= headerDepth) {
      const item = createHeaderRowData(depth, parent)
      headerHtml.push(item)
      deepCreateHeaderRow(depth + 1, item)
    }
  })(1);

  ;(function setHeaderRowSpan() {
    function countEmptyRowCell (rowIndex: number, colIndex: number) {
      let count = 0
      for(rowIndex;rowIndex<headerHtml.length;rowIndex++) {
        if(headerHtml?.[rowIndex]?.[colIndex]) break;
        count++
      }
      return count
    }
    headerHtml.forEach(function (rowList, rowIindex) {
      rowList.forEach(function (item, colIndex) {
        if(item) {
          item.rowSpan = countEmptyRowCell(rowIindex+1, colIndex) + 1
        }
      })
    })
  })();

  
  const oHeadList = headerHtml.map(function (row) {
    const oTdList = row.map(function (item) {
      if(!item || item.colSpan===0) return ;
      
      // const colSpan
      return `<td align="center" rowSpan="${item.rowSpan}" colSpan="${item.colSpan}">${item?.title}</td>`
    }).join('')
    return `<tr>${oTdList}</tr>`
  }).join('')

  oTable.innerHTML = `<thead>${oHeadList}</thead>`
  oTable.setAttribute('border', '1')
  oTable.setAttribute('cellspacing', '0')
  oTable.setAttribute('cellpadding', '0')

  console.log("headFeilds", headerHtml)

  return oTable
}