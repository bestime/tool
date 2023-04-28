/**
 * 生成指定范围随机数
 * @param min - 最小值
 * @param max - 最大值
 * @param int - 是否生成整数. 默认true
 * @returns 随机数
 */
export default function getRandom(min: number, max: number, isInt?: boolean) {
  const num = isInt === false ? 0 : 1;
  min = Math.random() * (max - min + num) + min; // 节省一个变量
  return num ? Math.floor(min) : min;
}

/*
getRandom(0.1, 9.9, false)

*/
