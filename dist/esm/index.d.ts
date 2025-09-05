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
 * 判断是否为空[null, undefined, '','-']
 * @params data - 判断的数据
 * @returns 判断结果
 */
declare function isEmpty(data: any): boolean;

/**
 * 判断数据是否为函数
 * @param data - 判断的值
 * @returns 真假值
 */
declare function isFunction(data: any): data is Function;

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

/** 数据缓存工具提供的方法 */
interface IdataCacheCAllback {
  /** 检查对应url是否已经有缓存标记 */
  isExist: () => boolean;
  /**
   * 为对应url设置缓存树
   * @param data - 缓存的数据
   */
  set: (data: any) => void;
  /**
   * 获取缓存数据
   * @param success - 回调函数
   */
  get: (success: (data: any) => void) => void;
  logs: Record<string, any>;
}
/**
 * 对相同地址的数据进行缓存
 * @param url - 请求地址
 * @returns 处理工具
 */
declare function dataCache(url: string, record?: Record<string, any>): IdataCacheCAllback;

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
 * 强制转换数据为字符串。支持百分号、千分位
 * @param data - 值
 * @returns 数字
 */
declare function _Number(data?: any): number;

type TNull = undefined | null | '';
/**
 * 判断数据是否为空
 * @param data 待判断数据。null、undefined、空字符串 都将视为空
 * @param whiteList 特殊需求。默认将 [‘-’] 也视为空数据
 * @returns
 */
declare function isNull(data: any, whiteList?: string[]): data is TNull;

/**
 * 匹配数字的正则
 * @returns
 */
declare function getLikeNumberRegExp(): string;
/**
 *
 * @param value 看起来是否像一个数字。可识别百分号、千分位
 * @example
 * ```
 * isLikeNumber('-123,456,789') => true
 * isLikeNumber('1,4,5.912%') => true
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
 * 循环复制字符串
 * @param target - 复制目标
 * @param count - 目标长度
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
 * @param decimals - 保留的小数位
 * @param removeEndZero - 是否删除末尾所有的 "0"
 * @returns 结果
 */
declare function roundFixed(
  data: number | string | null | undefined,
  decimals: number,
  removeEndZero?: boolean
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
 * 一维数组转树结构。（会改变源数组，如有需要，请提前clone）
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
declare function uuid(length?: number): string;

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

type EventHander$2 = (...args: any[]) => void;
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
declare function defineEventBus<T extends EventHander$2>(
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
  eventList: () => EventHander$2[];
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
 * @return rgba颜色值
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

type TValidator<T> = (data: T) => void | string | undefined;
declare const fieldCheck: {
  /**
   * 验证传入的数据是否是数字
   * @param title - 标题
   * @param value - 值
   * @param required - 是否必填
   * @returns
   */
  number(
    title: string,
    value: any,
    required?: boolean,
    validator?: TValidator<number>
  ): {
    value: number;
    error: string | void | undefined;
  };
  /**
   * 验证传入的数据是否是字符串
   * @param title - 标题
   * @param value - 值
   * @param required - 是否必填
   * @returns
   */
  string(
    title: string,
    value: any,
    required?: boolean,
    validator?: TValidator<string>
  ): {
    value: string;
    error: string | void | undefined;
  };
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
  count:
    | number
    | {
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
  $colField: Record<string | number, number>;
};
/**
 * 合并单元格。不改变原数组
 * @param data - 一维数组
 * @param fields - 合并的字段
 * @returns 合并后的数据。会在每一项中添加两个字段 "$rowSpan" "$colField"
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
declare function fuzzyReplace(search: string, data: string, regFlags?: string): string;

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
 *
 * @param data - 原始数据
 * @param sortHandler 排序处理函数，与原生排序使用方式一致
 * @returns 索引列表
 *
 */
declare function getSortIndex<T>(data: T[], sortHandler: (a: T, b: T) => number): number[];

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
  denominator?: number | [string, 'length' | 'uniqLength'];
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
  /** 获取一个分组的所有原始数据，用于使用者自行计算 */
  getOriginGroupData: (uidPath: string[], field: TGetValueField) => T[];
  getOriginAllData: () => T[];
};

declare function union<T extends TKvPair>(...args: T[]): T[];

declare function getRatio(value: number | undefined, base: number | undefined): number;

/**
 * 计算一个数据变化的增长率
 *
 * @param from
 * @param to
 * @returns
 */
declare function getRiseRatio(from?: number, to?: number): number;

/**
 * 筛选并从原始数组移除符合条件的数据
 * @param data - 原始数据
 * @param predicate - 迭代回调
 * @returns 筛选的结果
 */
declare function filterWithMove<T>(
  data: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[];

type TUnits = [number, string];
/**
 * 数字格式化为简称
 * @param data - 数字
 * @param formatter - 格式化数字（不包括单位）
 * @param units - 格式化规则，可自定义
 * @returns 数字简写
 */
declare function export_default(
  data: number,
  formatter: (data: number) => string,
  units?: TUnits[]
): {
  value: number;
  fmtValue: string;
  data: number;
  unit: string;
};

declare function formatTime(millisecond: number): string;

interface IInputHeaderItem {
  field: string;
  title: string;
  children: IInputHeaderItem[];
}
interface IParsedHeaderInfoItem extends IInputHeaderItem {
  count: number;
  children: IParsedHeaderInfoItem[];
}
interface IParsedHeaderDataItem extends Omit<IParsedHeaderInfoItem, 'children'> {
  colStart: number;
  colEnd: number;
  colSpan: number;
  rowSpan: number;
}
/**
 * 将树形数据转换为二维数组，并包含合并行列信息
 * @param header 树形列表
 * @returns
 */
declare function parseTreeToTableHeader(header: IInputHeaderItem[]): {
  columns: string[];
  data: (IParsedHeaderDataItem | undefined)[][];
};

type TEcharts = Record<string, any>;
interface IConnectConfigItem {
  onXAxisCtegoryClick?: (xAxisData: any[], tickIndex: number, chart: TEcharts) => void;
}
interface IListItem {
  config?: IConnectConfigItem;
  instence: TEcharts;
  onAxxisCategoryClick?: (ev: { tickIndex: number; needEmit?: boolean }) => void;
  onAxxisSeriesClick?: (ev: any) => void;
  timer_01: any;
}
declare class ConnectEcharts {
  _list: Record<string, IListItem[]>;
  constructor();
  _resetGroupClickXAxisCategory(chartList: IListItem[]): void;
  clickXAsisCategory(chart: TEcharts, index: number, notEmit?: boolean): void;
  add(i: TEcharts, config: IConnectConfigItem): this;
  remove(chart?: TEcharts): void;
}
declare const _default: ConnectEcharts;

interface IRuleItem {
  min: number;
  max: number;
  color: string;
}
interface IResItem {
  gte: number;
  lt: number;
  color: string;
}
/**
 * 对数据进行分段处理
 * @param list
 * @param rules
 * @returns
 */
declare function getPiecesWithIndex(list: number[], rules: IRuleItem[]): IResItem[];

declare function difference<T extends TKvPair | string | number | Date>(
  a: T[],
  b: T[],
  compareFn: (a: T, b: T) => boolean
): T[];

type TreeItem$1<T extends TKvPair> = T & {
  children?: TreeItem$1<T>[];
};
/**
 * 获取树形结构的叶子节点
 * @param list - 树形结构数据
 * @returns 叶子节点组装的一维数组
 */
declare function treeLeafs<T extends TKvPair>(list: TreeItem$1<T>[]): TreeItem$1<T>[];

/**
 * 默认数据处理
 * @param placeValue - 无值时返回什么数据
 * @param value - 需要处理的数据。默认将 undefined、null、'' 视为无值
 * @param formatter - 数据格式化
 * @param whiteList 特殊需求。默认将 [‘-’] 也视为空数据
 * @returns
 */
declare function defualtFormatter<T, R>(
  placeValue: R,
  value: T,
  formatter?: (value: NonNullable<T>) => R,
  whiteList?: string[]
): R;

type TEasingHandler = (
  passTime: number,
  fromValue: number,
  changeValue: number,
  duration: number
) => number;
type TChangeCallack<T> = (data: T, progress: number) => void;
interface IAnimateOptions<T> {
  /** 原始值 */
  from: T;
  /** 最终值 */
  to: T;
  /** 缓动函数 */
  easing: TEasingHandler;
  /** 持续时间：毫秒 */
  duration: number;
  /** 每次值更新的回调 */
  onChange: TChangeCallack<T>;
}
declare class Animate<T extends TKvPair> {
  _timer: any;
  _passTime: number;
  _options: IAnimateOptions<T>;
  _middleData: T;
  constructor(options: IAnimateOptions<T>);
  start(): this;
  stop(): this;
  dispose(): void;
}

type EventHander$1 = (...args: any[]) => void;
/**
 * 防抖函数。默认执行条件范围内最后一次
 * @param handler - 处理回调
 * @param interval - 频率（毫秒）
 * @param options - 配置项
 * @param options.leading - 立即执行
 * @param options.trailing - 延后执行
 * @returns
 */
declare function debounce<T extends EventHander$1>(
  handler: T,
  interval?: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  }
): {
  (this: any, ...v: Parameters<T>): void;
  cancel(): void;
  dispose(): void;
};

type EventHander = (...args: any[]) => void;
declare function throttle<T extends EventHander>(
  handler: T,
  interval?: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  }
): {
  (this: any, ...v: Parameters<T>): void;
  cancel(): void;
  dispose(): void;
};

/**
 *
 * @deprecated 已废弃，请使用getMinAndMax
 * 将一堆数字中的极值按差值的比例进行扩大。多用于echarts坐标轴的极值限制
 *
 * @param ratio 扩大倍数
 * @param data 数据
 * @returns
 */
declare function padMinMax(
  ratio: number,
  ...data: Array<Array<number | undefined>>
): {
  min: number | undefined;
  max: number | undefined;
};

type TreeItem<T extends TKvPair> = T & {
  children?: TreeItem<T>[];
};
type TreeFilterHandler<T extends TKvPair> = (item: TreeItem<T>) => boolean;
declare function treeFilter<T extends TKvPair>(
  treeList: TreeItem<T>[],
  handler: TreeFilterHandler<T>
): TreeItem<T>[];

/**
 * 倒序查找数组
 * @param list
 * @param handler
 * @returns
 */
declare function findLast<T>(
  list: T[],
  handler: (value: T, index: number, obj: T[]) => boolean
): T | undefined;

/**
 * 数组find方法的键值对版本
 * @param data
 * @param handler
 * @returns
 */
declare function findKvPair<T extends TKvPair>(
  data: T,
  handler: (data: TValueOf<T>, key: string) => boolean
): T[Extract<keyof T, string>] | undefined;

type TSizeUnit = 'Byte' | 'KB' | 'MB' | 'GB' | 'TB';
declare function fileSizeFormatter(
  byte: number,
  formatter: (data: number) => string
): {
  value: number;
  unit: string;
  text: string;
};
declare function fileSizeToNumber(data: number, unit: TSizeUnit): number;

/**
 * 颜色的rgba转十六进制
 * @param rgba 带转换颜色字符串。格式： `rgba(0,0,0,1)` 或 `rgb(255,255,255)`
 * @returns 十六进制值
 */
declare function rgbaToHex(rgba: string): string;

/**
 * 十六进制颜色转rgb
 * @param hex
 * @returns
 */
declare function hexToRgba(hex: string, alpha?: number): string;

/**
 * 获取一个数组中的最大值
 * @param data 数组
 * @param handler 迭代函数
 * @returns 最大值
 */
declare function max<T>(
  data: Array<T>,
  handler: (item: T) => number | undefined
): number | undefined;

/**
 * 获取一个数组中的最小值
 * @param data 数组
 * @param handler 迭代函数
 * @returns 最大值
 */
declare function min<T>(
  data: Array<T>,
  handler: (item: T) => number | undefined
): number | undefined;

/**
 * 将数字转为大写
 * @param digit
 * @param isRmb
 * @returns
 */
declare function numberToChinese(digit: number, isRmb?: boolean): string;

type ISortItem = number | undefined | null;
/**
 * 数组排序的迭代方法（多用于多个条件优先级排序）
 * @param way 排序方式 asc 从a至b升序；desc 从a至b降序
 * @param a
 * @param b
 * @returns 如果返回数字，怎么不管，如果返回undefined，则继续下一个排序规则，直到排序完成
 *
 * @example
 * ```ts
 *
 * data.sort(function (a, b) {
 *   const sort01 = ortCompare('asc', a.price, b.price)
 *   const sort02 = ortCompare('asc', a.age, b.age)
 *   return sort01 ?? sort02 ?? 0
 * })
 * ···
 */
declare function sortCompare(way: 'asc' | 'desc', a: ISortItem, b: ISortItem): number | undefined;

interface LogItem {
  id: string;
  time: string;
  pid?: string;
  title: string;
  data?: string;
}
declare function logRecord(
  title: string,
  data?: string,
  notPrint?: boolean
): (title: string, data?: string) => void;
declare function logExport(): {
  flatList: LogItem[];
  treeList: any[];
};

type TCallback = (ms: number) => void;
type THander = (callback: TCallback) => void;
/**
 * 每隔一段时间更新服务器时间与本地时间差（为了不频繁去请求服务器）
 *
 */
declare class ServerDate {
  private _diff;
  private _interval;
  private _handler;
  private _timer;
  private _actionId;
  private _isRuning;
  /**
   *
   * @param interval - 多久更新一次时间差
   * @param _handler - 用户去获取服务器时间的代码
   */
  constructor(interval: number, _handler: THander);
  private _refresh;
  /**
   * 更新一次服务器时间
   */
  updateOnce(callback: () => void): void;
  /**
   * 定时更新服务器时间
   */
  play(): this;
  /**
   * 暂停定时更新服务器时间
   * @returns
   */
  pause(): this;
  getDiff(): number;
  /**
   * 获取服务器当前时间戳（请确保play() 已经执行成功）
   * @returns
   */
  getTime(): number;
}

declare function breakString(rowLength: number, data?: string): string[];

/**
 * 获取一个时间是当年第几周
 * @param endTime - 目标时间
 * @returns 第几周
 */
declare function getWeekSort(endTime: string): number;
/**
 * 获取截至指定时间的周列表
 * @param endTime 截止时间（起始时间为此年初）
 * @param count 需要几周，如果此年不足数量，则向往年取时间，不填则仅后去当年数据
 * @returns 周列表
 */
declare function getWeeks(
  endTime: string,
  count?: number
): {
  week: number;
  label: string;
  from: string;
  to: string;
}[];

type TVu = string | number;
/**
 * 格式化一个范围
 * @param from 起始值
 * @param to 终止值
 * @param connector 连接符
 * @returns
 */
declare function formatRange(from?: TVu, to?: TVu, connector?: string): string;

/**
 * 获取一个路径的文件名（最后一级的名称）
 * @param path 原始路径
 * @returns 文件名
 */
declare function getFileName(path?: string): string;

/**
 * 循环补充数组到指定长度
 * @param data - 复制目标
 * @param length - 目标长度
 * @returns 结果
 */
declare function repeatArray<T>(target: T[], length: number): T[];

declare function checkPhone(data: any): boolean;

type TReturnV = number | undefined;
/**
 * 获取数字中的最小和最大值
 * @param data - 原始数据
 * @param config - 额外配置项
 * @param config.spaceRatio - 默认值：0，根据最小、最大值的差值，将最小值减小几倍，将最大值增大几倍
 * @param config.getter - 迭代函数（复杂结构需要），默认仅处理数字
 * @param config.formatter - 将最终结果格式化
 * @returns 计算后的最大、最小值
 */
declare function getMinAndMax<T>(
  data: Array<T>,
  config?: {
    spaceRatio?: number;
    getter?: (item: T) => TReturnV;
    formatter?: (item: number) => number;
  }
): {
  min: TReturnV;
  max: TReturnV;
};

/**
 * 创建一个ID生成器，用于将字符串变为ID，相同字符串ID不变（进当前会话有效，不可用于固定ID）
 * @param prefix
 * @returns
 */
declare function createIdFactory(prefix: string): (name: string) => string;

/**
 * 截取数组从指定索引到指定长度（不改变原数组）
 * @param data 原始数组
 * @param fromIndex 开始索引
 * @param length 获取长度
 * @returns
 */
declare function getArray<T>(data: T[], fromIndex: number, length: number): T[];

/**
 * 给数字添加正负号
 * @param data - 原始数字
 * @returns 正负数字字符串
 */
declare function signNumber(data: number | undefined): string;

type TBusinessTypeKey = 1 | 2 | 3 | 4;
interface IOption {
  headers: {
    attrId: string;
    attrName: string;
    attrKey: string;
  }[];
  dataInfo: {
    id: string;
    order: number;
    taskId: string;
    content: string;
    type: TBusinessTypeKey;
    url: string;
  }[];
  row: {
    comment: string;
    completeRate?: number;
    completeValue?: number;
    id: string;
    order: number;
    parentTaskId: string;
    scoreActual?: number;
    attrs: {
      attrId: string;
      value: string;
    }[];
  }[];
}
interface IUseTableHeader {
  attrId: string;
  field: string;
  label: string;
  colspan: number;
}
interface IUseCellV {
  /** 前端循环用的key */
  key: string;
  /** 单元格映射的ID */
  cellId: string | undefined;
  /** 单元格其中一项的内容 */
  content: string;
  /** 数据类型 */
  businessType: TBusinessTypeKey;
  businessTypeName: string;
  /** 用于具体接口传参用 */
  businessId: string | undefined;
  /** 点击后跳转的链接 */
  businessLink: string | undefined;
  /** 是否可点击 */
  clickable: boolean;
}
interface IUseTableCell {
  id: string;
  meta: {
    attrId: string;
    comment: string;
    scoreActual: string;
    completeRate: string;
    completeValue: string;
  };
  colspan: Record<string, number>;
  rowspan: Record<string, number>;
  cell: Record<string, IUseCellV[]>;
}
interface IZjxkjPFMTCfg {
  clickable: boolean;
}
/**
 * 智界新科技：解析交易中心业绩合同表为一维数组
 * @remarks 前台、后台都在使用，为了不让同事误改此方法，所以封装在自己工具库里
 *
 * @param query - 接口返回的数据
 * @returns 给前端方便使用的数据格式
 */
declare function zjxkjPerformanceTable(
  query: IOption,
  config?: Record<string, IZjxkjPFMTCfg>
): {
  headers: IUseTableHeader[];
  body: IUseTableCell[];
  totalScore: number;
};

export {
  Animate,
  Polling,
  ServerDate,
  TArrayRowToColumnCalculateRow,
  _Array,
  _Boolean,
  _KvPair,
  _Number,
  _String,
  arrayRowToColumn,
  breakString,
  changeIndex,
  checkPhone,
  cloneEasy,
  _default as connectEcharts,
  createIdFactory,
  dataCache,
  dataPage,
  debounce,
  deepFindItem,
  deepFindTreePath,
  defineEventBus,
  defualtFormatter,
  difference,
  fieldCheck,
  fileSizeFormatter,
  fileSizeToNumber,
  filterWithMove,
  findKvPair,
  findLast,
  floorFixed,
  forEach,
  forEachKvPair,
  forEachTree,
  formatRange,
  formatTime,
  fuzzyReplace,
  getArray,
  getFileName,
  getLikeNumberRegExp,
  getMinAndMax,
  getPiecesWithIndex,
  getRandom,
  getRatio,
  getRiseRatio,
  getSortIndex,
  getType,
  getWeekSort,
  getWeeks,
  hexToRgba,
  isArray,
  isEmpty,
  isFunction,
  isFuzzyMatch,
  isKvPair,
  isLikeNumber,
  isNull,
  isString,
  listGroup,
  logExport,
  logRecord,
  mapKvPair,
  main as mapTree,
  max,
  min,
  mixInZeroWidthUnicode,
  numberToChinese,
  padEnd,
  padMinMax,
  padStart,
  param,
  parseQuery,
  parseTreeToTableHeader,
  randomColor,
  repeatArray,
  repeatString,
  rgbaToHex,
  roundFixed,
  shake,
  export_default as shortNumber,
  signNumber,
  sortCompare,
  sortWithIndex,
  spanTable,
  split,
  thousands,
  throttle,
  flatArrayToTree as tree,
  treeFilter,
  treeLeafs,
  trim,
  union,
  urlToGet,
  uuid,
  variableHasValue,
  zjxkjPerformanceTable
};

export default undefined;
