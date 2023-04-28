/**
 * 移除Dom节点
 * @param dom - 待移除的dom元素
 */
export default function removeElement(el: HTMLElement) {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}
