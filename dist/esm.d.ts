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
 * @param data - 判断的值
 * @returns 真假值
 */
declare function isArray(data: any): boolean;

/**
 * 判断数据是否为对象
 * @param data - 判断的值
 * @returns 真假值
 */
declare function isKvPair(data: any): boolean;

/**
 * 递归将所有属性改为可选
 */
type BTDeepPartial<T = any> = {
  [P in keyof T]?: T[P] extends Function ? T[P] : T[P] extends object ? BTDeepPartial<T[P]> : T[P];
};
/**
 * 键值对格式的数据
 * */
type IKvPair = Record<string, any>;

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
declare function _KvPair(data: any): IKvPair;

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
declare function param(data: Record<string | number, any>): string;

/**
 * 为url链接拼接参数
 * @param url - url地址
 * @param searchString - 查询参数
 * @returns 拼接后的url地址
 */
declare function urlToGet(url: string, searchString: string | Record<string, any>): string;

/**
 * 移除空字符串
 * @param data - 需要处理的数据
 * @param pos - 移除位置。默认：两侧，1：左侧，-1右侧，* 所有
 * @returns 字符串
 */
declare function trim(data: any, pos?: 1 | -1 | '*'): string;

declare function clean<
  T extends
    | any[]
    | {
        [key: string]: any;
        [key: number]: any;
      }
>(data: T, removeEmptyStr?: boolean, removeEmptyObject?: boolean): T;

type TargetData = Record<string, any> | any[];
interface Options {
  string?: Boolean;
  array?: Boolean;
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
declare function dataCacheUtil(url: string): IdataCacheCAllback;

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

declare function isNull(data: any): boolean;

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

type ITimeLineUnints = Partial<[string, string, string, string, string, string, string]>;
/**
 * 时间轴刻度格式化
 * @param list - 时间列表
 * @param units - 自定义单位。默认 ['年', '月', '日 ', '时', '分', '秒', '毫秒']。可以空字符串
 * @returns 格式化后的数组
 *
 * @example
 *```javascript
 *const data = [
 *  '2022-04-10 12:10:20',
 *  '2022-04-10 12:11:20',
 *  '2022-04-10 12:12:20',
 *  '2022-04-10 13:00:20',
 *  '2022-04-10 13:01:20',
 *  '2022-04-10 13:05:20',
 *  '2022-04-11 00:00:00',
 *  '2022-04-11 01:00:00',
 *  '2022-04-11 02:00:00',
 *  '2022-05-01 00:00:00',
 *  '2022-05-02 00:00:00',
 *];
 *const timeList = timeLine(data, ['年', '月', '日 ', '时', '分', '秒', '毫秒'])
 *```
 */
declare function timeLine(
  list: string[],
  units: [string, string, string, string, string, string, string]
): {
  /** 时间刻度文本 */
  label: string;
  /** 最小时间拆分项，可以此二次自定义封装不同业务 */
  split: ITimeLineUnints;
  /** 时间戳 */
  timestamp: number;
  /** 为改变的原始值 */
  value: string;
}[];

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
declare function main<T extends IKvPair, K extends IKvPair, C extends keyof T>(
  data: K[],
  childKeyTo: C,
  handle: (data: K) => Omit<T, C>,
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
declare function forEachTree<T extends IKvPair>(
  data: T[],
  handle: (data: T) => void,
  childKey?: keyof T
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
 * 设置cookie。默认path="/"
 * @param key - 设置的键名
 * @param value - 设置的值
 * @param expiredTime - 单位（毫秒）
 */
declare function setCookie(key: string, value: string, expiredTime?: number): void;

/**
 * @param key - 获取的键
 * @param target - 来源，默认document.cookie
 * @returns 保存的值
 */
declare function getCookie(key: string, target?: string): string;

/**
 * 删除cookie
 *
 * @param key - 键名
 */
declare function removeCookie(key: string): void;

/**
 * 解析序列化字符参数为Map格式数据
 * @param str - url 查询参数。默认为window.location.href
 * @returns 键值对
 */
declare function parseQuery(str?: string): IKvPair;

/**
 * 下载 url 文件
 * @param url - 文件地址
 * @param fileName - 文件名
 */
declare function downloadFileByUrl(url: string, fileName: string): void;

/**
 * 下载ArrayBuffer文件
 * @param data - ArrayBuffer格式的数据
 * @param fileName - 文件名
 */
declare function downloadFileByArrayBuffer(data: ArrayBuffer, fileName: string): void;

/**
 * 移除Dom节点
 * @param dom - 待移除的dom元素
 */
declare function removeElement(el: HTMLElement): void;

/**
 * 移除Dom节点
 * @param ev - 事件
 * @param bubble - 阻止冒泡. 默认 true
 * @param stop - 阻止穿透. 默认 true
 */
declare function prevent(ev: Event, bubble: boolean, stop: boolean): void;

/**
 * @param key - 获取的键
 * @returns 保存的值
 */
declare function getStorage(key: string): string;

/**
 * @param key - 删除的键
 * @returns 保存的值
 */
declare function removeStorage(key: string): void;

/**
 * 设置localstorage
 * @param key - 保存的键
 * @param value - 保存的值
 */
declare function setStorage(key: string, value: any): void;

/**
 * 获取dom相对位置
 * @param el - dom
 * @returns 信息
 */
declare function getRelativePos(el: HTMLElement): {
  x: number;
  y: number;
  height: number;
  width: number;
  clientWidth: number;
  clientHeight: number;
};

/**
 * 获取当前js所在路径
 * @param tir - 向上取几级目录，默认0，当前目录
 * @returns 相对路径
 */
declare function getJsFileBaseUrl(tir: number): string;

interface LibraryFileConfig {
  type: 'js' | 'css';
  url: string;
  module: string;
  dependencies?: LibraryFileConfig[];
  with?: LibraryFileConfig[];
  attribute?: Record<string, string>;
}
type SuccessCallback = (...args: any[]) => void;
/**
 * js和css文件加载器
 * @param files - 文件配置
 * @param callback - 加载成功回调
 */
declare function libraryFile(
  files: LibraryFileConfig | LibraryFileConfig[],
  callback: SuccessCallback
): void;

/**
 * 监听DOM尺寸变化
 * @param element - dom元素
 * @param handler - 变换回调函数
 * @param type - 监听类型。默认width+height
 * @param interval - 多久检查一次。默认值：500
 * @returns 销毁方法
 *
 */
declare function observeDomResize(
  element: HTMLElement,
  handler: (element: HTMLElement) => void,
  type?: ('width' | 'height' | 'position')[],
  interval?: number
): () => void;

/**
 * 获取浏览器窗口尺寸
 */
declare function getWindowSize(): {
  width: number;
  height: number;
};

export {
  Polling,
  _Array,
  _Boolean,
  _KvPair,
  _Number,
  _String,
  changeIndex,
  clean,
  cloneEasy,
  dataCacheUtil,
  dataPage,
  deepFindItem,
  deepFindTreePath,
  defaultValue,
  defineEventBus,
  downloadFileByArrayBuffer,
  downloadFileByUrl,
  flatTree,
  floorFixed,
  forEachTree,
  getCookie,
  getJsFileBaseUrl,
  getRandom,
  getRelativePos,
  getStorage,
  getType,
  getWindowSize,
  isArray,
  isFunction,
  isKvPair,
  isNull,
  libraryFile,
  main as mapTree,
  observeDomResize,
  padEnd,
  padStart,
  param,
  parseQuery,
  prevent,
  randomColor,
  removeCookie,
  removeElement,
  removeStorage,
  repeatString,
  roundFixed,
  setCookie,
  setStorage,
  shake,
  split,
  timeLine,
  flatArrayToTree as tree,
  trim,
  urlToGet,
  uuid,
  variableHasValue
};

export default undefined;
