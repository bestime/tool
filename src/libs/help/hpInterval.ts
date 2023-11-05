


let htivId = 0;
let idName = ''
let isStart = false



const records: Record<string, {
  start: number,
  current: number,
  handler: Function,
  interval: number
}> = {}

let timer: number | undefined


function stop () {
  isStart = false
  clearInterval(timer)
  timer = undefined
}

function startRun () {
  clearInterval(timer)
  isStart = true
  timer = setInterval(function () {
    for(let key in records) {
      const item = records[key]
      item.current = +new Date()
      if(item.current - item.start >= item.interval) {
        item.start = item.current
        records[key].handler()
      }
    }
  }, 17)
}

function add (handler: Function, interval: number) {  
  idName = 'HI-' + ++htivId
  records[idName] = {
    start: +new Date(),
    current: 0,
    handler,
    interval
  }
  
  if(!isStart ) {
    startRun()
  }

  return idName
}

function remove (id: string) {
  delete records[id]
  if(Object.keys(records).length === 0) {
    // console.log("停止")
    stop()
  }
}

/** 自定义timer，用于工具内部方法使用，避免创建多个定时器 */
export default {
  add,
  remove
}