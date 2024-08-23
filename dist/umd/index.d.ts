interface DomAutoScrollOptions {
  /**
   * 滚动容器dom
   */
  elScroll: HTMLDivElement;
  /**
   * 鼠标移入/移出时的容器
   */
  elMouse?: HTMLDivElement;
  /**
   * 滚动频率(每秒多少次，一次 1px)
   */
  fps?: number;
  enabled?: boolean;
}
declare class DomAutoScroll {
  private _oScroll;
  private _oMouse;
  private _timer01;
  private _timer02;
  private _fps;
  private _obvs;
  private _isMouseIn;
  private _enabled;
  /**
   * 原生滚动条自动滚动（改变的是scrollTop）
   * @param options 配置项
   */
  constructor(options: DomAutoScrollOptions);
  _onMouseenter(): void;
  play(): void;
  _onMouseLeave(): void;
  updateFps(value: number): void;
  _onResize(): void;
  /**
   * 回到顶部
   */
  backToTop(): void;
  _playOnce(): void;
  pause(): void;
  dispose(): void;
}

declare global {
  /**
   * 该声明文件用于全局声明（不用npm安装时拷贝到项目中直接使用）
   */
  namespace DomAutoScroll {
    export { DomAutoScrollOptions, DomAutoScroll as default };
  }
}

export default undefined;
