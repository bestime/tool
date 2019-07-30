//移除节点
function removeElement (el) {
  try {
    el.parentNode.removeChild(el)
  }catch(e) {}
}

module.exports = removeElement