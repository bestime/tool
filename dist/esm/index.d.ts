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
  interval?: number,
  immediate?: boolean
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
 * 下载Blob文件
 * @param data - 数据
 * @param fileName - 文件名
 */
declare function downloadFileByBolb(data: Blob, fileName: string): void;

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
  interceptor?: (libInstence: any) => void;
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

type Direction = 1 | -1;
/**
 *
 * @param el DOM元素
 * @param callback 滚动回调
 * @param isPrevent 是否阻止原生滚动，仅用来获取滚动方向
 * @returns
 */
declare function observeMouseWheel(
  el: HTMLElement,
  callback: (direction: Direction) => void,
  isPrevent: boolean
): {
  dispose: () => void;
};

type TCallbackHandler = (next: () => void) => void;
interface IOptions$3 {
  onBottom?: TCallbackHandler;
  onTop?: TCallbackHandler;
  /** Y轴触底、触顶的差值 */
  offetY?: number;
}
/**
 * 监听dom滚动到顶部或头部
 * @param el
 * @param config
 */
declare function export_default(
  el: HTMLElement,
  config?: IOptions$3
): {
  /**
   * 销毁
   */
  dispose: () => void;
};

type TElementFullCallback = () => void;
type TFullScreenActionCallback = (isSuccess: boolean) => void;
type TElement = HTMLElement & {
  webkitRequestFullScreen?: TElementFullCallback;
  mozRequestFullScreen?: TElementFullCallback;
  msRequestFullscreen?: TElementFullCallback;
};
declare function fullScreen(
  element: TElement,
  value: boolean,
  callabck?: TFullScreenActionCallback
): void;

declare function createXLSX(options: {
  pluginUrl: string;
  header: any[];
  body: any[];
}): Promise<HTMLTableElement>;

interface IPluginSrc {
  /** .mjs结尾的主文件 */
  index: string;
  /** .mjs结尾的worker文件 */
  worker: string;
}
declare function pdfToImage(
  url: string,
  canvas: HTMLCanvasElement,
  src: IPluginSrc
): Promise<unknown>;

/**
 * 动态计算弹出框位置，使之保持在可是范围内。多用于跟随鼠标移动的菜单或信息框
 * @param options - 配置项
 * @returns - 计算后的位置
 */
declare function infoContainerPosition(options: {
  /** 需要将容器设置到：坐标X */
  x: number;
  /** 需要将容器设置到：坐标Y */
  y: number;
  /** 容器宽度 */
  width: number;
  /** 容器高度 */
  height: number;
  /** 与目标位置X偏移量。默认 10 */
  offsetX?: number;
  /** 与目标位置Y偏移量。默认 10 */
  offsetY?: number;
  /** 距离视口多少时表示超出可视范围。默认 10*/
  padding?: number;
  mode?: 'top-right' | 'bottom-right';
  /** 在什么区域活动 */
  targetSize?: {
    width: number;
    height: number;
  };
}): {
  x: number;
  y: number;
};

interface IOptions$2 {
  text?: string;
  fontSize?: number;
  color?: string;
  reverse?: boolean;
  interval?: number;
}
interface IPointItem {
  text: string;
  x: number;
  y: number;
  speed: number;
}
declare class TextRainCanvas {
  text: string;
  fontSize: number;
  color: number[];
  reverse: boolean;
  isStop: boolean;
  interval: number;
  width: number;
  height: number;
  fontLineHeight: number;
  count: number;
  oCanvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  timer: any;
  pointList: {
    currentIndex: number;
    list: IPointItem[];
  }[];
  constructor(oCanvas: HTMLCanvasElement, option?: IOptions$2);
  draw(): void;
  createColumn(
    x: number,
    y: number
  ): {
    currentIndex: number;
    list: IPointItem[];
  };
  dispose(): void;
  start(): void;
  getPointList(): {
    currentIndex: number;
    list: IPointItem[];
  }[];
}

declare class SeamlessRolling {
  _wrapper: HTMLDivElement;
  _timer: any;
  constructor(wraper: HTMLDivElement);
  _updateContent(): void;
  _doScroll(): void;
  dispose(): void;
}

declare function func01(text: string): Promise<void>;
/**
 * 复制文本
 */
declare const copyText: typeof func01;

interface IColorItem {
  data: number;
  color: string;
}
interface IOptions$1 {
  fontFamily: string;
  fontSize: number;
  tickWidth: number;
  tickColor: string;
  fontColor: string;
  paddingTop: number;
  paddingBottom: number;
  labelFormatter?: (data: number) => string;
  colors: IColorItem[];
}
interface IUseColorItem {
  from: {
    value: number;
    color: string;
    ratio: number;
  };
  to: {
    value: number;
    color: string;
    ratio: number;
  };
  ratio: number;
  label: string;
}
declare class LinearGradientColorLegend {
  _cfg: IOptions$1;
  _canvas: HTMLCanvasElement | undefined;
  _colorList: IUseColorItem[];
  _ctx: CanvasRenderingContext2D | undefined;
  _minValue: number;
  _maxValue: number;
  constructor(options: Partial<IOptions$1>);
  mount(oCanvas: HTMLCanvasElement): void;
  _drawAxias(
    width: number,
    height: number
  ): {
    maxLabelWidth: number;
  };
  _draw(): this | undefined;
  setColors(colors: IColorItem[]): this;
  /**
   * 根据值获取颜色
   * @param value
   * @returns
   */
  getColor(value: number): string;
}

interface IOptions {
  disabled?: boolean;
  gapX: number;
  gapY: number;
  text: string[];
  /** 行高（仅支持倍率） */
  fontLineHeight: number;
  fontSize: number;
  fontBackgroundColor: string;
  fontFamily: string;
  fontColor: string;
  /** 旋转角度（0-360） */
  angle: number;
}
declare class WaterMark {
  _cfg: IOptions;
  _oWrapper: HTMLDivElement;
  _canvas: HTMLCanvasElement;
  constructor(oWrapper: HTMLDivElement, config: Partial<IOptions>);
  _reload(): HTMLCanvasElement;
  setConfig(config: Partial<IOptions>): void;
  _draw(): void;
}

interface IConfig {
  width?: number;
  height?: number;
  fontSize?: number;
}
declare function graphicalVerificationCode(
  oCanvas: HTMLCanvasElement,
  config?: IConfig
): {
  refresh: () => string;
};

type TCb = () => void;
/**
 * 还没开发完
 * @param el
 * @param callback
 */
declare function lazyContainer(el: Element, callback: TCb): void;

/**
 * 图片设置加载顺序。0开始，值越大优先级越低
 * @param groupName 分组。每个分组中的sort独立计算
 * @param imgId 图片ID。不用element的原因是可能节点移除后导致内部删除失效
 * @param el 图片节点
 * @param src 图片地址
 * @param sort 图片顺序
 * @returns
 */
declare function loadSortImage(
  groupName: string,
  imgId: string,
  el: HTMLImageElement,
  src: string,
  sort: number
): {
  add: (id: string, el: HTMLImageElement, src: string, sort: number) => void;
  remove: (id: string, sort: number) => void;
};

interface ICustomEchartsTooltip {
  /** 根节点className */
  rootClassName?: 'g-echarts-tool-tip';
  /** 标题 */
  title: string;
  /** 列表项 */
  list: Array<{
    color: string;
    name: string;
    value: string;
    unit?: string;
  }>;
}
/**
 * 自定义echarts的tooltip。对标题，值、单位的个性化。需要自行实现样式。默认根节点类名为 g-echarts-tool-tip
 * @param res
 * @returns
 */
declare function createEchartsToolTip(res: ICustomEchartsTooltip): string;

/**
 * 将部分属性变为可选
 */
type TPartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface IWaterfallFlowConfig {
  el: HTMLElement;
  gap: number;
  /**
   * 自动播放在第一次主动执行 resize 后生效（避免首次渲染过渡动画卡顿）
   */
  autoResize?: number;
}
declare class WaterfallFlow {
  private _cfg;
  private _timer;
  constructor(config: TPartialOptional<IWaterfallFlowConfig, 'gap'>);
  _autoPlay(): void;
  resize(): void;
  pause(): this;
  dispose(): void;
}

declare const style: (str: string) => void;

export {
  LinearGradientColorLegend,
  SeamlessRolling,
  TextRainCanvas,
  WaterMark,
  WaterfallFlow,
  addClass,
  _default as browser,
  copyText,
  createEchartsToolTip,
  createXLSX,
  downloadFileByArrayBuffer,
  downloadFileByBolb,
  downloadFileByUrl,
  fullScreen,
  getCookie,
  getJsFileBaseUrl,
  getRatio,
  getRelativePos,
  getStorage,
  getWindowSize,
  graphicalVerificationCode,
  infoContainerPosition,
  lazyContainer,
  libraryFile,
  loadSortImage,
  observeDomResize,
  export_default as observeDomScroll,
  observeMouseWheel,
  pdfToImage,
  prevent,
  removeClass,
  removeCookie,
  removeElement,
  removeStorage,
  replaceClass,
  setCookie,
  setStorage,
  style,
  toggleClass
};

export default undefined;
