import isFunction from "./isFunction";

/**
 * 这个方法目前有点问题
 * @param value 
 * @returns 
 */
export default function isClass(value: any): boolean {
  return isFunction(value) && /^class\s/.test(Function.prototype.toString.call(value));
}