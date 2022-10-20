const events: Record<string, EventHander[]> = {}

type EventHander = (...args: any[]) => void

function defineEventBus<T extends EventHander> (eventName: string) {
  if(events[eventName]) throw `"${eventName}" Has already been registered!`
  events[eventName] = events[eventName] || []

  function on (hander: T) {
    events[eventName].push(hander)
  }

  function emit (...args: Parameters<T>) {
    for(let a = 0; a<events[eventName].length; a++) {
      events[eventName][a].apply(void 0, args)
    }
  }

  function off (hander: T) {
    if(!hander) throw `the hander of off is required!`
    for(let a = 0; a<events[eventName].length; a++) {
      if(events[eventName][a] === hander) {
        events[eventName].splice(a--, 1)
        // break; // 这里不能break，防止多次监听同一函数导致的bug
      }
    }
  }

  function dispose () {
    for(let a = 0; a<events[eventName].length; a++) {
      events[eventName].splice(a--, 1)
    }
    delete events[eventName];
  }

  return {
    on,
    emit,
    off,
    dispose
  }
}

export default defineEventBus