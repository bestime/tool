/**
 * 缓动函数 linear
 * @param t 
 * @param b 
 * @param c 
 * @param d 
 * @returns 
 */
export default function tweenLinear(t: number, b: number, c: number, d: number) {
  return c * t / d + b; 
}