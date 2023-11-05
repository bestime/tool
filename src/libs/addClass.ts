import { isArray, forEach } from '@bestime/utils_base'

/**
 * 给dom元素添加className
 * @param el - DOM
 * @param name - 需要添加的className
 * @returns
 */
export default function addClass (el: HTMLElement, name: string | string[]) {
  if(isArray(name)) {
    forEach(name, function (item) {
      el.classList.add(item)  
    })
  } else {
    el.classList.add(name)
  }
}