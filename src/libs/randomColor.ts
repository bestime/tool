import getRandom from "./getRandom";

/**
   * 获取随机颜色
   */
export default function randomColor () {
  const r = getRandom(0, 255, true)
  const g = getRandom(0, 255, true)
  const b = getRandom(0, 255, true)
  return `rgba(${r},${g},${b},1)`
}