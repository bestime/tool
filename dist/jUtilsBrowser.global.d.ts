/**
 * 获取浏览器窗口尺寸
 */
declare function getWindowSize(): {
  width: number;
  height: number;
};

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
 * 给dom元素添加className
 * @param el - DOM
 * @param from - 将要被替换的className
 * @param to - 替换为
 * @returns
 */
declare function replaceClass(
  el: HTMLElement,
  from: string | string[],
  to: string | string[]
): void;

/**
 * 给dom元素添加className
 * @param el - DOM
 * @param name - 需要添加的className
 * @returns
 */
declare function addClass(el: HTMLElement, name: string | string[]): void;

/**
 * 给dom元素移除className
 * @param el - DOM
 * @param name - 需要移除className
 * @returns
 */
declare function removeClass(el: HTMLElement, name: string | string[]): void;

/**
 * 给dom元素添加className
 * @param el - DOM
 * @param name - 将要被切换的className
 * @returns
 */
declare function toggleClass(el: HTMLElement, name: string | string[]): void;

declare const _default: {
  isChrome: boolean;
  isIPhone: boolean;
};

/**
 * 获取浏览器缩放比
 */
declare function getRatio(): number;

declare global {
  /**
   * 该声明文件用于全局声明（不用npm安装时拷贝到项目中直接使用）
   */
  namespace jUtilsBrowser {
    export {
      addClass,
      _default as browser,
      downloadFileByArrayBuffer,
      downloadFileByUrl,
      getCookie,
      getJsFileBaseUrl,
      getRatio,
      getRelativePos,
      getStorage,
      getWindowSize,
      libraryFile,
      observeDomResize,
      prevent,
      removeClass,
      removeCookie,
      removeElement,
      removeStorage,
      replaceClass,
      setCookie,
      setStorage,
      toggleClass
    };
  }
}

export default undefined;
