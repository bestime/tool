export default function removeElement (el: HTMLElement) {
  try {
    el.parentNode.removeChild(el)
  } catch(e) {
    
  }
}