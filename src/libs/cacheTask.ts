import readyTask from './readyTask'
import type { TPromiseCb, TVoidCb } from "./help/type-declare"
import hpTimeStamp from './help/hpTimeStamp'
import forEachKvPair from './forEachKvPair'
import isNull from './isNull'
interface ICacheTaskItem {
  expiration: number
  handler: ReturnType<typeof readyTask>
}

const records: Record<string, ICacheTaskItem> = {}
let timer:any

function checkToClear () {
  clearInterval(timer)
  timer = setInterval(function () {
    const now = hpTimeStamp()
    
    forEachKvPair(records, function (item, key) {
      if(item.expiration >0 && now>=item.expiration) {
        item.handler.dispose()
        delete records[key]
        // console.log("清空任务缓存：", key, Object.keys(records))
      }
    })
    
    if(Object.keys(records).length === 0) {
      clearInterval(timer)
    }
  }, 1000)  
}


const defaultCacheTime = 1000 * 60 * 3

/**
 * 这个用于根据ID缓存数据，防止重复获取无变化的数据。在过期时间内，只认第一次执行结果！！！
 * @param id 
 * @param handler 
 * @param cacheMillisecond 缓存多久后自动清空。单位：毫秒，默认3分钟。从第一次获取数据成功后开始记时
 * @returns 
 */
export default function cacheTask<T extends TPromiseCb> (id: string, handler: T, cacheMillisecond?: number) {
  cacheMillisecond = isNull(cacheMillisecond) ? defaultCacheTime : cacheMillisecond
  
  async function waitting ():Promise<Awaited<ReturnType<T>>> {
    if(!records[id]) {
      records[id] = {
        expiration: 0,
        handler: readyTask(handler)
      }
    }
    const task = records[id]
    // console.log("汉朝", records)
    const res = await task.handler.waitting()
    if(records[id] && records[id].expiration === 0) {
      task.expiration = hpTimeStamp() + cacheMillisecond!
    }
    checkToClear()
    return res
  }
    
  
  return {
    waitting,
    dispose: function () {   
      const task = records[id]   
      if(task) {
        task.handler.dispose()
        delete records[id]
      }      
    }
  }
}

// @ts-ignore
// window.getRecored02 = function () {
//   return Object.keys(records)
// }

// ;(async function () {
//   function sleep (t: number) {
//     return new Promise(function (resove) {
//       setTimeout(resove, t)
//     })
//   }

//   let message = '初始数据'

//   const task01 = cacheTask('你好', async function () {
//     await sleep(2000)
//     return message
//   }, 2000)

//   setTimeout(async function () {
//     message = '超时后新增'
//     task01.waitting().then(function (res) {
      
//       console.log('overtime', res)
//     })
//   }, 6000)
//   const res = await Promise.all([
//     task01.waitting(),
//     task01.waitting(),
//   ])
//   console.log("第一次", res)

//   setTimeout(() => {
//     console.log("超时测试-开始")
//     task01.waitting().then(function (a) {
//       console.log("超时测试-开始", a)
//     })
//   }, 8000);
// })();