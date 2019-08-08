//阻止冒泡及默认行为
function prevent (ev) {
    ev = ev || window.event;
    window.event ? window.event.cancelBubble = true : ev.stopPropagation();
    window.event ? window.event.returnValue = false : ev.preventDefault();
}

module.exports = prevent