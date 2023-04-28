/**
 * 获取dom相对位置
 * @param el - dom
 * @returns 信息
 */
export default function getRelativePos(el: HTMLElement) {
  // var scrollPos = getScrollPosition();
  const bound = el.getBoundingClientRect();
  return {
    x: bound.left,
    y: bound.top,
    height: el.offsetHeight,
    width: el.offsetWidth,
    clientWidth: el.clientWidth,
    clientHeight: el.clientHeight
  };
}
