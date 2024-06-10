import getRatio from './getRatio';
import cloneEasy from './cloneEasy';
import deepFindItem from './deepFindItem';
import difference from './difference';
import forEachKvPair from './forEachKvPair';
import forEachTree from './forEachTree';
import type { TKvPair } from './help/type-declare';
import isArray from './isArray';
import isNull from './isNull';
import mapKvPair from './mapKvPair';
import uniq from './uniq';
import { $undefinedValue } from './help/hpConsts';
import defaultValue from './defaultValue';
import hpObjectKeys from './help/hpObjectKeys';
const AVG_FIELD = 'sys-row-avg';

type TListGroupKey<T extends TKvPair> = {
  field: string | string[];
  sort?: (a: TInnerGroupListItem<T>, b: TInnerGroupListItem<T>) => number;
};

type TGetValueField = string;

interface ICellSummary {
  denominator?: [string, 'length' | 'uniqLength'];
  /**
   * sum 求和
   * length 长度
   * uniqLength 去重长度
   */
  numerator: [string, 'sum' | 'length' | 'uniqLength'];
}

type TColCustomWay = {
  /** 计算方式 */
  0: 'sum' | 'max' | 'diff';
  /** 参与计算的列（就是被转为列的那些值） */
  1: string[] | '*';
  /** 获取值的方式 */
  2?: 'value' | 'length' | 'uniqLength';
  /** 原始数据中的字段 */
  3?: string;
};

interface IListGroupOption<T extends TKvPair> {
  /**
   * 按字段值组装树形结构数据
   */
  path: TListGroupKey<T>[];
  /**
   * 将此字段转为列，并做一些基础统计
   */
  colField?: keyof T;
  /**
   * 组装后数据的计算方法
   */
  cellSummary?: ICellSummary;
  /**
   * 自定义列。分子➗分母
   */
  colCustom?: Record<
    string,
    {
      numerator: TColCustomWay;
      denominator?: TColCustomWay;
      riseRatio?: boolean;
    }
  >;
}

type TInnerGroup<T> = Record<
  string,
  {
    uidPath: string[];
    uid: string;
    data: T[];
    child: TInnerGroup<T>;
  }
>;

function getUniqId(fields: string | string[], item: TKvPair) {
  const id: string[] = [];
  if (isArray(fields)) {
    fields.forEach(function (k) {
      id.push(item[k]);
    });
  } else {
    id.push(item[fields]);
  }

  return id.join('→');
}

interface TInnerColumnsSummaryItem<T> extends TKvPair {
  data: T[];
  summary: number | undefined;
  _collect: any[];
}

type TInnerGroupListItem<T extends TKvPair> = {
  uid: string;
  uidPath: string[];
  data: T[];
  _columns: Record<string, TInnerColumnsSummaryItem<T>>;
  _columnRiseRatio: Record<string, number | undefined>;
  _columnTotal: Record<string, number>;
  _columnProportion: Record<string, number>;
  isLeaf: boolean;
  children: TInnerGroupListItem<T>[];
};

function _rowToColumn<T extends TKvPair>(data: T[], options: IListGroupOption<T>) {
  const _map: Record<string, TInnerColumnsSummaryItem<T>> = {};

  const colField = options.colField;
  if (isNull(colField) || !data.length) return _map;
  const cellSummary = options.cellSummary;
  data.forEach(function (item) {
    const key = item[colField];
    _map[key] = _map[key] || {
      data: [],
      summary: 0,
      _collect: []
    };
    _map[key].data.push(item);
    // 合计数据
    if (cellSummary) {
      const vo = item[cellSummary.numerator[0]];
      _map[key].summary += vo;
      _map[key]._collect.push(vo);
    }
  });

  if (isNull(cellSummary)) return _map;

  for (let key in _map) {
    const item = _map[key];
    let base = 1;

    // 除数
    const denominator = cellSummary.denominator;
    if (denominator) {
      switch (denominator[1]) {
        case 'length':
          base = item.data.map(c => c[denominator[0]]).length;
          break;
        case 'uniqLength':
          base = uniq(item.data.map(c => c[denominator[0]])).length;
          break;
      }
    }

    // 被除数
    switch (cellSummary.numerator[1]) {
      case 'sum':
        if (!isNull(item.summary)) {
          item.summary = item.summary / base;
        }
        break;
      case 'length':
        item.summary = item._collect.length / base;
        break;
      case 'uniqLength':
        item.summary = uniq(item._collect).length / base;
        break;
    }
  }

  // 行统计
  (function () {
    let count = 0;
    let sum = 0;
    forEachKvPair(_map, function (v) {
      count++;
      const _vp = isNull(v.summary) ? 0 : v.summary;
      sum += _vp;
    });
    _map[AVG_FIELD] = {
      data: [],
      summary: sum / count,
      _collect: []
    };
  })();

  function getCustomValue(way: TColCustomWay) {
    let value = 0;

    // 筛选可用于计算的键
    const codes = hpObjectKeys(_map).filter(function (k) {
      const isAvg = [AVG_FIELD].includes(k);
      const canNext = way[1] === '*' || way[1].includes(k);
      return !isAvg && canNext;
    });

    // 排序，以免减法出错
    if (isArray(way[1])) {
      codes.sort(function (a, b) {
        return way[1].indexOf(a) - way[1].indexOf(b);
      });
    }

    codes.forEach(function (k, index) {
      const v = _map[k];
      let innerVal = 0;
      if (isNull(way[2]) || way[2] === 'value') {
        innerVal = isNull(v.summary) ? 0 : v.summary;
      } else if (way[2] === 'length') {
        const fld = way[3];
        if (fld) {
          innerVal = v.data.map(c => c[fld]).length;
        }
      } else if (way[2] === 'uniqLength') {
        const fld = way[3];
        if (fld) {
          const lv = v.data.map(c => c[fld]);
          innerVal = uniq(lv).length;
        }
      }

      if (way[0] === 'sum') {
        value += innerVal;
      } else if (way[0] === 'max') {
        value = Math.max(value, innerVal);
      } else if (way[0] === 'diff') {
        if (index === 0) {
          value = innerVal;
        } else {
          value -= innerVal;
        }
      }
    });
    return value;
  }

  // 计算横向的自定义列
  if (options.colCustom) {
    forEachKvPair(options.colCustom, function (v, k) {
      const b = getCustomValue(v.numerator);
      const a = v.denominator ? getCustomValue(v.denominator) : 1;
      _map[k] = {
        data: [],
        summary: getRatio(b, a),
        _collect: []
      };
    });
  }

  return _map;
}

function _groupToList<T extends TKvPair>(
  data: TInnerGroup<T>,
  deps: number,
  currentDeps: number,
  options: IListGroupOption<T>
) {
  const result: TInnerGroupListItem<T>[] = [];

  for (let key in data) {
    const isLeaf = deps === currentDeps;
    const children = _groupToList(data[key].child, deps, currentDeps + 1, options);

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
    });
  }
  return result;
}

function deepGroup<T extends TKvPair>(data: T[], options: IListGroupOption<T>) {
  const result: TInnerGroup<T> = {};
  let deps = 0;

  function handler(gp: TInnerGroup<T>, children: T[], parentPath: string[]) {
    for (let index = 0; index < children.length; index++) {
      const item = children[index];
      const uid = getUniqId(options.path[deps].field, item);

      gp[uid] = gp[uid] || {
        uidPath: parentPath.concat(uid),
        uid,
        data: [],
        child: {}
      };
      gp[uid].data.push(item);
      // children.splice(index--, 1)
    }

    if (deps < options.path.length - 1) {
      deps++;
      for (let key in gp) {
        handler(gp[key].child, gp[key].data, gp[key].uidPath);
      }
    }
  }

  handler(result, data, []);

  // 将分组映射转为数组
  const resp = _groupToList(result, deps, 0, options);

  // 转换为数组后先排序，以免计算增长率等项出问题
  (function sortHandler(children: TInnerGroupListItem<T>[], deps: number) {
    children.sort(options.path[deps]?.sort);
    children.forEach(function (i) {
      sortHandler(i.children, deps + 1);
    });
  })(resp, 0);

  // 计算合计
  (function totalHandler(children: TInnerGroupListItem<T>[]) {
    children.forEach(function (k) {
      const _res: Record<string, number> = {};
      forEachKvPair(k._columns, function (m, n) {
        const _vp = isNull(m.summary) ? 0 : m.summary;
        _res[n] = _res[n] || 0;

        _res[n] += _vp;
      });

      k._columnTotal = _res;
      totalHandler(k.children);
    });
  })(resp);
  const allTotal: Record<string, number> = {};
  resp.forEach(function (k) {
    forEachKvPair(k._columns, function (m, n) {
      allTotal[n] = allTotal[n] || 0;
      allTotal[n] += k._columnTotal[n];
    });
  });

  // 再算纵向增长率
  // 不处理比重的纵向增长率黑名单
  const blackList: string[] = [];
  if (options.colCustom) {
    forEachKvPair(options.colCustom, function (v, k) {
      if (!v.riseRatio) {
        blackList.push(k);
      }
    });
  }
  (function riseRatioHandler(children: TInnerGroupListItem<T>[]) {
    const _prev: Record<string, number | undefined> = {};
    const _res: Record<string, number | undefined> = {};

    children.forEach(function (k, vi) {
      forEachKvPair(k._columns, function (m, n) {
        if (blackList.includes(n)) {
          // 不处理比重的纵向增长率
          return;
        }
        if (vi > 0) {
          const ow = m.summary;
          if (isNull(ow)) {
            _res[n] = $undefinedValue;
          } else {
            const tv = _prev[n] ?? 0;
            _res[n] = getRatio(ow - tv, tv);
          }
        } else {
          _res[n] = void 0;
        }
        _prev[n] = m.summary;
      });
      k._columnRiseRatio = _res;
      riseRatioHandler(k.children);
    });
  })(resp);

  // 再算比重
  (function proportionHandler(
    children: TInnerGroupListItem<T>[],
    parentTotal: Record<string, number>
  ) {
    children.forEach(function (k, v) {
      const _res: Record<string, number> = {};
      forEachKvPair(k._columns, function (m, n) {
        _res[n] = getRatio(m.summary, parentTotal[n]);
      });
      k._columnProportion = _res;
      proportionHandler(k.children, k._columnTotal);
    });
  })(resp, allTotal);

  return {
    data: resp,
    total: allTotal
  };
}

export default function listGroup<T extends TKvPair>(data: T[], options: IListGroupOption<T>) {
  const dgp = deepGroup(data, options);

  function getOriginGroupData (uidPath: string[], field: TGetValueField) {
    const res = deepFindItem(dgp.data, function (item) {
      return (
        difference(item.uidPath, uidPath, function (a, b) {
          return a === b;
        }).length === 0
      );
    });
    if(res) {
      return res['_columns'][field]?.data ?? []
    } else {
      return []
    }
  }

  function getValue(
    mode: '_columnRiseRatio' | '_columns' | '_columnTotal' | '_columnProportion',
    uidPath: string[],
    field: TGetValueField,
    formatter: (value: number, collect?: T[]) => string,
    defaultData?: string
  ) {
    const res = deepFindItem(dgp.data, function (item) {
      return (
        difference(item.uidPath, uidPath, function (a, b) {
          return a === b;
        }).length === 0
      );
    });
    const errorValue = defaultValue(defaultData, '');
    if (res) {
      try {
        switch (mode) {
          case '_columnRiseRatio':
          case '_columnTotal':
          case '_columnProportion':
            const d = res[mode][field];
            return isNull(d) ? errorValue : formatter(d);
            break;
          default:
            const _vp = res[mode][field].summary;
            return isNull(_vp) ? errorValue : formatter(_vp, res[mode][field].data);
            break;
        }
      } catch (err) {
        return errorValue;
      }
    }
    return errorValue;
  }

  function getCellValue(
    uidPath: string[],
    field: TGetValueField,
    formatter: (value: number, list: T[]) => string,
    defaultData?: string
  ) {
    return getValue(
      '_columns',
      uidPath,
      field,
      formatter as (value: number, list?: T[]) => string,
      defaultData
    );
  }

  function getCellVerticalRiseRatio(
    uidPath: string[],
    field: TGetValueField,
    formatter: (value: number) => string,
    defaultData?: string
  ) {
    return getValue('_columnRiseRatio', uidPath, field, formatter, defaultData);
  }
  function getCellVerticalTotal(
    uidPath: string[] | '*',
    field: TGetValueField,
    formatter: (value: number) => string,
    defaultData?: string
  ) {
    if (uidPath === '*') {
      const v = dgp.total[field];
      return isNull(v) ? defaultValue(defaultData, '') : formatter(v);
    } else {
      return getValue('_columnTotal', uidPath, field, formatter, defaultData);
    }
  }

  function getRowCellValue(
    uidPath: string[],
    fieldList: {
      id: string;
      field: TGetValueField;
    }[],
    formatter: (value: number) => string,
    defaultData?: string
  ) {
    const result: Record<string, string> = {};
    fieldList.forEach(function (field) {
      result[field.id] = getCellValue(uidPath, field.field, formatter, defaultData);
    });
    return result;
  }

  function getCellVerticalProportion(
    uidPath: string[],
    field: TGetValueField,
    formatter: (value: number) => string,
    defaultData?: string
  ) {
    return getValue('_columnProportion', uidPath, field, formatter, defaultData);
  }

  function getRowVerticalProportion(
    uidPath: string[],
    fieldList: {
      id: string;
      field: TGetValueField;
    }[],
    formatter: (value: number) => string,
    defaultData?: string
  ) {
    const result: Record<string, string> = {};
    fieldList.forEach(function (field) {
      result[field.id] = getCellVerticalProportion(uidPath, field.field, formatter, defaultData);
    });
    return result;
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
    getRowVerticalProportion,

    /** 获取一个分组的所有原始数据，用于使用者自行计算 */
    getOriginGroupData,

    getOriginAllData: function () {
      return data
    }
  };
}
