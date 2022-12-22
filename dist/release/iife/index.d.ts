/**
 * 个人工具库文档声明文件 bestime.iife.min.js
 * @QQ 1174295440
 * @author Bestime
 * @see https://github.com/bestime/tool
 */
declare namespace bestime {
  /**
   * 键值对格式的数据
   * */
  export type IKvPair = Record<string, any>;

  /** 数据缓存工具提供的方法 */
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
  export function serverConfig(config: Record<string, string | null>): (path: string) => string;

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
  export function isKvPair(data: any): boolean;

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
  export function param(data: Record<string | number, any>): string;

  /**
   * 为url链接拼接参数
   * @param url - url地址
   * @param data - 查询参数
   * @returns 拼接后的url地址
   */
  export function urlToGet(url: string, data?: string | Record<string | number, any>): string;

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
   * @param needRemoveEmptyString - 是否移除空字符串
   * @returns string
   */
  export function clean<T>(data: T, needRemoveEmptyString?: boolean): T;

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
    handler: () => boolean | undefined,
    callback: () => void,
    interval?: number
  ): void;

  export namespace variableHasValue {
    export function async(handler: () => boolean | undefined, interval?: number): Promise<true>;
  }

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
  export function setCookie(key: string, value: any, t?: number): void;

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
  export function _KvPair(data: any): IKvPair;

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
  export function _Array<T>(data: any): T[];

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
  export function parseQuery(data?: string): IKvPair;

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
   * @deprecated 名字取得不好
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
  export function deepFindItem<T>(
    list: T[],
    handle: (data: T) => void,
    children?: string
  ): T | undefined;

  /**
   * 在给定索引范围内，增减当前索引，如果超出范围，则按当前方向重新循环取值。
   * @param maxIndex - 最大索引
   * @param currentIndex - 当前索引
   * @param increase - 调整多少索引，可为负数
   * @returns 改变后的索引
   */
  export function changeIndex(maxIndex: number, currentIndex: number, increase: number): any;

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

  /**
   * 按配置别名，异步获取js或css
   * @param alias - 初始化时配置的别名
   * @param callback - 加载成功回调
   */
  export function need(alias: string | string[], callback?: (...args: any[]) => void): string;

  /** js、css 静态模块加载器 */
  export namespace need {
    export interface INeedConfigAliasItem {
      /** 资源地址 */
      url: string;

      /** 暴露的全局变量名 */
      moduleName?: string;

      /** 依赖项优先加载，然后再加载自己 */
      dependencies?: string[];

      /** 和自身一起加载的库，没有先后顺序 */
      with?: string[];
    }

    /**
     * 不支持懒人式的baseUrl，做人还是勤快点好。
     * @param setting - 配置参数
     *
     */
    export function config(setting: Record<string, INeedConfigAliasItem>): void;

    /**
     * 查看当前配置
     * @returns 实时配置
     */
    export function getConfig(): Record<string, INeedConfigAliasItem>;

    /**
     * 获取插件（Promise版）。
     * @remarks 注意：请保证你的项目支持Promise，此方法不做兼容
     */
    export function async(alias: string): Promise<any>;
    export function async(alias: string[]): Promise<any[]>;
  }

  /**
   * 简易版深度克隆。（仅处理数组、键值对、方法的可克隆）
   *
   * @param data - 克隆对象
   * @returns
   */
  export function cloneEasy<T extends [] | Record<any, any> | Function>(data: T): T;

  /**
   * 监听DOM尺寸变化
   * @param element - dom元素
   * @param handler - 变换回调函数
   * @param type - 监听类型。默认width+height
   * @param interval - 多久检查一次。默认值：500
   * @returns 销毁方法
   *
   */
  export function observeDomResize(
    element: HTMLElement,
    handler: (element: HTMLElement) => void,
    type?: 'width' | 'height',
    interval?: number
  ): () => void;

  /**
   * 树形结构map新数据
   * @param data - 原始树
   * @param handle - 迭代方法。这里不用返回子节点
   * @param childKeyTo - 转换的孩子键
   * @param childKeyFrom - 原始数据的孩子键
   * @returns 转变后的新数据
   */
  export function mapTree<T extends IKvPair, K extends IKvPair, C extends keyof T>(
    data: K[],
    childKeyTo: C,
    handle: (data: K) => Omit<T, C>,
    childKeyFrom?: keyof K
  ): T[];

  /**
   * 树形结构迭代
   * @param data - 原始树
   * @param handle - 迭代方法。这里不用返回子节点
   * @param childKey - 子节点字段。默认值：children
   */
  export function forEachTree<T extends IKvPair>(
    data: T[],
    handle: (data: T) => void,
    childKey?: keyof T
  ): void;

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
  export function defineEventBus<T extends (...args: any[]) => void>(
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
   * 获取浏览器窗口尺寸
   */
  export function getWindowSize(): {
    width: number
    height: number
  };
  /**
   * 获取随机颜色
   */
  export function randomColor(): string
}
