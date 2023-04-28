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
declare function defineEventBus<T extends EventHander>(eventName: string): {
    /** 追加订阅 */
    on: (hander: T) => void;
    /** 执行所有订阅 */
    emit: (...args: Parameters<T>) => void;
    /** 取消一个订阅 */
    off: (hander: T) => void;
    /** 销毁所有订阅 */
    dispose: () => void;
};
export default defineEventBus;
