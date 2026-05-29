import getRandom from "./getRandom"
import NEVER_PROMISE from "./help/NEVER_PROMISE"
import type { TPromiseCb } from "./help/type-declare"




/**
 * 处理竞态问题，只认最后一个执行结果（一般用于异步场景）
 * @param handler 实际处理函数
 * @returns 
 * 
 * @example
 * const taskApiGetData = raceTask(async function (message: string, duration: number) {
 *    await sleep(duration)
 *    return message
 * })
 */
export default function raceTask<T extends TPromiseCb> (handler: T) {
  let taskId = 0
  
  return function (this: ThisParameterType<T>, ...args:Parameters<T>): Promise<ReturnType<T>> {
    const flag = ++taskId
    // console.log(`任务开始：${flag}/${taskId}`)
    
    return handler.apply(this, args).then(function (response) {      
      if(flag === taskId) {
        // console.log(`任务结束：${flag}/${taskId}`,'（保留）', response)
        return response
      } else {
        // console.log(`任务结束：${flag}/${taskId}`,'（丢弃）', response)        
        return NEVER_PROMISE      
      }
    })
  }
}


/*
async function sleep (t: number) {
  return new Promise(function (resove) {
    setTimeout(resove, t)
  })
}


const taskApiGetData = raceTask(async function (message: string, duration: number) {
  await sleep(duration)
  return message
})


async function updateDetail (message: string, duration: number) {
  const data = await taskApiGetData(message, duration)
  console.log("最终数据", data)
}
updateDetail('第1次请求', 500)
setTimeout(function () {
  updateDetail('第2次请求', 200)
}, 30)


*/
