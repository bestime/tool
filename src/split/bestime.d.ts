declare module "@/utils/bestime/parseQuery.js" {
  /**
   * 解析url参数
   */
  export default function parseQuery(str?: string): {}
}

declare module "@/utils/bestime/clean.js" {
  /**
   * 清空多余数据
   */
  export default function clean(data: {}, removeEmptyStr:boolean=false,removeEmptyObject:boolean=true): {}
}

declare module "@/utils/bestime/param.js" {
  /**
   * 数据序列化
   */
  export default function param(data: {}): string
}

declare module "@/utils/bestime/getNumberNuit.js" {
  /**
   * 数字转换单位
   */
  export default function getNumberNuit(value: number, basicUnit: string): {
    value: string,
    unit: string
  }
}

declare module "@/utils/bestime/_Number.js" {
  /**
   * 强制转换为数字
   */
  export default function _Number(value: any): number
}

declare module "@/utils/bestime/_Array.js" {
  /**
   * 强制转换为数组
   */
  export default function _Array(value: any): []
}

declare module "@/utils/bestime/isObject.js" {
  /**
   * 判断是否是键值对数据
   */
  export default function isObject(value: any): boolean
}

declare module "@/utils/bestime/_Object.js" {
  /**
   * 强制转换为键值对映射
   */
  export default function _Object(value: any): {
    [key: string | number]: any
  }
}

declare module "@/utils/bestime/dataReady.js" {
  /**
   * 监测数据加载，直到数据被监测到时，完成 Promise
   * @param {function}  handler:() => boolean
   * @param {number} interval 每多少毫秒监测一次
   */
  export default function dataReady(handler:() => boolean, interval: number): Promise<void>
}

declare module "@/utils/bestime/addClass.js" {
  /**
   * 给html元素添加class
   */
  export default function addClass(element: any, classNames: string | Array<string>)
}

declare module "@/utils/bestime/removeClass.js" {
  /**
   * 清除html元素添的class
   */
  export default function removeClass(element: any, classNames: string | Array<string>)
}

declare module "@/utils/bestime/getRandom.js" {
  /**
   * 获取随机数
   */
  export default function getRandom(min: number, max:number, needInt=false):number
}

declare module "@/utils/bestime/trim.js" {
  /**
   * 移除字符串空格（默认移除左右空格）
   */
  export default function trim(value: any, position?: 1 | -1 | 0 | '*'): string
}

declare module "@/utils/bestime/apiDataCache.js" {
  /**
   * 获取随机数
   */
  export default function apiDataCache(option: {
    url: string
  }): {
    isStart: () => boolean,
    getData: () => Pormise<void>,
    setData: (data: any) => void
  }
}


declare module "@/utils/bestime/countYearDays.js" {
  /**
   * 计算一年多少天
   */
  export default function countYearDays(year?: number): number
}

declare module "@/utils/bestime/hasClass.js" {
  /**
   * dom是否含有此class
   */
  export default function hasClass(element, className: string): boolean
}

declare module "@/utils/bestime/_String.js" {
  /**
   * 强制转换为字符串
   */
  export default function _String(value: any): string
}

declare module "@/utils/bestime/observeElementResize.js" {
  /**
   * 监听dom尺寸变化
   */
  export default function observeElementResize(element: HTMLElement, callback: (isWidthChange:boolean, isHeightChange: boolean) => void, millisecond: number): {
    dispose: () => void
  }
}

declare module "@/utils/bestime/floorFixed.js" {

  /**
   *
   * 保留几位小数并直接舍去后面的数（不进行四舍五入）
   *
   * @param {Number|String} variate 数字或长得像数字的字符串
   * @param {Number} [digitCount] <正整数> 采用几位小数
   * @param {Boolean} [rejection=false] 是否舍去末尾的所有0
   *
   * @return {String}
   */
  export default function floorFixed(variate: any, digitCount: number, rejection?:boolean): string
}



declare module "@/utils/bestime/setStorage.js" {
  /**
   * 设置本地存储
   */
  export default function setStorage(key: string, value: any): void
}

declare module "@/utils/bestime/setStorage.js" {
  /**
   * 设置本地存储
   */
  export default function setStorage(key: string, value: any): void
}

declare module "@/utils/bestime/getStorage.js" {
  /**
   * 获取本地存储
   */
  export default function getStorage(key: string): any
}

declare module "@/utils/bestime/removeStorage.js" {
  /**
   * 删除本地存储
   */
  export default function removeStorage(key: string): void
}

declare module "@/utils/bestime/removeElement.js" {
  /**
   * 移除dom节点
   */
  export default function removeElement(element: any): void
}

declare module "@/utils/bestime/isArray.js" {
  /**
   * 是否是数组
   */
  export default function isArray(data: any): boolean
}

declare module "@/utils/bestime/_Url.js" {
  /**
   * 链接补全
   * @param {string} url 可能是相对地址
   * @param {string} prefix 如果url不完整，则使用此前缀
   */
  export default function _Url(url: string, prefix: string): string
}

declare module "@/utils/bestime/prevent.js" {
  /**
   * 阻止事件冒泡
   */
  export default function prevent(event: any, bubble: boolean, stop?: boolean): void
}

declare module "@/utils/bestime/unique.js" {
  /**
   * 数组去重
   */
  export default function unique<T>(data: Array<T>, isVague?: boolean, handle?: (item: any) => any): Array<T>
}

declare module "@/utils/bestime/mapToArray.js" {
  /**
   * 映射数据转数组
   */
  export default function mapToArray<T>(data: {
    [key: string]: T
  }): Array<T>
}

declare module "@/utils/bestime/onlyOneAddClass.js" {
  /**
   * 只给一组DOM中的其中一个添加某个类名
   */
  export default function onlyOneAddClass<T>(list: HTMLCollectionOf<HTMLLIElement>, index: number, className: string): void
}
