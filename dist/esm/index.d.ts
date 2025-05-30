import { observeDomResize } from '@bestime/utils_browser';

interface IOptions {
  /** 滚动速度：（像素/秒） */
  speed: number;
}
declare class SeamlessScroll {
  private _cache;
  _obv: ReturnType<typeof observeDomResize>;
  _cfg: IOptions;
  constructor(ele: HTMLDivElement, options: Partial<IOptions>);
  _mouseTo(x: number, fromY: number, toY: number): void;
  _onBeforeTo(to: { x: number; y: number }): void;
  _onScrollEnd(): void;
  _onMouseout(): void;
  _onMouseenter(): void;
  _checkEnabled(): boolean;
  _onResize(): void;
  get _limitY(): number;
  scrollY(): void;
  dispose(): void;
}

export { SeamlessScroll };

export default undefined;
