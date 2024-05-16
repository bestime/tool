/**
 * 强制转化数据为字符串
 * @param data - 处理的值
 * @returns 实际值2
 */
declare function _String(data: any): string;

/**
 * 获取数据类型
 *
 * @param data - 需要判断的数据
 * @return 数据类型字符串
 */
declare function getType(data: any): string;

/**
 * 判断数据是否为数组
 * @param arg - 判断的值
 * @returns 真假值
 */
declare function isArray(arg: any): arg is any[];

/**
 * 递归将所有属性改为可选
 */
type BTDeepPartial<T = any> = {
  [P in keyof T]?: T[P] extends Function ? T[P] : T[P] extends object ? BTDeepPartial<T[P]> : T[P];
};
/**
 * 键值对格式的数据
 * */
type TKvPair = Record<string | number | symbol, any>;
type TValueOf<T> = T[keyof T];

/**
 * 判断数据是否为对象
 * @param data - 判断的值
 * @returns 真假值
 */
declare function isKvPair(arg: any): arg is TKvPair;

declare function isString(data: any): data is string;

/**
 * 强制转换数据为键值对数据，如果是json字符串，会尝试解析，如果失败，则返回一个空Map
 * @param data - 转换的数据
 * @returns 键值对数据
 *
 * @example
 * ```javascript
 * // => {}
 * const data = _KvPair('abc')
 *
 * // => {}
 * const data2 = _KvPair([])
 *
 * // => {name: 'a'}
 * const data3 = _KvPair({name: 'a'})
 * ```
 */
declare function _KvPair(data: any): TKvPair;

/**
 * 判断是否为空[null, undefined, '']
 * @params data - 判断的数据
 * @returns 判断结果
 */
declare function isEmpty(data: any): boolean;

/**
 * 判断数据是否为函数
 * @param data - 判断的值
 * @returns 真假值
 */
declare function isFunction(data: any): boolean;

/**
 * 对象序列化为字符串, 用于URL查询字符串或AJAX请求
 * @param data - 需要转化的数据
 * @returns 转换后的字符串
 */
declare function param(data: TKvPair): string;

/**
 * 为url链接拼接参数
 * @param url - url地址。可带查询参数由 ”{{包裹}}”
 * @param searchString - 查询参数
 * @returns string 拼接后的url地址
 * @example
 * ```js
 * urlToGet('/parent_{{ pid }}/info/{{ uid }}/detail?c=5&', {
 *   name: '张三',
 *   skill: [1, 2, 3, 4, 5]
 * })
 * urlToGet('1111111111', 'a=0&b=2')
 * urlToGet('2222222222', 'a=0&b=2')
 * urlToGet('333333333?c=5&', 'a=0&b=2')
 * ```
 *
 */
declare function urlToGet(url: string, data: string | TKvPair): string;

/**
 * 移除空字符串。不清空 "\u200e"
 * @param data - 需要处理的数据
 * @param pos - 移除位置。默认：两侧，1：左侧，-1右侧，* 所有
 * @returns 字符串
 */
declare function trim(data: any, pos?: 1 | -1 | '*'): string;

type TargetData = Record<string, any> | any[];
interface Options {
  /**
   * 是否移除空字符串。默认true
   */
  string?: Boolean;
  /**
   * 是否移除空数组。默认true
   */
  array?: Boolean;
  /**
   * 是否移除空键值对。默认true
   */
  kvPair?: Boolean;
}
/**
 * 移除无效数据，包括：空字符串，空对象，空数组。
 * 注：数组中的值不做处理，会影响数组长度
 *
 * @param data - 将数据进行树摇
 * @param options - 配置参数
 * @returns 树摇后的数据
 */
declare function shake<T extends TargetData>(data: T, options?: Options): BTDeepPartial<T>;

/**
 * 强制转换数据为数组，如果是json字符串，会尝试解析，如果失败，则返回一个空[]
 *
 * @param data - 待转换的数据
 * @returns 数组
 *
 * @example
 * ```javascript
 * // => []
 * const data = _Array('abc')
 *
 * // => []
 * const data3 = _Array({name: 'a'})
 * ```
 */
declare function _Array<T>(data: any): T[];

/**
 * 检测一个数据是否存在
 *
 * @param handler - 每一次检测的回调， 返回值为Boolean,表示是否检测到数据
 * @param callback - 成功回调
 * @param sleepTime - 间隔时间
 */
declare function variableHasValue(
  handler: () => boolean | undefined,
  callback: () => void,
  sleepTime?: number
): void;
declare namespace variableHasValue {
  var async: (
    handler: () => boolean | undefined,
    sleepTime?: number | undefined
  ) => Promise<unknown>;
}

/**
 * 查找某个元素所在树的所有父链
 * @param tree - 数据
 * @param handler - 验证回调
 * @param config - 字段映射配置。
 * @returns 查找的结果
 */
declare function deepFindTreePath(
  tree: any[],
  handler: (item: any) => boolean,
  config: {
    id: string;
    children: string;
  }
): undefined | any[];

/**
 * 强制转换数据为字符串
 * @param data - 值
 * @returns 数字
 */
declare function _Number(data: any): number;

type TNull = undefined | null | '';
declare function isNull(data: any): data is TNull;

/**
 *
 * @param value 看起来是否像一个数字
 * @example
 * ```
 * isLickNumber(1) => true
 * isLickNumber('2.36884') => true
 * isLickNumber(1/0) => false
 * isLickNumber(0/0) => false
 * isLickNumber('') => false
 * isLickNumber() => false
 * isLickNumber(null) => false
 * isLickNumber(true) => false
 * isLickNumber(false) => false
 * isLickNumber([]) => false
 * isLickNumber(function () {}) => false
 * ```
 * @returns
 */
declare function isLikeNumber(value: any): boolean;

/**
 * 默认值处理函数
 * @param data - 需要处理的数据
 * @param value - 如果data为undefined，则返回此值
 * @returns 实际值
 */
declare function defaultValue<T>(data: any, value: T): T;

/**
 * 循环复制字符串
 * @param data - 复制目标
 * @param count - 复制几次
 * @returns 结果
 */
declare function repeatString(target: string | number, count: number): string;

/**
 * 向前填充字符串
 * @param data - 原始目标
 * @param len - 需要填充的总长度
 * @param target - 填充的字符串
 * @returns 结果
 */
declare function padStart(data: string | number, len: number, target: string): string;

/**
 * 向后填充字符串
 * @param data - 原始目标
 * @param len - 需要填充的总长度
 * @param target - 填充的字符串
 * @returns 结果
 */
declare function padEnd(data: string | number, len: number, target: string): string;

/**
 * 保留几位小数并直接舍去后面的数（不进行四舍五入）
 * @param data - 长得像数字的字符串或数字
 * @param fractionDigits - 保留的小数位
 * @param rejection - 是否删除末尾所有的 "0"
 * @returns 结果
 */
declare function floorFixed(
  data: number | string,
  fractionDigits: number,
  rejection?: boolean
): string;

/**
 * 保留几位小数四舍五入
 * toFixed优化版，原生toFixed对于 (3.335).toFixed(2) 结果为：3.33，理想结果为3.34
 * @param data - 长得像数字的字符串或数字
 * @param fractionDigits - 保留的小数位
 * @param rejection - 是否删除末尾所有的 "0"
 * @returns 结果
 */
declare function roundFixed(
  data: number | string,
  fractionDigits: number,
  rejection?: boolean
): string;

/**
 * 基于原生split优化版，使空字符传结果为 "[]"
 * @param data - 原始目标
 * @param symbol - 分割
 * @returns 结果
 */
declare function split(data: string, symbol: string): string[];

/**
 * 查询树接口中的某一项
 * @param list - 原始数组
 * @param handle - 遍历的回调函数
 * @param children - 子项字段
 * @returns 结果
 */
declare function deepFindItem<T>(
  list: T[],
  handle: (data: T) => void,
  children?: string
): T | undefined;

/**
 * 一维数组转树结构
 * @param list - 待转数组
 * @param props - 生成数据的配置项
 * @param props.id - ID字段
 * @param props.pid - 父ID字段
 * @param props.children - 子项字段
 * @returns 结果
 */
declare function flatArrayToTree(
  list: any[],
  props?: {
    id?: string;
    pid?: string;
    children?: string;
  }
): any[];

/**
 * 在给定索引范围内，增减当前索引，如果超出范围，则按当前方向重新循环取值。
 * @param maxIndex - 最大索引
 * @param currentIndex - 当前索引
 * @param increase - 调整多少索引，可为负数
 * @returns 改变后的索引
 */
declare function changeIndex(maxIndex: number, currentIndex: number, increase: number): number;

/**
 * 生成唯一ID
 * @param length - id长度
 * @returns 生成的ID字符串
 */
declare function uuid(length: number): string;

/**
 * 生成指定范围随机数
 * @param min - 最小值
 * @param max - 最大值
 * @param int - 是否生成整数. 默认true
 * @returns 随机数
 */
declare function getRandom(min: number, max: number, isInt?: boolean): number;

/**
 * 强制转换数据为boolean
 *
 * @param data - 转换的数据
 * @returns 真假
 *
 * @example
 * ```javascript
 * // => true
 * const data1 = _Boolean('true')
 *
 * // => true
 * const data2 = _Boolean(true)
 *
 * // => true
 * const data4 = _Boolean(1)
 *
 * // => true
 * const data3 = _Boolean('1')
 * ```
 */
declare function _Boolean(data: any): boolean;

/**
 * 将树形结构转为一维数组
 * @param data - 树
 * @param childKey - 子项字段。默认 children
 * @returns 浅克隆的数组
 */
declare function flatTree(data: any[], childKey?: string): any[];

/**
 * 简易版深度克隆。（仅处理数组、键值对、方法的可克隆）
 *
 * @param data - 克隆对象
 * @returns
 */
declare function cloneEasy<T extends [] | Record<any, any> | Function>(data: T): T;

/**
 * 树形结构map新数据
 * @param data - 原始树
 * @param childKeyTo - 转换的孩子键
 * @param handle - 迭代方法。这里不用返回子节点
 * @param childKeyFrom - 原始数据的孩子键
 * @returns 转变后的新数据
 */
declare function main<T extends TKvPair, K extends TKvPair, C extends keyof T>(
  data: K[],
  childKeyTo: C,
  handle: (data: K) => Omit<T, C> | undefined,
  childKeyFrom?: keyof K
): T[];

type EventHander = (...args: any[]) => void;
/**
 * 事件订阅，可获得TS类型推导支持
 * @param eventName - 订阅名
 * @returns 订阅实例
 * @example
 * ```typescript
 * // 初始化
 * const useUpdateDataBus = defineEventBus<(dataId: number, back: boolean) => void>('UPDATE-DATA')
 *
 * // 开启订阅
 * function busCallback (id: number, isBack: boolean) {}
 * useUpdateDataBus.on(busCallback)
 *
 * // 执行订阅
 * useUpdateDataBus.emit(12, true)
 *
 * // 取消订阅
 * useUpdateDataBus.off(busCallback)
 *
 * // 销毁所有订阅
 * useUpdateDataBus.dispose()
 * ```
 */
declare function defineEventBus<T extends EventHander>(
  eventName: string
): {
  /** 追加订阅 */
  on: (hander: T) => void;
  /** 执行所有订阅 */
  emit: (...args: Parameters<T>) => void;
  /** 取消一个订阅 */
  off: (hander: T) => void;
  /** 销毁所有订阅 */
  dispose: () => void;
};

/**
 * 树形结构迭代
 * @param data - 原始树
 * @param handle - 迭代方法。这里不用返回子节点
 * @param childKey - 子节点字段。默认值：children
 */
declare function forEachTree<T extends TKvPair>(
  data: T[],
  handle: (data: T, parents: T[]) => void,
  childKey?: keyof T
): void;

declare function forEach<T>(
  data: T[],
  callback: (item: T, index: number, array: T[]) => void
): void;

/**
 * 获取随机颜色
 */
declare function randomColor(): string;

type VoidFunc = () => void;
interface PollingOption {
  interval: number;
  timeout: number;
  onMessage?: (remainTime: number) => void;
  handler: (next: VoidFunc, done: VoidFunc) => void;
}
/**
 * 轮询
 *
 * @example
 * ```
 * let count = 0
 * const pol = new bestime.Polling({
 *   interval: 1000,
 *   timeout: 6 * 1000,
 *   handler: function (next, done) {
 *     count++
 *     if(count>=4) {
 *       done()
 *     } else {
 *       next()
 *     }
 *   },
 *   onMessage: function (remainTime) {
 *     console.log("剩余", remainTime)
 *   }
 * })
 *
 * pol.start()
 * ```
 *
 * */
declare class Polling {
  private _timer;
  private _timer_info;
  private _stamp;
  private _passStamp;
  private _option;
  constructor(setting: Partial<PollingOption>);
  private _next;
  private _doOnce;
  /** 开始 */
  start(): this;
  /** 完成 */
  done(): this;
  /** 销毁 */
  dispose(): this;
}

/**
 * 前端将数组进行模拟分页处理
 * @param data - 所有数据
 * @param pageSize - 每页多少条
 * @param pageCurrent - 当前页
 * @returns 分页数据
 */
declare function dataPage<T>(
  data: T[],
  pageSize: number,
  pageCurrent: number
): {
  current: number;
  total: number;
  size: number;
  pages: number;
  data: T[];
};

/**
 * 解析序列化字符参数为Map格式数据
 * @param str - url 查询参数
 * @returns 键值对
 */
declare function parseQuery(str?: string): TKvPair;

declare const fieldCheck: {
  /**
   * 验证传入的数据是否是数字
   * @param title - 标题
   * @param value - 值
   * @param required - 是否必填
   * @returns
   */
  number(title: string, value: any, required?: boolean): number;
  /**
   * 验证传入的数据是否是字符串
   * @param title - 标题
   * @param value - 值
   * @param required - 是否必填
   * @returns
   */
  string(title: string, value: any, required?: boolean): string;
};

interface ISummary {
  /** 值 */
  value: number;
  /** 增长率 */
  riseRatio?: number;
  /** 比重 */
  proportion: number;
}
interface IARTResultItem<T> {
  name: string;
  value: T;
  data: Record<string, T[]>;
  summary: Record<string, ISummary>;
}
type TArrayRowToColumnColumnSort = (a: string, b: string) => number;
/**
 * 数字中某个字段由 行转列
 * @param originData - 原始数组
 * @param options - 配置项
 * @returns 转换后的数据
 */
declare function arrayRowToColumn<T extends Record<string, any>>(
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
    summaryConfig?: IConfig;
  }
): {
  columns: {
    value: string;
    label: string;
    field: string;
  }[];
  data: IARTResultItem<T>[];
  colSummary: Record<string, Record<string, ISummary>>;
  getExtRow: <T_1 extends keyof ISummary>(
    groupName: string,
    field: T_1,
    formatter: (data: ISummary[T_1]) => string
  ) => Record<string, string>;
};
type TArrayRowToColumnCalculateRow = {
  proportionBaseField?: string;
  count: {
    field: string;
    mode: 'length' | 'uniqLength' | 'notZeroValue';
  };
  value: {
    field: string;
    mode: 'sum' | 'uniqLength' | 'avg';
  };
};
interface IConfig {
  averageField: string;
  row?: Record<string, TArrayRowToColumnCalculateRow>;
  column?: TColSumaryConfig;
}
type TColSumaryConfig = Record<
  string,
  {
    field: string;
    mode: 'uniqLength' | 'avg' | 'notZeroLength' | 'sum';
  }
>;

type ISpanTableItem<T extends TKvPair> = T & {
  $rowSpan: Record<string, number>;
  $colSpan: Record<number, number>;
  $colField: Record<string | number, number>;
};
/**
 * 合并单元格。不改变原数组
 * @param data - 一维数组
 * @param fields - 合并的字段
 * @returns 合并后的数据。会在每一项中添加两个字段 "$rowSpan" "$colSpan" "$colField"
 */
declare function spanTable<T extends TKvPair>(data: T[], fields: string[]): ISpanTableItem<T>[];

/**
 * 正则千分位转换，支持小数（任意字符串按位数相隔）
 *
 * @param data 需要转换的字符
 * @param len 按多少位分隔一次，默认3
 * @param symbol 千分位替换符号，默认逗号
 */
declare function thousands(data: number | string, len?: number, symbol?: string): string;

/**
 * 键值对的map实现方法
 * @param data - 元数据
 * @param handler - 自定义处理函数
 * @returns
 */
declare function mapKvPair<T extends TKvPair, U>(
  data: T,
  handler: (data: TValueOf<T>, key: string) => U
): Record<string | number | symbol, U>;

/**
 * 模糊搜索，例如 a4 可匹配 a3645
 * @param search - 输入的值，如果为空，则表示无筛选条件，直接返回true
 * @param data - 源数据的值
 * @param regFlags - 与 RegExp 第二个参数相同，指定是否全局、区分大小写等
 * @return
 */
declare function isFuzzyMatch(search: string, data: string, regFlags?: string): boolean;

/**
 * 向字符串中添加零宽字符。（暂时用于排除同名表格单元格合并）
 * @param data - 需要处理的数据
 * @returns
 */
declare function mixInZeroWidthUnicode(data: string): string;

/**
 * 键值对的forEach实现方法
 * @param data - 元数据
 * @param handler - 自定义处理函数
 * @returns
 */
declare function forEachKvPair<T extends TKvPair, U>(
  data: T,
  handler: (data: TValueOf<T>, key: string, index: number) => U
): Record<string | number | symbol, U>;

/**
 * 获取排序后的索引列表。如 [2,1,3] 排序为 [1,2,3] 索引为 [1,0,2]
 * @param data - 原始数据
 * @param sortHandler 排序处理函数，与原生排序使用方式一致
 * @returns 索引列表
 */
declare function getSortIndex<T>(data: T[], sortHandler?: (a: T, b: T) => number): number[];

/**
 * 按索引顺序对数组进行排序
 * @param data 需要排序的数据
 * @param index 索引列表
 * @returns 新数据
 */
declare function sortWithIndex<T>(data: T[], index: ReturnType<typeof getSortIndex>): T[];

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
declare function listGroup<T extends TKvPair>(
  data: T[],
  options: IListGroupOption<T>
): {
  /** 树形分组数据 */
  data: TInnerGroupListItem<T>[];
  /** 获取单元格：值 */
  getCellValue: (
    uidPath: string[],
    field: TGetValueField,
    formatter: (value: number, list: T[]) => string,
    defaultData?: string
  ) => string;
  /** 获取单元格：纵向增长率 */
  getCellVerticalRiseRatio: (
    uidPath: string[],
    field: TGetValueField,
    formatter: (value: number) => string,
    defaultData?: string
  ) => string;
  /** 获取单元格：纵向累计 */
  getCellVerticalTotal: (
    uidPath: string[] | '*',
    field: TGetValueField,
    formatter: (value: number) => string,
    defaultData?: string
  ) => string;
  /** 获取单元格：纵向比重 */
  getCellVerticalProportion: (
    uidPath: string[],
    field: TGetValueField,
    formatter: (value: number) => string,
    defaultData?: string
  ) => string;
  /** 获取一行：值 */
  getRowCellValue: (
    uidPath: string[],
    fieldList: {
      id: string;
      field: TGetValueField;
    }[],
    formatter: (value: number) => string,
    defaultData?: string
  ) => Record<string, string>;
  /** 获取一行：纵向比重 */
  getRowVerticalProportion: (
    uidPath: string[],
    fieldList: {
      id: string;
      field: TGetValueField;
    }[],
    formatter: (value: number) => string,
    defaultData?: string
  ) => Record<string, string>;
};

declare function union<T extends TKvPair>(...args: T[]): T[];

declare function getRatio(value: number | undefined, base: number | undefined): number;

export {
  Polling,
  TArrayRowToColumnCalculateRow,
  _Array,
  _Boolean,
  _KvPair,
  _Number,
  _String,
  arrayRowToColumn,
  changeIndex,
  cloneEasy,
  dataPage,
  deepFindItem,
  deepFindTreePath,
  defaultValue,
  defineEventBus,
  fieldCheck,
  flatTree,
  floorFixed,
  forEach,
  forEachKvPair,
  forEachTree,
  getRandom,
  getRatio,
  getSortIndex,
  getType,
  isArray,
  isEmpty,
  isFunction,
  isFuzzyMatch,
  isKvPair,
  isLikeNumber,
  isNull,
  isString,
  listGroup,
  mapKvPair,
  main as mapTree,
  mixInZeroWidthUnicode,
  padEnd,
  padStart,
  param,
  parseQuery,
  randomColor,
  repeatString,
  roundFixed,
  shake,
  sortWithIndex,
  spanTable,
  split,
  thousands,
  flatArrayToTree as tree,
  trim,
  union,
  urlToGet,
  uuid,
  variableHasValue
};

export default undefined;
