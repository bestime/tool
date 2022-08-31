export default function removeElement (el: HTMLElement) {
  if(el.parentNode) {
    el.parentNode.removeChild(el)
  }
}