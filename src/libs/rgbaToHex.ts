import _Number from "./_Number";
import get from "./get";
import rgbaToObject from "./rgbaToObject";
import split from "./split";
import trim from "./trim";

/**
 * 颜色的rgba转十六进制
 * @param rgba 带转换颜色字符串。格式： `rgba(0,0,0,1)` 或 `rgb(255,255,255)`
 * @returns 十六进制值
 */
export default function rgbaToHex (rgbaColor: string) {
  const obj = rgbaToObject(rgbaColor)
  
  const a = obj.a

  const r = Math.floor(a * obj.r + (1 - a) * 255);
  const g = Math.floor(a * obj.g + (1 - a) * 255);
  const b = Math.floor(a * obj.b + (1 - a) * 255);

  return "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
}