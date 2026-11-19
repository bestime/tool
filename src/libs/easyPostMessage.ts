import { arrayRemove, defineEventBus, get, isNull, uuid } from "@bestime/utils_base";
import { $undefinedValue } from "./help/hpConsts";

interface IMessage {
  
  id?: string
  type?: string
  /** 超时时间：毫秒。默认值 1000 * 60 */
  timeout?: number

  data: any
}

interface IReciveMessage extends IMessage {
  /** 来自哪个频道 */
  channelId: string
}


type EventHander = (event: IReciveMessage) => void;




export default function easyPostMessage (channelId: string, targetWindow: Window, onMessage?: EventHander) {
  const bus = defineEventBus(uuid())

  const replyCache: Array<string> = []
  // console.log("初始化", onMessage)

  function onWindowMessage (ev: any) {
    
    const _channelId = get(ev, $undefinedValue, $undefinedValue, 'data.channelId')

    // 不接收自己的消息
    if(_channelId === channelId) return;
    // if(ev.source === targetWindow) return;
    
    const bid: string | undefined = get(ev, $undefinedValue, $undefinedValue, 'data.id')
    // console.log(channelId,"【收到原始消息#####】", ev.data, _channelId, bid)
    if(replyCache.includes(bid!)) {
      bus.emit(ev.data)
    }else if(onMessage){
      onMessage(ev.data)
    }
    
  }

  targetWindow.addEventListener('message', onWindowMessage)

  function send (data: IMessage, callback?: EventHander) {
    

    // @ts-ignore
    data.channelId = channelId

    // console.log("发送消息", data)

    if(!isNull(data.id) && callback) {
      const timeout = get(data.timeout, 1000 * 60)
      let timer:any;
      replyCache.push(data.id)
      
      function busOnMessage (event: IReciveMessage) {
        const bid = get(event, $undefinedValue, $undefinedValue, 'id')
        if(bid === data.id) {
          // console.log("收到本次消息", data, bus.eventList())
          arrayRemove(replyCache, function (_il) {
            return _il === data.id
          })
          bus.off(busOnMessage)
          callback!(event)
          
          clearTimeout(timer)

        }
      }
      
      bus.on(busOnMessage)
      timer = setTimeout(function (){
        bus.off(busOnMessage)
      }, timeout)
    }
    
    targetWindow.postMessage(data, "*")
  }
  return {
    send,
    dispose: function () {
      replyCache.length = 0
      bus.dispose()
      targetWindow.removeEventListener('message', onWindowMessage)
    },
    bus
  }
}

