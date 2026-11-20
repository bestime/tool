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
type ErrorCallback = (error: {
  code: string,
  message: string
}) => void;




export default function easyPostMessage (channelId: string, targetWindow: Window, options: {
  targetOrigin?: string
  onMessage?: EventHander,
  transformResponse?: (data: any) => IReciveMessage
}) {
  const bus = defineEventBus(uuid())
  const targetOrigin = get(options.targetOrigin, '*')

  const replyCache: Array<string> = []
  // console.log("初始化", onMessage)

  function onWindowMessage (ev: any) {
    
    
    const _channelId = get(ev, $undefinedValue, $undefinedValue, 'data.channelId')
    
    // 不接收自己的消息
    if(_channelId === channelId) return;
    const realData: IReciveMessage = options.transformResponse ? options.transformResponse(ev.data) : ev.data
    // realData.channelId = _channelId
    // console.log(channelId, "源消息：", realData)
    // if(ev.source === targetWindow) return;
    
    const bid: string | undefined = get(realData, $undefinedValue, $undefinedValue, 'id')
    
    if(replyCache.includes(bid!)) {
      bus.emit(realData)
    }else if(options.onMessage){
      options.onMessage(realData)
    }
    
  }

  targetWindow.addEventListener('message', onWindowMessage)

  function send (data: IMessage, callback?: EventHander, errCallback?: ErrorCallback) {
    

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

        errCallback && errCallback({
          code: 'timeout',
          message: '请求超时'
        })
      }, timeout)
    }
    
    targetWindow.postMessage(data, targetOrigin)
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

