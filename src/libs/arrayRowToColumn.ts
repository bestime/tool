import type { TKvPair } from "./help/type-declare";



type TArrayRowToColumnColumnSort = (a: string, b: string) => number;

export type TArrayRowToColumnReturn = ReturnType<typeof arrayRowToColumn>

const defaultSortFun: TArrayRowToColumnColumnSort = function (a, b) {
  return Number(a) - Number(b);
};


/**
 * 数字中某个字段由 行转列
 * @param originData - 原始数组
 * @param options - 配置项
 * @returns 转换后的数据
 */
export default function arrayRowToColumn<T extends TKvPair> (
  originData: T[],
  options: {
    /** 唯一行的ID生成器 */
    uniqueRowId: (data: T) => string;
    /** 将此字段转为列 */
    colField: string;
    /** 列的排序方法 */
    colSort?: TArrayRowToColumnColumnSort;
    /** 生成列信息 */
    colCreate: (key: string) => {
      label: string;
      field: string;
    };
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
    value: T,
    data: Record<string, T[]>
  }> = {};

  originData.forEach(function (item) {
    const rowKey = options.uniqueRowId(item);
    
    rowGroup[rowKey] = rowGroup[rowKey] || {
      value: item,
      data: {}
    };
    
    const columnFielsFormat = options.colCreate(item[options.colField]).field;
    
    
    rowGroup[rowKey].data[columnFielsFormat] = rowGroup[rowKey].data[columnFielsFormat] || [];
    rowGroup[rowKey].data[columnFielsFormat].push(item);
  });



  // 将分组映射转为数组
  const result: {
    key: string;
    value: T
    data: Record<string, T[]>;
  }[] = [];
  for (let key in rowGroup) {
    result.push({
      key, 
      value:rowGroup[key].value, 
      data: rowGroup[key].data,
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
  return {
    columns,
    data: result,
  };
}