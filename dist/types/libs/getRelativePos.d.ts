/**
 * 获取dom相对位置
 * @param el - dom
 * @returns 信息
 */
export default function getRelativePos(el: HTMLElement): {
    x: number;
    y: number;
    height: number;
    width: number;
    clientWidth: number;
    clientHeight: number;
};
