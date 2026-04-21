import { $undefinedValue } from "./help/hpConsts";
import type { TPromiseCb, TVoidCb } from "./help/type-declare"
import variableHasValue from "./variableHasValue"
import NEVER_PROMISE from "./help/NEVER_PROMISE"


/**
 * 此方法用于准备工作，和等待准备工作完成。记得不用的时候销毁
 * @param handler 处理函数
 * @param FPS 每秒执行次数，默认值位5
 * @returns 
 */
export default function readyTask<T extends TPromiseCb> (handler: T, FPS=5) {  
  let isReady = false
  let isDispose = false
  let timer: any;
  let data = $undefinedValue as Awaited<ReturnType<T>>
  

  // let id=0
  function waitting () {
    return new Promise(function (resolve: (data: Awaited<ReturnType<T>>) => void, reject) {
      clearInterval(timer)
      timer = setInterval(function () {
        // console.log("计时中:",++id)
        if(isReady && !isDispose) {
          resolve(data)
          clearInterval(timer)
        }
      }, 100)
    })
  }

  let res = {
    waitting,
    dispose,
  }

  function dispose () {
    // @ts-ignore
    isDispose = $undefinedValue
    // @ts-ignore
    isReady = $undefinedValue
    // @ts-ignore
    timer = $undefinedValue

    // @ts-ignore
    data = $undefinedValue

    // @ts-ignore
    res = $undefinedValue
    clearInterval(timer)
  }

  handler().then(function (response) {
    if(!isDispose) {
      data = response
      isReady = true
    }    
  })
  
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
//   }, 1000)


//   task_ready.waitting().then(function (res) {
    
//   })

//   const b = await task_ready.waitting()

  
  

//   console.log("task_ready", task_ready)
// })();
