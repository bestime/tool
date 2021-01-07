//移除节点
export default function removeElement (el) {
  try {
    el.parentNode.removeChild(el)
  } catch(e) {
    
  }
}