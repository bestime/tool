/**
 * 缓动函数 quartEaseInOut
 * @param t 
 * @param b 
 * @param c 
 * @param d 
 * @returns 
 */
export default function tweenQuartEaseInOut(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
}