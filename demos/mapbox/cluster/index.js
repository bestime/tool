function getJsonFile (url) {
  return new Promise(resolve => {
    if(!url) {
      resolve()
      return;
    }
    $.getJSON(url)
      .success(function (res) {
        resolve(res)
      })
      .error(function (err) {
        resolve()
      })
  })
}


/**
 * 计算网格数据
 * @param {number} startX 起始X值
 * @param {number} startY 起始Y值
 * @param {number} stepX 步长Y值
 * @param {number} stepY 步长Y值
 * @param {array} gridList 数据列表
*/
function calculatePoints (startX, startY, stepX, stepY, gridList) {
  const customList = []
  gridList.forEach(function (item, yidx) {
    const y0 = startY + stepY * yidx
    item.forEach(function (val, xidx) {
      const x0 = startX + stepX * xidx
      if(val == null) {
        val = defaultValue
      }
      val = val || defaultValue
      if(val != null) {
        customList.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [x0, y0, val]
          },
          properties: {
            id: `${yidx}-${xidx}`,
            mag: 10,
            value:val,
            tsunami: ns.getRandom(1,50)
          }
        })
      }
    })
  })
  return customList
}
