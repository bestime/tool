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
export default class Polling {
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
export {};
