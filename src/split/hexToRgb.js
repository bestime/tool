
/**
 * 十六进制颜色转rgb
 * 注：网上找的，暂时没有处理三位的hex值，后期优化
 * @param {String} hex 16进制的颜色值
 * @return {Array} [r, g, b]
*/
export default function hexToRgb (hex) {
  var rgb = [];
  for(var i=1; i<7; i+=2){
      rgb.push(parseInt("0x" + hex.slice(i,i+2)));
  }
  return rgb;
}