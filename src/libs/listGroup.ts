import getRatio from "./getRatio"
import cloneEasy from "./cloneEasy"
import deepFindItem from "./deepFindItem"
import difference from "./difference"
import forEachKvPair from "./forEachKvPair"
import forEachTree from "./forEachTree"
import type { TKvPair } from "./help/type-declare"
import isArray from "./isArray"
import isNull from "./isNull"
import mapKvPair from "./mapKvPair"
import uniq from "./uniq"


type TListGroupKey<T extends TKvPair> = {
  field: string | string[],
  sort?: (a: TInnerGroupListItem<T>, b: TInnerGroupListItem<T>) => number
}

type TGetValueField = 'row-avg' | string

interface ICellSummary {
  denominator?: [string, 'length' | 'uniqLength'],
  /**
   * sum 求和
   * length 长度
   * uniqLength 去重长度
   */
  numerator: [string, 'sum' | 'length' | 'uniqLength']
}

interface IListGroupOption<T extends TKvPair> {
  path: TListGroupKey<T>[],
  /** 将此字段转为列 */
  colField?: keyof T;
  cellSummary?: ICellSummary,
  cellProportion?: Record<string, {
    denominator: string,
    numerator: string,
  }>,
  cellHorizontalSummary?: Record<string, ICellSummary>
}

type TInnerGroup<T> = Record<string, {
  uidPath: string[],
  uid: string,
  data: T[],
  child: TInnerGroup<T>
}>

function getUniqId (fields: string | string[], item: TKvPair) {
  const id: string[] = []
  if(isArray(fields)) {
    fields.forEach(function (k) {
      id.push(item[k])
    })
  } else {
    id.push(item[fields])
  }
  
  return id.join('→')
}

interface TInnerColumnsSummaryItem<T> extends TKvPair {
  data: T[],
  summary: number,
  _collect: any[]
}

type TInnerGroupListItem<T extends TKvPair> = {
  uid: string,
  uidPath: string[],
  data: T[],
  _columns: Record<string, TInnerColumnsSummaryItem<T>>,
  _columnRiseRatio: Record<string, number>,
  _columnTotal: Record<string, number>,
  _columnProportion: Record<string, number>,
  isLeaf: boolean
  children: TInnerGroupListItem<T>[]
}

function _rowToColumn <T extends TKvPair>(data: T[], options: IListGroupOption<T>) {

  
  const _map: Record<string, TInnerColumnsSummaryItem<T>> = {}
  
  const colField = options.colField
  if(isNull(colField) || !data.length) return _map
  const cellSummary = options.cellSummary
    data.forEach(function (item) {
      const key = item[colField]
      _map[key] = _map[key] || {
        data: [],
        summary: 0,
        _collect: []
      }
      _map[key].data.push(item)
      // 合计数据
      if(cellSummary) {
        const vo = item[cellSummary.numerator[0]]      
        _map[key].summary += vo
        _map[key]._collect.push(vo)
      }
    })


    if(isNull(cellSummary)) return _map
    
    for(let key in _map) {
      const item = _map[key]
      let base = 1
      
      // 除数
      const denominator = cellSummary.denominator
      if(denominator) {
        switch(denominator[1]) {
          case 'length':
            base = item.data.map(c => c[denominator[0]]).length
            break;
          case 'uniqLength':
            base = uniq(item.data.map(c => c[denominator[0]])).length
            break;
        }
      }
      
      // 被除数
      switch(cellSummary.numerator[1]) {
        case 'sum': 
          item.summary = item.summary / base
          break;
        case 'length':
          item.summary = item._collect.length / base
          break;
        case 'uniqLength':
          item.summary = uniq(item._collect).length / base
          break;
      }      
    }

    // 行统计
    ;(function () {
      let count = 0
      let sum = 0
      forEachKvPair(_map, function (v) {
        count++
        sum += v.summary
      })
      _map['row-avg'] = {
        data,
        summary: sum / count,
        _collect: data
      }
    })();

    // 行计算（自定义列）
    if(options.cellHorizontalSummary) {
      forEachKvPair(options.cellHorizontalSummary, function (v, k) {
        let tt = 0
        
        switch(v.numerator[1]) {
          case 'length':
            tt = data.map(c=>c[v.numerator[0]]).length
            break;
          case 'uniqLength':
            const a1 = data.map(c=>c[v.numerator[0]])
            tt = uniq(a1).length
            break;
        }
        _map[k] = {
          data: data,
          summary: tt,
          _collect: data
        }
      })
    }

    // 计算横向的比重
    if(options.cellProportion) {
      forEachKvPair(options.cellProportion, function (v, k) {
        _map[k] = {
          data: [],
          summary: getRatio(_map[v.numerator].summary, _map[v.denominator].summary),
          _collect: []
        }
      })
    }

    
    

    

  

  


  return _map
}


function _groupToList<T extends TKvPair>(data: TInnerGroup<T>, deps: number, currentDeps: number, options: IListGroupOption<T>) {
  const result: TInnerGroupListItem<T>[] = []
  
  for(let key in data) {
    const isLeaf = deps === currentDeps
    const children = _groupToList(data[key].child, deps, currentDeps+1, options)
    
    result.push({      
      uidPath: data[key].uidPath,
      uid: data[key].uid,
      data: data[key].data,
      _columnRiseRatio: {},
      _columnTotal: {},
      _columnProportion: {},
      _columns: _rowToColumn(data[key].data, options),
      isLeaf,
      children
    })
  }
  return result
}

function deepGroup<T extends TKvPair> (data: T[], options: IListGroupOption<T>) {
  const result: TInnerGroup<T> = {}
  let deps = 0


  function handler ( gp: TInnerGroup<T>, children: T[], parentPath: string[]) {

    for(let index = 0; index<children.length; index++) {
      const item = children[index]
      const uid = getUniqId(options.path[deps].field, item)
 
      
   
      gp[uid] = gp[uid] || {
        uidPath: parentPath.concat(uid),
        uid,
        data: [],
        child: {}
      }
      gp[uid].data.push(item) 
      // children.splice(index--, 1)
    }
  
    
    if(deps < options.path.length-1) {
      deps++
      for(let key in gp) {
        handler(gp[key].child, gp[key].data, gp[key].uidPath)
      }
    }
  }

  handler(result, data, [])
 

  // 将分组映射转为数组
  const resp = _groupToList(result, deps, 0, options)

  // 转换为数组后先排序，以免计算增长率等项出问题
  ;(function sortHandler (children: TInnerGroupListItem<T>[], deps: number) {
    children.sort(options.path[deps]?.sort)
    children.forEach(function (i) {
      sortHandler(i.children, deps+1)
    })
  })(resp, 0);

  

  // 计算合计  
  ;(function totalHandler (children: TInnerGroupListItem<T>[]) {
    
    children.forEach(function (k) {      
      const _res: Record<string, number> = {}
      forEachKvPair(k._columns, function (m, n) {
        _res[n] = _res[n] || 0
        
        _res[n] += m.summary
        
      })
  
      k._columnTotal = _res
      totalHandler(k.children)
    })
  })(resp);
  const allTotal:  Record<string, number> = {}
  resp.forEach(function (k) {
    forEachKvPair(k._columns, function (m, n) {
      allTotal[n] = allTotal[n] || 0
      allTotal[n] += k._columnTotal[n]
    })
  })

  // 再算纵向增长率
  ;(function riseRatioHandler (children: TInnerGroupListItem<T>[]) {
    const _prev: Record<string, number> = {}
    const _res: Record<string, number> = {}
    children.forEach(function (k, v) {      
      forEachKvPair(k._columns, function (m, n) {
        
        if(options.cellProportion && Object.keys(options.cellProportion).includes(n)) {
          // 不处理比重的纵向增长率
          return;
        }
        if(v > 0) {
          const ow = m.summary
          _res[n] = (ow - _prev[n]) / _prev[n]
        } else {
          _res[n] = 0
        }
        _prev[n] = m.summary
      })
      k._columnRiseRatio = _res
      riseRatioHandler(k.children)
    })
  })(resp);

  // 再算比重
  ;(function proportionHandler (children: TInnerGroupListItem<T>[], parentTotal: Record<string, number>) {
    children.forEach(function (k, v) {
      const _res: Record<string, number> = {}  
      forEachKvPair(k._columns, function (m, n) {
        _res[n] = getRatio(m.summary, parentTotal[n])
      })
      k._columnProportion = _res
      proportionHandler(k.children, k._columnTotal)
    })
  })(resp, allTotal);
  

  return {
    data: resp,
    total: allTotal
  }
}





export default function listGroup<T extends TKvPair> (data: T[], options: IListGroupOption<T>) {
  const dgp = deepGroup(data, options);

  function getValue (mode: '_columnRiseRatio' | '_columns'|'_columnTotal'|'_columnProportion',uidPath: string[], field: TGetValueField, formatter: (value: number) => string, defaultValue = '') {
    const res = deepFindItem(dgp.data, function (item) {
      return difference(item.uidPath, uidPath, function (a, b) {
        return a === b
      }).length === 0
    })
    if(res) {
      try {
        switch(mode) {
          case '_columnRiseRatio':
          case '_columnTotal':
          case '_columnProportion':
            return formatter(res[mode][field])
            break;
          default: 
            return formatter(res[mode][field].summary)
            break;
        }
        
      } catch(err) {
        return defaultValue
      }
    }
    return defaultValue
  }



  function getCellValue (uidPath: string[], field: TGetValueField, formatter: (value: number) => string, defaultValue = '') {
    return getValue('_columns', uidPath, field, formatter, defaultValue)
  }

  function getCellVerticalRiseRatio (uidPath: string[], field: TGetValueField, formatter: (value: number) => string, defaultValue = '') {
    return getValue('_columnRiseRatio', uidPath, field, formatter, defaultValue)
  }
  function getCellVerticalTotal (uidPath: string[] | '*', field: TGetValueField, formatter: (value: number) => string, defaultValue = '') {
    if(uidPath === '*') {
      const v = dgp.total[field]
      return isNull(v) ? defaultValue : formatter(v)
    } else {
      return getValue('_columnTotal', uidPath, field, formatter, defaultValue)
    }
  }

  function getRowCellValue (uidPath: string[], fieldList: {
    id: string,
    field: TGetValueField
  }[], formatter: (value: number) => string, defaultValue = '') {
    const result: Record<string, string> = {}
    fieldList.forEach(function (field) {
      result[field.id] = getCellValue(uidPath, field.field, formatter, defaultValue)
    })
    return result
  }

  function getCellVerticalProportion (uidPath: string[], field: TGetValueField, formatter: (value: number) => string, defaultValue = '') {
    return getValue('_columnProportion', uidPath, field, formatter, defaultValue)
  }

  function getRowVerticalProportion (uidPath: string[], fieldList: {
    id: string,
    field: TGetValueField
  }[], formatter: (value: number) => string, defaultValue = '') {
    const result: Record<string, string> = {}
    fieldList.forEach(function (field) {
      result[field.id] = getCellVerticalProportion(uidPath, field.field, formatter, defaultValue)
    })
    return result
  }

  return {
    /** 树形分组数据 */
    data: dgp.data,

    /** 获取单元格：值 */
    getCellValue,
    /** 获取单元格：纵向增长率 */
    getCellVerticalRiseRatio,
    /** 获取单元格：纵向累计 */
    getCellVerticalTotal,
    /** 获取单元格：纵向比重 */
    getCellVerticalProportion,
    
    /** 获取一行：值 */
    getRowCellValue,
    /** 获取一行：纵向比重 */
    getRowVerticalProportion
  }
}
