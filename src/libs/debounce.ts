import assign from "./assign";
import defualtFormatter from "./defualtFormatter"

type EventHander = (...args: any[]) => void;


/**
 * 防抖函数。默认执行条件范围内最后一次
 * @param handler - 处理回调
 * @param interval - 频率（毫秒）
 * @param options - 配置项
 * @param options.leading - 立即执行
 * @param options.trailing - 延后执行
 * @returns 
 */
export default function debounce<T extends EventHander> (
  handler: T,
  interval?: number,
  options?: {
    leading?: boolean,
    trailing?: boolean
  }
) {
  const fps = defualtFormatter(500, interval)
  const { leading, trailing } = assign({
    leading: false,
    trailing: true
  }, options)
  let lock = false
  let timer_leading: any
  let timer_trailing: any
  let that: any;
  let args: any
  let isDispose = false
  

  function waitLock () {
    clearTimeout(timer_leading)
    timer_leading = setTimeout(doLock, fps)
  }

  function doLock () {
    lock = false
  }

  function trailFunction () {
    lock = true
    waitLock()
    handler.apply(self, args)
  }

  function newHandler (this: any, ...v: Parameters<T>) {
    if(isDispose) return;
    that = this
    args = v

    if(leading) {
      if(!lock) {
        lock = true
        handler.apply(that, args)
      }
      waitLock()
    } 
    
    if (trailing) {
      clearTimeout(timer_trailing)
      timer_trailing = setTimeout(trailFunction, fps)
    }
  }

  newHandler.cancel = function () {
    clearTimeout(timer_leading)
    clearTimeout(timer_trailing)
  }

  newHandler.dispose = function () {
    clearTimeout(timer_leading)
    clearTimeout(timer_trailing)
    isDispose = true
  }

  return newHandler
}

// const debFunc = debounce(function (a: number, b: number) {}, 200)
// debFunc(1, 'dd')

