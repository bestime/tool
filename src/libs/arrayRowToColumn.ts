import _Number from "./_Number";
import cloneEasy from "./cloneEasy";
import { $undefinedValue } from "./help/hpConsts";
import type { TKvPair } from "./help/type-declare";
import uniq from "./uniq";


interface ISummary {
  /** 值 */
  value: number,
  /** 增长率 */
  riseRatio?: number,
  /** 比重 */
  proportion: number
}

interface IARTResultItem<T> {
  name: string,
  value: T
  data: Record<string, T[]>;
  summary: Record<string, ISummary>
  other: Record<string, ISummary>
}


type TArrayRowToColumnColumnSort = (a: string, b: string) => number;

export type TArrayRowToColumnReturn = ReturnType<typeof arrayRowToColumn>

const defaultSortFun: TArrayRowToColumnColumnSort = function (a, b) {
  return Number(a) - Number(b);
};

let _names_count = 0
const _namesMap: Record<string, {
  label: string,
  id: number
}> = {}

/**
 * 字符串映射ID值，避免拼接被误认
 * @param name 
 */
function getIdMap (name: string) {
  if(!_namesMap[name]) {
    _namesMap[name] = {
      id: ++_names_count,
      label: name
    }
  }
  return _namesMap[name]
}


function createUniqIds(fields: string[], item: Record<string, any>){
  let ids: number[] = []
  let names: string[] = []
  fields.forEach(function (field) {
    const name = getIdMap(item[field])
    ids.push(name.id)
    names.push(name.label)
  })
  return {
    id: ids.join('_'),
    label: names.join('→')
  }
}


/**
 * 数字中某个字段由 行转列
 * @param originData - 原始数组
 * @param options - 配置项
 * @returns 转换后的数据
 */
export default function arrayRowToColumn<T extends Record<string, any>> (
  originData: T[],
  options: {
    /** 唯一行的ID生成器 */
    uniqueRowId: Array<keyof T>;
    /** 将此字段转为列 */
    colField: keyof T;
    /** 列的排序方法 */
    colSort?: TArrayRowToColumnColumnSort;
    /** 生成列信息 */
    colCreate: (key: string) => {
      label: string;
      field: string;
    };
    summaryConfig?: IConfig
  }
) {
  const moreCols: string[] = [];
  originData.forEach(function (item) {
    const key = String(item[options.colField]);
    if (!moreCols.includes(key)) {
      moreCols.push(key);
    }
  });
  moreCols.sort(options.colSort ?? defaultSortFun);

  const rowGroup: Record<string, {
    value: Record<string, any>,
    name: string,
    data: Record<string, T[]>
  }> = {};

  originData.forEach(function (item) {
    
    const rowKey = createUniqIds(options.uniqueRowId as string[], item)
    const fieldValues: Record<string, any> = {}
    options.uniqueRowId.forEach(function (name) {
      fieldValues[name as string] = item[name]
    })
    

    
    rowGroup[rowKey.id] = rowGroup[rowKey.id] || {
      value: fieldValues,
      name: rowKey.label,
      data: {}
    };
    
    const columnFielsFormat = options.colCreate(item[options.colField]).field;
    
    
    rowGroup[rowKey.id].data[columnFielsFormat] = rowGroup[rowKey.id].data[columnFielsFormat] || [];
    rowGroup[rowKey.id].data[columnFielsFormat].push(item);
  });



  // 将分组映射转为数组
  let result: IARTResultItem<T>[] = [];
  for (let id in rowGroup) {
    result.push({
      name: rowGroup[id].name,
      value:rowGroup[id].value as T, 
      data: rowGroup[id].data,
      summary: {},
      other: {}
    });
  }

  const columns = moreCols.map(function (key) {
    const colItem = options.colCreate(key)
    return {
      value: key,
      label: colItem.label,
      field: colItem.field,
    };
  });

  let colSummary: Record<string, Record<string, ISummary>> = {}
  if(options.summaryConfig) {
    if(options.summaryConfig.row) {
      result = mergeRowSummary(result, options.summaryConfig.row, options.summaryConfig.averageField)
    }
    
    if(options.summaryConfig.column) {
      colSummary = mergeColSummary(result, options.summaryConfig.column, options.summaryConfig.averageField)
    }
    
  
  }

  function getColSummaryExtRow<T extends keyof ISummary> (groupName: string, field: T, formatter: (data: ISummary[T]) => string): Record<string, string> {
    const item = colSummary[groupName]
    const row: Record<string, string> = {}
    if(!item) return row
    for(let key in item) {
      row[key] = formatter(item[key][field])
    }
    return row
  }


  function getExtRow<T extends keyof ISummary> (groupName: string, field: T, formatter: (data: ISummary[T]) => string): Record<string, string> {
    const item = result.find(c => c.name === groupName)
    const row: Record<string, string> = {}
    if(!item) {
      return getColSummaryExtRow(groupName, field, formatter)
    }

    for(let key in item.summary) {
      row[key] = formatter(item.summary[key][field])
    }
    return row
  }

  

  

  return {
    columns,
    data: result,
    colSummary,
    getExtRow
  };
}


export function getRatio (prev: number | undefined, current: number | undefined) {
  if(prev === $undefinedValue || current === $undefinedValue) {
    return $undefinedValue
  }
  return (current - prev) / prev
}

export type TArrayRowToColumnCalculateRow = {
  proportionBaseField?: string,
  count: {
    field: string,
    mode: 'length' | 'uniqLength' | 'notZeroValue'
  },
  value: {
    field: string,
    mode: 'sum' | 'uniqLength' | 'avg'
  },
  
}

interface IConfig {
  averageField: string,
  row?: Record<string, TArrayRowToColumnCalculateRow>
  column?: TColSumaryConfig
}

type TColSumaryConfig = Record<string, {
  field: string,
  mode: 'uniqLength' | 'avg'
}>




// const configList: TConfig = {
//   'a': {
//     count: {
//       field: 'fxCompanyId',
//       mode: 'length'
//     },
//     value: {
//       field: 'yearValue'
//     }
//   }
// }

function mergeRowSummary (list: IARTResultItem<TKvPair>[], config: Record<string, TArrayRowToColumnCalculateRow>, averageField: string) {
  
  
  

  list.forEach(function (colsDataMap) {   
    const configItem = config[colsDataMap.name]
    if(!configItem) return;
    
   
    let prevGroupKey: string | undefined;
    let colSum = 0
    let length = 0

    
    for(let key in colsDataMap.data) {
      length++
      const countFiledList: any[] = []
      let sum = 0
      let valueList: any[] = []
      let notZeroList: any[] = []

      colsDataMap.data[key].forEach(function (item) {
        
        countFiledList.push(item[configItem.count.field])        
        const data = _Number(item[configItem.value.field])
        switch(configItem.value.mode) {
          case 'uniqLength':
            valueList.push(item[configItem.value.field])
            valueList = uniq(valueList)
            sum = sum + valueList.length
            break;
          case 'sum':
          case 'avg':            
            sum = sum + data
            break;
        }
        
        if(data !== 0) {
          notZeroList.push(data)
        }
      })
      let count = 0
      
      switch(configItem.count.mode) {
        case 'length':
          count = countFiledList.length
          break;
        case 'uniqLength':
          count = uniq(countFiledList).length
          break;
        case 'notZeroValue':
          count = notZeroList.length
          break;
      }

      let value = sum
      switch(configItem.value.mode) {
        case 'avg':            
        value = sum / count
          break;
      }
      colSum += value
      
      colsDataMap.summary[key] = {
        value,
        proportion: 0,
        riseRatio: prevGroupKey ? getRatio(colsDataMap.summary[prevGroupKey]?.value, value) : void 0
      }
      prevGroupKey = key
    }
    
    
    colsDataMap.summary[averageField] = {
      value: colSum / length,
      riseRatio: $undefinedValue,
      proportion: 0,
    }
  })
  
  // 处理比重
  list.forEach(function (colsDataMap) {
    const configItem = config[colsDataMap.name]
    if(!configItem) return;
    const baseItem = list.find(c => c.name === configItem.proportionBaseField)
    if(!configItem.proportionBaseField) return;
    if(baseItem) {
      // baseItem.
      for(let key in colsDataMap.summary) {
        colsDataMap.summary[key].proportion = colsDataMap.summary[key].value / baseItem.summary[key].value
      }
    }
    
  })

  
  // for(let cfgName in config) {
    
    
    
  // }
  
  return list
}



function mergeColSummary (list: IARTResultItem<TKvPair>[], config: TColSumaryConfig, averageField: string) {

  // const config: TColSumaryConfig = {
  //   companyCount: {
  //     field: 'fxCompanyId',
  //     mode: 'uniqLength'
  //   }
  // }

  const result: Record<string, Record<string, any>> = {}
  const _mapRes: Record<string, Record<string, ISummary>> = {}
  
  for(const cfgKey in config) {    
    _mapRes[cfgKey] = {}
    result[cfgKey] = {}
    const cfgItem = config[cfgKey]
    
    
    list.forEach(function (gp) {     
      for(let key in gp.data) {
        result[cfgKey][key] = result[cfgKey][key] || {
          data: [],
          sum: 0,
        }
        let innerList: any[] = []
        let innerSum = 0
   
        gp.data[key].forEach(function (item) {          
          innerList.push(item[cfgItem.field])
          
          switch(cfgItem.mode) {
            case 'uniqLength':
              innerList = uniq(innerList)
              break;
            case 'avg':
              innerSum += item[cfgItem.field]
              break;
          }
        })
        switch(cfgItem.mode) {
          case 'uniqLength':
            innerList = uniq(innerList)
            break;
          case 'avg':
            innerSum = innerSum / gp.data[key].length
            break;
        }
        result[cfgKey][key].data = result[cfgKey][key].data.concat(innerList)  
        result[cfgKey][key].sum += innerSum
      }
    })


    let prevGroupKey: string | undefined
 
    for(let key in result[cfgKey]) {
      
      let value = 0
      switch(cfgItem.mode) {
        case 'avg':
          value = result[cfgKey][key].sum/list.length
          // console.log("求平均", value, list.length, result[cfgKey][key].data.length)
          break;
        case 'uniqLength':
          value = result[cfgKey][key].data.length / list.length   
          
          break;
      }
      _mapRes[cfgKey][key] = {
        value,
        proportion: 0,
        riseRatio: prevGroupKey ? getRatio(_mapRes[cfgKey][prevGroupKey]?.value, value) : void 0
      }
      prevGroupKey = key
    }


    let colSum = 0
    let length = 0
    for(let key in _mapRes[cfgKey]) {
      const cfg = _mapRes[cfgKey][key]
      colSum += cfg.value
      length++
    }

    _mapRes[cfgKey][averageField] = {
      value: colSum / length,
      riseRatio: $undefinedValue,
      proportion: 0,
    }
  }
 
  return _mapRes
}