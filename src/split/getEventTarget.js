/**
 * 获取事件元素
 * 
 * @param {Event} e 事件
 * @return {Element} 发生事件的 DOM 元素 
 */
function getEventTarget (ev) {
    ev = ev || window.event
    return ev.srcElement? ev.srcElement: ev.target;
}

module.exports = getEventTarget