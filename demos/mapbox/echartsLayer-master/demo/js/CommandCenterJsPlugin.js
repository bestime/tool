var CommandCenterJsPlugin = (function () {
  var svgIcon = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
  function convertData(dataItem) {
    return [
      {
        fromName: dataItem[0].name,
        toName: dataItem[1].name,
        coords: [dataItem[0].coordinate, dataItem[1].coordinate],
      },
      
    ]
  }
  
  function removeSeries (id, list) {
    for(var a = 0; a<list.length; a++) {
      if(list[a].id === id) {
        list.splice(a--, 1)
      }
    }
  }


  // 固定闪烁
  function addSeriesFlicker (seriesCacheList, lineItem) {
    const id = createId(lineItem.id, '固定闪烁')
    removeSeries(id, seriesCacheList)

    return {
      id: id,
      name: "固定闪烁",
      type: "effectScatter",
      coordinateSystem: "GLMap",
      zlevel: 2,
      rippleEffect: {
        brushType: "stroke",
      },
      label: {
        normal: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
      },
      symbolSize: function (val) {
        return val[2] / 8
      },
      itemStyle: {
        normal: {
          color: lineItem.color,
        },
      },
      data: [
        {
          name: lineItem.path[1].name,
          value: lineItem.path[1].coordinate.concat([lineItem.path[1].value]),
        }
      ],
    }
  }

  // 飞行图标
  function addSeriesFlyIcon (seriesCacheList, lineItem) {
    const id = createId(lineItem.id, '图标')
    removeSeries(id, seriesCacheList)
    return {
      id: id,
      name: "图标",
      polyline: false,
      coordinateSystem: "GLMap",
      type: "lines",
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: svgIcon,
        symbolSize: 15,
      },
      lineStyle: {
        normal: {
          color: lineItem.color,
          width: 1,
          opacity: 0.4,
          curveness: 0.3,
        },
      },
      data: convertData(lineItem.path),
    }
  }

  // 拖尾效果
  function addSeriesTail (seriesCacheList, lineItem) {
    const id = createId(lineItem.id, '拖尾效果')
    removeSeries(id, seriesCacheList)
    return {
      id,
      name: "拖尾效果",
      coordinateSystem: "GLMap",
      type: "lines",
      zlevel: 1,
      polyline: false,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: lineItem.color,
        symbolSize: 3,
      },
      lineStyle: {
        normal: {
          color: lineItem.color,
          width: 0,
          curveness: 0.3,
        },
      },
      data: convertData(lineItem.path),
    }
  }

  function createId (id, name) {
    return id + '@' + name
  }

  function Plugin(EchartsLayer) {
    this.echart = new EchartsLayer(map).chart

    this.echartOptions = this.createOption()
    // this.echart.setOption(this.echartOptions)
  }

  Plugin.prototype.createOption = function () {
    

    return {
      GLMap: {
        roam: true,
      },
      coordinateSystem: "GLMap",
      title: {
        text: "模拟迁徙",
        subtext: "数据纯属虚构",
        left: "center",
        textStyle: {
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "item",
      },
      geo: {
        map: "GLMap",
        label: {
          emphasis: {
            show: false,
          },
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: "#323c48",
            borderColor: "#404a59",
          },
          emphasis: {
            areaColor: "#2a333d",
          },
        },
      },
      series: [],
    }
  }
  
  

  Plugin.prototype.add = function (lineItem) {
    var series = this.echartOptions.series

    console.log("天机a", series)
    
    series = series.concat([
      addSeriesTail(series, lineItem),
      addSeriesFlyIcon(series, lineItem),
      addSeriesFlicker(series, lineItem),
    ])

    this.echartOptions.series = series

    this.echart.setOption(this.echartOptions)
    console.log("lineItem", lineItem, this.echartOptions, series)

  }

  Plugin.prototype.delete = function (id) {
    var series = JSON.parse(JSON.stringify(this.echartOptions.series))
    var reg = new RegExp('^' + id + '@')
    
    let isChange;
    for(var a=0; a<series.length; a++) {
      console.log("正则", reg, series[a].id, reg.test(series[a].id))
      if(reg.test(series[a].id)) {
        isChange = true
        series.splice(a--, 1)
      }
    }

    
    if(isChange) {
      this.echart.clear()
      this.echartOptions.series = series
      
      
      this.echart.setOption(this.echartOptions)
      console.log("删了", this.echart.getOption())
    }
  }


  return Plugin
})()

