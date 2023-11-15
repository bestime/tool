import { isArray, forEach } from '@bestime/utils_base'

/**
 * 给dom元素添加className
 * @param el - DOM
 * @param name - 将要被切换的className
 * @returns
 */
export default function toggleClass (el: HTMLElement, name: string | string[]) {
  if(isArray(name)) {
    forEach(name, function (item) {
      el.classList.toggle(item)  
    })
  } else {
    el.classList.toggle(name)
  }
}