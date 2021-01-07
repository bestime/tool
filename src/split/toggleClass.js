

import removeClass from './removeClass'
import addClass from './addClass'
import hasClass from './hasClass'

export default function toggleClass (el, className) {
  hasClass(el, className) ? removeClass(el, className) : addClass(el, className)
}