import { $undefinedValue } from "./help/hpConsts"

type TCb = () => void
const elMaps = new WeakMap<Element, TCb>()

const ob = new IntersectionObserver(function (entries) {
  for(let index =0;index<entries.length; index++) {
    const entry = entries[index]
    if(entry.isIntersecting) {
      
      const el = entry.target
      ob.unobserve(el)
      const callabck = elMaps.get(el)
      if(callabck) {
        elMaps.delete(el)
        callabck()
      }
    } else {
      console.log("离开了")
    }
  }
}, {
  root: $undefinedValue,
  rootMargin: '0px',
  threshold: 0
})


/**
 * 还没开发完
 * @param el 
 * @param callback 
 */

export default function lazyContainer (el: Element, callback: TCb) {
  elMaps.set(el, callback)
  ob.observe(el)
}