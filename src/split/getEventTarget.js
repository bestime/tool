/**
 * 获取事件元素
 * 
 * @param {Event} e 事件
 * @return {Object} 发生事件的 DOM 元素 
 */
function getEventTarget (e) {
    var ev = e || window.event;
    return ev.srcElement? ev.srcElement: ev.target;
}

module.exports = getEventTarget