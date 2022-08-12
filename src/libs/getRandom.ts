/**
 * 生成随机数
 * @param  {Number} min 最小数
 * @param  {Number} max 最大数
 * @param  {Number} [isInt=true] 是否整数
 * @returns
 */
 export default function getRandom (min: number, max: number, isInt?: boolean) {
  const num = isInt === false ? 0 : 1
  min = Math.random() * ( max - min + num) + min; // 节省一个变量
  return num ? Math.floor(min) : min
}

/*
getRandom(0.1, 9.9, false)

*/