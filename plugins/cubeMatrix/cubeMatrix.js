var cubeMatrix = (function () {
  function getRandom (min, max, isInt) {
    isInt = isInt === false ? 0 : 1
    min = Math.random() * ( max - min + isInt) + min; // 节省一个变量
    return isInt ? Math.floor(min) : min
  }
  
  function getRandomColor () {
    return `rgba(${getRandom(20, 200)}, ${getRandom(20, 255)}, ${getRandom(40, 180)}, 1)`
  }
  function createItem (activeColor) {
    return `
    <div class="cubeMatrix-item" style="background-color:${activeColor};">
    <div class="cubeMatrix-item-lighter" style="background-color:${activeColor};"></div>
      <div class="cubeMatrix-item-darker" style="background-color:${activeColor};"></div>
    </div>
    `
  }
  function init (oWrapper) {
    var _axisLineHtml = '';
    var _itemHtmls = '';
    for(var a = 0; a<10*10; a++) {
      _itemHtmls += createItem(getRandomColor())
      _axisLineHtml += '<div class="cubeMatrix-axisline"></div>'
    }
    
    oWrapper.classList.add('cubeMatrix-wrapper')
    oWrapper.innerHTML = `
      <div class="cubeMatrix-body">
        <div class="cubeMatrix-loader cubeMatrix-loader-axisline">
          ${_axisLineHtml}
        </div>
        <div class="cubeMatrix-loader">
          ${_itemHtmls}
        </div>
      </div>
    `
  }
  return init
})();