import removeClass from './removeClass'
import addClass from './addClass'

/**
 * 给dom元素添加className
 * @param el - DOM
 * @param from - 将要被替换的className
 * @param to - 替换为
 * @returns
 */
export default function replaceClass (el: HTMLElement, from: string | string[], to: string | string[]) {
  removeClass(el, from)
  addClass(el, to)
}