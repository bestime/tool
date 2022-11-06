

const main: typeof bestime.observeDomResize = function (element, handler, type, interval) {  
  interval = interval || 500
  let width = [0, 0, false]
  let height = [0, 0, false]

  
  let timer = setInterval(function () {
    if(!element.isConnected) {
      dispose()
      return;
    }
    width[0] = element.offsetWidth
    height[0] = element.offsetHeight
    width[2] = width[0] !== width[1] // 宽度变化
    height[2] = height[0] !== height[1] // 高度变化
    
    
    
    if(width[2]) {
      width[1] = width[0]
      if(type ==='width') {
        handler(element)
      }
    }

    if(height[2]) {
      height[1] = height[0]
      if(type ==='height') {
        handler(element)
      }
    }

    if(!type) {
      if(width[2] || height[2]) {
        handler(element)
      }
    }
  }, interval)

  function dispose () {
    clearInterval(timer)
  }

  return dispose
}

export default main