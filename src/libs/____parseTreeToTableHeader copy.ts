import cloneEasy from "./cloneEasy"
import deepFindItem from "./deepFindItem"
import getTreeDepth from "./getTreeDepth"
import isArray from "./isArray"
import isNull from "./isNull"
import treeLeafs from "./treeLeafs"

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
  isLeaf: boolean
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

/**
 
 * @param header 
 * @param config 
 * @returns 
 */
export default function parseTreeToTableHeader (header: IXLSXTableHeaderItem[], config?: IFeildMap) {
  const useConfig = isNull(config) ? defaultConfig : config
  const headerList: IUseHeaderItem[] = cloneEasy<any>(header)
  const headerDepth = getTreeDepth(header)

  const leaftList = treeLeafs(header)
  console.log("叶子", leaftList)
  
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
      let lastIndex = prefixIndex
      let nextIndex = -1
      for(let uoe=0;uoe<lastHeaderList.length;uoe++) {
        const item = lastHeaderList[uoe]
        const cdl = lastHeaderList[uoe].children
        if(cDip === rowDip) {
          
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
              isLeaf: !item.children,
              colSpan: getColSpan(item, startIdx, endIdx)
            }
          }
        } else if(cdl && cDip<rowDip) {
          if(nextIndex === -1) {
            nextIndex = uoe + prefixIndex
          }
          const start = nextIndex

          const cfd = parentRow?.[start]?.field
          // const cfd = lastHeaderList[uoe].

          // console.log("执行--------------=>", start, nextIndex,uoe,prefixIndex,cloneEasy(parentRow as any), uoe + prefixIndex,cfd, cdl, item[useConfig.field])

          
          function findHasChildIndex (formIndex: number) {
            if(isArray(parentRow)) {
              for(formIndex;formIndex<parentRow.length; formIndex++) {
                 if(parentRow[formIndex]?.isLeaf === false) {
                  return parentRow[formIndex]?.colStart
                 }
              }
            }
            
          }

          if(cfd && parentRow) {
            for(let lt=parentRow.length-1; lt>=0;lt--) {
              if(parentRow[lt]?.field === cfd) {
                const st = findHasChildIndex(lt+1)
                if(!isNull(st)) {
                  // console.log("多个地点",st)
                  nextIndex = st
                }
                break;
              }
            }
          }

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
      console.log("深度", depth, cloneEasy(item))
      headerRows.push(item)
      deepCreateHeaderRow(depth + 1, item)
    }
  })(1);

  // console.log("表头数组", cloneEasy(headerRows))

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