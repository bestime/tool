import { WINDOW } from './basic/browser'

/**
 * 获取事件元素
 * 
 * @param {Event} ev 事件
 * @return {Element} 发生事件的 DOM 元素 
 */
export default function getEventTarget (ev) {
    ev = ev || WINDOW.event
    return ev.srcElement? ev.srcElement: ev.target;
}