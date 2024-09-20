import assign from "./assign";
import defualtFormatter from "./defualtFormatter"

type EventHander = (...args: any[]) => void;

export default function throttle <T extends EventHander>(
  handler: T,
  interval?: number,
  options?: {
    leading?: boolean,
    trailing?: boolean
  }
) {
  const fps = defualtFormatter(500, interval)
  const { leading, trailing } = assign({
    leading: true,
    trailing: true
  }, options)
  var startTime = 0
  let nowTime=0
  let self: any
  let timer01: any
  let arg: any
  let timer02:any
  let count = 0;
  let isDispose = false

  // 重置，为下一次操做周期做准备
  function resetLoop () {
    startTime = 0
    count = 0
  }

  // 检测最后一次
  function checkLast () {
    if(trailing && (count > 1 || !leading)) {
      main()
      timer02 = setTimeout(resetLoop, fps)
    } else {
      resetLoop()
    }
  }

  function main () {
    startTime = +new Date()
    handler.apply(self, arg)
  }

  function newHandler(this: any, ...v: Parameters<T>) {
    if(isDispose) return;
    count++
    arg = v
    self = this
    nowTime = +new Date()
    clearTimeout(timer01)
    clearTimeout(timer02)    
    if(startTime===0) {
      if(leading) {
        main()
      } else {
        startTime = nowTime
      }
    } else if(nowTime - startTime >= fps) {
      main()
    }
    timer01 = setTimeout(checkLast, fps)
  }

  newHandler.cancel = function () {
    clearTimeout(timer01)
    clearTimeout(timer02)
  }
  newHandler.dispose = function () {
    clearTimeout(timer01)
    clearTimeout(timer02)
    isDispose = true
  }

  return newHandler
}

// const debFunc = throttle(function (a: number, b: number) {}, 200)
// debFunc(1, 'dd')