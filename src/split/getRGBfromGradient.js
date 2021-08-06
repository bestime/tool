/**
 * @param {Array} startRGB 开始颜色的rgb数组
 * @param {Array} endRGB 结束颜色的rgb数组
 * @param {Number} ratio 开始到结束所在位置比例，用于定位颜色位置
 * @return {Array} rgb数组
 */

const _INT = parseInt

function getRGBfromGradient (startRGB, endRGB, ratio) {
  var rStep = (endRGB[0] - startRGB[0]) * ratio;
  var gStep = (endRGB[1] - startRGB[1]) * ratio;
  var bStep = (endRGB[2] - startRGB[2]) * ratio;

  return [
    _INT(rStep + startRGB[0]),
    _INT(gStep + startRGB[1]),
    _INT(bStep + startRGB[2])
  ]
}

export default getRGBfromGradient