import get from "./get";

/**
 * 十六进制颜色转rgb
 * @param hex 
 * @returns 
 */
export default function hexToRgba (hex: string, alpha?: number) {
  if(hex.length <7) {
    throw "颜色格式不正确，必须6位的十六进制颜色"
  }
  const a = get(alpha, 1)
  var rgb = [];
  for(var i=1; i<7; i+=2){
    rgb.push(parseInt("0x" + hex.slice(i,i+2)));
  }
  return `rgba(${rgb.join(',')},${a})`;
}