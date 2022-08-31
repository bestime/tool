
/**
 * 检测一个数据是否存在
 * 
 * @param handler - 每一次检测的回调， 返回值为Boolean,表示是否检测到数据
 * @param callback - 成功回调
 * @param sleepTime - 间隔时间
 */
 export default function variableHasValue (handler: () => boolean | undefined, callback: () => void, sleepTime?: number) {
  sleepTime = sleepTime == null ? 60 : sleepTime
  var timer;

  if(handler()) {
    callback()
  } else {
    clearTimeout(timer)
    timer = setTimeout(function () {
      variableHasValue(handler, callback, sleepTime)
    }, sleepTime)
  }
}