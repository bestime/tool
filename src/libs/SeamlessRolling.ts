export default class SeamlessRolling {
  _wrapper: HTMLDivElement
  _timer = -1
  
  constructor (wraper: HTMLDivElement) {
    this._wrapper = wraper    
    this._updateContent()
  }

  _updateContent () {
    const firstNode = this._wrapper.children[0]
    const copyNode = firstNode.cloneNode(true)
    this._wrapper.appendChild(copyNode)
    console.log("firstNode", firstNode, copyNode)
  }
  
  _doScroll () {
    clearTimeout(this._timer)
    this._timer = setTimeout(() => {
      
    }, 60)
  }

  dispose () {
    clearTimeout(this._timer)
  }
}