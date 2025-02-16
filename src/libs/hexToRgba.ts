import defualtFormatter from "./defualtFormatter";

/**
 * 十六进制颜色转rgb
 * @param hex 
 * @returns 
 */
export default function hexToRgba (hex: string, alpha?: number) {
  if(hex.length <7) {
    throw "颜色格式不正确，必须6位的十六进制颜色"
  }
  const a = defualtFormatter(1, alpha)
  var rgb = [];
  for(var i=1; i<7; i+=2){
    rgb.push(parseInt("0x" + hex.slice(i,i+2)));
  }
  return `rgba(${rgb.join(',')},${a})`;
}