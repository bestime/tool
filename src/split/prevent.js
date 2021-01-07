import { WINDOW } from './basic/browser'

//阻止冒泡及默认行为
export default function prevent (ev, bubble, stop) {
    ev = ev || WINDOW.event
    bubble = bubble === false ? false : true
    stop = stop === false ? false : true
    bubble && WINDOW.event ? WINDOW.event.cancelBubble = true : ev.stopPropagation()
    stop && WINDOW.event ? WINDOW.event.returnValue = false : ev.preventDefault()
}