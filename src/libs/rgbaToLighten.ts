import rgbaToObject from "./rgbaToObject";

/**
 * 将颜色变淡
 * @param rgbaColor 颜色字符串
 * @param ratio 变淡多少倍。范围0-1
 * @returns 
 */
export default function rgbaToLighten (rgbaColor: string, ratio: number) {
  const obj = rgbaToObject(rgbaColor)
  const newR = Math.round(obj.r + (255 - obj.r) * ratio);
  const newG = Math.round(obj.g + (255 - obj.g) * ratio);
  const newB = Math.round(obj.b + (255 - obj.b) * ratio);
  return 'rgba('+ newR +','+ newG +','+ newB +',1)'
}