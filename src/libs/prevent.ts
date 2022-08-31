import { browserGlobal } from './constant'

//阻止冒泡及默认行为
export default function prevent (ev: Event, bubble: boolean, stop: boolean) {
    ev = ev || browserGlobal.event
    bubble = bubble === false ? false : true
    stop = stop === false ? false : true
    bubble && browserGlobal.event ? browserGlobal.event.cancelBubble = true : ev.stopPropagation()
    stop && browserGlobal.event ? browserGlobal.event.returnValue = false : ev.preventDefault()
}