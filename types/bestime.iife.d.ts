/**  
 * 个人工具库文档声明文件. bestime.iife.min.js
 * @QQ 1174295440
 * @author Bestime
 * @see https://github.com/bestime/tool
 */
declare namespace bestime {
  /** 键值对格式的数据 */
  export interface IMap {
    [key: string]: any;
  }

  export interface INeedItem{
    /** 暴露的全局变量名 */
    global?: string,

    /** 资源地址 */
    url: string,
  
    /** 必需先加载的依赖 */
    dependencies?: string[]

    /** 可以同步加载的依赖 */
    syncs?: string[],
  
    /** 是否请求完毕（无论成功失败） */
    _complete?: boolean

    /** 内部使用：同步依赖是否已经请求 */
    _syncsIsLoad?: boolean,

    /** 内部使用：异步依赖是否已经请求 */
    _depenIsLoad?: boolean,
  
    /** 内部使用：分组ID（方便调试）。第一位表示发起的请求分组，大小表示先后顺序。第二位表示此组中的依赖关系，值越大越先请求 */
    _deeps?: string,
  
    /** 内部使用：被请求次数 */
    _count?: number
  }

  /** 数据缓存工具回调函数 */
  export interface IdataCacheCAllback {
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
  }

  /**
   * 默认值处理函数
   * @param data - 需要处理的数据
   * @param value - 如果data为undefined，则返回此值
   * @returns 实际值
   */
  export function defaultValue<T>(data: any, value: T): T;

  /**
   * 创建一个url前缀批量转换函数，当前缀代理地址发生变化，方便修改
   *
   * @param config - 服务器白名单前缀配置
   * @returns 配置工具
   * @example
   *```javascript
   * // 初始化配置
   * const iUrl = serverConfig({
   *   '@baidu': 'http://www.google.com'
   * })
   *
   * const apiUrl = iUrl('/@baidu/api/user/info')
   * ```
   */
  export function serverConfig(config: { [key: string]: string | null }): (path: string) => string;

  /**
   * 强制转化数据为字符串
   * @param data - 处理的值
   * @returns 实际值
   */
  export function _String(data: any): string;

  /**
   * 获取数据类型
   *
   * @param data - 需要判断的数据
   * @return 数据类型字符串
   */
  export function getType(data: any): string;

  /**
   * 判断数据是否为数组
   * @param data - 判断的值
   * @returns 真假值
   */
  export function isArray(data: any): boolean;

  /**
   * 判断数据是否为对象
   * @param data - 判断的值
   * @returns 真假值
   */
  export function isMap(data: any): boolean;

  /**
   * 判断数据是否为函数
   * @param data - 判断的值
   * @returns 真假值
   */
  export function isFunction(data: any): boolean;

  /**
   * 对象序列化为字符串, 用于URL查询字符串或AJAX请求
   * @param data - 需要转化的数据
   * @returns 转换后的字符串
   */
  export function param(data: { [key: string]: any }): string;

  /**
   * 为url链接拼接参数
   * @param url - url地址
   * @param data - 查询参数
   * @returns 拼接后的url地址
   */
  export function urlToGet(url: string, data?: string | IMap): string;

  /**
   * 移除空字符串
   * @param data - 需要处理的数据
   * @param position - 移除位置。默认：两侧，1：左侧，-1右侧，* 所有
   * @returns 字符串
   */
  export function trim(data: string | number, position?: 1 | -1 | '*'): string;

  /**
   * 移除undefined和null数据
   *
   * @param data - 需要处理的数据
   * @param removeEmptyStr - 是否移除空字符串
   * @returns string
   */
  export function clean<T extends any[] | IMap>(data: T, removeEmptyStr?: boolean): T;

  /**
   * 对相同地址的数据进行缓存
   * @param url - 请求地址
   * @returns 处理工具
   */
  export function dataCacheUtil(url: string): IdataCacheCAllback;

  /**
   * 对相同地址的数据进行缓存
   * @param handler - 验证函数
   * @param callback - 成功回调
   * @param interval - 检测时间间隔（毫秒）. 默认60
   */
  export function variableHasValue(
    handler: () => boolean,
    callback: () => void,
    interval?: number
  ): void;

  /**
   * 查找某个元素所在树的所有父链
   * @param tree - 数据
   * @param handler - 验证回调
   * @param config - 字段映射配置。
   * @returns 查找的结果
   */
  export function deepFindTreePath(
    tree: any[],
    handler: (item: any) => boolean,
    config?: {
      id?: string;
      children?: string;
    }
  ): undefined | any[];

  /**
   * 设置cookie
   * @param key - 保存的键
   * @param value - 保存的值
   * @param t - 过期时间（毫秒）
   */
  export function setCookie(key: string, value: any, t: number): void;

  /**
   * 设置localstorage
   * @param key - 保存的键
   * @param value - 保存的值
   */
  export function setStorage(key: string, value: any): void;

  /**
   * @param key - 获取的键
   * @param target - 来源，默认document.cookie
   * @returns 保存的值
   */
  export function getCookie(key: string, target?: string): string;

  /**
   * @param key - 获取的键
   * @returns 保存的值
   */
  export function getStorage(key: string): any;

  /**
   * @param key - 删除的键
   * @returns 保存的值
   */
  export function removeStorage(key: string): any;

  /**
   * 删除cookie
   *
   * @param key - 键名
   */
  export function removeCookie(key: string): void;

  /**
   * 强制转换数据为键值对数据，如果是json字符串，会尝试解析，如果失败，则返回一个空Map
   *
   * @param data - 转换的数据
   * @returns 键值对数据
   *
   * @example
   * ```javascript
   * // => {}
   * const data = _Map('abc')
   *
   * // => {}
   * const data2 = _Map([])
   *
   * // => {name: 'a'}
   * const data3 = _Map({name: 'a'})
   * ```
   */
  export function _Map(data: any): IMap;

  /**
   * 强制转换数据为数组，如果是json字符串，会尝试解析，如果失败，则返回一个空[]
   *
   * @param data - 转换的数据
   * @returns 数组
   *
   * @example
   * ```javascript
   * // => []
   * const data = _Array('abc')
   *
   * // => []
   * const data3 = _Map({name: 'a'})
   * ```
   */
  export function _Array(data: any): any[];

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
  export function _Boolean(data: any): boolean;

  /**
   * 解析序列化字符参数为Map格式数据
   * @param data - url参数。默认为window.location.href
   * @returns 键值对
   */
  export function parseQuery(data?: string): IMap;

  /**
   * 强制转换数据为字符串
   * @param data - 值
   * @returns 数字
   */
  export function _Number(data: any): number;

  /**
   * 判断是否是数组
   * @param data - 值
   * @returns 真假
   */
  export function isArray(data: any): boolean;

  /**
   * 判断是否是 null 或者 undefined
   * @param data - 值
   * @returns 真假
   */
  export function isNull(data: any): boolean;

  /**
   * 下载 url 文件
   * @param url - 文件地址
   * @param fileName - 文件名
   */
  export function downloadFileByUrl(url: string, fileName: string): void;

  /**
   * 下载ArrayBuffer文件
   * @param data - ArrayBuffer格式的数据
   * @param fileName - 文件名
   */
  export function downloadFileByArrayBuffer(data: ArrayBuffer, fileName: string): void;

  /**
   * 循环复制字符串
   * @param data - 复制目标
   * @param count - 复制几次
   * @returns 结果
   */
  export function repeatString(data: string | number, count: number): string;

  /**
   * 向后填充字符串
   * @param data - 原始目标
   * @param len - 需要填充的总长度
   * @param target - 填充的字符串
   * @returns 结果
   */
  export function padEnd(data: string | number, len: number, target: string): string;

  /**
   * 向前填充字符串
   * @param data - 原始目标
   * @param len - 需要填充的总长度
   * @param target - 填充的字符串
   * @returns 结果
   */
  export function padStart(data: string | number, len: number, target: string): string;

  /**
   * 基于原生split优化版，使空字符传结果为 "[]"
   * @param data - 原始目标
   * @param symbol - 分割
   * @returns 结果
   */
  export function split(data: string, symbol: string): string[];

  /**
   * 保留几位小数并直接舍去后面的数（不进行四舍五入）
   * @param data - 长得像数字的字符串或数字
   * @param fractionDigits - 保留的小数位
   * @param rejection - 是否删除末尾所有的 "0"
   * @returns 结果
   */
  export function floorFixed(
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
  export function roundFixed(
    data: number | string,
    fractionDigits: number,
    rejection?: boolean
  ): string;

  /**
   * 一维数组转树结构
   * @param list - 待转数组
   * @param props - 生成数据的配置项
   * @param props.id - ID字段
   * @param props.pid - 父ID字段
   * @param props.children - 子项字段
   * @returns 结果
   */
  export function tree(
    list: any[],
    props?: {
      id?: string;
      pid?: string;
      children?: string;
    }
  ): any[];

  /**
   * 一维数组转树结构
   * @param list - 原始数组
   * @param handle - 遍历的回调函数
   * @param children - 子项字段
   * @returns 结果
   */
  export function deepFindItem(list: any[], handle: (data: any) => void, children?: string): any;

  /**
   * 在给定索引范围内，增减当前索引，如果超出范围，则按当前方向重新循环取值。
   * @param maxIndex - 最大索引
   * @param currentIndex - 当前索引
   * @param increase - 调整多少索引，可为负数
   * @returns 改变后的索引
   */
  export function changeIndex(maxIndex: number, currentIndex: number, increase: number): any;

  type ITimeLineUnints = [string, string, string, string, string, string, string];

  /**
   * 时间轴刻度格式化
   * @param list - 时间列表
   * @param units - 自定义单位。默认 ['年', '月', '日 ', '时', '分', '秒', '毫秒']
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
  export function timeLine(
    list: string[],
    units?: ITimeLineUnints
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
   * 时间轴刻度格式化
   * @param data - 时间列表
   * @param unit - 当前的基础单位。默认 "Bytes"
   * @returns 格式化后的数据
   */
  export function fileSize(
    data: number,
    unit?: 'KB' | 'Bytes' | 'MB'
  ): {
    Bit: number;
    Bytes: string;
    KB: string;
    MB: string;
    GB: string;
    TB: string;
    format: string;
  };

  /**
   * 移除Dom节点
   * @param dom - 待移除的dom元素
   */
  export function removeElement(dom: HTMLElement): void;

  /**
   * 移除Dom节点
   * @param ev - 事件
   * @param bubble - 阻止冒泡. 默认 true
   * @param stop - 阻止穿透. 默认 true
   */
  export function prevent(ev: Event, bubble?: boolean, stop?: boolean): void;

  /**
   * 生成唯一ID
   * @param length - id长度
   * @returns 生成的ID字符串
   */
  export function uuid(length?: number): string;

  /**
   * 生成指定范围随机数
   * @param min - 最小值
   * @param max - 最大值
   * @param int - 是否生成整数. 默认true
   * @returns 随机数
   */
  export function getRandom(min: number, max: number, int?: boolean): number;

  /**
   * 获取dom相对位置
   * @param el - dom
   * @returns 信息
   */
  export function getRelativePos(el: HTMLElement): {
    x: number;
    y: number;
    height: number;
    width: number;
    clientWidth: number;
    clientHeight: number;
  };

  /**
   * 将树形结构转为一维数组
   * @param data - 树
   * @param childKey - 子项字段。默认 children
   * @returns 浅克隆的数组
   */
  export function flatTree(data: any[], childKey?: string): any[];

  /**
   * 获取当前js所在路径
   * @param tir - 向上取几级目录，默认0，当前目录
   * @returns 相对路径
   */
  export function getJsFileBaseUrl(tir?: number): string;

  /** 按配置ID获取js或css */
  export function need(alias: string|string[], callback: (...args: any[]) => void): string;
  
  export namespace need {
    export function config (setting: {[key: string]: INeedItem}): void
    export function getConfig (): {[key: string]: INeedItem}
  }

}
