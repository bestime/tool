var cubeMatrix = (function () {
  const D = [ 0.062, 0.187, 0.312, 0.437, 0.562, 0.687, 0.812, 0.937, 1.062, 1.187, 1.375, 1.625, 1.875, 2.125, 2.375, 2.750, 3.250, 3.750, 4.250, 4.750, 5.500, 6.500, 7.500, 8.500, 9.500, 11.000, 13.000, 15.000, 17.000, 19.000, 21.500, 24.500 ]
  const V = [ 0.050, 0.150, 0.250, 0.350, 0.450, 0.550, 0.650, 0.750, 0.850, 0.950, 1.100, 1.300, 1.500, 1.700, 1.900, 2.200, 2.600, 3.000, 3.400, 3.800, 4.400, 5.200, 6.000, 6.800, 7.600, 8.800, 10.400, 12.000, 13.600, 15.200, 17.600, 20.800 ];
  function getRandom (min, max, isInt) {
    isInt = isInt === false ? 0 : 1
    min = Math.random() * ( max - min + isInt) + min; // 节省一个变量
    return isInt ? Math.floor(min) : min
  }  







  function createItem (activeColor, value, x, y) {
    var moreClass=''
    if(value<=0) {
      moreClass = ' hide'
      activeColor = 'white'
    }
    flag = x + '-' + y

    var xAxisLabel = '';
    if(x==0 && y%4===0) {
      xAxisLabel =` <div class="cubeMatrix-xAxis_label">${D[y]}</div>`
    }

    var yAxisLabel =''
    var showYaxisLabel = false
    if(y==0 && x%2===0) {
      yAxisLabel =` <div class="cubeMatrix-yAxis_label">${V[x]}</div>`
    }
    
    
    return `
    <div flag="${flag}" class="cubeMatrix-item ${moreClass}" style="background-color:${activeColor};">
      <div class="cubeMatrix-item-lighter" style="background-color:${activeColor};"></div>
      <div class="cubeMatrix-item-darker" style="background-color:${activeColor};"></div>
      ${xAxisLabel}
      ${yAxisLabel}
    </div>
    `
  }

  var columns = 32;
  function init (oWrapper, list, option) {
    oWrapper.innerHTML = ''
    var is3D = option ? option['3d'] : false
    var group = []
    var row = [];
    let min = 0, max = 0;
    for(var item, a = 0; a<list.length; a++) {      
      item = list[a]
      min = item < min ? item : min
      max = item > max ? item : max
      
      if(a && a%columns===0) {
        group.push(row)
        row = []
      }
      row.push(item > 0 ? item : '')
    }
    group.push(row)


    const abc = {
      min: min,
      max: max,
      colors: [
        [0,0,255],
        [0,255,0],
        [255,255,0],
        [255,0,0]
      ]
    }
    var oColorLegeng = document.createElement('canvas')
    var iColor = new ColorLegendView(oColorLegeng, {
      ASC: true,
      height: 320,
      gradientMode: true,
      isAverageyAxis: true,
      colors: abc, 
      axis: {
        fontSize: 12, // 坐标轴字号
        fontColor: '#9ca9c2', // 坐标轴文字颜色
        tickColor: '#325781', // 坐标轴刻度的颜色
      }
    })


    var daoZhangData = []
    group.forEach(function (row,rowIndex) {
      row.forEach(function (item,columnIndex) {
        daoZhangData[columnIndex] = daoZhangData[columnIndex] || []
        daoZhangData[columnIndex].push(item)
      })
    })

    group = daoZhangData


    
    



    // var max = Math.max(...list)
    // var min = Math.min(...list)
    var diff = max-min
    // group.forEach(item => item.reverse())
    group.reverse()

    var _axisLineHtml = '';
    var _itemHtmls = '';
    var column = 0
    var row = 0

    group.forEach(function (rowItem, rowIndex) {
      rowItem.forEach(function (item, columnIndex) {
        var ratio = diff > 0 ? (item - min) / diff : 0
        
        _itemHtmls += createItem(iColor.getColor(item), item, group.length-rowIndex-1, columnIndex)
        _axisLineHtml += '<div data-ro class="cubeMatrix-axisline"></div>'
      })
    })


    var o3DWarpper = document.createElement('div')
    o3DWarpper.className = 'cubeMatrix-wrapper'
    
    

    
    
    o3DWarpper.innerHTML += `
      <div class="cubeMatrix-body">
        <div class="cubeMatrix-loader cubeMatrix-loader-axisline">
          ${_axisLineHtml}
        </div>
        <div class="cubeMatrix-loader">
          ${_itemHtmls}
        </div>
      </div>
    `;

    
    oWrapper.classList.add('cubeMatrix-outter')

    // is3D = false
    if(is3D) {
      oWrapper.classList.add('is3D')
    } else {
      
      oWrapper.classList.add('is2D')
    }
    oWrapper.appendChild(o3DWarpper)
    oWrapper.appendChild(oColorLegeng)

    


  }
  return init
})();