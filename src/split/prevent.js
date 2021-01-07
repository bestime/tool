//阻止冒泡及默认行为
function prevent (ev, bubble, stop) {
    ev = ev || window.event
    bubble = bubble === false ? false : true
    stop = stop === false ? false : true
    bubble && window.event ? window.event.cancelBubble = true : ev.stopPropagation()
    stop && window.event ? window.event.returnValue = false : ev.preventDefault()
}

module.exports = prevent