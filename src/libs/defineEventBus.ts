import { $undefinedValue } from './help/hpConsts';

const events: Record<string, EventHander[]> = {};

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
function defineEventBus<T extends EventHander>(eventName: string):{
  /** 追加订阅 */
  on: (hander: T) => void;
  /** 执行所有订阅 */
  emit: (...args: Parameters<T>) => void;
  /** 取消一个订阅 */
  off: (hander: T) => void;
  /** 销毁所有订阅 */
  dispose: () => void;
} {
  if (events[eventName]) throw `"${eventName}" Has already been registered!`;
  events[eventName] = events[eventName] || [];

  function on(hander: T) {
    events[eventName].push(hander);
  }

  function emit(...args: Parameters<T>) {
    for (let a = 0; a < events[eventName].length; a++) {
      events[eventName][a].apply($undefinedValue, args);
    }
  }

  function off(hander: T) {
    if (!hander) throw `the hander of off is required!`;
    for (let a = 0; a < events[eventName].length; a++) {
      if (events[eventName][a] === hander) {
        events[eventName].splice(a--, 1);
        // break; // 这里不能break，防止多次监听同一函数导致的bug
      }
    }
  }

  function dispose() {
    for (let a = 0; a < events[eventName].length; a++) {
      events[eventName].splice(a--, 1);
    }
    delete events[eventName];
  }

  return {
    on,
    emit,
    off,
    dispose
  };
}

export default defineEventBus;

class User {
  constructor(name: string) {}
  aliveDays = 0;
  async eat(time: string) {}
  async sleep(time: string) {}
  async earnMoney(time: string) {}
  async freedom(time: string) {}
  die() {}
}

// (async function dayByDay(user: User) {
//   await Promise.all([
//     user.eat('3小时'),
//     user.earnMoney('10小时'),
//     user.sleep('9小时'),
//     user.freedom('2小时')
//   ]);

//   if (++user.aliveDays / 365 < 30) {
//     await dayByDay(user);
//   } else {
//     user.die();
//   }
// })(new User('虫羊'));