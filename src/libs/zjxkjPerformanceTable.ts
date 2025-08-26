import _Array from "./_Array"
import _Number from "./_Number"
import cloneEasy from "./cloneEasy"
import isArray from "./isArray"
import last from "./last"
import mapTree from "./mapTree"
import tree from "./tree"
import treeLeafs from "./treeLeafs"
import trim from "./trim"
import uuid from "./uuid"

/**
 * SCORE_ACTUAL 分值
 * COMPLETE_VALUE_RATE 完成值/率
 * COMMENT 备注
 */
const fixColKeys = ['COMPLETE_VALUE_RATE', 'COMMENT', 'SCORE_ACTUAL']
type TTaskType = 1 | 2 | 3 | 4
interface IOption {
  headers: {
    attrId: string
    attrName: string
    attrKey: string
  }[]
  dataInfo: {
    id: string
    order: number
    taskId: string
    content: string
    type: TTaskType
    url: string
  }[],
  row: {
    comment: string
    completeRate?: number
    completeValue?: number
    id: string
    order: number
    parentTaskId: string
    scoreActual?: number
    attrs: {
      attrId: string
      value: string
    }[]
  }[]
}

interface IDeptYjTreeItem {
  id: string,
  pid: string
  label: string
  meta: {
    attrId: string
  }
  ext: any
  children?: IDeptYjTreeItem[]
}

interface IDeptRowItem {
  dataId: string
  colspan: number
  rowspan: number
  meta: Record<string, any>
  content: string
}

interface IUseTableHeader {
  attrId: string
  field: string
  label: string
  colspan: number
}



interface IUseCellV {
  /** 前端循环用的key */
  key: string
  /** 数据类型 */
  taskType: TTaskType,
  /** 单元格映射的详情ID */
  taskId: string | undefined
  /** 单元格其中一项的内容 */
  content: string
  /** 用于具体接口传参用 */
  apiId: string | undefined
  /** 点击后跳转的链接 */
  link: string | undefined
}

interface IUseTableCell {
  id: string,
  meta: {
    attrId:string,
    comment:string,
    scoreActual:string,
    completeRate:string,
    completeValue:string,
  }
  colspan: Record<string, number>
  rowspan: Record<string, number>
  cell: Record<string, IUseCellV[]>
  
}

function getHeaderField (index: number) {
  return `col_${index}`
}

function insertAttrs (record: IDeptRowItem[], data: IDeptYjTreeItem) {
  
  data.ext.attrs.forEach(function (att: Record<string, any>) {
    
    record.push({
      dataId: data.id,
      content: att.value,
      rowspan: 1,
      colspan: 1,
      meta: {
        attrId: att.attrId,
        taskId: att.taskId,
        comment: data.ext.comment,
        scoreActual: data.ext.scoreActual,
        completeRate: data.ext.completeRate,
        completeValue: data.ext.completeValue,
      },
    })
  })
}

function flatDeptTree (deptTree: IDeptYjTreeItem[], result: IDeptRowItem[][], startRowIndex: number, level: number) {
  let rowIdx = startRowIndex-1
  deptTree.forEach(function (item, index) {
    const leafs = treeLeafs(item.children ?? []).length || 1
    for(let gidx = 0; gidx<leafs; gidx++) {
      rowIdx++
      result[rowIdx] = result[rowIdx] || []
      const cellItem:IDeptRowItem = {
        dataId:item.id,
        content: item.label,
        rowspan: gidx>0?0:leafs,
        colspan: 1,
        meta: item.meta,
        // @ts-ignore
        test: '===='
      }

      result[rowIdx][level] = cellItem
      
      if(item.children) {
        if(cellItem.rowspan) {
          flatDeptTree(item.children, result, rowIdx, level+1)
        }
      }else {
        item.ext.attrs.push({
          attrId: 'SCORE_ACTUAL',
          value: item.ext.scoreActual,
        })
        item.ext.attrs.push({
          attrId: 'COMMENT',
          value: item.ext.comment,
        })
        item.ext.attrs.push({
          attrId: 'COMPLETE_VALUE_RATE',
          value: item.ext.completeValue,
        })
        
        insertAttrs(result[rowIdx], item)
      }
    }
  })
  return result
}

interface IHeaderNewItem {
  attrId: string
  label: string
  attrIndex: number
  colspan: number
}



/**
 * 计算一个表头占几列
 */
function getHeaderItemColumnNum (hid: string, flatList: IDeptRowItem[][]) {
  let count = 1

  flatList.forEach(function (record) {
    const rct = record.filter(c=>c.meta.attrId === hid).length

    count = Math.max(rct, count)
  })

  return count
}

function getTableHeader (flatList: IDeptRowItem[][], headers: IOption['headers']) {
  const hMap: Record<string, number> = {}
  const myHeader:IHeaderNewItem[] = []

  headers.forEach(function (item) {
    if(fixColKeys.includes(item.attrKey)) {
      item.attrId = item.attrKey
    }
    const cNum = getHeaderItemColumnNum(item.attrId, flatList)
    hMap[item.attrId] = cNum
    for(let i=0;i<cNum;i++) {
      myHeader.push({
        attrId: item.attrId,
        attrIndex: i,
        colspan: i===0 ? cNum : 0,
        label: item.attrName        
      })
    }
    
  })

  return {
    list: myHeader,
    count: hMap
  }
}

function convertHeaderAndBodyToTable (headers: IHeaderNewItem[], body: IDeptRowItem[][], dataInfo: IOption['dataInfo']) {
  const nHeaderList:IUseTableHeader[] = headers.map(function (hd, colIdx) {
    return {
      attrId: hd.attrId,
      field:getHeaderField(colIdx),
      label: hd.label,
      colspan: hd.colspan
    }
  })

  const nBody = body.map(function (row) {
    const lastItem = last(row)!
    const item: IUseTableCell = {
      id: lastItem?.dataId,
      meta: {
        attrId:lastItem.meta.attrId,
        completeRate:trim(lastItem.meta.completeRate),
        comment:trim(lastItem.meta.comment),
        scoreActual:trim(lastItem.meta.scoreActual),
        completeValue:trim(lastItem.meta.completeValue),
      },
      colspan: {},
      rowspan: {},
      cell: {}
    }
    row.forEach(function (colItem, colIdx) {
      const field =getHeaderField(colIdx) 

      let cellList:IUseCellV[] = []
      if(colItem.meta.taskId) {
        cellList = dataInfo.filter(c=>c.taskId === colItem.meta.taskId).map(function (info) {
          return {
            key: uuid(),
            taskId: colItem.meta.taskId,
            taskType: info.type,
            apiId: info.id,
            link: info.url,
            content: trim(info.content)
          }
        })
      } else {
        cellList = [
          {
            key: uuid(),
            taskId: colItem.meta.taskId,
            taskType: 1,
            apiId: undefined,
            link: undefined,
            content: trim(colItem.content)
          }
        ]
      }

      item.cell[field] = cellList

      
      item.colspan[field] = colItem.colspan
      item.rowspan[field] = colItem.rowspan
    })
    return item
  })
  const totalScore = nBody.reduce(function (t, item) {
    return t + _Number(item.meta.completeValue)
  }, 0)

  return {
    headers: nHeaderList,
    body: nBody,
    totalScore
  }
}

/**
 * 智界新科技：解析交易中心业绩合同表为一维数组
 * @remarks 前台、后台都在使用，为了不让同事误改此方法，所以封装在自己工具库里
 * 
 * @param query - 接口返回的数据
 * @returns 给前端方便使用的数据格式
 */
export default function zjxkjPerformanceTable (query: IOption) {
  query.dataInfo = _Array(query.dataInfo)
  if(query.headers.length === 0) {
    query.row = []
  }
  const treeData = tree(query.row, {
    id: 'id',
    pid: 'parentTaskId',
    children: 'children'
  })

  let deptTree:IDeptYjTreeItem[] = mapTree(treeData, 'children',function (item) {
    const hasChildren = isArray(item.children) && item.children.length
    const attrItem = hasChildren ? item.attrs[0] : void 0
    
    return {
      id: item.id,
      pid: item.pid,
      label:attrItem?.value ?? 'END',
      meta: {
        attrId: attrItem?.attrId,
      },
      ext: item,
    } as IDeptYjTreeItem
  })  

  // const headers = getTableHeader(deptTree, query.headers)

  // deptTree = [deptTree[0]]

  
  // console.log("第一步", cloneEasy(deptTree))
  const result = flatDeptTree(deptTree, [], 0, 0)
  // console.log("第二步", cloneEasy(result))
  const headerInfo = getTableHeader(result, query.headers)
  
  const newList = result.map(function (row, index) {
    const record:IDeptRowItem[] = []
    headerInfo.list.forEach(function (hd, hidx) {
      const arr = row.filter(c=>c.meta.attrId === hd.attrId)
      const item: IDeptRowItem = arr[hd.attrIndex]
      
      if(item) {
        const colspan = arr[hd.attrIndex+1] ? 1:headerInfo.count[hd.attrId]-hd.attrIndex
        item.colspan = colspan
        record.push(item)
      } else {
        record.push({
          dataId: '-',
          colspan: 0,
          rowspan: 1,
          meta: {
            attrId: hd.attrId,
          },
          content: '占位'
        })
      }
    })
    return record
  })

  // console.log("最终结果",cloneEasy(newList))
  // console.log("树", deptTree, headerInfo)

  const realRes = convertHeaderAndBodyToTable(headerInfo.list, newList, query.dataInfo)
  // console.log("realRes", realRes)
  
  return realRes
}