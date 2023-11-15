import { isArray, forEach } from '@bestime/utils_base'

/**
 * 给dom元素移除className
 * @param el - DOM
 * @param name - 需要移除className
 * @returns
 */
export default function removeClass (el: HTMLElement, name: string | string[]) {
  if(isArray(name)) {
    forEach(name, function (item) {
      el.classList.remove(item)
    })
  } else {
    el.classList.remove(name)
  }
}