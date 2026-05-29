import { $undefinedValue } from "./help/hpConsts";
import type { TPromiseCb, TVoidCb } from "./help/type-declare"
import forEachKvPair from "./forEachKvPair";
import isNull from "./isNull";
import get from "./get";


/**
 * 此方法用于准备工作，和等待准备工作完成。只认第一次执行结果！！！记得不用的时候销毁
 * 
 * @param handler 处理函数
 * @param FPS 每秒执行次数，默认值位5。限制范围为 [1-20]。没必要太小或太大，人眼感觉不出来
 * @returns 
 */
export default function readyTask<T extends TPromiseCb> (handler: T, fps?: number) {  
  let isReady = false
  let isDispose = false

  const FPS = Math.max(get(fps, 5), 20)

  // 这个用于每个watting单独分配一个定时器，以免被其他定时器误关闭
  let timers: Record<number, any> = {};
  let data = $undefinedValue as string | undefined
  // 用于标记是否开始执行，防止重复执行
  let begining = false

  function init () {
    begining = true;
    handler().then(function (response) {
      if(!isDispose) {
        data = JSON.stringify(response)
        isReady = true
      }    
    })
  }
  

  let taskId=0
  function waitting (): Promise<Awaited<ReturnType<T>>> {
    const cid = ++taskId
    if(!begining) {
      init()
    }
    return new Promise(function (resolve, reject) {
      function checkData () {
        // console.log("计时中:",cid, data)
        if(isReady && !isDispose) {
          // console.log("成功", cid, isDispose,timers)
          const res = isNull(data) ? data : JSON.parse(data)
          resolve(res)
          clearInterval(timers[cid])
        }
      }
      if(isReady) {
        checkData()
      } else if(!isDispose){
        timers[cid] = setInterval(checkData, 1000/FPS)
      }
    })
  }
  

  let res = {
    waitting,
    dispose,
  }

  function dispose () {
    forEachKvPair(timers, function (v) {
      clearInterval(v)
    })
    // @ts-ignore
    isDispose = true
    // @ts-ignore
    isReady = $undefinedValue

    // @ts-ignore
    data = $undefinedValue

    // @ts-ignore
    res = $undefinedValue

    // @ts-ignore
    begining = $undefinedValue

    // @ts-ignore
    timers = $undefinedValue
    
  }
  
  return res
}


// ;(async function () {
//   async function sleep (t: number) {
//     return new Promise(function (resove) {
//       setTimeout(resove, t)
//     })
//   }

//   const task_ready = readyTask(async function () {
//     await sleep(2000)
//     return {
//       name: '张三',
//       age: 50
//     }
//   })

  
//   setTimeout(function () {
//     console.log("关闭")
//     task_ready.dispose()
//   }, 1500)



//   task_ready.waitting().then(function (hh) {
//     console.log("类型提示不对", hh)
//   })
//   const res = await Promise.all([
//     task_ready.waitting(),
//     task_ready.waitting(),
//   ])
  
//   console.log("task_ready-001", res)
// })();






