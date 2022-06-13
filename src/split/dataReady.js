
/**
 * 检测一个数据是否存在
 * 例：const onJqueryReady = await dataReady(() => !!$, 20)
 * 
 * @param {Function} handler 每一次检测的回调， 返回值为Boolean,表示是否检测到数据
 * @return {Number} [sleepTime=20] 检测失败后，等待多久继续检测。单位：毫秒
 * @return Promise
 */
 export default async function dataReady (handler, sleepTime) {
  sleepTime = sleepTime == null ? 60 : sleepTime
  var timer;
  return new Promise(async function (resolve) {
    if(handler()) {
      resolve()
    } else {
      clearTimeout(timer)
      if(sleepTime > 0) {
        timer = setTimeout(function () {
          resolve(dataReady(handler, sleepTime))
        }, sleepTime)
      } else {
        resolve(dataReady(handler, sleepTime))
      }
    }
  })
}