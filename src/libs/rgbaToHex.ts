import _Number from "./_Number";
import defualtFormatter from "./defualtFormatter";
import split from "./split";
import trim from "./trim";

/**
 * 颜色的rgba转十六进制
 * @param rgba 带转换颜色字符串。格式： `rgba(0,0,0,1)` 或 `rgb(255,255,255)`
 * @returns 十六进制值
 */
export default function rgbaToHex (rgba: string) {
  rgba = trim(rgba, '*').replace(/^rgba?\((.*)\)$/g, '$1')
  
  const list = split(rgba, ',').map(function (c) {
    return _Number(c)
  })
  
  const a = defualtFormatter(1, list[3])

  const r = Math.floor(a * list[0] + (1 - a) * 255);
  const g = Math.floor(a * list[1] + (1 - a) * 255);
  const b = Math.floor(a * list[2] + (1 - a) * 255);

  return "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
}